-- SHARAN website database. Safe to run more than once.

CREATE TABLE IF NOT EXISTS users (
  id            serial PRIMARY KEY,
  email         text NOT NULL UNIQUE,
  name          text NOT NULL,
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- One row per signed-in browser. The id is a SHA-256 hash of the cookie
-- token, so a leaked database does not leak usable sessions.
CREATE TABLE IF NOT EXISTS sessions (
  id         text PRIMARY KEY,
  user_id    integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

-- Edited website content, one JSON document per collection
-- (see src/lib/content/collections.ts). Collections without a row use the
-- defaults in src/lib/content/defaults.ts.
CREATE TABLE IF NOT EXISTS content (
  key        text PRIMARY KEY,
  data       jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by integer REFERENCES users(id) ON DELETE SET NULL
);

-- News, published from /admin/news.
CREATE TABLE IF NOT EXISTS news_categories (
  id         serial PRIMARY KEY,
  slug       text NOT NULL UNIQUE,
  name       text NOT NULL,
  sort       integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news_posts (
  id           serial PRIMARY KEY,
  slug         text NOT NULL UNIQUE,
  title        text NOT NULL,
  excerpt      text NOT NULL DEFAULT '',
  body         text NOT NULL DEFAULT '',
  category_id  integer REFERENCES news_categories(id) ON DELETE SET NULL,
  -- A photo key from src/lib/photos.ts, or "media/<file>" for an image uploaded to MinIO.
  image        text NOT NULL DEFAULT 'riverAerial',
  published    boolean NOT NULL DEFAULT false,
  published_at date NOT NULL DEFAULT current_date,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  updated_by   integer REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS news_posts_published_idx ON news_posts(published, published_at DESC);
