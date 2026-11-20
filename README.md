# SHARAN website

Website for **SHARAN – Shabelle Resilience & Action Network**, built with Next.js (App Router), Tailwind CSS v4, PostgreSQL and MinIO.

## Layout

The site is one Next.js app: the public pages, the admin panel and the server code run together.

```
src/app/          pages: public site in (site)/, admin panel in admin/
src/components/   UI components
src/lib/          server code: auth, database, content, news, media uploads
db/schema.sql     tables: users, sessions, content, news_categories, news_posts
scripts/          db-setup.mjs: creates the tables, seeds the news and the first admin (safe to re-run)
deploy/           Docker Compose stack: Caddy (HTTPS), website, PostgreSQL, MinIO, nightly backups
```

## Run locally

Start a database (any PostgreSQL 14+ works; this uses Podman):

```bash
podman run -d --name sharan-postgres --restart unless-stopped \
  -e POSTGRES_USER=sharan -e POSTGRES_PASSWORD=CHANGE_ME -e POSTGRES_DB=sharan \
  -p 127.0.0.1:5433:5432 -v sharan-pgdata:/var/lib/postgresql/data \
  docker.io/library/postgres:16-alpine
```

Then:

```bash
nvm use                      # Node 24, from .nvmrc (same as the Docker image)
npm install
cp .env.example .env.local   # set DATABASE_URL and the first admin's email/password
npm run db:setup             # creates the tables and the first admin user
npm run dev                  # http://localhost:3000, admin at /admin
npm run build && npm start   # production
```

After a reboot, start the database again with `npm run db:start`.

Photo uploads in the admin need MinIO: set `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` in `.env.local`.

## Deploy

On the server, from `deploy/`:

```bash
cp .env.example .env      # fill in strong passwords, the domain and the server IP
docker compose up -d --build
```

The website container runs the database setup on every start. Once you can sign in, remove `ADMIN_PASSWORD` from `.env` and run `docker compose up -d` again.

**Backups:** the `backup` service writes a database dump and a photo archive to `deploy/backups/` every 24 hours and keeps 14 days. They are on the same disk as the live data, so copy them off the server regularly. Restore steps are in `deploy/backup.sh`.

## Pages

Home · About · Programs · Projects · Where we work · Impact & strategy · News (categories + article pages) · Get involved (partner, donate, volunteer, careers) · Accountability (CHS, safeguarding, feedback form) · Contact

## Editing content

Sign in at **`/admin`** to edit the text on every page, publish news (with categories and photo uploads) and manage admin users. Changes go live as soon as you save, and each section can be reset to the original profile text.

How it works:

- `src/lib/content/defaults.ts` – the original content from the 2026 Organisational Profile. It is shown until a section is edited, and if the database is unreachable.
- `src/lib/content/collections.ts` – the editable sections and their fields. The admin forms are generated from it; add a field here and in `defaults.ts` to make new content editable.
- `src/lib/news/defaults.ts` – the built-in news used to seed the database and as a fallback.
- Public pages are prerendered and cached; saving in the admin refreshes only what changed.

Still edited in code:

- `src/lib/site.ts` – email, phone, address, social links (**placeholders marked `confirm` must be updated before launch**)
- `src/lib/photos.ts` – photo library and credits
- Brand colours live in `src/app/globals.css` (`@theme`)

Forms (contact, donate, feedback, newsletter) currently open the visitor's email app with a prefilled message, because nothing receives them on the server yet. Replace `sendViaEmail` in `src/components/Forms.tsx` when a backend for them is chosen.
