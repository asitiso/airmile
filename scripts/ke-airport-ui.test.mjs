import assert from 'node:assert/strict';
import { test, before, after } from 'node:test';
import { chromium } from 'playwright';
import { selectAirport } from './ke-airport-ui.mjs';
let browser;
before(async () => {
  browser = await chromium.launch(process.env.AIRMILE_CHROME_PATH
    ? { executablePath: process.env.AIRMILE_CHROME_PATH, headless: true }
    : { channel: 'chrome', headless: true });
});
after(async () => { await browser?.close(); });
// Synthetic accessibility fixture. Not a captured official airline result.
async function fixture(page, destination = false) {
  const button = destination ? 'To 도착지' : 'From 출발지';
  const input = destination ? '도착지 검색' : '출발지 검색';
  const code = destination ? 'JFK' : 'ICN';
  await page.setContent(`<button id="open">${button}</button>
    <input id="query" role="combobox" aria-label="${input}" hidden>
    <ul role="listbox" id="choices"></ul><output id="chosen"></output>
    <script>
      document.querySelector('#open').onclick=()=>document.querySelector('#query').hidden=false;
      document.querySelector('#query').oninput=e=>{
        document.querySelector('#choices').innerHTML=e.target.value==='${code}'
          ? '<li role="option" aria-label="${code} Airport"><span>공항 이름만 보이는 항목</span></li>' : '';
        const option=document.querySelector('[role=option]');
        if(option)option.onclick=()=>document.querySelector('#chosen').textContent='${code}';
      };
    </script>`);
}
test('selects an airport by accessible IATA name even when inner text has no code', async () => {
  const page=await browser.newPage();
  try { await fixture(page); await selectAirport(page,'ICN',true);
    assert.equal(await page.locator('#chosen').textContent(),'ICN');
  } finally { await page.close(); }
});
test('destination uses the same accessible-name selection contract', async () => {
  const page=await browser.newPage();
  try { await fixture(page,true); await selectAirport(page,'JFK',false);
    assert.equal(await page.locator('#chosen').textContent(),'JFK');
  } finally { await page.close(); }
});
