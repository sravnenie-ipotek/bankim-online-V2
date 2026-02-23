# Frontend Review Report — apps/web-next

**Scope**: Review-only (no edits applied). Checklist source: `.cursor/skills/frontend-reviewer/SKILL.md`.  
**Date**: 2026-02-22.

---

## Blocking Issues

*None.* No ship-stoppers were identified. The app builds, TypeScript is strict, and there are no critical security or runtime blockers. The items below are high-priority improvements that should be addressed before or soon after release.

---

## High Priority

### 1. Tab-like UIs without ARIA tab semantics

**Locations**:
- `apps/web-next/src/app/(main)/payments/page.tsx` (lines 25–41)
- `apps/web-next/src/app/(main)/admin/bank-workers/page.tsx` (lines 93–99)
- `apps/web-next/src/app/(main)/registration/page.tsx` (lines 47–68)

**Problem**: Buttons are used as tabs (cards/history, invitations/approvals, phone/email) but lack `role="tablist"`, `role="tab"`, and `aria-selected`. Screen readers and keyboard users cannot understand tab structure or which panel is active.

**Fix required** (example for payments page):

```tsx
{/* Tabs */}
<div className="flex gap-2" role="tablist" aria-label="Payments sections">
  <button
    role="tab"
    aria-selected={activeTab === 'cards'}
    aria-controls="payments-cards-panel"
    id="tab-cards"
    onClick={() => setActiveTab('cards')}
    className={...}
  >
    {getContent('payment_cards')}
  </button>
  <button
    role="tab"
    aria-selected={activeTab === 'history'}
    aria-controls="payments-history-panel"
    id="tab-history"
    onClick={() => setActiveTab('history')}
    className={...}
  >
    {getContent('payment_history')}
  </button>
</div>
<div id="payments-cards-panel" role="tabpanel" aria-labelledby="tab-cards" hidden={activeTab !== 'cards'}>
  ...
</div>
<div id="payments-history-panel" role="tabpanel" aria-labelledby="tab-history" hidden={activeTab !== 'history'}>
  ...
</div>
```

Apply the same pattern to admin bank-workers and registration page tab groups. Add arrow-key navigation between tabs (optional but recommended).

---

### 2. ESLint: missing explicit critical rules

**Location**: `apps/web-next/eslint.config.mjs`

**Problem**: Config only spreads `nextVitals` and `nextTs`. The skill expects explicit enforcement of:
- `@typescript-eslint/no-explicit-any`: error
- `jsx-a11y/alt-text`: error
- `jsx-a11y/click-events-have-key-events`: error  
Next’s config may include some of these; they are not explicitly set, so behavior can change with Next upgrades.

**Fix required**: Add overrides (with `@typescript-eslint` and `eslint-plugin-jsx-a11y` as dependencies if not already present):

```js
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
// ... next config ...
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
    },
  },
```

---

### 3. TypeScript: enable noUnusedLocals

**Location**: `apps/web-next/tsconfig.json`

**Problem**: Skill requires `noUnusedLocals: true`. It is not set; only `strict: true` is present.

**Fix required**:

```json
"compilerOptions": {
  "strict": true,
  "noUnusedLocals": true,
  ...
}
```

---

### 4. Components over 200 lines

**Locations** (skill: “Components <200 lines”):

| File | Lines |
|------|-------|
| `apps/web-next/src/components/ui/VideoPoster/VideoPoster.tsx` | 466 |
| `apps/web-next/src/app/(main)/vacancies/[id]/page.tsx` | 300 |
| `apps/web-next/src/app/(main)/services/calculate-mortgage/components/FirstStep/FirstStepForm.tsx` | 284 |
| `apps/web-next/src/app/(main)/services/calculate-mortgage/components/ThirdStep/ThirdStepForm.tsx` | 276 |
| `apps/web-next/src/app/(main)/services/calculate-mortgage/components/SecondStep/SecondStepForm.tsx` | 233 |
| `apps/web-next/src/components/ui/VideoPoster/VideoControlBar.tsx` | 219 |

