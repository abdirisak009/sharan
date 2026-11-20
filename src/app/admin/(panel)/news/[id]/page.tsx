import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PostForm } from "@/components/admin/NewsForms";
import { requireUser } from "@/lib/auth/dal";
import { getAdminCategories, getAdminPost } from "@/lib/news/admin";

// Reads the session on every request; see (panel)/layout.tsx.
export const instant = false;

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params, searchParams }: PageProps<"/admin/news/[id]">) {
  await requireUser();
  const { id } = await params;
  const { created } = await searchParams;
  const postId = Number(id);
  const [post, categories] = await Promise.all([
    Number.isInteger(postId) ? getAdminPost(postId) : undefined,
    getAdminCategories(),
  ]);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <Link href="/admin/news" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-river">
        <ArrowLeft className="h-4 w-4" /> All news
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold">Edit post</h1>
        {post.published && (
          <a href={`/news/${post.slug}`} target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold text-river hover:underline">
            View on website <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
      {created && (
        <p role="status" className="mt-4 rounded-xl bg-growth-50 px-4 py-3 text-sm font-semibold text-growth-600 ring-1 ring-growth-100">
          {post.published ? "Post created and published." : "Post created as a draft. Switch on “Published” when it is ready."}
        </p>
      )}
      <div className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-river-100 sm:p-8">
        <PostForm key={post.id} post={post} categories={categories} />
      </div>
    </div>
  );
}
