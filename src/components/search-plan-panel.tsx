import {useMemo,useState} from "react";
import {buildMonthlySearchPlan,summarizeSearchPlan,type Program} from "@/lib/search-planner";
type Props={today:string;anchor:string;origin:string;destinations:string[];programs:Program[]};
/** Shows a proposed search plan only. Never requests airline inventory. */
export function SearchPlanPanel({today,anchor,origin,destinations,programs}:Props){
  const [months,setMonths]=useState<1|3|6|12>(1);
  const [clickedMonth,setClickedMonth]=useState("");
  const [paused,setPaused]=useState(false);
  const plan=useMemo(()=>{
    try{return buildMonthlySearchPlan({
      today,anchor,origin,destinations,programs,requestedMonths:months,
      clickedMonth:clickedMonth||undefined,includeBackground:!paused,horizonDays:360
    });}catch{return [];}
  },[today,anchor,origin,destinations,programs,months,clickedMonth,paused]);
  const counts=summarizeSearchPlan(plan);
  const foreground=counts.clicked+counts.nearby+counts.first_month+counts.requested;
  const end=new Date(Date.parse(today+"T00:00:00Z")+359*86400000).toISOString().slice(0,7);
  return <details className="mt-4 rounded-xl border border-line bg-surface p-4 text-sm">
    <summary className="font-semibold">조회 우선순위 계획 보기 · 데이터 연결 전</summary>
    <p className="mt-2 text-xs leading-relaxed text-muted">
      실제 좌석 조회가 아니라 연결 가능한 공식 데이터 제공자가 확보되었을 때 사용할 작업 계획입니다.
      항공사 접속 정책·조회 권한이 확인되기 전까지 서버에서 자동 조회하지 않습니다.
    </p>
    <div className="mt-3 flex flex-wrap items-end gap-2">
      <label className="text-xs text-muted">우선 검색 기간
        <select aria-label="우선 검색 기간" className="mt-1 block rounded-lg border border-line bg-bg px-3 py-2 text-sm"
          value={months} onChange={e=>setMonths(Number(e.target.value) as 1|3|6|12)}>
          {[1,3,6,12].map(n=><option key={n} value={n}>{n}개월</option>)}
        </select>
      </label>
      <label className="text-xs text-muted">우선 검색 달 (선택)
        <input aria-label="우선 검색 달" type="month" min={today.slice(0,7)} max={end}
          className="mt-1 block rounded-lg border border-line bg-bg px-3 py-2 text-sm"
          value={clickedMonth} onChange={e=>setClickedMonth(e.target.value)}/>
      </label>
      <button type="button" className="min-h-10 rounded-lg border border-line px-3 text-xs"
        onClick={()=>setPaused(s=>!s)}>{paused?"후순위 작업 포함":"후순위 작업 제외"}</button>
    </div>
    <div className="mt-3 grid gap-2 sm:grid-cols-3">
      <div className="rounded-lg bg-bg p-3"><p className="text-xs text-muted">우선 작업</p><p className="text-lg font-semibold">{foreground}건</p></div>
      <div className="rounded-lg bg-bg p-3"><p className="text-xs text-muted">후순위 작업</p><p className="text-lg font-semibold">{counts.background}건</p></div>
      <div className="rounded-lg bg-bg p-3"><p className="text-xs text-muted">실제 데이터 요청</p><p className="mt-1 font-semibold">미연결 · 0건</p></div>
    </div>
    <p className="mt-2 text-xs text-muted">
      첫 조회 계획: {plan[0]?.month??"없음"} · {plan[0]?.origin??origin} → {plan[0]?.destination??"미설정"}
      · 월별 조회가 지원되면 날짜·좌석 등급별 중복 요청을 줄입니다.
    </p>
  </details>;
}
