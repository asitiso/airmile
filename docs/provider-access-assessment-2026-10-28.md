# 외부 데이터 경로 재검증 — 2026-10-28

## 결정

대한항공·아시아나 서버의 기존 403 경로는 재시도하지 않았다. **AwardWallet Flight Award Search API를 시험 이용 문의 후보로 선정**했다. 채택·결제·계정 연결 결정은 아니다. 80개 인터뷰와 클라우드 최종 목표를 바꾸지 않는다.

## 공개 문서에서 확인한 것 / 아직 모르는 것

| 대상 | 공개 문서 근거 | 현재 판정 |
|---|---|---|
| AwardWallet | Flight Award Search API의 공급자 예시에 `korean / Korean Air (SkyPass)`가 있다. | 자체 SKYPASS 후보. 현재 가용성은 인증된 목록과 실제 조회로 확인해야 함. |
| AwardWallet 달력 | 예시 `priceCalendar.cabins`에 business가 빠져 있다. | 비즈니스 일별 조회도 불가능하다는 뜻은 아님. 월별 지원 별도 확인. |
| 아시아나 | 읽은 예시 목록에서 자체 Asiana Club 지원을 확인하지 못했다. | 지원·미지원 어느 쪽도 확정하지 않음. 코드명 추측 금지. |
| 인증 | API 인증과 항공사 계정 인증은 다르다. 읽기 문서/검색 색인에서 `loginRequired`와 `authMode` 표현이 달랐다. | 계정 제공 없이 가능하다고 가정하지 않음. 오래된 형식은 검토 필요 상태. |
| 비용·시험 | 제공자는 가격과 시험 접근을 문의하라고 안내한다. | 가격 미확인. Plus 구독 가격을 API 가격으로 대체하지 않음. |
| AwardFares | 공개 프로그램 목록에 자체 SKYPASS/Asiana Club이 없다. | KE/OZ 운항편 검색을 자체 마일리지 재고로 대체하지 않음. |
| Award Travel Finder | 대한항공 페이지가 SKYPASS 로그인 자동화 제한을 설명한다. | 마케팅상의 항공사 이름만으로 채택하지 않음. |

문서상 API 존재는 항공사의 제휴 승인, 당장 쓸 수 있는 API 키, 오늘의 좌석, 속도 목표 달성 또는 모든 항공편 제공을 증명하지 않는다. 가입/결제/항공사 비밀번호 전송 없이 확인 가능한 범위까지만 진행했다.

## 구현: 최소 메타데이터 점검

파일: `scripts/check-awardwallet.mjs`, 테스트: `scripts/check-awardwallet.test.mjs`.

기본 실행은 네트워크를 사용하지 않는다:

```sh
node scripts/check-awardwallet.mjs
```

결과: `NOT_REQUESTED`, `inventoryVerified:false`, `searchExecuted:false`.

사용 허용 범위와 비용이 확인된 **AwardWallet API 시험 자격증명**을 별도 승인받은 뒤에만, 로컬 비밀 환경변수 `AWARDWALLET_API_USER`, `AWARDWALLET_API_PASSWORD`, `AWARDWALLET_API_ACCESS_APPROVED=1`을 설정하고 다음 명령을 사용한다. 항공사 아이디/비밀번호를 넣는 칸이 아니다. 키를 채팅·GitHub·셸 명령 기록에 붙여넣지 않는다.

```sh
node scripts/check-awardwallet.mjs --live
```

정확히 `GET https://ra.awardwallet.com/v1/providers/list` 한 번만 허용한다. `/search` 호출, 자동 재시도, 리디렉션, 항공사 로그인, 좌석 생성 기능은 없다. 시간 상한 10초, 응답 상한 256KiB. 오류 응답 본문과 인증값을 출력하지 않는다. `METADATA_RECEIVED`도 좌석 취득 성공이 아니다.

아시아나와 유사한 명칭은 후보 개수만 표시하고 프로그램을 자동 연결하지 않는다. 알려지지 않은 인증 방식은 검토 필요로 남긴다. 조회 클래스가 누락돼도 실제 매진으로 표시하지 않는다.

## 실제 실행 및 다음 관문

- 새 기능 테스트: 스켈레톤에서 14개 중 13개 실패 → 구현 후 14개 전부 통과. 모두 합성 응답/오프라인 테스트.
- 기본 실행과 승인 없는 `--live`의 차단을 실제 실행 확인. 외부 API 요청 0건, 좌석 취득 0건.
- 전체 저장소 검증은 변경 커밋의 GitHub Actions 결과를 확인한다. 이 파일은 단위 테스트를 실좌석 연결 성공으로 표현하지 않는다.
- 문의 초안: `docs/awardwallet-access-request.md`. **미발송**.
- 다음 진행에 필요한 외부 의존성: 공급자 답변 + 승인된 시험 API 자격증명. 그 전에는 어댑터/계정 저장/유료 검색을 추가하지 않는다.

## 근거 URL

2026-10-28 웹 도구로 확인. 검색 색인과 열기 응답에 갱신 시점 차이가 있어 공개 예시는 현재 인증 API 응답과 구별했다.

- https://awardwallet.com/api/flight-award-search
- https://awardwallet.com/api/main
- https://awardfares.com/Programs
- https://awardtravelfinder.com/airlines/korean-air

## 노력 대비 효과

실제 사용 가능한 공급자라면 항공사별 화면 선택자를 계속 고치는 작업을 줄일 수 있다. 그러나 자체 프로그램·비즈니스 달력·무비밀번호 처리·가격 중 핵심 조건을 충족하지 못하면 도입하지 않는다. 이번 변경은 의존성 추가 없이 지원 범위를 먼저 거르는 작은 도구이며 기존 UI/배포/80개 요구사항은 그대로다.
