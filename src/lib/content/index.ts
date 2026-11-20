import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { query } from "@/lib/db";
import * as defaults from "./defaults";

export type { Accent } from "./defaults";

type Defaults = typeof defaults;
export type ContentKey = { [K in keyof Defaults]: Defaults[K] extends (...args: never[]) => unknown ? never : K }[keyof Defaults];
export type Content<K extends ContentKey> = Defaults[K];

export const contentTag = (key: string) => `content:${key}`;

/**
 * Reads one content collection: the version saved in the admin if there is
 * one, otherwise the built-in default. Cached until an admin saves a change
 * (see updateTag in app/admin/actions.ts). If the database is unreachable the
 * default is served and the read is retried after a few minutes.
 */
export async function getContent<K extends ContentKey>(key: K): Promise<Content<K>> {
  "use cache";
  cacheTag(contentTag(key));
  try {
    const rows = await query<{ data: Content<K> }>("SELECT data FROM content WHERE key = $1", [key]);
    cacheLife("max");
    return withDefaults(rows[0]?.data, defaults[key]);
  } catch (error) {
    console.error(`[content] Could not load "${key}" from the database; using the default.`, error);
    cacheLife("minutes");
    return defaults[key];
  }
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/** Saved object sections keep any parts added to the defaults after they were saved (e.g. a new page header). */
export function withDefaults<T>(saved: T | undefined, fallback: T): T {
  if (saved === undefined) return fallback;
  return isObject(saved) && isObject(fallback) ? ({ ...fallback, ...saved } as T) : saved;
}

export function getDefault<K extends ContentKey>(key: K): Content<K> {
  return defaults[key];
}
