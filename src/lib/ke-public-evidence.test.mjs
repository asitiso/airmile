// @ts-nocheck -- runtime fixtures for the public-calendar converter.
import test from "node:test";
import assert from "node:assert/strict";
import {convertKoreanAirPublicCalendar,FILTER_NAMES} from "./ke-public-evidence.ts";

const month="2027-04",checkedAt="2026-10-28T02:00:00Z";
const baseDays=Array.from({length:30},(_,i)=>({day:i+1,label:String(i+1),markers:["일반석 보너스"],noSeat:false}));
function fixture(){
 return {origin:"ICN",destination:"JFK",month,title:"ICN → JFK",displayedMonth:"2027년 4월",
  filters:FILTER_NAMES.map(name=>({name,checked:true})),days:structuredClone(baseDays),checkedAt};
}
test("calendar produces no fabricated seat counts, flight numbers, prices or taxes",()=>{
 const v=convertKoreanAirPublicCalendar(fixture());
 assert.equal(v.metadata.coveredDates.length,30);assert.equal(v.records.length,60);
 assert.equal(v.records[0].mark,"MARKED");assert.equal(v.records[1].mark,"NOT_MARKED");
 for(const row of v.records){
  assert.equal(row.program,"SKYPASS");
  assert.equal(row.evidenceOrigin,"OFFICIAL_PUBLIC_CALENDAR");
  assert.ok(!("seats" in row));assert.ok(!("milesPerPassenger" in row));
  assert.ok(!("flightNumber" in row));assert.ok(!("taxAmount" in row));
 }
});
test("upgrade marker never counts as business award",()=>{
 const f=fixture();f.days[0].markers=["프레스티지석 좌석승급"];
 const v=convertKoreanAirPublicCalendar(f);
 assert.ok(v.records.filter(x=>x.departureDate==="2027-04-01").every(x=>x.mark==="NOT_MARKED"));
});
test("ambiguous first-class mark does not create false first-class award",()=>{
 const f=fixture();f.days[0].markers=["일등석 보너스/좌석승급"];
 const v=convertKoreanAirPublicCalendar(f);
 assert.deepEqual(v.metadata.ambiguousFirstClassDates,["2027-04-01"]);
 assert.equal(v.records.some(x=>x.cabin==="FIRST"&&x.mark==="MARKED"),false);
});
test("premium award is not silently mislabeled as business class",()=>{
 const f=fixture();f.days[0].markers=["프리미엄석 보너스"];
 const v=convertKoreanAirPublicCalendar(f);
 assert.deepEqual(v.metadata.unsupportedPremiumDates,["2027-04-01"]);
 assert.equal(v.records[1].mark,"NOT_MARKED");
});
test("explicit no-seat marker counts as observed no public marking, not missing",()=>{
 const f=fixture();f.days[4]={day:5,label:"5",markers:[],noSeat:true};
 const v=convertKoreanAirPublicCalendar(f);
 const rows=v.records.filter(x=>x.departureDate==="2027-04-05");
 assert.equal(rows.length,3);assert.ok(rows.every(x=>x.mark==="NOT_MARKED"));
});
test("rejects wrong route or month, missing dates, unchecked filters",()=>{
 for(const mutate of [x=>x.title="ICN → LAX",x=>x.displayedMonth="2027년 5월",
  x=>x.days.pop(),x=>x.filters[0].checked=false]){
  const f=fixture();mutate(f);
  assert.throws(()=>convertKoreanAirPublicCalendar(f));
 }
});
test("rejects unknown, duplicate and missing seat indicator shapes",()=>{
 for(const markers of [["unknown"],["일반석 보너스","일반석 보너스"],[]]){
  const f=fixture();f.days[3].markers=markers;
  assert.throws(()=>convertKoreanAirPublicCalendar(f));
 }
});
test("refuses duplicated calendar day and unexpected other-airline result",()=>{
 const f=fixture();f.days[3].day=3;assert.throws(()=>convertKoreanAirPublicCalendar(f));
});
