# Codex 시작 지시문 — AirMile

기존 프로젝트 `https://github.com/asitiso/airmile`의 브랜치 `feature/verified-award-data-gate-20261026`에서 **기존 작업을 이어서 진행**하세요. 별도 프로젝트를 새로 만들지 마세요.

먼저 반드시 `CODEX_HANDOFF.md`, `docs/requirements-80-interviews.md`, `docs/live-availability-feasibility-2026-10-26.md`, `docs/CODEX_PROGRESS.md`와 실제 소스를 읽으세요. 루트 `AGENTS.md`는 과거 Grok Builder 환경 지침이므로 로컬 Windows Codex와 구별하세요.

1. 브랜치와 Git 변경 내역을 확인하세요. `npm ci`, `npm run typecheck`, `npm test`, `npm run build`을 실행하고 결과를 기록하세요.
2. 실제 대한항공 SKYPASS·아시아나/구 아시아나 마일리지 보너스 좌석을 **허용된 데이터 접근 방식으로** 월별 조회할 수 있는지 검증하세요. 인천→도쿄·뉴욕·파리의 첫 1개월 기준, 공식 좌석 화면과 날짜·좌석 등급·편명·정확성·첫 응답 시간을 비교하세요.
3. 기존 `src/lib/award-engine.ts`의 해시 기반 좌석/공제마일리지/세금은 **가상 데이터**입니다. 실제 좌석 검색 화면에 절대로 다시 연결하지 마세요. 좌석이 확인되지 않은 날짜는 `미조회`로 두고, 실제 발권 확인 상태와 공개 달력 표시는 분리하세요.
4. 실제 데이터 제공자 검증에 성공하면 기존 `VerifiedAwardDashboard`, `award-evidence.ts`, `search-planner.ts`를 재활용해 연결·통합하세요. 선택 날짜 ±3일 → 첫 1개월 먼저, 나머지는 빠른 초기 결과를 방해하지 않을 때만 조회하세요. 12개월 달력과 편도/일반왕복/기간왕복 및 전체 결과 접근 기능을 유지하세요.
5. 이어서 나머지 80개 인터뷰 확정 기능을 구현하고, 브라우저 QA와 성능 계측을 진행하세요.
6. 현재 PR #1의 개발 브랜치에 안전하게 커밋하고, `docs/CODEX_PROGRESS.md`에 수정 파일·실측 결과·미해결 이슈·다음 작업을 업데이트하세요. 검증 전 main 병합·기존 배포 교체·유료 결제·무단 계정 연결은 하지 마세요.

**업무 방식:** 계획만 작성하고 멈추지 말고, 허용된 범위에서 실제 코드를 수정하고 로컬 테스트를 수행하세요. 접근 권한/실제 데이터 공급자가 막히면 다른 독립 작업을 진행하되 허위 데이터로 완료 처리하지 마세요. 무엇을 실제로 검증했고 무엇이 미구현인지 분명하게 보고하세요.
