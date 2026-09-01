# Search — Frontend Plan

## Requirements (as given)

- New module at `modules/search`.
- Entry points: "Wyszukaj" click on landing page, "/search" in navigation, or a direct link.
- Search page works with no filters applied (browsing all events).
- Filters are reflected in the URL (shareable/bookmarkable/back-button-safe).
- Search page shows: event list, filters, sorting options.

## Resolved decisions (supersedes prior assumptions)

All items below were open assumptions; each is now resolved against the actual codebase (`documentation/DOMAINS.md` §5 "Event Search", `documentation/ADR.md`, and the existing `landing`/`event-creation` modules) or a direct product decision from the user.

1. **Route is `/szukaj`, not `/search`.** `modules/landing/configuration/constraints.ts` already defines `SEARCH_RESULTS_PATH = "/szukaj"`, and the landing hero form, popular-cities links, and category tiles already navigate there via `window.location.assign`. The search module owns rendering that route; it does not introduce a new path.

2. **Filter set matches `DOMAINS.md` §5 exactly: `name`, `location`, `dateFrom`/`dateTo`, `category`.** No free-text `query` distinct from `name`, no `tags` filter, no `relevance` concept — none of these appear in the domain spec or in landing's existing `SearchFilters` type (`modules/landing/domain/models.ts`), which is the de facto contract already being sent to `/szukaj` (`name`, `dateFrom`, `dateTo`, `location`, `category` query params). Search's filter shape must be a superset-compatible read of exactly those five params. "Quick search tags" in `DOMAINS.md` refers to the pre-defined date-range shortcuts already built (`modules/landing/configuration/quick-date-ranges.ts` + `quick-search-shortcuts.tsx`), not an event `tags` field — the search page should offer the same quick-date-range shortcuts, not a tags filter.

3. **Sort options: `name` and `date`, each with `asc`/`desc` direction** (per `DOMAINS.md` §5 "Sorting options: name, date and time"). No `newest`/`relevance`. Modeled as `sortBy: 'name' | 'date'` + `sortDir: 'asc' | 'desc'`, exposed as a single dropdown with four combined options (e.g. "Data: najbliższe", "Data: najdalsze", "Nazwa: A-Z", "Nazwa: Z-A"). Default: `date` / `asc` (soonest first), matching `SORT`-less current behavior and the otodom-style "soonest first" convention already used elsewhere.

