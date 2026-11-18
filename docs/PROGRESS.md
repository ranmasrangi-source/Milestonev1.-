# PheriNepal Master Feature Tracker

Covers every module in the master scope (Batches 1 to 4). Update at the end of each milestone.
No feature has been removed. Items that depend on approval are marked **GATED**.

## Status key

| Code | Meaning |
|---|---|
| **M1-VERIFIED** | Built in Milestone 1 and verified in the build environment (tests, build, or live smoke test) |
| **M1-BUILT** | Built in Milestone 1 but not executed in the build environment |
| **M1-PLACEHOLDER** | Visible in Milestone 1 as a catalogue entry or disabled control. The feature itself is not built |
| **PLANNED-Mx** | Scheduled for milestone x |
| **GATED** | Depends on legal, payment, licence or provider approval in writing. Not started until approved |

Milestone plan (dependency order, not dates):

- **M1**: Foundation, design system, public catalogue, status model, database foundation (this milestone)
- **M2**: Database-backed catalogue, admin status control, auth scaffolding, Notify Me and consent storage, sitemap, NestJS admin and API service
- **M3**: Partner registration and verification, readiness dashboard, destination content, budget calculator, checklists
- **M4**: Hotel and homestay inventory, Instant and Approval booking, booking records, My Trip
- **M5**: Payments, ledger, refunds, disputes, commissions, payouts, reconciliation (GATED on written gateway and legal answers)
- **M6**: Adventure, trekking, peak climbing, guides, transport, flight status, luggage (GATED per category)
- **M7**: eSIM, offline maps, AI Guide, SOS, weather and safety alerts, nearby services (SOS activation GATED on staffing)
- **M8**: Shopping, restaurants, local experiences, support and disputes UI, wallet
- **M9**: Passport, memories, rewards, group travel, lost and found, QR Scan, Hidden Nepal, companion matching (GATED on safety review)
- **M10**: Security review, penetration test, load test, deployment, backup and recovery drill

## A. Public website and service catalogue

| # | Feature | Status now | Milestone | Notes |
|---|---|---|---|---|
| A1 | Homepage (EN and NE, responsive) | M1-VERIFIED | M1 | Builds, prerenders, serves 200 in both locales |
| A2 | All planned categories visible from day one | M1-VERIFIED | M1 | 31 categories, tested for unique codes and bilingual text |
| A3 | Six service statuses with text and icon labels | M1-VERIFIED | M1 | Never colour-only |
| A4 | Status per category and location | M1-VERIFIED | M1 | Available in one location, Coming Soon in another, covered by a test |
| A5 | Service catalogue page with filters | M1-VERIFIED | M1 | Search, location and status filters work without JavaScript |
| A6 | Category detail page | M1-VERIFIED | M1 | Unknown category returns 404 |
| A7 | Catalogue API (`/api/v1/catalog`) | M1-VERIFIED | M1 | Returns no inventory, prices or internal gate reasons |
| A8 | Health endpoint | M1-VERIFIED | M1 | |
| A9 | Coming Soon pages: Notify Me, consent, launch notice | M1-PLACEHOLDER | M2 | Form is disabled. Consent storage not built |
| A10 | Partner registration entry from Coming Soon pages | M1-PLACEHOLDER | M3 | Button disabled |
| A11 | Indexing policy for thin and Coming Soon pages | M1-VERIFIED | M1 | Category pages are noindex unless available with original content |
| A12 | Sitemap, robots.txt, structured data | PLANNED-M2 | M2 | |
| A13 | Destination pages, province and district structure | PLANNED-M3 | M3 | Original content needed |
| A14 | Hidden Nepal curated content | M1-PLACEHOLDER | M9 | Category entry only |
| A15 | Mobile navigation drawer | PLANNED-M2 | M2 | Current navigation wraps on small screens |
| A16 | Dark theme | PLANNED-M3 | M3 | |

## B. Service modules (master scope items 1 to 28)

