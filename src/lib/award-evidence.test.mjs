import assert from 'node:assert/strict';
import test from 'node:test';
import { parseAwardEvidence, getDayEvidence, prioritizeDates } from './award-evidence.ts';
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