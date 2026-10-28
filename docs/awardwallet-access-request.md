# API 시험 접근 문의 초안 — 미발송

발송·회원가입·유료 승인 없음. 연락처는 공식 API 페이지의 Contact Us 경로로 확인한다. API 키 또는 항공사 계정 정보는 이 문서에 적지 않는다.

**Subject:** Flight Award Search API evaluation — own-program SKYPASS / Asiana Club calendar

Hello AwardWallet API team,

I am evaluating data access for a private, single-user award-flight calendar. This is a request for technical clarification and a limited trial, not authorization to start any paid service.

Could you confirm:

1. Whether provider `korean` currently searches seats redeemable with Korean Air SKYPASS miles, rather than only Korean-operated flights redeemable with partner-program miles.
2. Economy, business and first-class support separately for single-date results and calendar results. The published provider example omits business from `priceCalendar.cabins`; is that a current limitation or an illustrative/stale example?
3. Whether Asiana Club (including any distinct retained legacy-mileage program) is supported, and the exact provider code. Please distinguish it from partner-program redemption of Asiana-operated flights.
4. Whether an airline-password-free or officially delegated authorization flow is available. We do not plan to store airline passwords or copy browser sessions. Please clarify the current `loginRequired`/`authMode` contract, whose account is used, and any interactive authentication requirements.
5. What the calendar date window, completeness, pagination, per-segment cabin, passenger availability and mileage/tax results guarantee. Is the quote per person or for the entire party? Are children and infants supported?
6. Typical and upper-percentile first-result/monthly-result latency, request limits, cache freshness, cancellation and background-refresh rules. Our design prioritizes one month, then only expands when it does not slow active searches.
7. The smallest permitted trial, personal-use eligibility, read-only `/providers/list` access, and all applicable trial/minimum/usage fees. Please do not activate billing without explicit approval.
8. The permitted use of the data for a private cloud app, caching and personal seat alerts, and any required permissions.

The initial evaluation would be bounded to ICN–NRT, ICN–JFK and ICN–CDG, one future month each, and only after access and cost approval. We will first inspect provider capabilities, then compare a small result sample against the official booking interface.

Please let us know the appropriate next step and how trial API credentials can be provisioned securely. No airline account credentials are included in this inquiry.

Thank you.
