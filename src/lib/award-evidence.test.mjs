import assert from 'node:assert/strict';
import test from 'node:test';
import { parseAwardEvidence, buildEvidenceIndex, getDayEvidence, prioritizeDates } from './award-evidence.ts';
const base={sourceName:'대한항공 공개 달력',sourceUrl:'https://www.koreanair.com/booking/book-and-manage/award-seat-availability',checkedAt:'2026-10-26T10:00:00+09:00',origin:'ICN',destination:'JFK',departureDate:'2027-04-01',program:'SKYPASS',cabin:'BUSINESS',mark:'MARKED',evidenceOrigin:'OFFICIAL_PUBLIC_CALENDAR'};
test('public daily availability is not silently converted into remaining seat counts or miles',()=>{
 const parsed=parseAwardEvidence({records:[base]});
 assert.equal(parsed.rejected,0);
 const cell=getDayEvidence(parsed.records,'2027-04-01','ICN',['JFK'],'SKYPASS','BUSINESS');
 assert.equal(cell.status,'MARKED'); assert.equal(cell.flightCount,null);assert.equal(cell.minMiles,null);
});
test('no imported data is NOT_CHECKED instead of SOLD_OUT',()=>{
 assert.equal(getDayEvidence([],'2027-04-01','ICN',['JFK'],'SKYPASS','BUSINESS').status,'NOT_CHECKED');
});
test('validates provenance and rejects invalid numbers and HTTP links',()=>{
 const p=parseAwardEvidence({records:[{...base,sourceUrl:'http://x',milesPerPassenger:-99},base]});
 assert.equal(p.rejected,1); assert.equal(p.records.length,1);
});
test('dedupes repeated observations keeping latest and preserves programs',()=>{
 const earlier={...base,checkedAt:'2026-10-25T10:00:00+09:00',mark:'NOT_MARKED'};
 const p=parseAwardEvidence({records:[earlier,base,{...base,program:'LEGACY_ASIANA'}]});
 assert.equal(p.records.length,2);
 assert.equal(getDayEvidence(p.records,base.departureDate,'ICN',['JFK'],'SKYPASS','BUSINESS').status,'MARKED');
});
test('prioritizes chosen date and neighbors before remaining dates',()=>{
 const ordered=prioritizeDates('2026-11-15','2026-11-01',45);
 assert.deepEqual(ordered.slice(0,7),['2026-11-15','2026-11-16','2026-11-14','2026-11-17','2026-11-13','2026-11-18','2026-11-12']);
 assert.equal(new Set(ordered).size,45);
 assert.equal(ordered.length,45);
});

test("multi-city negative results remain partial until every destination has evidence",()=>{
  const partial=parseAwardEvidence({records:[{...base,mark:"NOT_MARKED"}]}).records;
  assert.equal(getDayEvidence(partial,"2027-04-01","ICN",["JFK","LAX"],"SKYPASS","BUSINESS").status,"PARTIAL");
  const full=parseAwardEvidence({records:[{...base,mark:"NOT_MARKED"},{...base,mark:"NOT_MARKED",destination:"LAX"}]}).records;
  assert.equal(getDayEvidence(full,"2027-04-01","ICN",["JFK","LAX"],"SKYPASS","BUSINESS").status,"NOT_MARKED");
});
test("unsupported Asiana first class never gets labeled sold out",()=>{
  assert.equal(getDayEvidence([],"2027-04-01","ICN",["JFK"],"ASIANA_CLUB","FIRST").status,"UNSUPPORTED");
  assert.equal(getDayEvidence([],"2027-04-01","ICN",["JFK"],"LEGACY_ASIANA","FIRST").status,"UNSUPPORTED");
  assert.equal(parseAwardEvidence({records:[{...base,program:"ASIANA_CLUB",cabin:"FIRST"}]}).rejected,1);
});

test("indexed calendar summary matches array lookups for every availability state",()=>{
 const rows=parseAwardEvidence({records:[
   base,
   {...base,destination:"LAX",mark:"NOT_MARKED"},
   {...base,departureDate:"2027-04-02",mark:"WAITLIST"},
   {...base,departureDate:"2027-04-03",mark:"NOT_MARKED"},
   {...base,departureDate:"2027-04-05",cabin:"ECONOMY",flightNumber:"KE081",milesPerPassenger:35000},
   {...base,departureDate:"2027-04-05",cabin:"ECONOMY",flightNumber:"KE085",milesPerPassenger:35500},
 ]}).records;
 const index=buildEvidenceIndex(rows);
 for(const date of ["2027-04-01","2027-04-02","2027-04-03","2027-04-04","2027-04-05"]){
  for(const cabin of ["BUSINESS","ECONOMY","FIRST"]){
   const args=[date,"ICN",["JFK","LAX"],"SKYPASS",cabin];
   assert.deepEqual(getDayEvidence(index,...args),getDayEvidence(rows,...args));
  }
 }
});
test("a marked destination does not conceal missing destination coverage",()=>{
 const row={...base,flightNumber:"KE081",milesPerPassenger:62500};
 const index=buildEvidenceIndex([row]);
 const cell=getDayEvidence(index,row.departureDate,"ICN",["JFK","LAX"],"SKYPASS","BUSINESS");
 assert.equal(cell.status,"MARKED");
 assert.equal(cell.partial,true);
 assert.equal(cell.checkedDestinations,1);
 assert.equal(cell.requestedDestinations,2);
 assert.equal(cell.flightCount,1);
 assert.equal(cell.minMiles,62500);
});
test("repeated destination inputs do not inflate coverage or counts",()=>{
 const index=buildEvidenceIndex([base]);
 const cell=getDayEvidence(index,base.departureDate,"ICN",["JFK","JFK"],"SKYPASS","BUSINESS");
 assert.equal(cell.partial,false);
 assert.equal(cell.checkedDestinations,1);
 assert.equal(cell.requestedDestinations,1);
 assert.equal(cell.evidenceCount,1);
});
test("independent destinations with the same flight number remain separate options",()=>{
 const index=buildEvidenceIndex([{...base,flightNumber:"KE081"},{...base,destination:"LAX",flightNumber:"KE081"}]);
 const cell=getDayEvidence(index,base.departureDate,"ICN",["JFK","LAX"],"SKYPASS","BUSINESS");
 assert.equal(cell.flightCount,2);
});
test("index construction retains only the latest observation per source",()=>{
 const old={...base,checkedAt:"2026-10-25T10:00:00+09:00",mark:"MARKED"};
 const newer={...base,mark:"NOT_MARKED"};
 const index=buildEvidenceIndex([old,newer]);
 const cell=getDayEvidence(index,base.departureDate,"ICN",["JFK"],"SKYPASS","BUSINESS");
 assert.equal(cell.status,"NOT_MARKED");
 assert.equal(cell.evidenceCount,1);
});
