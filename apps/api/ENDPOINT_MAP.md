# API Endpoint Map — Express → NestJS

All routes are under the `/api` global prefix (configured in `main.ts`).

## Health

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `GET /api/health` | `HealthController` | `getHealth()` |
| `GET /api/server-mode` | `HealthController` | `getServerMode()` |

## Content

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `GET /api/content/screen/:screen/:language` | `ContentController` | `getContentByScreen()` |
| `GET /api/content/:key/:language` | `ContentController` | `getContentByKey()` |
| `GET /api/content/categories` | `ContentController` | `getCategories()` |
| `GET /api/content/languages` | `ContentController` | `getLanguages()` |
| `GET /api/content/validation_errors/:language` | `ContentController` | `getValidationErrors()` |
| `GET /api/content/items` | `ContentController` | `getContentItems()` |
| `GET /api/content/cache/stats` | `ContentController` | `getCacheStats()` |
| `DELETE /api/content/cache` | `ContentController` | `clearCache()` |

## Dropdowns

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `GET /api/dropdowns/:screen/:language` | `ContentController` | `getDropdowns()` |
| `GET /api/v1/dropdowns/:fieldName` | `ContentController` | `getDropdownByField()` |
| `GET /api/v1/dropdown-options` | `ContentController` | `getDropdownOptions()` |

## Mortgage / Calculation

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `GET /api/v1/calculation-parameters` | `MortgageController` | `getCalculationParameters()` |
| `GET /api/property-ownership-ltv` | `MortgageController` | `getPropertyOwnershipLtv()` |
| `GET /api/customer/property-ownership-options` | `MortgageController` | `getPropertyOwnershipOptions()` |
| `POST /api/customer/calculate-payment` | `MortgageController` | `calculatePayment()` |

## Banks

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `GET /api/v1/banks` | `BanksController` | `getBanks()` |
| `GET /api/banks/list` | `BanksController` | `getBanksList()` |
| `GET /api/banks/:bankId/branches` | `BanksController` | `getBranches()` |
| `GET /api/bank-numbers/israel` | `BanksController` | `getIsraeliBankNumbers()` |
| `GET /api/services/list` | `BanksController` | `getServicesList()` |

## Locations

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `GET /api/v1/cities` | `LocationsController` | `getCitiesV1()` |
| `GET /api/get-cities` | `LocationsController` | `getCities()` |
| `GET /api/get-regions` | `LocationsController` | `getRegions()` |
| `GET /api/get-professions` | `LocationsController` | `getProfessions()` |

## Auth

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `POST /api/login` | `AuthController` | `emailLogin()` |
| `POST /api/auth-mobile` | `AuthController` | `smsLogin()` |
| `POST /api/auth-verify` | `AuthController` | `smsVerify()` |
| `POST /api/auth-password` | `AuthController` | `passwordLogin()` |
| `POST /api/email-code-login` | `AuthController` | `emailCodeLogin()` |

## Bank Worker Registration

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `POST /api/bank-employee/register` | `BankWorkerController` | `register()` |
| `GET /api/registration-config/:language` | `BankWorkerController` | `getRegistrationConfig()` |

## Vacancies

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `GET /api/vacancies` | `VacanciesController` | `getAll()` |
| `GET /api/vacancies/categories` | `VacanciesController` | `getCategories()` |
| `GET /api/vacancies/:id` | `VacanciesController` | `getById()` |
| `POST /api/vacancies/:id/apply` | `VacanciesController` | `apply()` |

## Refinance

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `POST /api/refinance-mortgage` | `RefinanceController` | `refinanceMortgage()` |
| `POST /api/refinance-credit` | `RefinanceController` | `refinanceCredit()` |

## Lawyers

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `GET /api/lawyers` | `LawyersController` | `getAll()` |

## Customer (placeholder)

| Express | Nest Controller | Method |
|---------|----------------|--------|
| `POST /api/customer/compare-banks` | `CustomerController` | `compareBanks()` |
| `GET /api/customer/mortgage-programs` | `CustomerController` | `getMortgagePrograms()` |
| `GET /api/cors-test` | `CustomerController` | `getCorsTest()` |

---

## Not Migrated (Admin-only, behind `requireAdmin`)

The minimal admin endpoints used by the web app (`/api/admin/login`, `/api/admin/profile`,
`/api/admin/stats`, `/api/admin/banks`, `/api/admin/invitations`, `/api/admin/approval-queue`,
`/api/admin/approve/:id`, `/api/admin/reject/:id`) have been migrated to the `AdminModule`.
The remaining admin CRUD endpoints (bank config, applications, banking standards, etc.)
are not yet migrated and are not used by the current web frontend.
