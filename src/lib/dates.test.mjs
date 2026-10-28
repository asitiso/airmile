// @ts-nocheck -- standalone Node boundary cases
import assert from "node:assert/strict";
import test from "node:test";
import {visibleYearMonths} from "./dates.ts";
test("default selected month shows exactly 12 calendar months",()=>{
 const m=visibleYearMonths("2026-10-28","2026-10-28","2027-10-22");
 assert.equal(m.length,12);
 assert.equal(m[0],"2026-10");
 assert.equal(m.at(-1),"2027-09");
});
test("far future selection never shows months after the booking horizon",()=>{
 const m=visibleYearMonths("2027-10-12","2026-10-28","2027-10-22");
 assert.equal(m.length,12);
 assert.equal(m[0],"2026-11");
 assert.equal(m.at(-1),"2027-10");
 assert.ok(m.includes("2027-10"));
});
test("an intermediate selection remains inside the 12-month window",()=>{
 const m=visibleYearMonths("2027-05-02","2026-10-28","2027-10-22");
 assert.ok(m.includes("2027-05"));
 assert.equal(new Set(m).size,12);
});
