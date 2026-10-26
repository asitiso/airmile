/**
 * Contract for manually imported, provenance-tagged award evidence.
 * No estimated seat counts, flight schedules, mileage prices, or live claims.
 * These records are NOT independently authenticated by the importer.
 */
export type AwardProgram = "SKYPASS" | "ASIANA_CLUB" | "LEGACY_ASIANA";
export type AwardCabin = "ECONOMY" | "BUSINESS" | "FIRST";
export type AvailabilityMark = "MARKED" | "NOT_MARKED" | "WAITLIST";
export type EvidenceOrigin = "OFFICIAL_PUBLIC_CALENDAR" | "OFFICIAL_BOOKING_SCREEN" | "THIRD_PARTY";
export type AwardEvidence = {
  sourceName: string;
  sourceUrl: string;
  checkedAt: string;
  sourceAsOf?: string;
  origin: string;
  destination: string;
  departureDate: string;
  program: AwardProgram;
  cabin: AwardCabin;
  mark: AvailabilityMark;
  evidenceOrigin: EvidenceOrigin;
  flightNumber?: string;
  milesPerPassenger?: number;
  taxAmount?: number;
  taxCurrency?: string;
  note?: string;
};
export type ImportResult = { records: AwardEvidence[]; rejected: number; errors: string[] };
const programs = new Set(["SKYPASS", "ASIANA_CLUB", "LEGACY_ASIANA"]);
const cabins = new Set(["ECONOMY", "BUSINESS", "FIRST"]);
const marks = new Set(["MARKED", "NOT_MARKED", "WAITLIST"]);
const origins = new Set(["OFFICIAL_PUBLIC_CALENDAR", "OFFICIAL_BOOKING_SCREEN", "THIRD_PARTY"]);
const codeRe = /^[A-Z]{3}$/;
const dateRe = /^\d{4}-\d{2}-\d{2}$/;