**Problem**: Large files are harder to maintain, test, and review.

**Fix required**: Split into smaller components and/or hooks:
- **VideoPoster.tsx**: Extract poster section, modal section, and control logic into subcomponents and a custom hook (e.g. `useVideoPosterState`).
- **VideoControlBar.tsx**: Extract control groups (playback, progress, volume, fullscreen) into separate components.
- **vacancies/[id]/page.tsx**: Extract form sections, file upload, and vacancy display into components; consider a form hook.
- **FirstStepForm / SecondStepForm / ThirdStepForm**: Extract repeated field groups and validation logic into shared components and helpers.

---

### 5. Inline styles and raw CSS-in-JS

**Locations**:
- `apps/web-next/src/components/ui/LoadingSpinner/LoadingSpinner.tsx` (lines 12–28): `style={{}}` and `<style>{@keyframes}`.
- `apps/web-next/src/components/ui/VideoPoster/VideoPoster.tsx` (e.g. 258, 285, 304): inline `style`.
- `apps/web-next/src/components/ui/VideoPoster/components/VideoControlBarSlider/VideoControlBarSlider.tsx` (line 46): inline style.
- `apps/web-next/src/components/ui/SliderInput/SliderInput.tsx` (line 78): inline style.
- `apps/web-next/src/components/ui/PartnersSwiper/PartnerSlide.tsx` (line 33): inline style.
- Others: `SoundButton.tsx`, `LoadingOverlay.tsx`, `HowItWorks.tsx`, `TextPage.tsx`, `DoubleButtons.tsx`, `SingleButton.tsx`.

**Problem**: Inline styles and raw keyframes in JSX complicate theming, responsive rules, and consistency with the rest of the app (Tailwind/CSS).

**Fix required**:
- **LoadingSpinner**: Move layout and spinner dimensions to Tailwind classes; define `@keyframes spin` in `globals.css` and apply via class (e.g. `animate-spin` or a custom utility).
- **VideoPoster / VideoControlBarSlider / SliderInput / PartnerSlide / etc.**: Replace inline `style` with Tailwind classes or CSS variables where possible; for dynamic values (e.g. slider thumb position), use CSS custom properties set in JS and a single class in CSS.

---

### 6. Console usage in production paths

**Locations**:
- `apps/web-next/src/hooks/useContentApi.ts` (lines 158–161): `console.error` for missing content keys.
- `apps/web-next/src/providers/ErrorBoundary.tsx` (line 28): `console.error` in `componentDidCatch`.
- Multiple pages/hooks: `console.error` in catch blocks (admin bank-workers, registration, broker-questionnaire, lawyers, status pages, ChangeLanguage, MobileLanguageSelector, adminSlice).

**Problem**: Uncontrolled console output in production; no structured logging or reporting. ErrorBoundary and useContentApi are called out in the plan.

**Fix required**:
- Introduce a small logging helper (e.g. `logError(message, context)`) that in development calls `console.error` and in production sends to your logging/monitoring (or no-op). Use it in ErrorBoundary and useContentApi.
- Replace ad-hoc `console.error` in catch blocks with the same helper (or a toast/UI feedback plus optional logging), so production behavior is consistent and auditable.

---

## Medium Priority

### 7. Page components: export default function vs React.FC

**Location**: Multiple under `apps/web-next/src/app/**` (e.g. `payments/page.tsx`, `registration/page.tsx`, `admin/bank-workers/page.tsx`).

**Problem**: Project rule is “Every Component must be react FC”. Many route pages use `export default function PageName()` instead of `const PageName: React.FC = () => ...` with default export.

**Fix required**: Align with project convention, e.g.:

```tsx
const Payments: React.FC = () => { ... }
export default Payments
```

Apply consistently across app route components (or document an exception for Next app router pages and enforce elsewhere).

---

### 8. Focus-visible and interactive elements

