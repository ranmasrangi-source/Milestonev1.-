# Test Report: Milestone 1

Environment: Linux sandbox, Node.js 22.23.5, npm 10.9.9. The project targets Node 20 (`.nvmrc`).
**Node 20 was not tested.**

## Executed and passed

| Check | Command or request | Result |
|---|---|---|
| Dependency install | `npm install` (workspaces) | Passed |
| Domain unit tests | `npm test` | **30 of 30 passed** (catalogue 10, booking gate 6, readiness 7, taxonomy 7) |
| Domain typecheck | `npm run typecheck -w @pherinepal/domain` | Passed |
| Web typecheck | `npm run typecheck -w @pherinepal/web` | Passed |
| Production build | `npm run build` | Passed. 7 pages prerendered, both locales. No compile warnings |
| Root redirect | `GET /` | 307 to `/en` |
| English homepage | `GET /en` | 200, `lang="en"` |
| Nepali homepage | `GET /ne` | 200, `lang="ne"`, Nepali status label present |
| Filtered catalogue | `GET /en/services?location=pokhara&status=partner_registration_open` | 200, 3 services shown (hotels, homestays, restaurants) |
| Category with noindex | `GET /en/services/sos` | 200, robots noindex |
| Unknown category | `GET /en/services/does-not-exist` | 404 |
| Invalid locale | `GET /fr/services` | 307 to `/en` |
| Catalogue API | `GET /api/v1/catalog?location=pokhara` | JSON with all categories. No prices or inventory |
| Catalogue API, unknown location | `GET /api/v1/catalog?location=atlantis` | 404, `UNKNOWN_LOCATION` |
| Health endpoint | `GET /api/v1/health` | 200 |
| Security headers | response headers | `nosniff`, `DENY`, referrer and permissions policies present |
| Migration SQL on a PostgreSQL engine | `0001_foundation.sql` run on PGlite (PostgreSQL compiled to WebAssembly) | Applied. 7 tables created |
| Constraint and trigger checks | 11 scripted checks on PGlite | All behaved as designed: booking modes rejected for non-transactional and non-available rows; duplicate and invalid status rejected; empty change reason rejected; history and audit updates and deletes rejected; invalid approval type rejected |

PGlite is a real PostgreSQL build, but it is not a full PostgreSQL server. Verification on a server is still required.

## Written but NOT executed

| Item | Why it matters | Next step |
|---|---|---|
| `packages/db/scripts/migrate.mjs` | Uses the `pg` client and transaction logic. Not run against a server | Run `npm run db:migrate` against local PostgreSQL |
| `packages/db/scripts/seed.ts` | Not run. Includes a `$3::text` cast fix that is not yet tested | Run `npm run db:seed` on a dev database, then re-run to confirm no changes |
| Visual and responsive layout | Checked from the CSS and the HTML output. No browser was used | Review at 375, 768 and 1280 px in Chrome and on a real Android phone |
| Accessibility | Built to WCAG 2.2 AA principles. No automated audit or screen-reader test | Run axe or Lighthouse, then a screen-reader pass |
| Nepali text | First draft written in the build. Not reviewed by a native speaker | Native-speaker review of every string in `lib/i18n.ts` |
| Keyboard-only use | Focus styles and skip link are present. Not tested in a browser | Manual keyboard pass on all pages |
| Client-side language switch | `LanguageSwitcher` uses `usePathname`. Only the server render was tested | Click-test in a browser |
| Node 20 | Project targets Node 20 | Run the full check list on Node 20 |

## Not yet tested by design

Booking, payments, refunds, SOS dispatch, eSIM activation, AI responses and external providers are not built in Milestone 1. Their tests start in the milestone that builds them.
