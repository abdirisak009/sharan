import type { Metadata } from "next";
import { AddUserForm, ChangePasswordForm, DeleteUserButton } from "@/components/admin/AdminForms";
import { requireUser } from "@/lib/auth/dal";
import { formatWhen } from "@/lib/content/admin";
import { query } from "@/lib/db";

// Reads the session on every request; see (panel)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Admin users" };

export default async function UsersPage() {
  const me = await requireUser();
  const users = await query<{ id: number; name: string; email: string; created_at: Date }>(
    "SELECT id, name, email, created_at FROM users ORDER BY created_at",
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Admin users</h1>
        <p className="mt-2 text-muted">Everyone listed here can sign in and edit the website.</p>
      </div>

      <ul className="divide-y divide-river-100 overflow-hidden rounded-2xl bg-white ring-1 ring-river-100">
        {users.map((u) => (
          <li key={u.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-river-50 font-display font-bold text-river">
              {u.name.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-deep">
                {u.name} {u.id === me.id && <span className="ml-1 rounded-full bg-sand px-2 py-0.5 text-xs text-muted">You</span>}
              </p>
              <p className="truncate text-sm text-muted">
                {u.email} · added {formatWhen(u.created_at)}
              </p>
            </div>
            {u.id !== me.id && <DeleteUserButton userId={u.id} name={u.name} />}
          </li>
        ))}
      </ul>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-river-100 sm:p-8">
        <h2 className="text-xl font-extrabold">Add an admin</h2>
        <p className="mb-6 mt-1 text-sm text-muted">Share the password with them privately; they can change it after signing in.</p>
        <AddUserForm />
      </section>

      <section className="rounded-3xl bg-white p-6 ring-1 ring-river-100 sm:p-8">
        <h2 className="text-xl font-extrabold">Change your password</h2>
        <p className="mb-6 mt-1 text-sm text-muted">Changing it signs you out on your other devices.</p>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
