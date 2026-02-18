# Parity Testing Checklist

Compare the Next.js app (`localhost:3000`) against the Vite app (`localhost:5173`) running side-by-side against the same API (`localhost:8003`).

## How to run side-by-side

```bash
# Terminal 1 — API (NestJS)
cd apps/api && npm run start:dev

# Terminal 2 — Vite app (existing)
cd apps/web && npm run dev          # → http://localhost:5173

# Terminal 3 — Next.js app (new)
cd apps/web-next && npm run dev     # → http://localhost:3000
```

## Navigation

- [ ] All main routes load without errors
- [ ] Navigation via Header logo → Home works
- [ ] Navigation via Footer links works
- [ ] Navigation via Sidebar/MobileMenu links works
- [ ] Browser back/forward navigation works
- [ ] Direct URL access (copy-paste) works for all routes

## i18n / Direction

- [ ] Hebrew (he) loads correctly — RTL direction
- [ ] Russian (ru) loads correctly — LTR direction
- [ ] Language switcher toggles correctly
- [ ] All translation keys resolve (no raw keys displayed)

## Layout

- [ ] Header renders identically (logo, login button, burger menu)
- [ ] Footer renders identically (Company, Contacts, Documents sections)
- [ ] Desktop sidebar opens/closes correctly
- [ ] Mobile menu opens/closes correctly
- [ ] Sidebar menu items match production
- [ ] Responsive breakpoints match (desktop → tablet → mobile)

## Public Pages

- [ ] Home page content and layout
- [ ] About page content
- [ ] Contacts page content
- [ ] Vacancies list page
- [ ] Vacancy detail page
- [ ] Terms page
- [ ] Privacy Policy page
- [ ] Cookie Policy page
- [ ] Refund Policy page
- [ ] Cooperation page

## Services Flows

- [ ] Services overview page loads
- [ ] Calculate Mortgage steps 1-N
- [ ] Refinance Mortgage steps 1-N
- [ ] Calculate Credit steps 1-N
- [ ] Refinance Credit steps 1-N
- [ ] Borrowers Personal Data steps
- [ ] Other Borrowers steps
- [ ] Application Submitted confirmation

## Banks

- [ ] Bank Hapoalim page
- [ ] Bank Discount page
- [ ] Bank Leumi page
- [ ] First International page
- [ ] Mercantile Discount page
- [ ] Bank of Jerusalem page

## Personal Cabinet

- [ ] Main dashboard
- [ ] Settings page
- [ ] Questionnaire pages
- [ ] Personal data pages (partner, main borrower, co-borrower)
- [ ] Income data pages
- [ ] Credit history page
- [ ] Documents page
- [ ] Bank authorization page

## Registration Flows

- [ ] Bank Employee registration
- [ ] Bank Partner registration
- [ ] Bank Worker registration

## Admin

- [ ] Admin login
- [ ] Admin dashboard
- [ ] Bank worker management

## Mobile Upload

- [ ] Mobile document upload page (standalone layout)

## API Integration

- [ ] All API calls reach the NestJS backend through /api proxy
- [ ] Form submissions work correctly
- [ ] File uploads work correctly

## Performance

- [ ] Initial page load time comparable
- [ ] Client-side navigation smooth
- [ ] No excessive bundle size increase

---

## Cutover Steps

1. Build the Next.js app: `cd apps/web-next && npm run build`
2. Start the production server: `npm run start`
3. Update nginx config to route `/` to the Next.js app (port 3000) instead of the Vite build
4. Keep `/api/*` routing to the Nest API unchanged
5. Verify all checklist items above in the production environment
6. Monitor for errors in browser console and server logs
