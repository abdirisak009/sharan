"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/dal";
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { getCollection, sanitize } from "@/lib/content/collections";
import { contentTag } from "@/lib/content";
import { query } from "@/lib/db";

export type FormState = { error?: string; message?: string; email?: string } | undefined;

// Slow down password guessing: after 5 failures an email is locked for 15 minutes.
const failures = new Map<string, { count: number; until: number }>();
const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const record = failures.get(email);
  if (record && record.count >= MAX_FAILURES && record.until > Date.now()) {
    return { error: "Too many failed attempts. Try again in 15 minutes.", email };
  }

  const [user] = await query<{ id: number; password_hash: string }>(
    "SELECT id, password_hash FROM users WHERE email = $1",
    [email],
  );
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    const count = (record && record.until > Date.now() ? record.count : 0) + 1;
    failures.set(email, { count, until: Date.now() + LOCK_MS });
    return { error: "Incorrect email or password.", email };
  }

  failures.delete(email);
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
