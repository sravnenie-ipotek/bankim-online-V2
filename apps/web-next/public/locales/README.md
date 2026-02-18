# Per-page translation files

Translations are split by page/section. Each locale folder (`en`, `he`, `ru`) contains:

| File | Content / used on |
|------|-------------------|
| `common.json` | Shared UI: footer, buttons, auth, forms, services, etc. |
| `main_page.json` | Home page hero and top services |
| `about.json` | About page |
| `contacts.json` | Contacts page |
| `cooperation.json` | Cooperation page |
| `vacancies.json` | Vacancies list and detail |
| `tenders_brokers.json` | Tenders for Brokers page |
| `tenders_lawyers.json` | Tenders for Lawyers page |
| `legal.json` | Terms, Privacy, Cookie, Refund pages |

In `src/lib/i18n.ts` these are merged into a single `translation` namespace, so existing `t('key')` usage does not change.

To add or edit keys: update the JSON file that matches the page (e.g. `about.json` for `about_*` keys).

The app loads only these per-page files; `translation.json` is not used and has been removed.
