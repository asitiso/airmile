// @ts-nocheck -- JavaScript runtime tests; TypeScript module contracts are checked separately.
import assert from "node:assert/strict";
import test from "node:test";
import {buildMonthlySearchPlan,chooseNextMonthlyJobs,summarizeSearchPlan} from "./search-planner.ts";
const base={today:"2026-10-26",anchor:"2026-11-15",origin:"ICN",destinations:["JFK","LAX","SFO"],programs:["SKYPASS","ASIANA_CLUB"],requestedMonths:1,includeBackground:true};
const plan=()=>buildMonthlySearchPlan(base);
test("unique provider/route/month jobs, never requests per cabin/day",()=>{
  const jobs=plan();assert.ok(jobs.length>0);assert.equal(new Set(jobs.map(j=>j.id)).size,jobs.length);
});
test("selected month and neighbor month beat the background",()=>{
  const jobs=plan(),counts=summarizeSearchPlan(jobs);
  assert.equal(jobs[0].month,"2026-11");assert.ok(counts.nearby>0&&counts.background>0);
  const foreground=buildMonthlySearchPlan({...base,includeBackground:false});
  assert.ok(foreground.length<jobs.length);assert.ok(foreground.every(j=>j.tier!=="background"));
});
test("clicked distant month becomes top priority for all selected cities",()=>{
  const jobs=buildMonthlySearchPlan({...base,clickedMonth:"2027-05"});
  assert.equal(jobs[0].month,"2027-05");
  assert.equal(jobs.filter(j=>j.tier==="clicked").length,6);
  assert.equal(new Set(jobs.slice(0,6).map(j=>j.destination)).size,3);
});
test("calendar-window boundaries do not duplicate or leak into following months",()=>{
  const jobs=plan();
  assert.ok(jobs.every(j=>j.month>="2026-10"&&j.month<="2027-10"));
  assert.equal(jobs.filter(j=>j.month==="2027-11").length,0);
  const across=buildMonthlySearchPlan({...base,anchor:"2026-10-30"});
  assert.ok(across.some(j=>j.month==="2026-10"&&j.tier==="nearby"));
  assert.ok(across.some(j=>j.month==="2026-11"&&j.tier==="nearby"));
});
test("provider concurrency; completed and active work skipped",()=>{
  const jobs=plan();
  const opts={pauseBackground:false,capacity:{SKYPASS:1,ASIANA_CLUB:1},health:{},active:[],completedIds:new Set()};
  const selected=chooseNextMonthlyJobs(jobs,opts);
  assert.equal(selected.length,2);
  assert.deepEqual(new Set(selected.map(j=>j.program)),new Set(["SKYPASS","ASIANA_CLUB"]));
  assert.equal(chooseNextMonthlyJobs(jobs,{...opts,active:selected}).length,0);
});
test("pause and slow searches suppress low priority refresh",()=>{
  const jobs=plan(),foreground=new Set(jobs.filter(j=>j.tier!=="background").map(j=>j.id));
  const opts={pauseBackground:true,capacity:{SKYPASS:4,ASIANA_CLUB:4},health:{},active:[],completedIds:foreground};
  assert.equal(chooseNextMonthlyJobs(jobs,opts).length,0);
  assert.equal(chooseNextMonthlyJobs(jobs,{...opts,pauseBackground:false,lastInteractiveLatencyMs:12000}).length,0);
});
test("one blocked airline does not stop other airline",()=>{
  const jobs=chooseNextMonthlyJobs(plan(),{pauseBackground:false,capacity:{SKYPASS:1,ASIANA_CLUB:1},health:{SKYPASS:"rate_limited"},active:[],completedIds:new Set()});
  assert.equal(jobs.length,1);assert.equal(jobs[0].program,"ASIANA_CLUB");
});
test("input validation catches out-of-range and malformed values",()=>{
  assert.throws(()=>buildMonthlySearchPlan({...base,anchor:"2026-02-30"}));
  assert.throws(()=>buildMonthlySearchPlan({...base,anchor:"2028-01-01"}));
  assert.throws(()=>buildMonthlySearchPlan({...base,destinations:Array(11).fill("JFK")}));
});
