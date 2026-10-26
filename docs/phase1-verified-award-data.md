# AirMile 1단계 — 검증 자료 달력 (안전한 개발 브랜치)

## 현재 구현·검증된 범위

- 데이터 출처, 확인 시각, 항공편 번호(선택), 등급, 마일리지 프로그램을 가진 JSON만 수동 반입
- 12개월 보기 + 7열 상세 달력, PC 2열 왕복 달력 / 모바일 탭·가로 스크롤
- 출발지, 목적지 10개까지 추가, 편도·일반 왕복·기간 왕복 UI
- 공개 달력의 **좌석 표시 여부**와 **실시간 발권 가능/실제 잔여 좌석 수**를 구분
- 조회되지 않은 날을 `매진`이 아니라 `미조회`로 표기
- 조회 출처·확인 시각·좌석 등급이 다른 자료는 보존하고 동일 출처 중복만 제거
- 좌석 표시된 날짜 ±3일을 우선하는 날짜 조회 계획 함수
- 검증 테스트 5종 (명령: `node --experimental-strip-types --test award-evidence.test.mjs`)

## 사용 방법 (기존 GitHub `asitiso/airmile` 코드에 통합)

1. `award-evidence.ts`를 `src/lib/award-evidence.ts`에 복사
2. `verified-award-dashboard.tsx`를 `src/components/verified-award-dashboard.tsx`에 복사
3. `src/routes/index.tsx`에서 기존 `Finder` import를 다음으로 변경:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { VerifiedAwardDashboard } from '@/components/verified-award-dashboard';
export const Route = createFileRoute('/')({ component: VerifiedAwardDashboard });
```

4. `npm run typecheck`, `npm run build`, 실제 브라우저 테스트로 검증 후 배포

## **제한과 미구현**

- 항공사 공식 사이트에서 **실시간 자동 수집하지 않습니다**. 자동 로그인·자동 검색·알림·지속 서버 검색 작업도 연결되지 않았습니다.
- 출처가 기록된 JSON을 **사용자가 반입**할 때만 실제 확인 자료가 나타납니다. JSON의 진위까지 인증할 수는 없습니다.
- 수동 반입 자료는 해당 브라우저 localStorage에만 저장됩니다. 구글 로그인·기기 간 동기화/DB는 미연결입니다.
- 왕복 조합 표시와 연간 달력 표시 일부 고급 기능은 현재 기능검증용 구현입니다.
- 기존 `src/lib/award-engine.ts`가 생성하는 수치(잔여석/항공편/세금)는 **가상 값**이므로 새 화면에 절대로 연결하지 마세요.
- 보너스 좌석 공개 캘린더의 표시가 실제 발권 가능을 보장하지 않습니다. 각 날짜·탑승 인원을 공식 항공사 화면에서 최종 확인해야 합니다.

## JSON 구조

```json
{
  "records": []
}
```

검증 자료를 확보한 경우에만 예를 들어 아래 구조로 추가합니다. 아래는 **데이터 형식 설명용**이며 실제 좌석이 존재한다는 의미가 아닙니다.

```json
{
  "records": [{
    "sourceName": "공식 공개 달력에서 확인한 자료의 출처명",
    "sourceUrl": "https://www.koreanair.com/",
    "checkedAt": "2026-10-26T05:00:00Z",
    "origin": "ICN",
    "destination": "JFK",
    "departureDate": "2027-03-20",
    "program": "SKYPASS",
    "cabin": "BUSINESS",
    "mark": "MARKED",
    "evidenceOrigin": "OFFICIAL_PUBLIC_CALENDAR",
    "note": "형식 설명을 위한 예시. 발권 가능/잔여석 수는 미확인."
  }]
}
```

가능한 상태: `MARKED` / `NOT_MARKED` / `WAITLIST`. 공개 캘린더에 좌석 표시가 있더라도 남은 좌석 **수**는 추정해서 넣지 않습니다. 공식 조회가 안 된 날은 기록을 만들지 않습니다.

## 2단계 — 조회 우선순위 엔진 및 달력 정확성 개선 (2026-10-26)

- [x] 조회 대상 노선 × 프로그램 × 월 단위로 중복 없는 계획을 구성하는 순수 함수 \`buildMonthlySearchPlan\` 추가
- [x] 클릭한 달 최우선 → 선택 날짜 주변(±3일) → 첫 30일 → 요청 기간(1/3/6/12개월) → 나머지 배경 작업 순서
- [x] 선택한 목적지 최대 10개, 공항 코드·날짜·조회 지평 검증, 서로 다른 목적지를 골고루 처리하는 작업 순서
- [x] 제공자별 동시 실행 한도, 인증 만료·조회 제한 시 다른 제공자는 정상 진행, 후순위 일시정지, 10초 초과 시 후순위 대기
- [x] 메인 화면에 접기 가능한 **조회 계획 진단 패널** 추가: 1·3·6·12개월 선택, 우선 달 변경, 후순위 제외
- [x] 일부 목적지만 확인된 날짜는 \`일부 목적지 미조회\`, 아시아나/구 아시아나 일등석은 \`미운영\`으로 표시
- [x] 기존 5개 검증 자료 테스트 + 새로운 정확성 2개 + 조회 계획 9개 단위 테스트(로컬 총 16개 통과)
- [ ] 실제 항공사로 자동 조회 요청 수행, 제공자 토큰·허용량 확인, 재시도 및 서버 작업 영속화
- [ ] 2초/10초 목표 실제 측정, 클라우드/모바일 E2E 테스트, 구글 계정 제한과 데이터 동기화

**중요:** 현재 조회 계획은 계산만 수행하며 실제 항공사 서버에 요청하지 않는다. 사용자 반입 JSON의 \`sourceName\`과 \`evidenceOrigin\`도 임의 작성 가능하므로 공식 인증된 기록으로 신뢰할 수 없다. 최종 구매 전 항공사 공식 화면의 발권 가능 여부와 금액을 확인해야 한다.

실행: \`node --experimental-strip-types --test src/lib/award-evidence.test.mjs src/lib/search-planner.test.mjs\`.
