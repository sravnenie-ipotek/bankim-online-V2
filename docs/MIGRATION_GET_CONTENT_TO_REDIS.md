# Migration Plan: Get Content to Redis + Replace Translations with Get Content

This document outlines the plan to:
1. Move content resolution to Redis (API: Redis → DB fallback, update Redis on miss).
2. Replace all `t()` translation usages with `getContent()` where content is CMS-driven.
3. On API startup, refresh/warm Redis with the latest content for all screen/language combinations.
4. Add support for images: store image path keys in content and resolve keys to paths.

---

## Current State Summary

| Layer | Behavior |
|-------|----------|
| **API (NestJS)** | `ContentService.getContentByScreen()` uses in-memory `CacheModule` (cache-manager, 5 min TTL). Keys: `content_${screen}_${language}_${type}`. Same cache used by `DropdownService` and `getValidationErrors()`. |
| **Web (Next.js)** | `useContentApi(screenLocation)` → `getCachedContent(screen, lang)` in `contentApiCache.ts` (in-memory `Map`, 5 min). Fetches from `/api/content/screen/${screen}/${language}` (proxied to API). |
| **Translations** | Many components use `t()` from react-i18next with `public/locales/{he,en,ru}/*.json`. Some screens already use `getContent()` (e.g. home_page, mortgage steps, about, cooperation, contacts, privacy-policy, global_components). |
| **Images** | Hardcoded paths (e.g. `/static/...`). No content_key → image path in DB. `ContentItem` has `value`, `component_type`, `category`; no dedicated asset type. |

**Screen locations in use:** `home_page`, `mortgage_step1`, `mortgage_step2`, `mortgage_step3`, `mortgage_calculation`, `privacy_policy`, `global_components`, `contacts`, `about`, `cooperation`, `validation_errors` (API).

---

## Phase 1: Redis for Get Content (API)

### 1.1 Add Redis to the API

- Add dependencies: `cache-manager-redis-store` (or `@nestjs/cache-manager`-compatible Redis store) and `ioredis` (or use `cache-manager-redis-yet`).
- Add env vars: e.g. `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_TTL_CONTENT` (e.g. 300000 ms).
- In `app.module.ts`, replace in-memory `CacheModule.register(...)` with Redis store when `REDIS_HOST` is set; keep in-memory as fallback for local dev without Redis.

### 1.2 Get-content flow: Redis → DB → Redis

- In `ContentService.getContentByScreen(screen, language, type)`:
  1. Build key: e.g. `content:${screen}:${language}:${type || 'all'}`.
  2. Try `await this.cache.get(key)`.
  3. If hit: return cached payload.
  4. If miss: run existing DB query (content_items + content_translations), build response object.
  5. Before return: `await this.cache.set(key, response, ttl)` (use `REDIS_TTL_CONTENT` or default 5 min).
  6. Return response.

- Apply the same pattern to:
  - `ContentService.getValidationErrors(language)` (key e.g. `content:validation_errors:${language}`).
  - `DropdownService.getDropdownsByScreen(screen, language)` (key e.g. `dropdowns:${screen}:${language}`).

- Ensure cache keys are namespaced (e.g. `content:`, `dropdowns:`) to avoid clashes and allow bulk invalidation.

### 1.3 Cache invalidation / clear

- Keep existing `clearCache()` behavior but implement it against Redis (e.g. delete by pattern `content:*` and `dropdowns:*`, or flush DB if acceptable). Expose via existing `DELETE /content/cache` (or equivalent).

---

## Phase 2: API Startup – Warm/Refresh Redis

### 2.1 Discover screen × language combinations

- Option A (recommended): Query DB for distinct pairs:
  - `SELECT DISTINCT screen_location, language_code FROM content_items ci INNER JOIN content_translations ct ON ci.id = ct.content_item_id WHERE ci.is_active = true AND ct.status = 'approved'`.
- Option B: Maintain a config list of known `screen_location` values and use active languages from `languages` table (or env).

### 2.2 On API bootstrap, refresh content cache

