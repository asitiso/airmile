import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { AirportField } from "@/components/airport-field";
import { SearchPlanPanel } from "@/components/search-plan-panel";
import { AIRPORT } from "@/data/airports";
import { addDays, addMonths, monthGrid, monthKey, monthLabel, seoulToday } from "@/lib/dates";
import {
  buildEvidenceIndex, dedupeEvidence, getDayEvidence, parseAwardEvidence,
  type AwardCabin, type AwardEvidence, type AwardProgram, type EvidenceIndex,
} from "@/lib/award-evidence";
import { CalendarDays, ChevronLeft, ChevronRight, CloudOff, ExternalLink, FileJson2, Info, Plus, Trash2 } from "lucide-react";

const KOREAN_AIR_URL = "https://www.koreanair.com/booking/book-and-manage/award-seat-availability";
const ASIANA_URL = "https://flyasiana.com/I/KR/KO/MileageSeatSearch.do";
const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const CABINS: Array<{ code: AwardCabin; label: string }> = [
  { code: "ECONOMY", label: "E" }, { code: "BUSINESS", label: "B" }, { code: "FIRST", label: "F" },
];
const PROGRAMS: Array<{ code: AwardProgram; label: string; short: string; color: string }> = [
  { code: "SKYPASS", label: "대한항공 스카이패스", short: "대한항공", color: "#2262a2" },
  { code: "ASIANA_CLUB", label: "아시아나클럽", short: "아시아나", color: "#b65939" },
  { code: "LEGACY_ASIANA", label: "구 아시아나 마일리지", short: "구 아시아나", color: "#8a6a34" },
];
const STORE_KEY = "airmile:importedEvidence:v1";
type Mode = "ow" | "rt" | "period";
type ViewMode = "year" | "month";
const officialLinks = [{ name: "대한항공 보너스 좌석", url: KOREAN_AIR_URL }, { name: "아시아나 마일리지 좌석", url: ASIANA_URL }];

function fmtMiles(value: number | null) {
  if (value === null) return "";
  return `${value.toLocaleString("ko-KR")}마일`;
}
function displayName(code: string) { return AIRPORT[code]?.city || code; }
function subtractDates(a: string, b: string) {
  return Math.round((Date.parse(`${a}T00:00:00Z`) - Date.parse(`${b}T00:00:00Z`)) / 86400000);
}
function labelOf(status: ReturnType<typeof getDayEvidence>) {
  if (status.status === "UNSUPPORTED") return "미운영";
  if (status.status === "NOT_CHECKED") return "미조회";
  const incomplete = status.partial ? " · 일부 목적지 미조회" : "";
  if (status.status === "WAITLIST") return "대기 표시" + incomplete;
  if (status.status === "PARTIAL") return "일부 목적지 미조회";
  if (status.status === "NOT_MARKED") return "표시 없음";
  const count = status.flightCount !== null ? `${status.flightCount}편` : "좌석 표시";
  return (status.minMiles !== null ? `${count} · ${fmtMiles(status.minMiles)}` : count) + incomplete;
}

