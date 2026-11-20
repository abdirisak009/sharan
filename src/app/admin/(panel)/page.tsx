import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, LogOut, PencilLine, Users } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { collections, getCollection } from "@/lib/content/collections";
import { formatWhen, getEditInfo } from "@/lib/content/admin";
import { query } from "@/lib/db";
import { logout } from "../actions";

// Reads the session on every request; see (panel)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireUser();
  const [edits, [{ n: userCount }]] = await Promise.all([
    getEditInfo(),
    query<{ n: number }>("SELECT count(*)::int AS n FROM users"),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-river">Welcome back</p>
          <h1 className="mt-1 text-3xl font-extrabold">{user.name}</h1>
          <p className="mt-2 text-muted">Edit any text on the SHARAN website. Changes go live as soon as you save.</p>
        </div>
        <form action={logout} className="lg:hidden">
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-deep ring-1 ring-river-100">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: FileText, n: collections.length, l: "Content sections", href: "/admin/content" },
          { icon: PencilLine, n: edits.length, l: "Sections edited", href: "/admin/content" },
          { icon: Users, n: userCount, l: "Admin users", href: "/admin/users" },
        ].map(({ icon: Icon, n, l, href }) => (
          <Link key={l} href={href} className="rounded-2xl bg-white p-6 ring-1 ring-river-100 transition hover:-translate-y-0.5 hover:shadow-lg">
            <Icon className="h-6 w-6 text-river" />
            <p className="mt-4 font-display text-3xl font-extrabold text-deep">{n}</p>
            <p className="text-sm text-muted">{l}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-river-100 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold">Recent edits</h2>
          <Link href="/admin/content" className="inline-flex items-center gap-1 text-sm font-bold text-river hover:gap-2">
            All sections <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {edits.length === 0 ? (
          <p className="mt-4 text-muted">
            Nothing has been edited yet. The website shows the original text from the organisational profile.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-river-100">
            {edits.slice(0, 8).map((e) => (
              <li key={e.key} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <Link href={`/admin/content/${e.key}`} className="font-semibold text-deep hover:text-river">
                  {getCollection(e.key)?.label ?? e.key}
                </Link>
                <span className="text-sm text-muted">
                  {formatWhen(e.updated_at)}
                  {e.editor ? ` · ${e.editor}` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