- In `main.ts` (or a dedicated `CacheWarmupService` invoked from `onModuleInit` of a bootstrap module):
  1. After app is ready (e.g. after `app.listen()` or in a lifecycle hook), get list of (screen, language) pairs.
  2. For each pair, call `ContentService.getContentByScreen(screen, language)` (and optionally `getContentByScreen(screen, language, type)` for known types if used). No need to await all in parallel in a single burst; use a bounded concurrency queue to avoid overloading DB/Redis.
  3. Optionally do the same for `getValidationErrors(language)` per active language and for dropdown screens if dropdowns are cached in Redis.

- Ensure startup warmup does not block server listen (e.g. run warmup in background after listen, or with a short delay).

### 2.3 Optional: periodic refresh

- Optional: add a scheduled job (e.g. every N minutes) to re-run the same warmup so Redis stays aligned with DB after content updates. Prefer TTL-based expiry plus on-demand refresh if content changes are infrequent.

---

## Phase 3: Replace Translations with Get Content (Frontend)

### 3.1 Inventory of `t()` usages

- **Keep `t()` for:** True UI-only strings that will never come from CMS (e.g. “Back”, “Close”, “Submit”, language names, generic buttons). These can stay in locale JSON or be moved later.
- **Replace with `getContent()`:** Any string that is or will be managed in the DB (content_items + content_translations) and served by the content API. Use the same `screen_location` and `content_key` as in the API.

### 3.2 Per-screen migration

- For each screen/feature:
  - Ensure the corresponding `screen_location` and content keys exist in the DB (and in Redis after Phase 1–2).
  - Replace `t('key')` with `getContent('key')` (or `getContent(key)` where key comes from config). Use `useContentApi(screenLocation)` with the correct `screen_location` for that page/component.
  - Where a component spans multiple screens, either pass `getContent` from parent or use a single “global” screen like `global_components` for shared keys.

### 3.3 Files to touch (examples from codebase)

- **Layout / shared:** `Header`, `Footer`, `Sidebar`, `MobileMenu`, `LayoutShell`, `useMenuItems`, `SocialMedia`, `LowerBar`, `LoginDialog`, `CookiePolicyModal`, `SkipCookie`, `TextPage`, `ChangeLanguage`, `PartnersSwiper`, `HowItWorks`, `TopServices`, `VideoPoster`, etc.
- **Pages:** All under `(main)`, `(lawyers)`, `(registration)`, etc. that use `t()` for copy (e.g. `privacy-policy`, `contacts`, `about`, `services`, `vacancies`, `tenders-for-brokers`, `calculate-mortgage` steps, `refinance-credit`, `cookie`, `terms`, `registration`, `personal-cabinet`, `payments`, etc.).

### 3.4 Fallback strategy

- When migrating, you can:
  - Keep locale JSON as fallback: if `getContent(key)` returns empty, fall back to `t(key)` until DB is populated, then remove fallback; or
  - Rely only on getContent and show empty or placeholder until content exists in DB/Redis.

### 3.5 Naming and keys

- Standardize content keys (e.g. snake_case) and align with existing API/DB keys. Document mapping from old `t()` keys to `content_key` and `screen_location` (e.g. in a spreadsheet or in code constants).

---

## Phase 4: Images – Keys to Paths

### 4.1 Model: content keys for image paths

- **Option A – Reuse content_items:** Use existing `content_items` + `content_translations`: add items with `component_type = 'image'` (or `asset`) where `content_value` is the path (e.g. `/static/logo.svg` or a CDN URL). One key per image (e.g. `logo_primary`, `hero_bg`). Language can be same for all or per locale if images differ.
- **Option B – New table:** Add an `assets` or `content_assets` table: `content_key`, `path`, `mime_type`, `alt_key` (optional), and optionally `language_code`. Then serve “get asset by key” from API and cache in Redis similarly.

Recommendation: start with Option A (reuse content_items with type `image`/`asset`) to avoid schema change; later add Option B if you need metadata (dimensions, alt text per language) or binary storage.

