# i18n → Content API migration – remaining files

Pages/components that still use `useTranslation()` and/or `t()` for visible text. Migrate them to `useContentApi(screen)` + `getContent(key)` using the screen that matches the locale namespace (e.g. `common`, `legal`, `vacancies`, `tenders_lawyers`).

**Screen mapping:** `common` | `legal` | `vacancies` | `tenders_lawyers` | `contacts` | `about` | `cooperation` | `tenders_brokers` | `global_components` (copy of common).

## Already migrated (use getContent only)

- `app/(main)/cookie/page.tsx` → legal
- `app/(main)/terms/page.tsx` → legal
- `app/(main)/refund/page.tsx` → legal
- `app/(main)/services/page.tsx` → common
- `app/(main)/lawyers/page.tsx` → common (keeps i18n for language only)
- `app/(main)/broker-questionnaire/page.tsx` → common (keeps i18n for language only)
- `app/(main)/registration/page.tsx` → common
- `app/(main)/services/application-submitted/page.tsx` → common
- `app/(main)/lawyer-success/page.tsx` → common
- `app/(lawyers)/Real-Estate-Brokerage/page.tsx` → common
- `app/(lawyers)/tenders-for-lawyers/page.tsx` → tenders_lawyers
- `components/ui/TextPage/TextPage.tsx` → back button from global_components; title/text from props
- `components/ui/SingleButton/SingleButton.tsx` → global_components
- `components/ui/DoubleButtons/DoubleButtons.tsx` → global_components
- `components/ui/CookiePolicyModal/CookiePolicyModal.tsx` → legal

## Migrated in final pass (all now use getContent)

- `app/(main)/vacancies/[id]/page.tsx` → vacancies (+ navigation in locales)
- `app/(main)/admin/bank-workers/page.tsx` → common
- `app/(main)/payments/page.tsx` → common
- `app/(main)/payments/history/page.tsx` → common
- `app/(main)/personal-cabinet/page.tsx` → common
- `app/(main)/services/borrowers-personal-data/[stepNumber]/page.tsx` → common
- `app/(main)/services/refinance-mortgage/[stepNumber]/page.tsx` → common
- `app/(main)/services/calculate-credit/[stepNumber]/page.tsx` → common
- `app/(main)/services/refinance-credit/[stepNumber]/page.tsx` → common
- `app/(main)/services/other-borrowers/[stepNumber]/page.tsx` → common
- `app/(registration)/bank-worker/demo/page.tsx` → common
- `app/(registration)/bank-worker/register/[token]/page.tsx` → common
- `app/(registration)/bank-worker/status/[id]/page.tsx` → common
- `app/(registration)/bank-partner/register/page.tsx` → common
- `app/(registration)/bank-partner/status/[id]/page.tsx` → common
- `app/(registration)/bank-employee/register/page.tsx` → common
- `app/(standalone)/mobile-upload/[uploadId]/page.tsx` → common
- `components/ui/ChangeLanguage/ChangeLanguage.tsx` → global_components (keeps i18n for changeLanguage)
- `components/layout/Header/LoginLanguage.tsx` → global_components
- `components/ui/PersonalCabinetSection/PersonalCabinetSection.tsx` → common
- `components/ui/CurrencySelector/CurrencySelector.tsx` → global_components
- `components/layout/MobileMenu/MobileLanguageSelector.tsx` → global_components (keeps i18n for changeLanguage)
- `components/layout/Footer/Company.tsx` → global_components
- `components/layout/Footer/Documents.tsx` → global_components
- `components/layout/Footer/Contacts.tsx` → global_components
- `app/(lawyers)/tenders-for-lawyers/page.tsx` → tenders_lawyers (fixed remaining t('tenders_cta_title'))

## Keep useTranslation only for i18n.language

These use `useTranslation()` only for `i18n.language` (e.g. API `lang` or routing). Keep the hook; no need to replace with getContent unless they also use `t()` for UI strings.

- `hooks/useContentApi.ts` – i18n.language
- `app/(main)/vacancies/page.tsx` – i18n.language for fetch
- `app/(main)/services/calculate-mortgage/components/FirstStep/FirstStepForm.tsx` – i18n
- `components/layout/LayoutShell.tsx` – i18n
- `components/ui/VideoPoster/VideoPoster.tsx` – i18n
- `hooks/useDropdownData.ts` – i18n.language
- `hooks/useLanguageSync.ts` – i18n