| # | Module | Catalogue entry | Build status | Milestone |
|---|---|---|---|---|
| 1 | Hotels, homestays, resorts, lodges, hostels, guesthouses | M1-VERIFIED | Listings and booking PLANNED | M3, M4 |
| 2 | Instant Booking and Hotel/Homestay Approval Booking | M1-VERIFIED (closed) | Booking gate M1-VERIFIED. Booking engine PLANNED | M4 |
| 3 | Trekking, hiking, peak climbing, mountaineering | M1-VERIFIED | Partner onboarding M3. Operations GATED | M6 |
| 4 | Adventure activities and experiences | M1-VERIFIED | GATED on insurance and safety | M6 |
| 5 | Tour operators and local guides | M1-VERIFIED | GATED on licence verification | M6 |
| 6 | Buses, flights, cars, jeeps, taxis, rentals, airport transfers | M1-VERIFIED | Flights GATED on provider agreement | M6 |
| 7 | eSIM and physical SIM information | M1-VERIFIED | eSIM GATED on provider agreement. SIM info PLANNED | M7 |
| 8 | Offline maps and navigation | M1-VERIFIED | GATED on map licence | M7 |
| 9 | AI Travel Guide and itinerary planner | M1-VERIFIED | Grounding design per Batch 4 section 5. GATED on provider terms | M7 |
| 10 | SOS and emergency assistance | M1-VERIFIED (not active) | Public activation GATED on staffing and verified contacts | M7 |
| 11 | Shopping marketplace | M1-VERIFIED | GATED on seller and product compliance | M8 |
| 12 | Restaurants and reservations | M1-VERIFIED | GATED on partner agreements | M8 |
| 13 | Local experiences, culture, food, community tourism | M1-VERIFIED | GATED on partner verification | M8 |
| 14 | Visa, permits, packing, budget, travel planning | M1-VERIFIED (testing) | Budget calculator and checklists PLANNED | M3 |
| 15 | Nearby hospitals, pharmacies, ATMs, banks, fuel | M1-VERIFIED | Data source PENDING | M7 |
| 16 | Travel wallet, payment history, invoices, expenses | M1-VERIFIED | Ledger GATED | M5 |
| 17 | Group travel and shared itineraries | M1-VERIFIED | PLANNED | M9 |
| 18 | QR Scan Nepal | M1-VERIFIED | PLANNED | M9 |
| 19 | Hidden Nepal | M1-VERIFIED | Content PLANNED | M9 |
| 20 | Digital Travel Passport | M1-VERIFIED | PLANNED | M9 |
| 21 | Pheri Memories and media ownership | M1-VERIFIED | Moderation and storage PLANNED | M9 |
| 22 | Reviews and verified TrustScore | M1-VERIFIED | Verified-booking reviews PLANNED | M5, M9 |
| 23 | Rewards, loyalty and referrals | M1-VERIFIED | Reward ledger separate from money ledger. PLANNED | M9 |
| 24 | Lost and Found | M1-VERIFIED | PLANNED | M9 |
| 25 | Travel Companion Matching, privacy and moderation | M1-VERIFIED | GATED on safety and legal review | M9 |
| 26 | Weather and safety alerts | M1-VERIFIED (testing) | Official data sources PENDING | M7 |
| 27 | Flight status and luggage services | M1-VERIFIED | Flight status GATED. Luggage PLANNED | M6, M8 |
| 28 | Multilingual and multi-currency support | EN and NE UI M1-VERIFIED | Currency display PLANNED | M2 |

## C. Platform, booking, finance and operations

| # | Area | Status now | Milestone |
|---|---|---|---|
| C1 | Repository, workspaces, scripts, environment template | M1-VERIFIED | M1 |
| C2 | Design system (tokens, components, responsive rules) | M1-VERIFIED | M1 |
| C3 | Accessibility baseline (skip link, focus, labels, status text, reduced motion) | M1-BUILT | M1. Not audited with a tool |
| C4 | Security headers (nosniff, frame deny, referrer, permissions) | M1-VERIFIED | M1 |
| C5 | Database schema: categories, locations, statuses, history, readiness, audit | M1-VERIFIED on PGlite | M1 |
| C6 | Append-only history and audit tables | M1-VERIFIED on PGlite | M1 |
| C7 | Database guards: booking modes only when available and transactional | M1-VERIFIED on PGlite | M1 |
| C8 | Migration runner (`npm run db:migrate`) | M1-BUILT | M1. Not run against a PostgreSQL server |
| C9 | Seed script (`npm run db:seed`) | M1-BUILT | M1. Not run |
| C10 | Readiness gate logic (domain) | M1-VERIFIED (tests) | M1 |
| C11 | Readiness database guard (approvals before activation) | PLANNED-M2 | M2 |
| C12 | Admin service-status control with audit and two-person approval | PLANNED-M2 | M2 |
| C13 | Admin readiness checklist UI | PLANNED-M3 | M3 |
| C14 | Authentication, MFA, sessions, password hashing | PLANNED-M2 | M2 |
| C15 | Role-based access control and partner data isolation | PLANNED-M2 | M2 |
| C16 | Customer accounts and My Trip (unified itinerary) | PLANNED-M4 | M4 |
| C17 | Booking records, booking items, checkout sessions | PLANNED-M4 | M4 |
| C18 | Inventory holds, atomic reservation, expiry worker | PLANNED-M4 | M4 |
| C19 | Idempotency keys and idempotent payment webhooks | PLANNED-M5 | M5 |
| C20 | Payment state machine, allocations per booking record | PLANNED-M5 | M5. GATED |
| C21 | Double-entry append-only ledger | PLANNED-M5 | M5. Chart of accounts PENDING accountant |
| C22 | Refunds, partial refunds, disputes, dispute holds | PLANNED-M5 | M5. GATED |
| C23 | Commissions, partner earnings, payouts, reconciliation | PLANNED-M5 | M5. GATED |
| C24 | Notifications (email, SMS, in-app) | PLANNED-M2 | M2. Provider not chosen |
| C25 | Support tickets, complaints, escalation | PLANNED-M8 | M8 |
| C26 | AI grounding, quotas, audit logs, kill switch | PLANNED-M7 | M7. GATED on provider terms |
| C27 | SOS incident management, response tracking, staffing | PLANNED-M7 | M7. Public activation GATED |
| C28 | Partner dashboards (8 categories) | PLANNED-M3 onward | M3 to M8 |
| C29 | Admin dashboard | PLANNED-M2 onward | M2 to M9 |
| C30 | Backups, restore testing, disaster recovery | PLANNED-M10 | M10 |
| C31 | Penetration test and independent security review | PLANNED-M10 | M10. GATED on reviewer |
| C32 | Deployment pipeline and environments | PLANNED-M10 | M10 |
| C33 | Automated tests: domain | M1-VERIFIED | 30 tests passing |
| C34 | Automated tests: web (component and end-to-end) | PLANNED-M2 | M2 |