### 4.2 API: get image path by key

- Add endpoint, e.g. `GET /content/asset/:key` or include image keys in existing screen content response. If included in screen content, ensure `getContent(key)` returns the path string for image keys.
- Resolve path in API: Redis → DB → Redis (same as text content). Key format e.g. `content:asset:${key}:${language}` or `content:${screen}:${language}` and the image path is one of the content entries.

### 4.3 Frontend: use getContent for image src

- Replace hardcoded image paths with `getContent('image_key')` where `image_key` is the content key for that image (e.g. `logo_primary` → `/static/primary-logo05-1.svg`).
- Centralize list of image keys (e.g. in constants or config) so you can:
  - Seed DB with key → path.
  - Refactor components to use one helper, e.g. `getImagePath(key) = getContent(key)` (with optional fallback to a default path).

### 4.4 Steps to “take” images and read keys

- **Audit:** List all current static image paths in the app (e.g. under `public/static/` and in components). Map each to a logical content key (e.g. `logo_primary`, `cookie_icon`, `bank_leumi_logo`).
- **DB seed:** For each (content_key, path), insert into `content_items` (and optionally `content_translations` with same path for each language, or one row with language-agnostic path).
- **Config/constants:** Maintain a list of image keys (and default paths) so the app knows which keys to request; optionally use a single “assets” or “global_components” screen to load all image paths in one call.
- **Read keys to path:** In API, when building screen content or asset response, return the stored path for that key. In frontend, use `getContent(key)` as the image `src`. For Next.js `Image` component, ensure allowed domains include your CDN if paths are absolute URLs.

---

## Phase 5: Optional – Web app and Redis

- The Next.js app currently uses in-memory `contentApiCache.ts` and calls the API. No change required for Redis to work: the API will use Redis; the frontend still gets content via the same API. Optionally, you could add a server-side Redis cache in Next.js for content responses (e.g. in route handlers or middleware); that can be a later optimization.

---

## Implementation Order (Recommended)

1. **Phase 1:** Add Redis to API and implement Redis → DB → Redis for `getContentByScreen`, `getValidationErrors`, and dropdowns. Keep TTL and key design consistent.
2. **Phase 2:** Implement startup warmup (discover screen×language, call getContentByScreen for each, optionally validation_errors and dropdowns).
3. **Phase 4.1–4.2:** Define image keys and API behavior (content type `image` or asset endpoint); seed DB and implement Redis caching for assets.
4. **Phase 3:** Replace `t()` with `getContent()` screen by screen, starting with already-CMS screens (home_page, about, cooperation, etc.), then layout and shared components, then remaining pages.
5. **Phase 4.3–4.4:** Replace hardcoded image paths with `getContent(image_key)` and document key → path mapping.

---

## Checklist Summary

- [ ] API: Redis store wired in `CacheModule`, env for Redis and TTL.
- [ ] API: `getContentByScreen` / `getValidationErrors` / dropdowns use Redis → DB → set Redis.
- [ ] API: Startup warmup: discover (screen, language), call getContentByScreen (and optionally validation_errors, dropdowns); run after listen.
- [ ] API: Clear cache endpoint works with Redis (delete by pattern or flush).
- [ ] Content: All `t()` that represent CMS content replaced with `getContent()` and correct screen_location.
- [ ] Images: Content keys and paths in DB; API returns path by key (via screen content or asset endpoint); frontend uses getContent(key) for image src.
- [ ] Docs: List of screen_locations, content keys, and image key → path mapping (for seeding and reference).

---

## Notes

- **TTL:** Use a single TTL for content (e.g. 5 min) unless you need different TTLs for validation_errors vs screen content; then use separate key prefixes and TTLs.
- **Key format:** Stick to `content:${screen}:${language}:${type}` and `dropdowns:${screen}:${language}` so that “refresh all content” can be implemented by scanning keys and deleting or by re-running warmup.
- **i18n:** After migration, you can reduce or remove locale JSON files that only contained migrated keys; keep only true UI strings in i18n if desired.
