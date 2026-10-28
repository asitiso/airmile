/** One anonymous public-UI observation, never a background inventory provider. */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const query = { origin: 'ICN', destination: 'NRT', month: '2026-11' };
const url = 'https://flyasiana.com/I/KR/KO/MileageSeatSearch.do';
const started = performance.now();
const browser = await chromium.launch({ channel: 'chrome', headless: false });
const context = await browser.newContext({locale:'ko-KR',timezoneId:'Asia/Seoul',viewport:{width:1440,height:1080}});
const page = await context.newPage();
page.setDefaultTimeout(12000);
let stage = 'navigation', failure = null, notify;
const errors = [], failedRequests = [];
const restriction = new Promise(resolve => { notify = resolve; });
const firstParty = host => host === 'flyasiana.com' || host.endsWith('.flyasiana.com');
page.on('response', response => {
  const host = new URL(response.url()).hostname;
  if (firstParty(host) && [401,403,429].includes(response.status()) && !failure) {
    failure = Object.assign(new Error('First-party access restriction'), {code:'ACCESS_RESTRICTED',status:response.status(),stage});
    notify(failure);
  }
});
page.on('pageerror', error => { if(errors.length<5)errors.push(String(error.message).slice(0,400)); });
page.on('requestfailed', request => {
  const u=new URL(request.url());
  if(firstParty(u.hostname)&&failedRequests.length<5)failedRequests.push({path:u.pathname,error:request.failure()?.errorText});
});
let dialogMessage = '';
page.on('dialog', async dialog => {dialogMessage=dialog.message().slice(0,400);await dialog.dismiss();});
async function check() {
  if (failure) throw failure;
  const text=await page.locator('body').innerText({timeout:2500});
  if (/access denied|접근이 차단|접속이 차단|보안 문자|자동입력 방지|verify you are human|captcha/i.test(text))
    throw Object.assign(new Error('Visible access restriction'),{code:'USER_ACTION_REQUIRED'});
  if (/viewLogin|\/login/i.test(new URL(page.url()).pathname))throw Object.assign(new Error('Authentication required'),{code:'AUTH_REQUIRED'});
  return text;
}
async function observe() {
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:35000});await check();
  stage='one-way';await page.getByRole('link',{name:'편도',exact:true}).click();
  stage='origin';await page.locator('#txtDepartureAirport1.ui-autocomplete-input').waitFor();
  await page.locator('#txtDepartureAirport1').fill('');
  await page.locator('#txtDepartureAirport1').pressSequentially(query.origin,{delay:80});
  await page.locator('#divDepAirportAC1 li').filter({hasText:/\bICN\b/}).click();await check();
  stage='destination';await page.locator('#txtArrivalAirport1.ui-autocomplete-input').waitFor();
  await page.locator('#txtArrivalAirport1').fill('');
  await page.locator('#txtArrivalAirport1').pressSequentially(query.destination,{delay:80});
  await page.locator('#divArrAirportAC1 li').filter({hasText:/\bNRT\b/}).click();
  if(await page.locator('#departureAirport1').inputValue()!==query.origin||await page.locator('#arrivalAirport1').inputValue()!==query.destination)throw Error('QUERY_MISMATCH');
  await check();stage='month';await page.locator('#sCalendarMonth').click();
  await page.locator('.month_btn[data-year="2026"][data-month="11"]').click();
  stage='search';const searchStarted=performance.now();await page.locator('#btn_MileageSeat_search').click();
  await page.locator('#depCalendar a[id^="cal_"]').first().waitFor({state:'attached',timeout:25000});
  const body=await check();if(dialogMessage)throw Error('PUBLIC_DIALOG: '+dialogMessage);
  stage='capture';const heading=await page.locator('#depCalendar h2').innerText();
  if(!heading.includes('2026년')||!heading.includes('11월'))throw Error('MONTH_MISMATCH');
  const cells=await page.locator('#depCalendar a[id^="cal_"]').evaluateAll(nodes=>nodes.map(node=>({
    date:node.getAttribute('data-date'),economy:node.getAttribute('data-economy'),business:node.getAttribute('data-business'),text:node.textContent?.trim()
  })));
  const sourceLabel=body.match(/좌석 상황은 대한민국 시간\s*\(([^)]+)\)/)?.[1]??null;
  const observation={kind:'UNVALIDATED_PUBLIC_BROWSER_OBSERVATION',query,sourceUrl:url,checkedAt:new Date().toISOString(),sourceLabel,heading,
    timings:{totalMs:Math.round(performance.now()-started),searchAndReadMs:Math.round(performance.now()-searchStarted)},cells};
  await writeFile('probe-results/oz-observation.json',JSON.stringify(observation,null,2));
  console.log(JSON.stringify({status:'OBSERVED_NOT_BOOKING_VERIFIED',...query,sourceLabel,heading,dates:cells.length,timings:observation.timings,sample:cells.slice(0,1)}));
}
await mkdir('probe-results',{recursive:true});
try {
  await Promise.race([restriction.then(error=>{throw error;}),observe()]);
} catch(error) {
  // Inspect only public route inputs on the anonymous search page. No cookies,
  // profile data, response bodies or query-string tokens are saved.
  let form=null;
  if(!failure&&new URL(page.url()).pathname==='/I/KR/KO/MileageSeatSearch.do') {
    form=await page.evaluate(()=>({
      inputs:['txtDepartureAirport1','txtArrivalAirport1','departureAirport1','arrivalAirport1'].map(id=>{
        const e=document.getElementById(id);return e?{id,cls:e.className,value:e.value,visible:Boolean(e.getClientRects().length),disabled:e.disabled,readOnly:e.readOnly}: {id,missing:true};
      }),
      suggestions:['divDepAirportAC1','divArrAirportAC1'].map(id=>({id,text:document.getElementById(id)?.innerText?.slice(0,500)}))
    })).catch(()=>null);
  }
  const report={status:'FAILED_NO_INVENTORY',query,stage,code:failure?.code??error.code??'UI_ERROR',httpStatus:failure?.status??null,
    message:failure?.message??String(error.message).slice(0,1000),elapsedMs:Math.round(performance.now()-started),form,errors,failedRequests,dialogMessage};
  console.error(JSON.stringify(report));await writeFile('probe-results/oz-failure.json',JSON.stringify(report,null,2));process.exitCode=1;
} finally { await browser.close(); }
