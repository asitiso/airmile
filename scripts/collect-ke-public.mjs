/**
 * One-click-equivalent local Chrome helper: ONE public month per explicit CLI run.
 * Not a continuous collector. Uses only visible UI actions and never authenticates,
 * replays private APIs, copies cookies, solves CAPTCHAs, or simulates inventory.
 *
 * npm run collect:ke -- ICN JFK 2027-04
 */
import {chromium} from "playwright";
import {mkdir,writeFile,readFile,stat} from "node:fs/promises";
import {resolve} from "node:path";
import {convertKoreanAirPublicCalendar,FILTER_NAMES,PUBLIC_KE_URL} from "../src/lib/ke-public-evidence.ts";

function config(args){
 if(args.length!==3 && (args.length!==4 || args[3]!=="--refresh"))throw Error("사용법: npm run collect:ke -- ICN JFK 2027-04 [--refresh]");
 const [origin,destination,month]=[args[0].toUpperCase(),args[1].toUpperCase(),args[2]];
 if(!/^[A-Z]{3}$/.test(origin)||!/^[A-Z]{3}$/.test(destination)||origin===destination)
  throw Error("서로 다른 IATA 공항 코드가 필요합니다.");
 if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))throw Error("월은 YYYY-MM 형식이어야 합니다.");
 const now=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
 const max=new Date(Date.parse(now+"T00:00:00Z")+359*86400000).toISOString().slice(0,10);
 if(month<now.slice(0,7)||month>max.slice(0,7))throw Error("현재 공개 달력의 360일 범위를 벗어난 월입니다.");
 return {origin,destination,month,refresh:args[3]==="--refresh"};
}
function sourceTimestamp(text){
 const m=text.match(/좌석 상황은 대한민국 시간\s*\(\s*(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일\s*(\d{1,2}):(\d{2})\s*\)\s*기준/u);
 if(!m)return null;
 const s=m[1]+"-"+m[2].padStart(2,"0")+"-"+m[3].padStart(2,"0")+"T"+m[4].padStart(2,"0")+":"+m[5]+":00+09:00";
 return Number.isFinite(Date.parse(s))?s:null;
}
async function checkAccess(page,blocked){
 if(blocked.status)throw Error("항공사 접근 제한 "+blocked.status+": 자동 재시도 없이 종료합니다.");
 const text=await page.locator("body").innerText({timeout:3500}).catch(()=>"");
 if(/access denied|접근이 차단|접속이 차단|보안 문자|자동입력 방지|로봇이 아님|verify you are human|captcha/i.test(text))
  throw Error("보안 확인 또는 접근 제한을 감지하여 조회를 중단했습니다.");
 return text;
}
async function selectAirport(page,code,from){
 const label=from?"출발지 검색":"도착지 검색";
 await page.getByRole("button",{name:from?"From 출발지":"To 도착지",exact:true}).click();
 const input=page.getByRole("combobox",{name:label});
 await input.fill("");
 await input.pressSequentially(code,{delay:70});
 const option=page.getByRole("option").filter({hasText:new RegExp("\\b"+code+"\\b")}).first();
 await option.waitFor({state:"visible",timeout:10000});
 await option.click();
}
async function captureOneMonth(){
 const {origin,destination,month,refresh}=config(process.argv.slice(2));
 const dir=resolve(process.cwd(),"data","official-calendar");
 const filename="ke-"+origin+"-"+destination+"-"+month+".json";
 const filepath=resolve(dir,filename);
 if(!refresh){
  try{
   const file=await stat(filepath);
   if(Date.now()-file.mtimeMs<12*3600*1000){
    const previous=JSON.parse(await readFile(filepath,"utf8"));
    if(Array.isArray(previous.records)&&previous.records.length>0&&previous.records.every(r=>
      r.origin===origin&&r.destination===destination&&r.program==="SKYPASS"&&
      typeof r.departureDate==="string"&&r.departureDate.startsWith(month+"-"))){
     console.log("최근 12시간 이내 저장된 공개 달력 자료 재사용: data/official-calendar/"+filename);
     console.log("새 조회가 필요하면 명령 끝에 --refresh를 추가하세요.");
     return;
    }
   }
  }catch{/* missing or corrupt cache: perform one explicit live lookup */}
 }
 console.log("대한항공 공개 달력 조회: "+origin+" → "+destination+" / "+month);
 console.log("실시간 예약 가능 좌석 수가 아닌 공개 달력 표식만 수집합니다.");
 const browser=await chromium.launch({channel:"chrome",headless:false});
 const context=await browser.newContext({locale:"ko-KR",timezoneId:"Asia/Seoul",viewport:{width:1440,height:1050}});
 const page=await context.newPage();
 page.setDefaultTimeout(15000);
 const blocked={status:null};
 page.on("response",r=>{
  try{
   const host=new URL(r.url()).hostname;
   if((host==="koreanair.com"||host.endsWith(".koreanair.com"))&&[401,403,429].includes(r.status()))blocked.status=r.status();
  }catch{}
 });
 try {
  await page.goto(PUBLIC_KE_URL,{waitUntil:"domcontentloaded",timeout:45000});
  await page.locator("#bonusTripTypeLabel_OW").waitFor({state:"attached",timeout:30000});
  const consent=page.getByRole("button",{name:"필수 쿠키만 허용",exact:true});
  if(await consent.isVisible().catch(()=>false))await consent.click();
  await checkAccess(page,blocked);
  await page.locator("#bonusTripTypeLabel_OW").click();
  if(!await page.locator("#bonusTripType_OW").isChecked())throw Error("편도 조건 선택 실패");
  await selectAirport(page,origin,true);
  await selectAirport(page,destination,false);
  await page.locator("#seatCalendarBtn").click();
  const [year,mm]=month.split("-");
  await page.getByRole("group",{name:year,exact:true})
    .getByRole("button",{name:Number(mm)+"월",exact:true}).click();
  await page.getByRole("button",{name:"선택",exact:true}).click();
  await checkAccess(page,blocked);
  await page.getByRole("button",{name:"조회",exact:true}).click();
  const dialog=page.locator('[role="dialog"][aria-labelledby="modals-travelCalendar-title"]');
  await dialog.locator('#bonusCalendarTableWrapEl tbody td[id^="day_"]').first().waitFor({timeout:30000});
  const body=await checkAccess(page,blocked);
  await dialog.locator("#bonusFilterBtn").click();
  const filter=page.getByRole("dialog",{name:"보너스 좌석 필터",exact:true});
  const filters=[];
  for(const name of FILTER_NAMES){
   const box=filter.getByRole("checkbox",{name,exact:true});
   filters.push({name,checked:(await box.count())===1&&await box.isChecked()});
  }
  if(await filter.getByRole("checkbox").count()!==FILTER_NAMES.length||filters.some(f=>!f.checked))
   throw Error("공식 달력 필터가 전부 선택되지 않아 중단합니다.");
  await filter.getByRole("button",{name:"닫기",exact:true}).click();
  const raw=await dialog.evaluate(el=>{
   const title=el.querySelector("#modals-travelCalendar-title")?.textContent||"";
   const displayedMonth=el.querySelector("#travelCalendarListBtn")?.textContent||"";
   const table=el.querySelector("#bonusCalendarTableWrapEl table.bonus-calendar__table");
   if(!table||!table.querySelector("tbody"))throw Error("달력 구조 변경");
   const days=[...table.querySelectorAll("tbody td")].map(td=>{
    const id=td.getAttribute("id");
    if(!id){
     if(td.getAttribute("aria-hidden")!=="true"||td.textContent?.trim()||td.children.length)throw Error("확인되지 않은 달력 빈 칸");
     return null;
    }
    const hit=/^day_(\d{1,2})$/.exec(id);
    if(!hit)throw Error("날짜 셀 구조 변경");
    const noSeatEl=td.querySelector(".bonus-calendar__day > span.ux-class-icon.-no-seat.-gray");
    if(noSeatEl&&noSeatEl.textContent?.replace(/\s+/g," ").trim()!=="좌석 없음")throw Error("좌석 없음 표시 구조 변경");
    return {day:Number(hit[1]),label:td.querySelector('.bonus-calendar__day > span[aria-hidden="true"]')?.textContent?.trim()||"",
     markers:[...td.querySelectorAll(".bonus-calendar__icons li")].map(li=>li.textContent?.replace(/\s+/g," ").trim()||""),
     noSeat:Boolean(noSeatEl)};
   }).filter(Boolean);
   return {title,displayedMonth,days};
  });
  const output=convertKoreanAirPublicCalendar({...raw,filters,origin,destination,month,
   checkedAt:new Date().toISOString(),sourceAsOf:sourceTimestamp(body)});
  await mkdir(dir,{recursive:true});
  await writeFile(filepath,JSON.stringify({records:output.records},null,2),"utf8");
  console.log("저장: data/official-calendar/"+filename);
  console.log("수집한 날짜 "+output.metadata.coveredDates.length+"일; 일등석 혼합 표시 "+output.metadata.ambiguousFirstClassDates.length+"일.");
  console.log("웹앱의 'JSON 가져오기' 버튼에서 파일을 선택하세요. 발권 전 공식 예약 확인 필수.");
 } finally {await browser.close();}
}
captureOneMonth().catch(e=>{console.error("조회 실패:",e instanceof Error?e.message:String(e));process.exitCode=1;});
