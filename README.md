# SHARAN website

Website for **SHARAN – Shabelle Resilience & Action Network**, built with Next.js (App Router) and Tailwind CSS v4.

## Run locally

The site stores editable content in PostgreSQL. Start a database (any PostgreSQL 14+ works; this uses Podman):

```bash
podman run -d --name sharan-postgres --restart unless-stopped \
  -e POSTGRES_USER=sharan -e POSTGRES_PASSWORD=CHANGE_ME -e POSTGRES_DB=sharan \
  -p 127.0.0.1:5433:5432 -v sharan-pgdata:/var/lib/postgresql/data \
  docker.io/library/postgres:16-alpine
```

Then:

```bash
npm install
cp .env.example .env.local   # set DATABASE_URL and the first admin's email/password
npm run db:setup             # creates the tables and the first admin user
npm run dev                  # http://localhost:3000, admin at /admin
npm run build && npm start   # production
```

After a reboot, start the database again with `npm run db:start`.

## Pages

Home · About · Programs · Where we work · Impact & strategy · News (+ article pages) · Get involved (partner, donate, volunteer, careers) · Accountability (CHS, safeguarding, feedback form) · Contact

## Editing content

Sign in at **`/admin`** to edit the text on every page: page headers, the home page, pillars, values, governance, team, regions, strategy, CHS commitments and more. Changes go live as soon as you save, and each section can be reset to the original profile text. Admins can add other admins under **Admin users**.

How it works:

- `src/lib/content/defaults.ts` – the original content from the 2026 Organisational Profile. It is shown until a section is edited, and if the database is unreachable.
- `src/lib/content/collections.ts` – the list of editable sections and their fields. The admin forms are generated from it; add a field here and in `defaults.ts` to make new content editable.
- `db/schema.sql` – tables: `users`, `sessions` and `content` (one JSON document per edited section).
- Public pages are prerendered and cached; saving in the admin refreshes only the changed section.

Still edited in code:

- `src/lib/site.ts` – email, phone, address, social links (**placeholders marked `confirm` must be updated before launch**)
- `src/lib/news.ts` – news articles
- `src/lib/photos.ts` – photos and credits
- Brand colours live in `src/app/globals.css` (`@theme`)

Forms (contact, donate, feedback, newsletter) currently open the visitor's email app with a prefilled message, because there is no backend yet. Replace `sendViaEmail` in `src/components/Forms.tsx` with an API/form service when ready.
