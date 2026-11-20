import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { requireUser } from "@/lib/auth/dal";
import { getDefault, withDefaults, type ContentKey } from "@/lib/content";
import { formatWhen } from "@/lib/content/admin";
import { getCollection } from "@/lib/content/collections";
import { query } from "@/lib/db";

// Reads the session on every request; see (panel)/layout.tsx.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/admin/content/[key]">): Promise<Metadata> {
  const { key } = await params;
  return { title: getCollection(key)?.label ?? "Content" };
}

export default async function EditContentPage({ params }: PageProps<"/admin/content/[key]">) {
  await requireUser();
  const { key } = await params;
  const collection = getCollection(key);
  if (!collection) notFound();

  const [row] = await query<{ data: unknown; updated_at: Date; editor: string | null }>(
    `SELECT c.data, c.updated_at, u.name AS editor FROM content c
     LEFT JOIN users u ON u.id = c.updated_by WHERE c.key = $1`,
    [key],
  );
  const original = getDefault(key as ContentKey);

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/content" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-river">
        <ArrowLeft className="h-4 w-4" /> All sections
      </Link>
      <p className="mt-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-river">{collection.page}</p>
      <h1 className="mt-1 text-3xl font-extrabold">{collection.label}</h1>
      <p className="mt-2 text-muted">{collection.description}</p>
      {row && (
        <p className="mt-1 text-sm text-muted">
          Last edited {formatWhen(row.updated_at)}
          {row.editor ? ` by ${row.editor}` : ""}
        </p>
      )}

      <div className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-river-100 sm:p-8">
        <ContentEditor contentKey={key} root={collection.root} initial={withDefaults(row?.data, original)} original={original} isDefault={!row} />
      </div>
    </div>
  );
}