function validDate(v: unknown): v is string {
  if (typeof v !== "string" || !dateRe.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === v;
}
function validUrl(v: unknown): v is string {
  if (typeof v !== "string" || v.length > 500) return false;
  try { return new URL(v).protocol === "https:"; } catch { return false; }
}
function optionalNumber(v: unknown): v is number | undefined {
  return v === undefined || (typeof v === "number" && Number.isFinite(v) && v >= 0);
}

/** Reject entries without traceable provenance. Neither official status nor seat quantity is inferred. */
export function parseAwardEvidence(payload: unknown): ImportResult {
  const raw = Array.isArray(payload) ? payload :
    payload && typeof payload === "object" && "records" in payload ? (payload as {records: unknown}).records : null;
  if (!Array.isArray(raw)) throw new Error("JSON 최상단에는 records 배열이 필요합니다.");
  if (raw.length > 20000) throw new Error("한 번에 20,000건을 초과할 수 없습니다.");
  const records: AwardEvidence[] = [];
  const errors: string[] = [];
  raw.forEach((entry, i) => {
    if (!entry || typeof entry !== "object") { errors.push(`${i+1}행: 자료 형식 오류`); return; }
    const r = entry as Record<string, unknown>;
    if (typeof r.sourceName !== "string" || !r.sourceName.trim() || !validUrl(r.sourceUrl) ||
      typeof r.checkedAt !== "string" || !Number.isFinite(Date.parse(r.checkedAt)) ||
      typeof r.origin !== "string" || !codeRe.test(r.origin) ||
      typeof r.destination !== "string" || !codeRe.test(r.destination) || !validDate(r.departureDate) ||
      !programs.has(r.program as string) || !cabins.has(r.cabin as string) ||
      (r.cabin === "FIRST" && r.program !== "SKYPASS") ||
      !marks.has(r.mark as string) || !origins.has(r.evidenceOrigin as string) ||
      !optionalNumber(r.milesPerPassenger) || !optionalNumber(r.taxAmount) ||
      (r.taxAmount !== undefined && (typeof r.taxCurrency !== "string" || !/^[A-Z]{3}$/.test(r.taxCurrency))) ||
      (r.flightNumber !== undefined && (typeof r.flightNumber !== "string" || r.flightNumber.length > 24)) ||
      (r.sourceAsOf !== undefined && (typeof r.sourceAsOf !== "string" || !Number.isFinite(Date.parse(r.sourceAsOf)))) ||
      (r.note !== undefined && (typeof r.note !== "string" || r.note.length > 200))) {
      errors.push(`${i+1}행: 날짜·프로그램·출처·금액 중 유효하지 않은 값이 있습니다.`);
      return;
    }
    records.push({
      sourceName: r.sourceName.trim().slice(0, 100), sourceUrl: r.sourceUrl as string,
      checkedAt: r.checkedAt as string, sourceAsOf: r.sourceAsOf as string | undefined,
      origin: r.origin, destination: r.destination, departureDate: r.departureDate,
      program: r.program as AwardProgram, cabin: r.cabin as AwardCabin,
      mark: r.mark as AvailabilityMark, evidenceOrigin: r.evidenceOrigin as EvidenceOrigin,
      flightNumber: r.flightNumber as string | undefined,
      milesPerPassenger: r.milesPerPassenger as number | undefined,
      taxAmount: r.taxAmount as number | undefined,
      taxCurrency: r.taxCurrency as string | undefined,
      note: r.note as string | undefined,
    });
  });
  return { records: dedupeEvidence(records), rejected: raw.length-records.length, errors: errors.slice(0,8) };
}

/** Keep the most recent observation for each source and exact displayed flight option. */
export function dedupeEvidence(input: AwardEvidence[]): AwardEvidence[] {
  const byKey = new Map<string, AwardEvidence>();
  for (const row of input) {
    const key = [row.sourceName,row.origin,row.destination,row.departureDate,row.program,row.cabin,row.flightNumber||"(day)",row.evidenceOrigin].join("|");
    const prev = byKey.get(key);
    if (!prev || prev.checkedAt <= row.checkedAt) byKey.set(key, row);
  }
  return Array.from(byKey.values());
}

export function getDayEvidence(input: AwardEvidence[], date: string, from: string, destinations: string[], program: AwardProgram, cabin: AwardCabin) {
  if (cabin === "FIRST" && program !== "SKYPASS") return { status:"UNSUPPORTED" as const, flightCount:null, minMiles:null, evidenceCount:0 };
  const rows = input.filter(x => x.departureDate === date && x.origin === from && destinations.includes(x.destination) && x.program === program && x.cabin === cabin);
  const checkedDestinations = new Set(rows.map(x=>x.destination));
  const partial = destinations.some(d=>!checkedDestinations.has(d));
  const positive = rows.filter(x => x.mark === "MARKED");
  const flightIds = new Set(positive.map(x => x.flightNumber).filter(Boolean));
  const miles = positive.map(x => x.milesPerPassenger).filter((x): x is number => typeof x === "number");
  return {
    status: positive.length ? "MARKED" as const : rows.some(x=>x.mark==="WAITLIST") ? "WAITLIST" as const : rows.length && partial ? "PARTIAL" as const : rows.length ? "NOT_MARKED" as const : "NOT_CHECKED" as const,
    flightCount: flightIds.size ? flightIds.size : null,
    minMiles: miles.length ? Math.min(...miles) : null,
    evidenceCount: rows.length,
  };
}

function addDays(day: string, by: number): string {
  const ms = Date.parse(`${day}T00:00:00Z`) + by * 86400000;
  return new Date(ms).toISOString().slice(0,10);
}
/** Initial query order only: selected date, ±3 days, rest of first month, rest of horizon. */
export function prioritizeDates(anchor: string, horizonStart: string, horizonDays=360): string[] {
  if (!validDate(anchor) || !validDate(horizonStart) || horizonDays < 1 || horizonDays > 366) throw new Error("잘못된 검색 기간입니다.");
  const pool = Array.from({length:horizonDays},(_,i)=>addDays(horizonStart,i));
  const available = new Set(pool);
  const seen = new Set<string>();
  const ordered: string[]=[];
  const take=(day:string)=>{if(available.has(day)&&!seen.has(day)){ordered.push(day);seen.add(day);}};
  for (let offset=0;offset<=3;offset++) { take(addDays(anchor,offset)); if(offset)take(addDays(anchor,-offset)); }
  for(let offset=4;offset<31;offset++)take(addDays(anchor,offset));
  for(const day of pool)take(day);
  return ordered;
}