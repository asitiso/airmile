// @ts-nocheck -- standalone Node runtime contract tests, not TypeScript source.
import assert from "node:assert/strict";
import test from "node:test";
import {runMonthlyEvidenceJob,AwardProviderError} from "./award-source-gate.ts";

const job={id:"ICN|JFK|SKYPASS|2027-04",origin:"ICN",destination:"JFK",
  program:"SKYPASS",month:"2027-04",tier:"first_month",rank:2};
const checkedAt="2026-10-28T06:00:00Z";
const row={sourceName:"공식 공개 달력",sourceUrl:"https://www.koreanair.com/",
  checkedAt,origin:"ICN",destination:"JFK",departureDate:"2027-04-10",
  program:"SKYPASS",cabin:"BUSINESS",mark:"MARKED",evidenceOrigin:"OFFICIAL_PUBLIC_CALENDAR"};
const provider=(reply)=>({id:"mock-authorized-provider",programs:["SKYPASS"],fetchMonth:async()=>reply});
test("no configured provider means unqueried, not sold out",async()=>{
  const result=await runMonthlyEvidenceJob(job,[]);
  assert.equal(result.status,"unavailable");
  assert.equal(result.code,"NOT_CONFIGURED");
  assert.deepEqual(result.records,[]);
});
test("a valid partial monthly snapshot keeps explicit day coverage",async()=>{
  const result=await runMonthlyEvidenceJob(job,[provider({records:[row],coveredDates:["2027-04-10"],checkedAt})]);
  assert.equal(result.status,"ok");
  assert.equal(result.partial,true);
  assert.equal(result.records.length,1);
  assert.deepEqual(result.coveredDates,["2027-04-10"]);
});
test("empty dates never imply all days were queried",async()=>{
  const result=await runMonthlyEvidenceJob(job,[provider({records:[],coveredDates:[],checkedAt})]);
  assert.equal(result.status,"ok");assert.equal(result.partial,true);
  assert.equal(result.coveredDates.length,0);
});
test("provider claiming all 30 April dates can explicitly report complete coverage",async()=>{
  const days=Array.from({length:30},(_,i)=>"2027-04-"+String(i+1).padStart(2,"0"));
  const result=await runMonthlyEvidenceJob(job,[provider({records:[row],coveredDates:days,checkedAt})]);
  assert.equal(result.status,"ok"); assert.equal(result.partial,false);
});
test("out-of-route or out-of-coverage records reject entire batch",async()=>{
  for(const variant of [{...row,destination:"LAX"},{...row,departureDate:"2027-04-20"}]){
    const result=await runMonthlyEvidenceJob(job,[provider({records:[variant],coveredDates:["2027-04-10"],checkedAt})]);
    assert.equal(result.code,"INVALID_RESPONSE");assert.deepEqual(result.records,[]);
  }
});
test("rejected malformed records cannot silently produce an apparently complete month",async()=>{
  const result=await runMonthlyEvidenceJob(job,[provider({records:[row,{...row,sourceUrl:"http://example.com"}],coveredDates:["2027-04-10"],checkedAt})]);
  assert.equal(result.code,"INVALID_RESPONSE");
});
test("invalid coverage date is rejected",async()=>{
  const result=await runMonthlyEvidenceJob(job,[provider({records:[],coveredDates:["2027-04-31"],checkedAt})]);
  assert.equal(result.code,"INVALID_RESPONSE");
});
test("rate limit is isolated to a provider and never converted to empty seat data",async()=>{
  const result=await runMonthlyEvidenceJob(job,[{
    id:"blocked",programs:["SKYPASS"],
    fetchMonth:async()=>{throw new AwardProviderError("RATE_LIMITED","Provider rate limit");}
  }]);
  assert.equal(result.status,"error");
  assert.equal(result.code,"RATE_LIMITED");
});
test("unsupported or cancelled jobs don't issue requests",async()=>{
  let calls=0;
  const p={id:"mock",programs:["ASIANA_CLUB"],fetchMonth:async()=>{calls++;throw Error("not expected");}};
  const unsupported=await runMonthlyEvidenceJob(job,[p]);
  assert.equal(unsupported.status,"unavailable");assert.equal(calls,0);
  const controller=new AbortController(); controller.abort();
  const cancelled=await runMonthlyEvidenceJob(job,[{...p,programs:["SKYPASS"]}],controller.signal);
  assert.equal(cancelled.code,"CANCELLED");assert.equal(calls,0);
});
test("third-party data cannot be mislabeled with different itinerary or program",async()=>{
  const result=await runMonthlyEvidenceJob(job,[provider({records:[{...row,program:"ASIANA_CLUB"}],coveredDates:["2027-04-10"],checkedAt})]);
  assert.equal(result.code,"INVALID_RESPONSE");
});
