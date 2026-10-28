# AirMile: 대한항공 공개 좌석 달력 — 1회 로컬 조회 실험

**상태: 새 코드 및 오프라인 파서 테스트 완료 / 대한항공 현재 운영 화면 실제 실행 검증 전.** 자동 백그라운드 검색이나 서버 조회가 아닙니다.

## 무엇이 달라졌나?

종전 앱은 출처형 JSON을 사용자가 직접 준비해야 했습니다. 이 도구는 Windows 또는 macOS에서 사용자가 명령을 1회 실행하면, 설치된 Chrome을 열고 대한항공 공개 보너스 달력에서 **선택한 노선의 월 1개**를 조회해 앱에서 바로 반입할 수 있는 JSON 파일을 만듭니다. 로그인·예약·결제는 하지 않습니다.

이 기능은 사용자의 명시적 실행에 한정되고 12개월 일괄 자동 수집·정기 예약 조회·비공개 API 호출·접근 제한 우회 기능을 포함하지 않습니다. 해당 항공사 사이트의 자동화 정책 및 사용 허용 범위는 별도 검토가 필요하며, 운영 승인을 뜻하지 않습니다.

## 사용법

Windows Codex 또는 터미널에서 **기존 작업 브랜치**에 접속한 뒤:

```powershell
git switch feature/verified-award-data-gate-20261026
git pull --ff-only
npm ci
npm run collect:ke -- ICN JFK 2027-04
```

- 컴퓨터에 Google Chrome이 설치되어 있어야 합니다. 서버/휴대폰에서는 실행되지 않습니다.
- `ICN JFK 2027-04`는 실행 형식 예시입니다. 실제 검색 시 조회 가능한 360일 범위 안에서 다른 월을 지정합니다.
- 정상 조회되면 `data/official-calendar/ke-ICN-JFK-2027-04.json` 파일이 생성됩니다.
- 동일 노선·월에 12시간 이내 저장한 자료가 있으면 새 조회 없이 재사용합니다. 최신 공개 달력이 필요하면 `npm run collect:ke -- ICN JFK 2027-04 --refresh`로 명시적으로 새 조회합니다.
- 앱을 로컬로 실행(`npm run dev`)하거나 연결된 개인 웹앱에서 **JSON 가져오기**를 눌러 해당 파일을 선택합니다.
- 오류가 발생하면 파일을 덮어쓰지 않습니다. CAPTCHA, 403/429, 미확인 필터·날짜 구조, 다른 노선이 표시되면 즉시 실패 처리합니다.

## 데이터에 대한 제한

- 제공하는 것은 **공개 달력에서 보너스 좌석 아이콘이 표시되었는지**입니다. 실제 현재 예약 가능한 좌석 수, 선택 인원 전원 발권 가능 여부, 최신 마일리지 공제, 세금, 편명은 추정하거나 저장하지 않습니다.
- '프레스티지석 좌석승급'을 '프레스티지 보너스'로 잘못 분류하지 않습니다.
- '일등석 보너스/좌석승급'은 합성 표식이므로 일등석 보너스가 확인된 것으로 간주하지 않고, 날짜 목록을 메타데이터 수준에서 보고합니다.
- '프리미엄석 보너스'는 기존 앱의 Y/J/F 구분에 프리미엄 객실이 없으므로 임의로 비즈니스로 변환하지 않고, 별도 지원이 필요한 상태로 남겨 둡니다.
- 빈 날짜 셀, 알 수 없는 표식, 비활성 필터, 불완전한 월은 추정하지 않고 실패 처리합니다.
- 날짜마다 좌석을 다시 조회하는 방식이 아니라 공식 웹 UI에서 월 한 번 조회하는 방식입니다. **실제 속도는 항공사 사이트와 Chrome에 따라 달라지며 10초 목표 달성을 보장하지 않습니다.**

## 개발자 확인 작업

```bash
node --experimental-strip-types --test src/lib/ke-public-evidence.test.mjs
npm run typecheck
npm test
npm run build:dev
```

현재 외부 계정/쿠키/API 비밀정보를 수집·저장하지 않습니다. `data/official-calendar/`는 `.gitignore`에 포함되어 있습니다.

### 참고 자료
- 대한항공 공식 공개 달력: https://www.koreanair.com/booking/book-and-manage/award-seat-availability
- 2026년 9월 브라우저 화면 관찰 및 파싱 연구(독립 구현 사례): https://github.com/we-insub/Korean_air/blob/main/docs/koreanair-public-flow.md
- 2026년 9월 공식 정보 이용·수집 정책 조사(독립 구현 사례): https://github.com/we-insub/Korean_air/blob/main/docs/policy-research.md

이 도구는 공개 DOM 관찰을 참고해 별도 구현했습니다. 해당 오픈소스의 내부 세션·쿠키·네트워크 요청 재현 코드를 가져오지 않았습니다.
