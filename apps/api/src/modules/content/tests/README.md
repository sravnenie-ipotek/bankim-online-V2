# Content module tests – co-located structure

Test support for the content module lives here so spec files stay focused on scenarios and assertions.

## Layout

- **`interfaces/`** – One interface/type per file. Used for assertion types and mock contracts (e.g. `GetContentByScreenResult`, `ContentItemRepoMock`). No `any`; use strict test DTOs.
- **`fixtures/`** – Class-based test data: `ContentFixtures` exposes static readonly fixture values (e.g. `ContentFixtures.rawContentRow`, `ContentFixtures.dbError`).
- **`helpers/`** – Class-based helpers with static methods: `QueryChainHelper` (chain mocks), `ContentModuleTestbed` (createDefaultMocks, buildProviders), `ContentControllerTestbed` (createContentServiceMock, createDropdownServiceMock).

## Import rules

- Use **relative imports** from spec files (e.g. `./tests/fixtures/content.fixtures`, `./tests/helpers/query-chain.helper`).
- Keep everything **module-local**; move to `src/tests/common/` only when shared by two or more modules.

## Applying this pattern to other modules

1. Create `tests/interfaces/`, `tests/fixtures/`, `tests/helpers/` under the module.
2. Put each test-only interface in its own file under `tests/interfaces/` (e.g. `get-foo-result.interface.ts`, `foo-repo-mock.interface.ts`).
3. Put shared test data in `tests/fixtures/` (e.g. `foo.fixtures.ts`).
4. Put chain/mock/module setup in `tests/helpers/` (e.g. `query-chain.helper.ts`, `module-testbed.helper.ts`).
5. Keep `*.spec.ts` files in the module root; they should only import from `./tests/...` and production code.
