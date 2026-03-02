# Vacancy application form – content keys (screen: vacancies)

All keys below are used in `apps/web-next/src/app/(main)/vacancies/[id]/page.tsx` and must exist in the content DB (content_items + content_translations) for screen_location = `vacancies`. Values are sourced from `public/locales/{en,he,ru}/vacancies.json`. Run `node scripts/generate-content-sql-from-i18n.js` to generate full SQL (includes these keys).

## Form fields and validation
| Content key | Usage |
|-------------|--------|
| `vacancyDetail.applicationForm.validation.required` | Error message when field is empty |
| `vacancyDetail.applicationForm.validation.invalidEmail` | Error message when email format is invalid |
| `vacancyDetail.applicationForm.title` | Form heading |
| `vacancyDetail.applicationForm.fullName` | Label |
| `vacancyDetail.applicationForm.fullNamePlaceholder` | Placeholder |
| `vacancyDetail.applicationForm.email` | Label |
| `vacancyDetail.applicationForm.emailPlaceholder` | Placeholder |
| `vacancyDetail.applicationForm.expectedSalary` | Label |
| `vacancyDetail.applicationForm.expectedSalaryPlaceholder` | Placeholder |
| `vacancyDetail.applicationForm.phone` | Label + aria-label |
| `vacancyDetail.applicationForm.phonePlaceholder` | Placeholder |
| `vacancyDetail.applicationForm.city` | Label |
| `vacancyDetail.applicationForm.cityPlaceholder` | Placeholder |
| `vacancyDetail.applicationForm.portfolioUrl` | Label |
| `vacancyDetail.applicationForm.portfolioUrlPlaceholder` | Placeholder |
| `vacancyDetail.applicationForm.resume` | Label |
| `vacancyDetail.applicationForm.fileInstruction` | Upload area text + aria-label |
| `vacancyDetail.applicationForm.coverLetter` | Label |
| `vacancyDetail.applicationForm.coverLetterPlaceholder` | Placeholder |
| `vacancyDetail.applicationForm.submit` | Submit button text |
| `vacancyDetail.applicationForm.submitting` | Submit button loading text |
| `vacancyDetail.applicationForm.success` | Success heading |
| `vacancyDetail.applicationForm.successMessage` | Success body |

## Shared (dropdown / general)
| Content key | Usage |
|-------------|--------|
| `search` | City dropdown search placeholder |
| `nothing_found` | City dropdown empty state |

## Detail / error state
| Content key | Usage |
|-------------|--------|
| `vacancy_not_found` | Error heading when vacancy missing |
| `vacancy_not_found_description` | Error description |
| `vacancies.backToVacancies` | Link text |
| `navigation.home` | Home link |
| `vacancies.title` | Breadcrumb / title |
| `vacancy_salary_from` | Salary label (e.g. "From") |
| `vacancyDetail.generalInfo` | Section heading |
| `vacancyDetail.responsibilities` | Section heading |
| `vacancyDetail.requirements` | Section heading |
| `vacancyDetail.niceToHave` | Section heading |
| `vacancyDetail.benefits` | Section heading |

## Category labels (dynamic)
Keys like `vacancies.categories.${category}` and employment labels (e.g. `vacancy_employment_fulltime`) are also used; ensure they exist in vacancies.json for the categories you use.
