"use server";

import { randomBytes } from "node:crypto";
import { refresh, updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/dal";
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { getCollection, sanitize } from "@/lib/content/collections";
import { contentTag } from "@/lib/content";
import { query } from "@/lib/db";

export type FormState = { error?: string; message?: string; email?: string } | undefined;

// Slow down password guessing. Failures are counted per email and per network
// address: an email is locked for 15 minutes after 5 failures from one address,
// and an address is locked after 20 failures across any emails. Locking per
// address (not per email alone) means a stranger cannot lock the real admin out.
type Failures = { count: number; until: number };
const failures = new Map<string, Failures>();
const MAX_FAILURES_PER_EMAIL = 5;
const MAX_FAILURES_PER_IP = 20;
const LOCK_MS = 15 * 60 * 1000;

// Checked when an email does not exist, so a wrong email takes as long as a
// wrong password and does not reveal which admin emails are real.
let dummyHash: Promise<string> | undefined;

function activeCount(key: string) {
  const record = failures.get(key);
  return record && record.until > Date.now() ? record.count : 0;
}

function recordFailure(key: string) {
  failures.set(key, { count: activeCount(key) + 1, until: Date.now() + LOCK_MS });
}

function pruneFailures() {
  const now = Date.now();
  for (const [key, record] of failures) if (record.until <= now) failures.delete(key);
}

async function clientAddress() {
  const h = await headers();
  // Caddy (deploy/Caddyfile) sets X-Forwarded-For; the first entry is the visitor.
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
}

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };
  if (email.length > 254 || password.length > 1024) return { error: "Incorrect email or password.", email };

  pruneFailures();
  const ip = await clientAddress();
  const ipKey = `ip:${ip}`;
  const emailKey = `email:${ip}:${email}`;
  if (activeCount(ipKey) >= MAX_FAILURES_PER_IP || activeCount(emailKey) >= MAX_FAILURES_PER_EMAIL) {
    return { error: "Too many failed attempts. Try again in 15 minutes.", email };
  }

  const [user] = await query<{ id: number; password_hash: string }>(
    "SELECT id, password_hash FROM users WHERE email = $1",
    [email],
  );
  dummyHash ??= hashPassword(randomBytes(16).toString("hex"));
  const valid = await verifyPassword(password, user?.password_hash ?? (await dummyHash));
  if (!user || !valid) {
    recordFailure(ipKey);
    recordFailure(emailKey);
    return { error: "Incorrect email or password.", email };
  }

  failures.delete(emailKey);
  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

export async function saveContent(key: string, json: string): Promise<FormState> {
  const user = await requireUser();
  const collection = getCollection(key);
  if (!collection) return { error: "Unknown content section." };

  let data: unknown;
  try {
    data = sanitize(collection.root, JSON.parse(json));
  } catch (error) {
    return { error: error instanceof Error ? error.message : "The content could not be read." };
  }

  await query(
    `INSERT INTO content (key, data, updated_at, updated_by) VALUES ($1, $2, now(), $3)
     ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = now(), updated_by = EXCLUDED.updated_by`,
    [key, JSON.stringify(data), user.id],
  );
  updateTag(contentTag(key));
  refresh();
  return { message: "Saved. The website now shows your changes." };
}

export async function resetContent(key: string): Promise<FormState> {
  await requireUser();
  if (!getCollection(key)) return { error: "Unknown content section." };
  await query("DELETE FROM content WHERE key = $1", [key]);
  updateTag(contentTag(key));
  refresh();
  return { message: "Restored the original content from the organisational profile." };
}

export async function createUser(_: FormState, formData: FormData): Promise<FormState> {
  await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a name and a valid email." };
  if (password.length < MIN_PASSWORD_LENGTH) return { error: `The password must be at least ${MIN_PASSWORD_LENGTH} characters.` };

  const existing = await query("SELECT 1 FROM users WHERE email = $1", [email]);
  if (existing.length) return { error: "An admin with that email already exists." };

  await query("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)", [
    name,
    email,
    await hashPassword(password),
  ]);
  refresh();
  return { message: `Added ${name}. They can now sign in with that email and password.` };
}

export async function deleteUser(userId: number): Promise<FormState> {
  const user = await requireUser();
  if (userId === user.id) return { error: "You cannot remove your own account." };
  await query("DELETE FROM users WHERE id = $1", [userId]);
  refresh();
  return { message: "Removed." };
}

export async function changePassword(_: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  if (next.length < MIN_PASSWORD_LENGTH) return { error: `The new password must be at least ${MIN_PASSWORD_LENGTH} characters.` };

  const [row] = await query<{ password_hash: string }>("SELECT password_hash FROM users WHERE id = $1", [user.id]);
  if (!row || !(await verifyPassword(current, row.password_hash))) return { error: "Your current password is incorrect." };

  await query("UPDATE users SET password_hash = $1 WHERE id = $2", [await hashPassword(next), user.id]);
  // Sign out other browsers that used the old password.
  await query("DELETE FROM sessions WHERE user_id = $1", [user.id]);
  await createSession(user.id);
  return { message: "Password changed. Other devices have been signed out." };
}