export function VerifiedAwardDashboard() {
  const [today] = useState(seoulToday);
  const [mode, setMode] = useState<Mode>("rt");
  const [from, setFrom] = useState("ICN");
  const [destinationDraft, setDestinationDraft] = useState("JFK");
  const [destinations, setDestinations] = useState(["JFK"]);
  const [returnFrom, setReturnFrom] = useState("JFK");
  const [anchor, setAnchor] = useState(today);
  const [passengers, setPassengers] = useState(1);
  const [view, setView] = useState<ViewMode>("month");
  const [outMonth, setOutMonth] = useState(monthKey(today));
  const [retMonth, setRetMonth] = useState(addMonths(monthKey(today), 1));
  const [mobileLeg, setMobileLeg] = useState<"out" | "back">("out");
  const [outDate, setOutDate] = useState(today);
  const [retDate, setRetDate] = useState(addDays(today, 7));
  const [minNights, setMinNights] = useState(7);
  const [maxNights, setMaxNights] = useState(10);
  const [records, setRecords] = useState<AwardEvidence[]>([]);
  const evidenceIndex = useMemo(() => buildEvidenceIndex(records), [records]);
  const [pairLimit, setPairLimit] = useState(100);
  const [message, setMessage] = useState("공식 좌석 데이터 제공자가 아직 연결되지 않았습니다.");
  const [filterProgram, setFilterProgram] = useState<"all" | AwardProgram>("all");
  const [filterCabin, setFilterCabin] = useState<"all" | AwardCabin>("all");
  const horizon = addDays(today, 359);
  const months = useMemo(() => Array.from({length:12}, (_, i) => addMonths(monthKey(anchor), i)), [anchor]);
  const eligibleDestinations = useMemo(() => destinations.filter(x => x !== from), [destinations, from]);
  const returnDestination = from;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (stored) {
        const result = parseAwardEvidence(JSON.parse(stored));
        setRecords(result.records);
        if (result.records.length) setMessage(`${result.records.length.toLocaleString()}건의 수동 반입 자료를 불러왔습니다. 실제 발권 여부는 재확인해야 합니다.`);
      }
    } catch { setMessage("저장된 자료를 읽지 못했습니다. 자료를 다시 가져올 수 있습니다."); }
  }, []);

  async function onImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3_000_000) { setMessage("파일이 3MB를 초과합니다. 더 작은 JSON 파일을 선택하세요."); e.target.value = ""; return; }
    try {
      const parsed = parseAwardEvidence(JSON.parse(await file.text()));
      const combined = dedupeEvidence([...records, ...parsed.records]);
      localStorage.setItem(STORE_KEY, JSON.stringify({records:combined}));
      setRecords(combined);
      setMessage(`${parsed.records.length}건 반입, ${parsed.rejected}건 형식 오류. 수동 반입 자료이며 실시간 예약 확인 결과가 아닙니다.`);
    } catch(err) { setMessage(`파일 가져오기 실패: ${err instanceof Error ? err.message : "형식 오류"}`); }
    e.target.value = "";
  }
  function clearData() {
    if (!window.confirm("브라우저에 저장한 수동 반입 자료를 모두 지우시겠습니까?")) return;
    localStorage.removeItem(STORE_KEY); setRecords([]); setMessage("가져온 자료를 삭제했습니다. 모든 미조회 날짜는 미조회로 표시됩니다.");
  }
  function addDestination() {
    if (destinationDraft === from || destinations.includes(destinationDraft) || destinations.length >= 10) return;
    setDestinations(prev=>[...prev,destinationDraft]);
  }
  function chooseAnchor(value: string) {
    setAnchor(value); setOutDate(value); setOutMonth(monthKey(value));
    setRetDate(addDays(value,7));setRetMonth(monthKey(addDays(value,7)));
  }
  const outRows = records.filter(x => x.departureDate === outDate && x.origin === from && eligibleDestinations.includes(x.destination) && (filterProgram === "all" || x.program === filterProgram) && (filterCabin === "all" || x.cabin === filterCabin));
  const backRows = records.filter(x => x.departureDate === retDate && x.origin === returnFrom && x.destination === returnDestination && (filterProgram === "all" || x.program === filterProgram) && (filterCabin === "all" || x.cabin === filterCabin));
  const matchingPeriodDates = useMemo(() => {
    if (mode !== "period") return [];
    const departureSet = new Set(records.filter(x => x.origin === from && eligibleDestinations.includes(x.destination) && x.mark === "MARKED").map(x=>x.departureDate));
    const homeSet = new Set(records.filter(x => x.origin === returnFrom && x.destination === from && x.mark === "MARKED").map(x=>x.departureDate));
    const pairs: Array<[string,string]> = [];
    for(const day of departureSet)for(const back of homeSet) {
      const length = subtractDates(back,day);
      if(length>=minNights&&length<=maxNights) pairs.push([day,back]);
    }
    return pairs.sort((a,b)=>a[0].localeCompare(b[0]));
  },[mode,records,from,eligibleDestinations,returnFrom,minNights,maxNights]);

  return (
    <main className="mx-auto max-w-[1500px] p-3 pb-16 sm:p-6">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-accent">AWARD MILEAGE · VERIFIED DATA FIRST</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">마일리지 좌석 통합 달력</h1>
          <p className="mt-2 text-sm text-muted">대한항공 · 아시아나 · 12개월 조회 화면 · 실제 데이터 연동 검증 단계</p>
        </div>
        <span className="rounded-lg border border-amber-400 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">실시간 데이터 미연결 · 가상 좌석 표시 안 함</span>
      </header>
      <section className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-950" role="status">
        <div className="flex items-start gap-2"><CloudOff className="mt-0.5 size-5 shrink-0"/><div>
          <p className="font-semibold">현재 공식 좌석 검색 연결이 검증되지 않았습니다.</p>
          <p className="mt-1 text-sm leading-relaxed">이 화면의 <b>미조회</b>는 매진을 뜻하지 않습니다. 수동으로 반입한 공식 공개 달력 자료도 좌석 수·마일리지·발권 가능 여부를 임의로 추정하지 않습니다.</p>
        </div></div>
      </section>
      <section className="rounded-xl border border-line bg-surface p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {([ ["ow","편도"],["rt","일반 왕복"],["period","기간 왕복"] ] as const).map(([key,name])=><button key={key} type="button" onClick={()=>setMode(key)} aria-pressed={mode===key} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode===key?"bg-accent text-white":"border border-line bg-bg"}`}>{name}</button>)}
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <AirportField label="출발 공항" value={from} onChange={setFrom}/>
          <div className="flex min-w-0 flex-1 items-end gap-2"><AirportField label="목적지 추가 (최대 10개)" value={destinationDraft} exclude={from} onChange={setDestinationDraft}/><button type="button" onClick={addDestination} disabled={destinations.length>=10||destinations.includes(destinationDraft)||destinationDraft===from} className="flex h-11 items-center gap-1 rounded-lg border border-line px-3 text-sm disabled:opacity-40"><Plus className="size-4"/>추가</button></div>
          <label className="min-w-44 text-xs font-semibold text-muted">출발 기준일<input aria-label="출발 기준일" className="mt-1 block h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink" type="date" min={today} max={horizon} value={anchor} onChange={e=>chooseAnchor(e.target.value)}/></label>
          <label className="text-xs font-semibold text-muted">탑승 인원<select aria-label="탑승 인원" className="mt-1 block h-11 rounded-lg border border-line bg-white px-3 text-sm" value={passengers} onChange={e=>setPassengers(Number(e.target.value))}>{[1,2,3,4].map(n=><option key={n} value={n}>{n}명</option>)}</select></label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">{destinations.map(d=><button key={d} type="button" className="flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1.5 text-xs" onClick={()=>setDestinations(prev=>prev.length<=1?prev:prev.filter(x=>x!==d))}>{displayName(d)} ({d}) <span aria-label="목적지 삭제">×</span></button>)}</div>
        {mode!=="ow"&&<div className="mt-3 flex flex-wrap items-end gap-3"><div className="w-full max-w-xs"><AirportField label="귀국 출발 공항 (오픈조 지원)" value={returnFrom} onChange={setReturnFrom}/></div>{mode==="period"&&<><label className="text-xs text-muted">최소 여행 일수<input aria-label="최소 여행 일수" type="number" min="1" max="100" value={minNights} onChange={e=>setMinNights(Math.max(1,Number(e.target.value)))} className="mt-1 block w-28 rounded-lg border border-line p-2 text-sm"/></label><label className="text-xs text-muted">최대 여행 일수<input aria-label="최대 여행 일수" type="number" min="1" max="100" value={maxNights} onChange={e=>setMaxNights(Math.max(1,Number(e.target.value)))} className="mt-1 block w-28 rounded-lg border border-line p-2 text-sm"/></label></>}</div>}
      </section>
      <section className="mt-4 rounded-xl border border-line bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h2 className="font-semibold">검색 데이터 가져오기</h2><p className="mt-1 text-xs text-muted">출처 URL·조회 시각 형식이 포함된 JSON만 반입 · 진위 미인증 · 브라우저에 저장</p></div>
          <div className="flex flex-wrap items-center gap-2"><label className="flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white"><FileJson2 className="size-4"/>JSON 가져오기<input type="file" accept=".json,application/json" className="sr-only" onChange={onImport}/></label><button type="button" className="flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-sm" onClick={clearData}><Trash2 className="size-4"/>자료 삭제</button></div>
        </div>
        <p className="mt-2 text-xs text-muted" role="status">{message}</p>
        <div className="mt-3 flex flex-wrap gap-2">{officialLinks.map(link=><a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-sm hover:bg-bg">{link.name}<ExternalLink className="size-3"/></a>)}</div>
      </section>
      <SearchPlanPanel today={today} anchor={anchor} origin={from} destinations={eligibleDestinations} programs={(filterProgram==="all" ? ["SKYPASS","ASIANA_CLUB"] : [filterProgram]) as AwardProgram[]} />
      <section className="mt-4 rounded-xl border border-line bg-surface p-3 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div><h2 className="flex items-center gap-2 text-lg font-semibold"><CalendarDays className="size-5"/>보너스 좌석 달력</h2><p className="text-xs text-muted">표시 기간은 12개월 · 모든 항공사 좌석은 출처별 확인 필요</p></div><div className="flex gap-2"><button type="button" onClick={()=>setView("year")} className={`rounded-lg px-3 py-2 text-sm ${view==="year"?"bg-accent text-white":"border border-line"}`}>12개월</button><button type="button" onClick={()=>setView("month")} className={`rounded-lg px-3 py-2 text-sm ${view==="month"?"bg-accent text-white":"border border-line"}`}>상세 달력</button></div></div>
        <div className="mb-3 flex flex-wrap items-end gap-2"><label className="text-xs text-muted">마일리지 프로그램<select value={filterProgram} onChange={e=>setFilterProgram(e.target.value as typeof filterProgram)} className="mt-1 block rounded-lg border border-line bg-bg p-2 text-sm"><option value="all">전체</option>{PROGRAMS.map(p=><option key={p.code} value={p.code}>{p.label}</option>)}</select></label><label className="text-xs text-muted">좌석 등급<select value={filterCabin} onChange={e=>setFilterCabin(e.target.value as typeof filterCabin)} className="mt-1 block rounded-lg border border-line bg-bg p-2 text-sm"><option value="all">전체</option><option value="ECONOMY">이코노미</option><option value="BUSINESS">비즈니스</option><option value="FIRST">일등석</option></select></label></div>
        {view==="year" ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{months.map(key=><YearMini key={key} month={key} today={today} horizon={horizon} records={evidenceIndex} from={from} destinations={eligibleDestinations} programFilter={filterProgram} cabinFilter={filterCabin} onMonth={()=>{setView("month");setOutMonth(key);}} onSelect={setOutDate}/>)}</div> : <>
          {mode!=="ow"&&<div className="mb-3 flex gap-2 lg:hidden"><button className={`rounded-lg px-3 py-2 text-sm ${mobileLeg==="out"?"bg-accent text-white":"border border-line"}`} onClick={()=>setMobileLeg("out")}>가는 편</button><button className={`rounded-lg px-3 py-2 text-sm ${mobileLeg==="back"?"bg-accent text-white":"border border-line"}`} onClick={()=>setMobileLeg("back")}>오는 편</button></div>}
          <div className={`grid gap-3 ${mode==="ow"?"":"lg:grid-cols-2"}`}>
            <div className={mode!=="ow"&&mobileLeg==="back"?"hidden lg:block":""}><MonthPane title="가는 편" month={outMonth} onMonth={setOutMonth} onSelect={setOutDate} selected={outDate} today={today} horizon={horizon} records={evidenceIndex} from={from} destinations={eligibleDestinations} programFilter={filterProgram} cabinFilter={filterCabin}/></div>
            {mode!=="ow"&&<div className={mobileLeg==="out"?"hidden lg:block":""}><MonthPane title="오는 편" month={retMonth} onMonth={setRetMonth} onSelect={setRetDate} selected={retDate} today={today} horizon={horizon} records={evidenceIndex} from={returnFrom} destinations={[returnDestination]} programFilter={filterProgram} cabinFilter={filterCabin}/></div>}
          </div>
        </>}
      </section>
      <section className="mt-4 grid gap-3 lg:grid-cols-2"><EvidenceList title={`가는 편 · ${outDate}`} rows={outRows}/>{mode!=="ow"&&<EvidenceList title={`오는 편 · ${retDate}`} rows={backRows}/>}</section>
      {mode==="period"&&<section className="mt-4 rounded-xl border border-line bg-surface p-4"><h2 className="font-semibold">기간 왕복 조합</h2><p className="mt-1 text-xs text-muted">반입된 좌석 표시 날짜에서만 조합을 계산합니다. 실제 발권 가능한 왕복 항공권이라는 뜻은 아닙니다.</p><p className="mt-2 text-sm">현재 자료의 조건 일치 조합: <b>{matchingPeriodDates.length}개</b></p>{matchingPeriodDates.length>0&&<div className="mt-2 flex max-h-44 flex-col gap-1 overflow-auto">{matchingPeriodDates.slice(0,pairLimit).map(([a,b],i)=><button key={`${a}-${b}-${i}`} type="button" onClick={()=>{setOutDate(a);setRetDate(b);setView("month");setOutMonth(monthKey(a));setRetMonth(monthKey(b));}} className="rounded border border-line px-3 py-2 text-left text-xs">{a} 출발 → {b} 귀국 · {subtractDates(b,a)}일</button>)}</div>}{matchingPeriodDates.length>pairLimit&&<button type="button" onClick={()=>setPairLimit(n=>n+100)} className="mt-2 rounded-lg border border-line px-3 py-2 text-sm">다음 100개 보기 · {matchingPeriodDates.length-pairLimit}개 남음</button>}</section>}
      <footer className="mt-6 text-xs leading-relaxed text-muted"><Info className="mr-1 inline size-4"/>이 화면은 실제 데이터 연결 검증을 위한 안전한 첫 단계입니다. 공식 공개 달력에 표시된 좌석도 실시간 예약 가능 좌석 수를 증명하지 않습니다. 항공사 홈페이지에서 최신 좌석과 인원을 반드시 재확인하세요.</footer>
    </main>
  );
}

type PaneProps = {
  title: string; month: string; onMonth:(key:string)=>void; selected:string; onSelect:(date:string)=>void;
  today:string; horizon:string; records:EvidenceIndex; from:string;destinations:string[];
  programFilter:"all"|AwardProgram;cabinFilter:"all"|AwardCabin;
};
function MonthPane({title,month,onMonth,selected,onSelect,today,horizon,records,from,destinations,programFilter,cabinFilter}:PaneProps){
  const programs = PROGRAMS.filter(x=>programFilter==="all"||programFilter===x.code);
  const cabins = CABINS.filter(x=>cabinFilter==="all"||cabinFilter===x.code);
  return <div className="min-w-0 rounded-lg border border-line bg-bg p-2 sm:p-3"><div className="mb-3 flex items-center justify-between gap-2"><div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted">{displayName(from)} → {destinations.map(displayName).join(" · ")}</p></div><div className="flex items-center gap-1"><button type="button" aria-label="이전 달" onClick={()=>onMonth(addMonths(month,-1))} className="rounded border border-line p-2"><ChevronLeft className="size-4"/></button><span className="min-w-24 text-center text-sm font-semibold">{monthLabel(month)}</span><button type="button" aria-label="다음 달" onClick={()=>onMonth(addMonths(month,1))} className="rounded border border-line p-2"><ChevronRight className="size-4"/></button></div></div>
    <div className="overflow-x-auto pb-2"><div className="min-w-[720px]"><div className="grid grid-cols-7 gap-1">{WEEK.map(x=><div className="p-1 text-center text-xs text-muted" key={x}>{x}</div>)}{monthGrid(month).map((d,i)=>d?<button type="button" key={d} onClick={()=>onSelect(d)} disabled={d<today||d>horizon} className={`min-h-36 rounded-lg border p-1.5 text-left align-top disabled:opacity-35 ${d===selected?"border-accent bg-emerald-50":"border-line bg-surface"}`}><p className="mb-1 text-sm font-semibold">{Number(d.slice(8))}</p>{programs.map(p=><div key={p.code} className="mb-1 rounded p-1 text-[10px] leading-snug" style={{backgroundColor:`${p.color}11`,color:p.color}}><p className="font-bold">{p.short}</p>{cabins.map(c=>{const sum=getDayEvidence(records,d,from,destinations,p.code,c.code);return <p key={c.code} className="truncate">{c.label} {labelOf(sum)}</p>;})}</div>)}</button>:<div key={`blank-${i}`}/>)}</div></div></div>
    <p className="mt-1 text-xs text-muted">모바일에서는 가로로 움직여 요일별 상세 정보를 확인합니다.</p>
  </div>;
}
function YearMini({
  month, today, horizon, records, from, destinations, programFilter, cabinFilter, onMonth, onSelect,
}: {
  month:string; today:string; horizon:string; records:EvidenceIndex; from:string; destinations:string[];
  programFilter:"all"|AwardProgram; cabinFilter:"all"|AwardCabin;
  onMonth:()=>void; onSelect:(d:string)=>void;
}) {
  const cells=monthGrid(month);
  const programs=PROGRAMS.filter(x=>programFilter==="all"||programFilter===x.code);
  const cabins=CABINS.filter(x=>cabinFilter==="all"||cabinFilter===x.code);
  const overview=cells.map(date=>{
    if(!date) return null;
    const statuses=programs.flatMap(p=>cabins.map(c=>getDayEvidence(records,date,from,destinations,p.code,c.code)));
    return {
      date,
      hasMarked:statuses.some(x=>x.status==="MARKED"),
      hasWaitlist:statuses.some(x=>x.status==="WAITLIST"),
      hasChecked:statuses.some(x=>x.evidenceCount>0),
      incomplete:statuses.some(x=>x.partial),
    };
  });
  return <div className="rounded-lg border border-line bg-bg p-3">
    <button type="button" className="mb-2 w-full text-left text-sm font-semibold hover:underline" onClick={onMonth}>{monthLabel(month)} · 자세히 보기</button>
    <div className="grid grid-cols-7 gap-1">
      {WEEK.map(x=><span className="text-center text-[10px] text-muted" key={x}>{x}</span>)}
      {overview.map((day,i)=>day?<button type="button" key={day.date} disabled={day.date<today||day.date>horizon}
        aria-label={`${day.date}: ${day.hasMarked?"좌석 표시":day.hasWaitlist?"대기 표시":day.hasChecked&&day.incomplete?"일부 자료 미조회":day.hasChecked?"자료에 좌석 표시 없음":"미조회"}${day.incomplete?", 일부 목적지 미조회":""}`}
        className={`aspect-square rounded-sm text-[10px] disabled:opacity-25 ${day.hasMarked?"bg-emerald-200 text-emerald-950":day.hasWaitlist?"bg-amber-100 text-amber-900":day.hasChecked&&day.incomplete?"bg-sky-100 text-sky-900":day.hasChecked?"bg-slate-200 text-slate-700":"bg-surface text-muted"}`}
        onClick={()=>{onSelect(day.date);onMonth();}}>{Number(day.date.slice(8))}</button>:<span key={i}/>)}
    </div>
    <p className="mt-2 text-[10px] text-muted">초록: 좌석 표시 · 노랑: 대기 표시 · 파랑: 일부 미조회 · 회색: 확인 자료에 표시 없음 · 흰색: 미조회. 현재 선택한 프로그램·등급 필터 적용.</p>
  </div>;
}
function EvidenceList({title,rows}:{title:string;rows:AwardEvidence[]}) {
  const ordered=[...rows].sort((a,b)=>(a.program+a.cabin+(a.flightNumber||"")).localeCompare(b.program+b.cabin+(b.flightNumber||"")));
  return <div className="rounded-xl border border-line bg-surface p-4"><div className="mb-3 flex items-center justify-between gap-2"><h3 className="font-semibold">{title}</h3><span className="text-xs text-muted">반입 자료 {ordered.length}건</span></div>{ordered.length===0?<p className="rounded-lg bg-bg p-4 text-sm text-muted">이 날짜의 검증 가능한 검색 자료가 없습니다. <b>좌석 없음이 아니라 미조회 상태</b>입니다.</p>:<div className="max-h-[430px] space-y-2 overflow-auto">{ordered.map((r,i)=><article key={`${r.sourceName}-${r.departureDate}-${r.cabin}-${r.flightNumber}-${i}`} className="rounded-lg border border-line p-3"><div className="flex flex-wrap items-center justify-between gap-2"><b className="text-sm">{r.program} · {r.cabin}</b><span className="rounded bg-amber-50 px-2 py-1 text-xs text-amber-900">{r.mark==="MARKED"?"공개 좌석 표시":r.mark==="WAITLIST"?"대기 표시":"표시 없음"} · 발권 재확인</span></div><p className="mt-1 text-sm">{r.origin} → {r.destination}{r.flightNumber?` · ${r.flightNumber}`:" · 항공편 번호 미확인"}</p><p className="mt-1 text-xs text-muted">{r.milesPerPassenger!==undefined?`${r.milesPerPassenger.toLocaleString()}마일/인`:"필요 마일리지 미확인"} · 잔여 좌석 수 미확인 · 인원 {r.flightNumber?"재확인 필요":"확인 불가"}</p><p className="mt-1 text-xs text-muted">{r.sourceName} · 수집 {new Date(r.checkedAt).toLocaleString("ko-KR")} {r.sourceAsOf?` · 원자료 기준 ${new Date(r.sourceAsOf).toLocaleString("ko-KR")}`:""}</p><a className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent underline" href={r.sourceUrl} target="_blank" rel="noopener noreferrer">자료 출처 확인 <ExternalLink className="size-3"/></a></article>)}</div>}</div>;
}