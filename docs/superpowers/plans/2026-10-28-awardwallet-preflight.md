# AwardWallet capability-only preflight implementation

Spec: existing AirMile interviews 20 B, 44 A, 46 B, 64 B, 77 B; no changed end-product scope.
Base: feature/verified-award-data-gate-20261026 @ e7bce89ce2cddd096dbc206787bc7459a6ac782d.
Goal: assess the documented SKYPASS API before purchasing or sharing an airline account.
Architecture: dependency-free Node CLI, read-only capability discovery; not an inventory adapter.

- [x] Write offline Node tests, observe RED, implement, observe GREEN: 13 failures -> 14/14 pass.
- [x] Document provider evidence and unsent access inquiry.
- [ ] Commit changes and inspect full repository CI.

Constraints: no live request without explicit --live, approved API access and API credentials. Fixed HTTPS metadata endpoint only, no /search or airline credentials, no retry or redirects, bounded timeout/body size, no raw response or secrets in output. Missing business metadata is not sold-out. Asiana names remain unverified candidates. No dependencies, UI or package changes.

Ruling: do not implement a production search adapter before authenticated capabilities and real sample responses exist. Public API documentation is not proof of current service availability or airline permission. No inquiry sent, signup made or billing authorized. Existing airline 403 probes remain stopped.
