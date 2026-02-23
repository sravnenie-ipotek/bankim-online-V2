# Code documentation (web-next)

## JSDoc convention

- **Components**: Add a JSDoc block above the component with a short description and `@param props.<name>` for each prop.
- **Functions / hooks**: Add a JSDoc block with description, `@param` for each argument, and `@returns` when non-obvious.
- **Interfaces / types**: A one-line JSDoc above the interface is sufficient; document non-obvious fields.

Example:

```ts
/**
 * Wraps a form control with a label. Use with input/select/textarea for accessibility.
 * @param props.id - Id bound to the control via htmlFor; must match the control's id.
 * @param props.label - Accessible label text.
 * @param props.children - The form control (input, select, textarea, etc.).
 */
const FormField: React.FC<FormFieldProps> = ({ id, label, children }) => { ... };
```

## Semicolons

- All statements and declarations use **semicolons** (`;`).
- Prettier is configured with `"semi": true` in `.prettierrc`. Run `npm run format` (or `npx prettier --write "src/**/*.{ts,tsx}"`) to enforce.

## Covered so far

JSDoc with `@param` has been added to a representative set of modules:

- **Components**: FormField, Container, FooterAccordion, LayoutShell, LoadingOverlay.
- **Hooks**: useContentApi, useRefetchWhenVisible, useDisclosure, useToggle, usePersistentToggle, useOutsideClick, useDropdownData.
- **Helpers**: getImagePath, ImagePathHelper.resolve, contentApiCache.getContentFromServer, StorageHelper, analytics (trackEvent, trackClick).
- **Providers**: ContentLoadingProvider, useContentLoadingContext, ErrorBoundary.

New code should follow the same pattern; add JSDoc to remaining components and pages as you touch them.
