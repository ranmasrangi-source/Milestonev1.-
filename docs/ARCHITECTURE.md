# Architecture (Milestone 1)

## Layers

```
 Browser (EN / NE)
      |
      v
 apps/web   Next.js App Router: pages, components, route handlers
      |     lib/catalog.ts   adapter (sample data now, database in Milestone 2)
      |     lib/route.ts     locale and location resolution
      v
 packages/domain   pure TypeScript, no framework imports
      |     statuses, categories, locations, readiness, booking gate,
      |     catalogue builder, sample data
      v
 packages/db       SQL migrations, migration runner, seed script
                   (Milestone 2 connects the web app to these tables)
```

The domain package is the single source of business rules. The web app and any future API call
the same functions. This lets a NestJS admin API and a mobile app reuse the logic without rebuilding it.

## Core rules enforced in code

1. **The catalogue includes every category.** `buildCatalog` returns all categories for a location, including Coming Soon ones.
2. **A missing status means Coming Soon.** `DEFAULT_STATUS` is `coming_soon`, never open.
3. **Booking gate.** `evaluateBookingGate` allows a booking only when the global switch is on, the category is transactional, the status is available, the mode is enabled, and readiness is complete with two distinct approvers. It returns every failing reason, for admin logs.
4. **Public output is minimal.** The API and pages expose status, labels and a generic call to action. They do not expose gate reasons, inventory or prices.
5. **Database guards.** Booking modes can be enabled only for available, transactional rows, enforced by a check constraint and a trigger. History and audit tables reject updates and deletes.

## Request flow: category page

1. `resolveLocale` validates `en` or `ne`. Anything else redirects to `/en`.
2. `resolveLocation` validates the location query parameter and defaults to the first sample location.
3. `getCategoryEntry` builds the catalogue for the location and finds the category. Unknown codes return 404.
4. `indexingDecision` sets robots. The page renders status, description, a generic booking message and the disabled Notify Me placeholder.

## Extension points for later milestones

| Need | Where it plugs in |
|---|---|
| Database-backed statuses | Implement `CatalogSources` against the `service_statuses` table. Pages do not change |
| Admin status changes | New admin API writes to `service_statuses` and `service_status_history` in one transaction |
| Readiness checks | Implement `findReadiness` against `readiness_records` and `readiness_approvals` |
| Real booking | New booking module calls `evaluateBookingGate` before creating a hold |
| Payment | New adapter behind a `PaymentGateway` interface. Sandbox and mock first |
| Mobile app | The same JSON API under `/api/v1` |

## Security posture in Milestone 1

- Public pages write nothing to a database. There is no authentication yet, and none is needed for public pages.
- Query parameters are validated against known values (locale, location code, status enum). Free text is used only for in-memory filtering and is never rendered as HTML.
- React escapes all output. There is no `dangerouslySetInnerHTML`.
- Security headers are set globally.
- No third-party scripts, trackers or fonts are loaded.
- Secrets are read from environment variables only. `.env` files are ignored by git.

## Deliberate deviations from the earlier plan

- **NestJS deferred to Milestone 2.** Milestone 1 needs no separate API service. The route handlers are thin, and the logic sits in the domain package.
- **No ORM.** SQL migrations are explicit and reviewable. An ORM can be added in Milestone 2 if the team prefers one.
- **Sample data stands in for the database.** Milestone 1 pages do not need a running database.
