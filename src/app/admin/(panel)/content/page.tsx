import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { collections } from "@/lib/content/collections";
import { formatWhen, getEditInfo } from "@/lib/content/admin";

// Reads the session on every request; see (panel)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Content" };

export default async function ContentListPage() {
  await requireUser();
  const edits = new Map((await getEditInfo()).map((e) => [e.key, e]));
  const byPage = Map.groupBy(collections, (c) => c.page);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-extrabold">Website content</h1>
      <p className="mt-2 text-muted">Choose a section to edit. Sections are grouped by the page they appear on.</p>

      <div className="mt-8 space-y-8">
        {[...byPage].map(([page, items]) => (
          <section key={page}>
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-river">{page}</h2>
            <ul className="divide-y divide-river-100 overflow-hidden rounded-2xl bg-white ring-1 ring-river-100">
              {items.map((c) => {
                const edit = edits.get(c.key);
                return (
                  <li key={c.key}>
                    <Link href={`/admin/content/${c.key}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-river-50/60">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-deep">{c.label}</p>
                        <p className="truncate text-sm text-muted">{c.description}</p>
                      </div>
                      <span
                        className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-semibold sm:inline ${
                          edit ? "bg-growth-50 text-growth-600" : "bg-sand text-muted"
                        }`}
                      >
                        {edit ? `Edited ${formatWhen(edit.updated_at)}` : "Original"}
                      </span>
                      <ChevronRight className="h-5 w-5 shrink-0 text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
