/**
 * Deterministic search planning for a future authorized monthly award-calendar
 * provider. THIS MODULE NEVER MAKES NETWORK REQUESTS OR ASSERTS SEAT INVENTORY.
 */
export type Program = "SKYPASS" | "ASIANA_CLUB" | "LEGACY_ASIANA";
export type JobTier = "clicked" | "nearby" | "first_month" | "requested" | "background";
export type MonthlyJob = {
  id:string; origin:string; destination:string; program:Program;
  month:string; tier:JobTier; rank:number;
};
export type SearchPlanInput = {
  today:string; anchor:string; origin:string; destinations:string[];
  programs:Program[]; requestedMonths:1|3|6|12;
  clickedMonth?:string; horizonDays?:number; includeBackground?:boolean;
};
function dateNumber(s:string):number {
  if(!/^\d{4}-\d\d-\d\d$/.test(s))throw Error("날짜 형식 오류");
  const n=Date.parse(s+"T00:00:00Z");
  if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,10)!==s)throw Error("날짜 오류");
  return n;
}
function addDay(s:string,d:number):string {return new Date(dateNumber(s)+d*86400000).toISOString().slice(0,10);}
function addMonth(s:string,d:number):string {
  if(!/^\d{4}-\d\d$/.test(s))throw Error("월 형식 오류");
  const [year,month]=s.split("-").map(Number);
  if(month<1||month>12)throw Error("월 오류");
  return new Date(Date.UTC(year,month-1+d,1)).toISOString().slice(0,7);
}
function listMonths(a:string,b:string):string[]{
  const arr:string[]=[];let month=a.slice(0,7);
  while(month<=b.slice(0,7)){arr.push(month);month=addMonth(month,1);}
  return arr;
}
const rank:Record<JobTier,number>={clicked:0,nearby:1,first_month:2,requested:3,background:4};
/** One request plan per route/program/month — NEVER one per cabin/date. */
export function buildMonthlySearchPlan(p:SearchPlanInput):MonthlyJob[]{
  const start=dateNumber(p.today),anchor=dateNumber(p.anchor),days=p.horizonDays??360;
  if(!Number.isInteger(days)||days<1||days>366)throw Error("기간 오류");
  if(anchor<start||anchor>=start+days*86400000)throw Error("출발 기준일 범위 오류");
  if(!/^[A-Z]{3}$/.test(p.origin)||p.destinations.length>10||p.destinations.some(d=>!/^[A-Z]{3}$/.test(d)))throw Error("공항 코드/개수 오류");
  if(![1,3,6,12].includes(p.requestedMonths))throw Error("기간 선택 오류");
  const programs=[...new Set(p.programs)];
  if(programs.some(x=>!["SKYPASS","ASIANA_CLUB","LEGACY_ASIANA"].includes(x)))throw Error("프로그램 오류");
  const destinations=[...new Set(p.destinations.filter(x=>x!==p.origin))];
  const end=addDay(p.today,days-1),months=listMonths(p.today,end);
  const tiers=new Map<string,JobTier>();
  for(const month of months)tiers.set(month,"background");
  for(let i=0;i<p.requestedMonths;i++){const m=addMonth(p.anchor.slice(0,7),i);if(tiers.has(m))tiers.set(m,"requested");}
  for(const m of listMonths(p.anchor,addDay(p.anchor,29)))if(tiers.has(m))tiers.set(m,"first_month");
  for(let d=-3;d<=3;d++){
    const date=addDay(p.anchor,d);
    if(date>=p.today&&date<=end)tiers.set(date.slice(0,7),"nearby");
  }
  if(p.clickedMonth&&tiers.has(p.clickedMonth))tiers.set(p.clickedMonth,"clicked");
  const ordered=[...months].filter(m=>p.includeBackground!==false||tiers.get(m)!=="background")
    .sort((a,b)=>rank[tiers.get(a)!]-rank[tiers.get(b)!]||a.localeCompare(b));
  const jobs:MonthlyJob[]=[];
  for(const month of ordered)for(const destination of destinations)for(const program of programs){
    const tier=tiers.get(month)!;
    jobs.push({id:[p.origin,destination,program,month].join("|"),origin:p.origin,destination,program,month,tier,rank:rank[tier]});
  }
  return jobs;
}
export type ProviderHealth="ready"|"rate_limited"|"auth_required"|"down";
export type SchedulerOptions={
  pauseBackground:boolean; lastInteractiveLatencyMs?:number;
  capacity:Partial<Record<Program,number>>;
  health:Partial<Record<Program,ProviderHealth>>;
  active:readonly MonthlyJob[];
  completedIds:ReadonlySet<string>;
  maxStart?:number;
};
/** Skips background jobs when the interactive path is slow, or provider blocked. */
export function chooseNextMonthlyJobs(queue:readonly MonthlyJob[],p:SchedulerOptions):MonthlyJob[]{
  const seen=new Set(p.active.map(j=>j.id));
  const busy=new Map<Program,number>();
  for(const j of p.active)busy.set(j.program,(busy.get(j.program)??0)+1);
  const selected:MonthlyJob[]=[];
  for(const job of queue){
    if(selected.length>=Math.max(0,Math.min(20,p.maxStart??20)))break;
    if(p.completedIds.has(job.id)||seen.has(job.id))continue;
    if((p.health[job.program]??"ready")!=="ready")continue;
    if(job.tier==="background"&&(p.pauseBackground||(p.lastInteractiveLatencyMs??0)>10000))continue;
    const capacity=Math.max(0,Math.min(4,Math.floor(p.capacity[job.program]??0)));
    if((busy.get(job.program)??0)>=capacity)continue;
    selected.push(job);seen.add(job.id);busy.set(job.program,(busy.get(job.program)??0)+1);
  }
  return selected;
}
export function summarizeSearchPlan(queue:readonly MonthlyJob[]){
  const s:Record<JobTier,number>={clicked:0,nearby:0,first_month:0,requested:0,background:0};
  for(const job of queue)s[job.tier]++;
  return s;
}
