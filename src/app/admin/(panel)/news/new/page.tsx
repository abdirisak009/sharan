import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "@/components/admin/NewsForms";
import { requireUser } from "@/lib/auth/dal";
import { getAdminCategories } from "@/lib/news/admin";

// Reads the session on every request; see (panel)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  await requireUser();
  const categories = await getAdminCategories();
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="mx-auto max-w-6xl">
      <Link href="/admin/news" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-river">
        <ArrowLeft className="h-4 w-4" /> All news
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold">New post</h1>
      <div className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-river-100 sm:p-8">
        <PostForm
          categories={categories}
          post={{ id: null, title: "", slug: "", excerpt: "", body: "", categoryId: categories[0]?.id ?? null, image: "riverAerial", published: false, date: today }}
        />
      </div>
    </div>
  );
}
