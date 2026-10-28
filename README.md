# SHARAN website

Website for **SHARAN – Shabelle Resilience & Action Network**, built with Next.js (App Router) and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start   # production
```

## Pages

Home · About · Programs · Where we work · Impact & strategy · News (+ article pages) · Get involved (partner, donate, volunteer, careers) · Accountability (CHS, safeguarding, feedback form) · Contact

## Editing content

- `src/lib/site.ts` – email, phone, address, social links (**placeholders marked `confirm` must be updated before launch**)
- `src/lib/content.ts` – pillars, values, governance, regions, strategy (from the 2026 Organisational Profile)
- `src/lib/news.ts` – news articles
- Brand colours live in `src/app/globals.css` (`@theme`)

Forms (contact, donate, feedback, newsletter) currently open the visitor's email app with a prefilled message, because there is no backend yet. Replace `sendViaEmail` in `src/components/Forms.tsx` with an API/form service when ready.