4. **Location filter is plain free text ("Miasto lub region"), not a geocoding autocomplete.** `modules/landing/presentation/fields/location-field.tsx` is a plain `TextField`; there's no evidence the Event Search domain's "Nominatim/Photon for reverse geocoding" requirement applies to the *filter input* (only to event-creation's address capture). Search reuses this same plain-text UX for consistency with the already-built hero form.

5. **Category values: unify on the DB/event-creation snake_case enum via a new `shared/event-category` module, and migrate `landing` to it too** (user decision). Today there are two incompatible category lists:
   - `modules/event-creation/presentation/fields/event-category-labels.ts` — snake_case (`music_entertainment`, …), matches the DB enum (`shared/data-sources/db-schema.ts`, `supabase/migrations/20260827120000_create_events.sql`).
   - `modules/landing/configuration/constraints.ts` — kebab-case (`music-entertainment`, …), a separate `CategoryValue` brand.

   Per the ADR, no module may import another module's internals, so neither can be reused as-is, and landing's kebab-case `?category=` param would never match real DB rows once a search endpoint exists. Resolution:
   - Add `shared/event-category/` (mirroring the existing `shared/event-card/` pattern) exporting the canonical snake_case `EventCategory` type, `EVENT_CATEGORY_OPTIONS`, and the Polish label lookup.
   - `event-creation` and `search` both consume it.
   - `modules/landing/configuration/constraints.ts` and `presentation/fields/category-field.tsx` are updated to consume the same shared values instead of their own kebab-case list, so the `?category=` param landing already sends becomes valid input for search. This is a small, contained change to landing (values + labels only, not its UI), done as part of this module's work since it's required to make the existing landing→search link correct.

6. **Pagination: "load more" button, cursor/offset-based** (user decision — no existing pagination precedent in the codebase to defer to). `search-events` accumulates results into `results` on load-more, replaces on any filter/sort change. This shapes the `GET /events/search` contract: response includes `nextCursor: string | null`.

7. **`EventCard` is reused from `shared/event-card/presentation/event-card.tsx`**, an existing cross-module shared component (already used by `landing/promoted-events-section.tsx`). It takes pre-formatted `{ title, dateLabel, location, categoryLabel }` — search's mapping layer formats `dateLabel` (from `date_time_from`) and `categoryLabel` (via the new `shared/event-category` lookup) before rendering, it does not build a new local card.

8. **No `presentation/router.tsx` — this codebase is Next.js App Router, not a module-internal router.** Every existing module (`event-creation`, `landing`, `user-profile`, …) is wired as a thin `app/**/page.tsx` rendering a `core/modules/<name>.tsx` wrapper (`<Provider><Main/></Provider>`). Search follows the same convention: `app/szukaj/page.tsx` (thin) + `core/modules/search.tsx` (wrapper), reading `presentation/context.tsx` + `presentation/main.tsx` from this module. Drop the previously-planned `presentation/router.tsx`.

9. **No BE contract exists yet** — `app/api/events/route.ts` currently only handles `POST` (create). `integration/repository.ts` still assumes a single `GET /events/search` (or `/api/events` with query params, to match the existing `fetch('/api/events/...')` convention seen in `event-creation/integration/repository.ts`) accepting `name`, `location`, `dateFrom`, `dateTo`, `category`, `sortBy`, `sortDir`, `cursor`. This remains a genuine open item — replace once a `plan-be` contract is produced; no BE work is implied by this doc.

10. **Landing-page "Wyszukaj" entry point is already fully built** (`modules/landing/presentation/hero-search-form.tsx` + `integration/navigation.ts`) — it already navigates to `/szukaj?name=&dateFrom=&dateTo=&location=&category=`. This module's only obligation there is to correctly parse those exact param names on load (§3 below), not to build a new entry point.

11. **Nav-bar "Szukaj" link**: `shared/nav-bar/presentation/nav-bar.tsx` has an empty `NAV_LINKS` array rendered via `.map()`. Add one entry, `{ href: "/szukaj", label: "Szukaj" }`, to that array as part of this module's delivery (trivial, but required to satisfy the nav-bar entry-point requirement, and no other module owns it).

---

## 1. View / Route Map

| View | Route | Entry conditions |
| --- | --- | --- |
| SearchPage | `/szukaj` | Reached via: (a) landing hero "Wyszukaj" submit (already built, navigates with `name`/`dateFrom`/`dateTo`/`location`/`category`), (b) landing "Popularne miasta" links (`?location=<city>`), (c) nav-bar "Szukaj" link (no params), (d) direct URL, optionally with any of the above params plus `sortBy`/`sortDir`/`cursor`. No params → unfiltered event list, default sort (`date`/`asc`). |

Routing: `app/szukaj/page.tsx` (thin Next.js page) → `core/modules/search.tsx` (`<Provider><Main/></Provider>`) → this module's `presentation/context.tsx` + `presentation/main.tsx`. No in-module router file.

## 2. Component Tree

Under `modules/search/presentation/`:

- `search-page.tsx` / `main.tsx` (container, rendered at `/szukaj`)
  - Reads URL search params (`name`, `location`, `dateFrom`, `dateTo`, `category`, `sortBy`, `sortDir`, `cursor`) on mount and on every URL change; calls facade `syncFromUrl` to hydrate filters+results.
  - Renders layout: `search-bar`, `filter-panel`, `quick-date-shortcuts`, `sort-dropdown`, `event-list`, `load-more-button`.
  - Consumes: `useSearchFilters()`, `useSearchResults()`, `useSearchStatus()`, `useHasMoreResults()`.
- `components/search-bar.tsx` (presentational)
  - Free-text `name` input (matches landing's `name-field.tsx` semantics). On change/submit → facade action `setFilter('name', value)`.
- `components/filter-panel.tsx` (container of filter fields, presentational fields inside)
  - `filter-fields/category-filter.tsx` — `SelectField` sourced from `shared/event-category` options/labels (same pattern as landing's `category-field.tsx`, now on the shared values).
  - `filter-fields/date-range-filter.tsx` — `dateFrom`/`dateTo`.
  - `filter-fields/location-filter.tsx` — plain `TextField`, matches landing's `location-field.tsx`.
  - `components/quick-date-shortcuts.tsx` — same preset buttons as `landing/quick-search-shortcuts.tsx` (Dziś/Jutro/Ten tydzień/...), sets `dateFrom`/`dateTo` directly.
  - Each field calls facade action `setFilter(key, value)` on change; a "Wyczyść filtry" control calls `resetFilters()`.
- `components/sort-dropdown.tsx` (presentational)
  - Single `SelectField` with 4 options (date asc/desc, name asc/desc) → facade action `setSort(sortBy, sortDir)`.
- `components/event-list.tsx` (presentational)
  - Renders `shared/event-card/presentation/event-card.tsx` per result, after mapping `Event` → `{ title, dateLabel, location, categoryLabel }`.
  - Handles empty state ("Brak wydarzeń spełniających kryteria") and loading skeleton state.
- `components/load-more-button.tsx` (presentational)
  - Calls facade action `loadMore()`; disabled/hidden when `useHasMoreResults()` is false.

No business logic (filter merging, URL parsing, fetch orchestration) lives in any of the above — they only read facade selectors and call facade actions.

## 3. State & Handlers (core)

**Store (`core/store.ts`) — atoms/computed:**

- `filters` atom: `{ name, location, dateFrom, dateTo, category, sortBy, sortDir, cursor }` (domain-shaped, not raw URL strings; `category` typed via `shared/event-category`'s `EventCategory`).
- `results` atom: `Event[]` (accumulated, for load-more) mapped via integration mappers.
- `status` atom: `'idle' | 'loading' | 'loading-more' | 'error' | 'ready'`.
- `hasMore` computed: derived from last fetch's `nextCursor`.
- `error` atom: last error message, if any.

**Handlers (`core/handlers/`), one per action:**

- `sync-filters-from-url.ts` — parses incoming URL search params (`name`, `location`, `dateFrom`, `dateTo`, `category`, `sortBy`, `sortDir`) into the typed `filters` shape (bounds/enum validation from `configuration/validation.ts` — e.g. `category` must be a valid `EventCategory`, `sortBy`/`sortDir` must be valid enum members, else fall back to defaults), writes to `filters` atom, triggers `search-events`.
- `set-filter.ts` — merges a partial filter change into `filters`, resets `cursor`, re-runs `search-events`. Returns/emits that presentation should push the new URL (URL stays the shareable source of truth; core stays router-agnostic).
- `set-sort.ts` — updates `sortBy`/`sortDir` in `filters`, resets `cursor`, re-runs `search-events`.
- `reset-filters.ts` — clears `filters` back to defaults, re-runs `search-events`.
- `search-events.ts` — calls `integration/repository.searchEvents(filters, signal)`, maps DTOs via `integration/mappers`, replaces `results`, sets `status`/`error`/`hasMore`/`nextCursor`. Owns `AbortController`: cancels any in-flight request before starting a new one.
- `load-more.ts` — calls `search-events` with the current filters + `cursor: nextCursor`, appends to `results` instead of replacing, sets `status: 'loading-more'`.

**Facade (`core/facade.ts`) surface exposed to presentation:**

- Actions: `syncFromUrl(searchParams)`, `setFilter(key, value)`, `setSort(sortBy, sortDir)`, `resetFilters()`, `loadMore()`.
- Selectors: `useSearchFilters()`, `useSearchResults()`, `useSearchStatus()`, `useHasMoreResults()`, `useSearchError()`.
- `mediator`/`registry` follow the same wiring pattern as `event-creation`/`user-profile` (registers handlers against actions/events, no direct handler imports from presentation).

**URL as source of truth:** `search-page.tsx` treats the URL as authoritative. On URL change (including back/forward navigation) it calls `syncFromUrl`. When a facade action changes a filter/sort, the page also pushes the corresponding URL update (query string built from the new `filters`, using the same param names landing already sends: `name`, `location`, `dateFrom`, `dateTo`, `category`, plus `sortBy`/`sortDir`) so the two stay in lock-step without the core module depending on a router.

## 4. API Communication (integration)

**Repository (`integration/repository.ts`):**

- `searchEvents(filters: SearchFilters, signal: AbortSignal): Promise<SearchResultsDto>` — calls `GET /api/events` (or `/api/events/search`, TBD with `plan-be`) with query params for `name`, `location`, `dateFrom`, `dateTo`, `category`, `sortBy`, `sortDir`, `cursor`, following the relative-fetch-to-Next-API-route convention used by `event-creation/integration/repository.ts`. *(Open — no BE contract supplied yet; replace once `plan-be` defines it. This is the one item in this doc not resolved from existing code.)*

**Mappers (`integration/mappers.ts`):**

- `mapEventSearchResultDto(dto): Event` — backend DTO → domain `Event` model. No shared `Event` domain type exists yet in the codebase; define it here for now (fields per the `events` DB table: `id, title, category, description, dateTimeFrom, dateTimeTo, location, image, link, tags`), and swap for a shared one if `plan-domain` later introduces one.
- `mapSearchResponseDto(dto): { events: Event[]; nextCursor: string | null }`.
- `toEventCardProps(event: Event): EventCardProps` — formats `dateLabel` (from `dateTimeFrom`) and `categoryLabel` (via `shared/event-category`) for `shared/event-card`.

**Loading / error / cancellation:**

- Every `search-events`/`load-more` call is issued with an `AbortSignal` owned by the handler; a new filter/sort change aborts any in-flight request before issuing the next one, preventing stale responses from overwriting newer ones.
- Network/parse errors set `status: 'error'` + `error` message; `event-list.tsx` renders an error state with a retry action that re-invokes the last `search-events` call.
- No client-side caching beyond the in-memory `results` atom — each filter change is a fresh request.

## 5. Cross-module changes required by this module

- **New:** `shared/event-category/` — canonical `EventCategory` type, options, Polish labels (extracted from `event-creation`'s existing lookup).
- **Modified:** `modules/event-creation/presentation/fields/event-category-labels.ts` — re-point to `shared/event-category` (or delete if fully superseded).
- **Modified:** `modules/landing/configuration/constraints.ts` + `presentation/fields/category-field.tsx` — consume `shared/event-category` instead of the local kebab-case list; `CategoryValue` brand replaced by the shared `EventCategory` type.
- **Modified:** `shared/nav-bar/presentation/nav-bar.tsx` — add `{ href: "/szukaj", label: "Szukaj" }` to `NAV_LINKS`.

## 6. Remaining open item

- `// Open:` The exact `GET /api/events` (or `/api/events/search`) contract (§4) needs a `plan-be` pass — everything else in this doc is resolved against existing code/domain docs or a direct product decision.
