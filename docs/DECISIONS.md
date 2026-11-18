# Decision Register

**FINAL** = your decision or a settled requirement. **RECOMMENDED** = my design choice, open to review.
**PENDING** = depends on written verification or approval. Nothing marked PENDING is treated as confirmed.

## Product and scope

| Decision | Status |
|---|---|
| All planned service categories are visible on the public site from day one | FINAL |
| Six service statuses: Coming Soon, Partner Registration Open, Under Development, Testing, Available, Temporarily Unavailable | FINAL |
| Availability is set per category and location, and admin can change it without a code deployment | FINAL |
| Booking is accepted only when the category and location pass all readiness requirements | FINAL |
| Hotels and homestays support Instant Booking and Approval Booking, both in long-term scope | FINAL |
| One Trip ID, many independent booking records, each with its own status, payment, refund and audit | FINAL |
| Kathmandu, Pokhara, Chitwan and Solukhumbu appear as sample seed data only, not as the pilot region | FINAL |
| Pilot region is chosen by the owner | PENDING |
| Languages at launch: English and Nepali | FINAL |
| Multi-currency display with a separate settlement currency | FINAL (rule). Currency code PENDING |
| Nepali translations reviewed by a native speaker before launch | FINAL (requirement). Review PENDING |

## Technical

| Decision | Status |
|---|---|
| Next.js 14 (App Router) and TypeScript for the web app | RECOMMENDED. Patched to 14.2.35 after a security advisory on 14.2.15 |
| Framework-independent domain package holds all business rules and is tested | RECOMMENDED |
| Milestone 1 exposes a thin Next.js route-handler API. A NestJS API service arrives in Milestone 2 | RECOMMENDED. Deviation from the earlier plan, to keep Milestone 1 runnable without a database |
| PostgreSQL 13 or later, with SQL migrations | RECOMMENDED |
| Append-only history and audit tables enforced by database triggers | RECOMMENDED. Verified on PGlite |
| Status defaults to Coming Soon when no row exists | RECOMMENDED. Safe default |
| Sample seed never marks any service Available and never enables booking | RECOMMENDED. Covered by tests |
| Seed does not overwrite existing statuses on re-run | RECOMMENDED |
| Light theme only in Milestone 1 | RECOMMENDED |
| Design uses system fonts, no external font requests | RECOMMENDED. Avoids third-party requests |
| Security headers set globally (nosniff, frame deny, referrer, permissions) | RECOMMENDED |
| Geolocation denied by default. SOS will request it explicitly | RECOMMENDED |
| Indexing: only available pages with original content are indexed | RECOMMENDED. Follows Batch 3 policy |
| Booking master switch (`BOOKING_ENABLED`) defaults to off | FINAL |
| Pessimistic locking for inventory reservation, with database capacity constraints | RECOMMENDED. Built in Milestone 4 |
| Payment path (single collection with allocation, per-record payment, or gateway split) | PENDING gateway and legal answers |
| Payment authorization holds and split settlement | PENDING. Not assumed |
| Commission base (gross or net of tax) and hold period | PENDING accountant and market research |

## Legal, business and operations

| Decision | Status |
|---|---|
| Company registration status and signatory authority | PENDING |
| Budget envelope and scenario (Lean, Standard, Growth) | PENDING |
| Team model (in-house, contractor or mixed) | PENDING |
| Support hours, languages and channels | PENDING. No 24/7 claim until staffed |
| SOS operating model and whether it will be staffed | PENDING. Public SOS stays off until staffed and tested |
| Emergency contact numbers | PENDING. None are shown in this build |
| Business and tourism licences per category | PENDING legal review |
| Insurance minimums for adventure and trekking | PENDING insurer quotation |
| Retention and deletion periods for consent, logs and personal data | PENDING lawyer |
| Companion matching: whether to pursue at all | PENDING safety and legal review |
| Terms, privacy and policy text | PENDING legal review. Placeholders only |
