import "server-only";
import { Pool, type QueryResultRow } from "pg";

// Reuse one pool across hot reloads in development.
const globalForDb = globalThis as unknown as { sharanPool?: Pool };

function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  globalForDb.sharanPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
  return globalForDb.sharanPool;
}

export async function query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  const { rows } = await getPool().query<T>(text, params);
  return rows;
}
