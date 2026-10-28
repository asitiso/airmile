/**
 * Strict boundary between verified monthly award evidence and UI search plans.
 *
 * NO airline HTTP calls, browser credentials or fabricated inventory live here.
 * A provider must be approved/implemented separately before jobs can execute.
 */
import { parseAwardEvidence, type AwardCabin, type AwardEvidence, type AwardProgram } from "./award-evidence.ts";
import type { MonthlyJob } from "./search-planner.ts";

export type ProviderErrorCode =
  | "NOT_CONFIGURED" | "AUTH_REQUIRED" | "RATE_LIMITED" | "TEMPORARY_FAILURE"
  | "CANCELLED" | "INVALID_RESPONSE" | "UNSUPPORTED_PROGRAM";

export class AwardProviderError extends Error {
  constructor(public readonly code: ProviderErrorCode, message: string) {
    super(message);
    this.name = "AwardProviderError";
  }
}

export type MonthlyEvidenceResponse = {
  // The provider is responsible for reporting dates actually checked, not inferred dates.
  records: unknown[];
  coveredDates: string[];
  checkedAt: string;
  sourceAsOf?: string;
};

export type AwardCalendarProvider = {
  id: string;
  programs: readonly AwardProgram[];
  /** Must only fetch sources the app is authorized to access. */
  fetchMonth(job: MonthlyJob, signal?: AbortSignal): Promise<MonthlyEvidenceResponse>;
};

export type MonthlyEvidenceOutcome =
  | { status:"ok"; jobId:string; providerId:string; records:AwardEvidence[];
      coveredDates:string[]; checkedAt:string; partial:boolean }
  | { status:"unavailable" | "error"; jobId:string; code:ProviderErrorCode; message:string;
      records:[]; coveredDates:[] };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function validDate(iso:string): boolean {
  return DATE_RE.test(iso) && Number.isFinite(Date.parse(iso+"T00:00:00Z")) &&
    new Date(Date.parse(iso+"T00:00:00Z")).toISOString().slice(0,10)===iso;
}
function daysInMonth(month:string):number {
  const match=/^(\d{4})-(0[1-9]|1[0-2])$/.exec(month);
  if(!match)throw new AwardProviderError("INVALID_RESPONSE","조회 월 형식이 잘못되었습니다.");
  return new Date(Date.UTC(Number(match[1]),Number(match[2]),0)).getUTCDate();
}
function datesForMonth(month:string):string[] {
  const count=daysInMonth(month);
  return Array.from({length:count},(_,i)=>month+"-"+String(i+1).padStart(2,"0"));
}
function unavailable(job:MonthlyJob,code:ProviderErrorCode,message:string):MonthlyEvidenceOutcome {
  return {status:code==="NOT_CONFIGURED"||code==="UNSUPPORTED_PROGRAM"?"unavailable":"error",
    jobId:job.id,code,message,records:[],coveredDates:[]};
}

/**
 * Validate an authorized provider's response. An empty result is NOT sold out:
 * without an explicit coveredDates list, the requested month remains unqueried.
 */
export async function runMonthlyEvidenceJob(
  job: MonthlyJob,
  providers: readonly AwardCalendarProvider[],
  signal?: AbortSignal,
):Promise<MonthlyEvidenceOutcome> {
  const provider=providers.find(p=>p.programs.includes(job.program));
  if(!provider)return unavailable(job,"NOT_CONFIGURED","허용된 마일리지 조회 데이터 제공자가 연결되지 않았습니다.");
  if(signal?.aborted)return unavailable(job,"CANCELLED","사용자 요청으로 조회가 취소되었습니다.");
  try {
    const response=await provider.fetchMonth(job,signal);
    if(signal?.aborted)return unavailable(job,"CANCELLED","사용자 요청으로 조회가 취소되었습니다.");
    if(!response || !Array.isArray(response.records) || !Array.isArray(response.coveredDates) ||
       typeof response.checkedAt!=="string" || !Number.isFinite(Date.parse(response.checkedAt)) ||
       (response.sourceAsOf!==undefined && (typeof response.sourceAsOf!=="string" ||
        !Number.isFinite(Date.parse(response.sourceAsOf))))) {
      throw new AwardProviderError("INVALID_RESPONSE","응답의 출처 확인 시각 또는 조회 날짜 목록이 올바르지 않습니다.");
    }
    const possible=new Set(datesForMonth(job.month));
    const covered=new Set<string>();
    for(const date of response.coveredDates) {
      if(typeof date!=="string" || !validDate(date) || !possible.has(date))
        throw new AwardProviderError("INVALID_RESPONSE","요청한 월 밖의 조회 날짜가 포함되어 있습니다.");
      covered.add(date);
    }
    const parsed=parseAwardEvidence({records:response.records});
    if(parsed.rejected!==0)throw new AwardProviderError("INVALID_RESPONSE",
      "일부 좌석 자료의 형식 또는 출처가 유효하지 않아 월별 결과를 수용하지 않았습니다.");
    for(const row of parsed.records) {
      if(row.origin!==job.origin||row.destination!==job.destination||
         row.program!==job.program||!row.departureDate.startsWith(job.month+"-")||
         !covered.has(row.departureDate))
        throw new AwardProviderError("INVALID_RESPONSE",
          "조회 작업과 일치하지 않거나 조회 범위가 확인되지 않은 항공편 정보입니다.");
      if(Date.parse(row.checkedAt)>Date.parse(response.checkedAt)+300000)
        throw new AwardProviderError("INVALID_RESPONSE","개별 자료의 확인 시각이 월별 확인 시각보다 늦습니다.");
    }
    return {status:"ok",jobId:job.id,providerId:provider.id,records:parsed.records,
      coveredDates:[...covered].sort(),checkedAt:response.checkedAt,
      partial:covered.size<possible.size};
  } catch (err) {
    if(signal?.aborted)return unavailable(job,"CANCELLED","사용자 요청으로 조회가 취소되었습니다.");
    if(err instanceof AwardProviderError)return unavailable(job,err.code,err.message);
    return unavailable(job,"TEMPORARY_FAILURE","조회 공급자가 응답하지 않았습니다. 다른 항공사의 조회는 계속할 수 있습니다.");
  }
}
