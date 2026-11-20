import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { CategoryManager } from "@/components/admin/NewsForms";
import { requireUser } from "@/lib/auth/dal";
import { query } from "@/lib/db";
import { getAdminCategories } from "@/lib/news/admin";
import { formatDate, newsImage } from "@/lib/news/format";

// Reads the session on every request; see (panel)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "News" };

export default async function AdminNewsPage() {
  await requireUser();
  const [posts, categories] = await Promise.all([
    query<{ id: number; slug: string; title: string; image: string; published: boolean; date: string; category: string | null }>(
      `SELECT p.id, p.slug, p.title, p.image, p.published, to_char(p.published_at, 'YYYY-MM-DD') AS date, c.name AS category
       FROM news_posts p LEFT JOIN news_categories c ON c.id = p.category_id
       ORDER BY p.published_at DESC, p.id DESC`,
    ),
    getAdminCategories(),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">News</h1>
          <p className="mt-2 text-muted">Write, publish and organise news by category.</p>
        </div>
        <Link href="/admin/news/new" className="inline-flex items-center gap-2 rounded-xl bg-river px-5 py-2.5 text-sm font-bold text-white transition hover:bg-river-700">
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-river-100 overflow-hidden rounded-2xl bg-white ring-1 ring-river-100">
        {posts.length === 0 && <li className="px-5 py-8 text-center text-muted">No posts yet.</li>}
        {posts.map((p) => {
          const img = newsImage(p.image, p.title);
          return (
            <li key={p.id} className="flex items-center gap-4 px-4 py-3 transition hover:bg-river-50/50">
              <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-deep">
                <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
              </span>
              <Link href={`/admin/news/${p.id}`} className="min-w-0 flex-1">
                <p className="truncate font-semibold text-deep hover:text-river">{p.title}</p>
                <p className="text-sm text-muted">
                  {formatDate(p.date)} · {p.category ?? "No category"}
                </p>
              </Link>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                  p.published ? "bg-growth-50 text-growth-600" : "bg-sunrise-50 text-sunrise-600"
                }`}
              >
                {p.published ? "Published" : "Draft"}
              </span>
              {p.published && (
                <a href={`/news/${p.slug}`} target="_blank" className="hidden shrink-0 rounded-lg p-2 text-muted hover:text-river sm:block" aria-label="View on website">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <section className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-river-100 sm:p-8">
        <h2 className="text-xl font-extrabold">Categories</h2>
        <p className="mb-6 mt-1 text-sm text-muted">Visitors can filter the news by these categories.</p>
        <CategoryManager categories={categories} />
      </section>
    </div>
  );
}
