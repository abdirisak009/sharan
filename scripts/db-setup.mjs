// Creates the database tables and the first admin account.
// Usage: npm run db:setup   (reads DATABASE_URL and ADMIN_* from .env.local)
// Needs Node 22.18+ to run the shared .ts files directly (the Docker image uses Node 24).
import { readFileSync, existsSync } from "node:fs";
import pg from "pg";

const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 18)) {
  console.error(`db:setup needs Node 22.18 or newer (this is Node ${process.versions.node}).`);
  console.error("With nvm: run `nvm use` in this folder (it reads .nvmrc), then try again.");
  process.exit(1);
}
// Loaded after the version check: older Node versions cannot run .ts files.
const { hashPassword, MIN_PASSWORD_LENGTH } = await import("../src/lib/auth/password.ts");
const { defaultCategories, defaultPosts } = await import("../src/lib/news/defaults.ts");

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const { DATABASE_URL, ADMIN_EMAIL, ADMIN_NAME = "Administrator", ADMIN_PASSWORD } = process.env;
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const client = new pg.Client({ connectionString: DATABASE_URL });
await client.connect();
try {
  await client.query(readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8"));
  console.log("✓ Tables are ready");

  // Seed the news with the built-in categories and posts the first time.
  const news = await client.query("SELECT count(*)::int AS n FROM news_categories");
  if (news.rows[0].n === 0) {
    for (const [i, c] of defaultCategories.entries()) {
      await client.query("INSERT INTO news_categories (slug, name, sort) VALUES ($1, $2, $3)", [c.slug, c.name, i]);
    }
    for (const p of defaultPosts) {
      await client.query(
        `INSERT INTO news_posts (slug, title, excerpt, body, image, published, published_at, category_id)
         VALUES ($1, $2, $3, $4, $5, true, $6, (SELECT id FROM news_categories WHERE slug = $7))`,
        [p.slug, p.title, p.excerpt, p.body, p.image, p.date, p.category],
      );
    }
    console.log(`✓ Added ${defaultCategories.length} news categories and ${defaultPosts.length} posts`);
  }

  const { rows } = await client.query("SELECT count(*)::int AS n FROM users");
  if (rows[0].n > 0) {
    console.log(`✓ ${rows[0].n} admin user(s) already exist; no user created`);
  } else if (!ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < MIN_PASSWORD_LENGTH) {
    console.log(`! Set ADMIN_EMAIL and ADMIN_PASSWORD (at least ${MIN_PASSWORD_LENGTH} characters) to create the first admin`);
    process.exitCode = 1;
  } else {
    await client.query("INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3)", [
      ADMIN_EMAIL.trim().toLowerCase(),
      ADMIN_NAME,
      await hashPassword(ADMIN_PASSWORD),
    ]);
    console.log(`✓ Created admin user ${ADMIN_EMAIL}`);
  }
} finally {
  await client.end();
}
