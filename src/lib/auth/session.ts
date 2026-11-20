import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { cache } from "react";
import { query } from "@/lib/db";
import { SESSION_COOKIE } from "./cookie";

const SESSION_DAYS = 7;

export type AdminUser = { id: number; name: string; email: string };

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await query("INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)", [hashToken(token), userId, expires]);
  await query("DELETE FROM sessions WHERE expires_at < now()");
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    // HTTPS-only in production. Set COOKIE_SECURE=false while the site is
    // served over plain HTTP (e.g. by IP address before a domain is set up).
    secure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function deleteSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await query("DELETE FROM sessions WHERE id = $1", [hashToken(token)]);
  jar.delete(SESSION_COOKIE);
}

/** The signed-in admin for this request, or null. Deduplicated per request. */
export const getSessionUser = cache(async (): Promise<AdminUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const rows = await query<AdminUser>(
    `SELECT u.id, u.name, u.email FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.id = $1 AND s.expires_at > now()`,
    [hashToken(token)],
  );
  return rows[0] ?? null;
});
