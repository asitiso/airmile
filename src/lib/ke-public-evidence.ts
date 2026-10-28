/**
 * Public Korean Air monthly calendar -> traceable award evidence.
 * No network requests, no invented flight counts, miles, taxes or availability.
 * Independently written from published DOM observations of the public UI.
 * This is NOT verification of live, bookable inventory.
 */
export const PUBLIC_KE_URL = "https://www.koreanair.com/booking/book-and-manage/award-seat-availability";
export const FILTER_NAMES = [
 "일반석 보너스", "프리미엄석 보너스", "프리미엄석 좌석승급",
 "프레스티지석 보너스", "프레스티지석 좌석승급", "일등석 보너스/좌석승급",
] as const;
type DayObservation = {day:number; label:string; markers:string[]; noSeat:boolean};
export type PublicCalendarObservation = {
 origin:string; destination:string; month:string; title:string; displayedMonth:string;
 checkedAt:string; sourceAsOf?:string|null;
 filters:Array<{name:string;checked:boolean}>; days:DayObservation[];
};
type EvidenceRow = {
 sourceName:string;sourceUrl:string;checkedAt:string;sourceAsOf?:string;
 origin:string;destination:string;departureDate:string;
 program:"SKYPASS";cabin:"ECONOMY"|"BUSINESS"|"FIRST";
 mark:"MARKED"|"NOT_MARKED";evidenceOrigin:"OFFICIAL_PUBLIC_CALENDAR";note:string;
};
export type PublicCalendarResult = {records:EvidenceRow[];metadata:{
 origin:string;destination:string;month:string;coveredDates:string[];
 checkedAt:string;sourceAsOf:string|null;unsupportedPremiumDates:string[];
 ambiguousFirstClassDates:string[];warning:string;
}};
export class PublicCalendarParseError extends Error {
 readonly code:string;
 constructor(code:string,message:string){super(message);this.code=code;this.name="PublicCalendarParseError";}
}
const clean=(text:string)=>text.replace(/\s+/gu," ").trim();
function reject(code:string,message:string):never{throw new PublicCalendarParseError(code,message);}
function validDay(iso:string):boolean{
 if(!/^\d{4}-\d{2}-\d{2}$/.test(iso))return false;
 const ms=Date.parse(iso+"T00:00:00Z");
 return Number.isFinite(ms)&&new Date(ms).toISOString().slice(0,10)===iso;
}
export function convertKoreanAirPublicCalendar(input:PublicCalendarObservation):PublicCalendarResult {
 if(!input||typeof input!=="object")reject("STRUCTURE_CHANGED","관찰 자료가 없습니다.");
 const {origin,destination,month}=input;
 if(!/^[A-Z]{3}$/.test(origin)||!/^[A-Z]{3}$/.test(destination)||origin===destination)
   reject("ROUTE_INVALID","공항 코드가 잘못되었습니다.");
 if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))
   reject("MONTH_INVALID","조회 월 형식이 잘못되었습니다.");
 const [year,mon]=month.split("-").map(Number);
 const route=clean(input.title||"").match(/\b[A-Z]{3}\b/g)||[];
 if(route.length!==2||route[0]!==origin||route[1]!==destination)
   reject("ROUTE_MISMATCH","공식 결과와 요청 노선이 다릅니다.");
 if(clean(input.displayedMonth||"")!==year+"년 "+mon+"월")
   reject("MONTH_MISMATCH","공식 결과와 요청 월이 다릅니다.");
 if(!Array.isArray(input.filters)||input.filters.length!==FILTER_NAMES.length||
    FILTER_NAMES.some(name=>input.filters.filter(f=>f?.name===name&&f.checked===true).length!==1))
   reject("FILTER_INCOMPLETE","공식 좌석 종류 필터가 전체 선택 상태가 아닙니다.");
 if(!Number.isFinite(Date.parse(input.checkedAt))||
    (input.sourceAsOf&&!Number.isFinite(Date.parse(input.sourceAsOf))))
   reject("INVALID_TIMESTAMP","자료 확인 시각이 잘못되었습니다.");
 const total=new Date(Date.UTC(year,mon,0)).getUTCDate();
 if(!Array.isArray(input.days)||input.days.length!==total)
   reject("INCOMPLETE_MONTH","달력 전체 날짜의 수집이 완료되지 않았습니다.");
 const known=new Set<string>(FILTER_NAMES);
 const seen=new Set<number>(), coveredDates:string[]=[],records:EvidenceRow[]=[];
 const unsupportedPremiumDates:string[]=[],ambiguousFirstClassDates:string[]=[];
 for(const day of input.days) {
  if(!day||!Number.isInteger(day.day)||day.day<1||day.day>total||seen.has(day.day)||
     clean(day.label||"")!==String(day.day)||!Array.isArray(day.markers))
    reject("INVALID_DAY","중복되었거나 잘못된 날짜입니다.");
  seen.add(day.day);
  const date=month+"-"+String(day.day).padStart(2,"0");
  if(!validDay(date))reject("INVALID_DAY","유효하지 않은 날짜입니다.");
  const markers=day.markers.map(x=>clean(x));
  if(new Set(markers).size!==markers.length||markers.some(m=>!known.has(m)))
    reject("UNKNOWN_MARKER","해석할 수 없는 좌석 종류 표시입니다.");
  if(typeof day.noSeat!=="boolean"||(day.noSeat&&markers.length>0)||(!day.noSeat&&!markers.length))
    reject("UNVERIFIED_UNAVAILABLE_STATE","공식 결과의 빈 날짜 구조가 확인되지 않았습니다.");
  const hasEconomy=markers.includes("일반석 보너스");
  const hasBusiness=markers.includes("프레스티지석 보너스");
  if(markers.includes("프리미엄석 보너스"))unsupportedPremiumDates.push(date);
  if(markers.includes("일등석 보너스/좌석승급"))ambiguousFirstClassDates.push(date);
  const base={sourceName:"대한항공 공개 보너스 좌석 달력",sourceUrl:PUBLIC_KE_URL,
   checkedAt:input.checkedAt,...(input.sourceAsOf?{sourceAsOf:input.sourceAsOf}:{}),
   origin,destination,departureDate:date,program:"SKYPASS" as const,
   evidenceOrigin:"OFFICIAL_PUBLIC_CALENDAR" as const,
   note:"공개 달력 표식 기준. 실시간 발권 가능 인원·좌석 수·세금·편명은 미확인."};
  for(const [cabin,available] of [["ECONOMY",hasEconomy],["BUSINESS",hasBusiness]] as const)
    records.push({...base,cabin,mark:available?"MARKED":"NOT_MARKED"});
  if(day.noSeat)records.push({...base,cabin:"FIRST",mark:"NOT_MARKED"});
  coveredDates.push(date);
 }
 coveredDates.sort();
 return {records,metadata:{origin,destination,month,coveredDates,checkedAt:input.checkedAt,
  sourceAsOf:input.sourceAsOf||null,unsupportedPremiumDates,ambiguousFirstClassDates,
  warning:"공개 표시 자료입니다. 프리미엄·일등석 보너스/승급 혼합 표시는 임의 분류하지 않으며 실시간 좌석 수는 모릅니다."}};
}