**Location**: Global focus styles exist in `apps/web-next/src/app/globals.css` (button, input, textarea, select). Some custom clickable elements (e.g. divs with `onClick`) may not get visible focus if they use `tabIndex` without matching styles.

**Recommendation**: Audit any element with `onClick` or `tabIndex={0}` that is not a `<button>` or `<a>` and ensure it has a visible `:focus-visible` style (or a class that includes it). FooterAccordion already uses `role="button"`, `tabIndex={0}`, and `onKeyDown`; ensure it (and similar components) have focus-visible styling.

---

### 9. Test coverage

**Location**: Only `apps/web-next/src/helpers/__tests__/getImagePath.test.ts` exists. Jest is configured in `package.json`.

**Problem**: Minimal coverage for helpers, hooks, and UI; regression risk is high.

**Fix required**:
- Add tests for critical helpers (e.g. content API cache, formatters) and at least one hook (e.g. `useContentApi` or `useDropdownData`).
- Add a few component tests (e.g. FormField, LoginDialog tabs, one form page) with React Testing Library.
- Document a minimum coverage target (e.g. 60% for helpers/hooks) and add coverage to CI.

---

### 10. Dropdowns / listboxes: aria-selected without role="option" / role="listbox"

**Locations**:
- `apps/web-next/src/components/ui/ChangeLanguage/ChangeLanguage.tsx` (line 102)
- `apps/web-next/src/components/ui/CurrencySelector/CurrencySelector.tsx` (line 70)
- `apps/web-next/src/components/ui/DropdownSelect/DropdownSelect.tsx` (line 101)
- `apps/web-next/src/components/layout/MobileMenu/MobileLanguageSelector.tsx` (line 52)
- `apps/web-next/src/components/layout/MobileMenu/MobileCurrencySelector.tsx` (line 45)

**Problem**: `aria-selected` is used on options, but parent/child roles may be missing (e.g. `role="listbox"` on container and `role="option"` on each item). Incomplete listbox semantics can confuse assistive tech.

**Fix required**: Ensure each dropdown has a container with `role="listbox"` and each selectable item has `role="option"` and `aria-selected`; manage focus and arrow-key navigation where appropriate.

---

## Low Priority

### 11. Prettier

**Location**: `apps/web-next/.prettierrc`

**Status**: Matches skill (printWidth: 100, tabWidth: 2, singleQuote: true, trailingComma: es5). No change needed.

---

### 12. Alt text on images

**Status**: Spot-check shows images use either meaningful `alt` or `alt=""` (decorative). No missing-alt violations found. Continue to require alt on every `<img>` and Next `<Image>`.

---

### 13. Hooks: dependency arrays and cleanup

**Status**: useContentApi and other hooks use proper cleanup (removeEventListener, clearTimeout, AbortController). No missing cleanup or obviously wrong dependency arrays were flagged. Keep exhaustive-deps in mind when adding rules (e.g. warn in ESLint).

---

### 14. Inline objects in JSX

**Problem**: Skill asks to avoid inline objects in props (e.g. `style={{ }}` or `options={[ ... ]}`) for performance and clarity. Several components use inline `style` (covered in High #5). A few components may pass inline arrays/objects as props.

**Recommendation**: When touching components, replace inline object/array props with `useMemo` or constants where it improves readability or prevents unnecessary rerenders.

---

## Summary

| Severity | Count |
|----------|-------|
| Blocking | 0 |
| High | 6 |
| Medium | 4 |
| Low | 4 |

**Recommended order of work**: (1) Add ARIA tab semantics to tab-like UIs and fix dropdown listbox roles (a11y). (2) Harden ESLint and TS (noUnusedLocals, explicit a11y/any rules). (3) Replace inline styles in LoadingSpinner and key VideoPoster/Slider components. (4) Introduce logging and reduce raw console usage. (5) Split largest components (VideoPoster, vacancy page, mortgage steps). (6) Add tests and align page components with React.FC convention.
