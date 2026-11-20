"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { requireUser } from "@/lib/auth/dal";
import { query } from "@/lib/db";
import { deleteImage, isMediaFile, saveImage } from "@/lib/media";
import { NEWS_TAG } from "@/lib/news";
import { slugify } from "@/lib/news/format";
import { photos } from "@/lib/photos";
import type { FormState } from "./actions";

const RESERVED_SLUGS = new Set(["category", "new"]);

const field = (data: FormData, name: string) => String(data.get(name) ?? "").trim();

/**
 * Refreshes every page that shows news. The tag expires the cached news data.
 * Article and category pages would still serve one stale copy to the next
 * visitor while they rebuild, so once the response is sent the server visits
 * them itself; by the time a real visitor arrives they are up to date.
 */
async function refreshNews(...slugs: (string | undefined)[]) {
  updateTag(NEWS_TAG);
  const categories = await query<{ slug: string }>("SELECT slug FROM news_categories");
  const paths = [
    "/news",
    ...slugs.filter(Boolean).map((s) => `/news/${s}`),
    ...categories.map((c) => `/news/category/${c.slug}`),
  ];
  const origin = `http://127.0.0.1:${process.env.PORT || 3000}`;
  after(async () => {
    await Promise.all(paths.map((path) => fetch(origin + path).catch(() => {})));
  });
}

/** Deletes an uploaded photo from MinIO once no post uses it any more. */
async function removeUnusedUpload(image: string | undefined) {
  const name = image?.startsWith("media/") ? image.slice(6) : "";
  if (!isMediaFile(name)) return;
  const [{ n }] = await query<{ n: number }>("SELECT count(*)::int AS n FROM news_posts WHERE image = $1", [image]);
  if (n === 0) await deleteImage(name).catch(() => {});
}

export async function savePost(id: number | null, _: FormState, data: FormData): Promise<FormState> {
  const user = await requireUser();

  const title = field(data, "title");
  const slug = slugify(field(data, "slug") || title);
  const excerpt = field(data, "excerpt");
  const body = field(data, "body");
  const date = field(data, "date");
  const categoryId = Number(field(data, "category")) || null;
  const published = data.get("published") === "on";
  let image = field(data, "image");
  const upload = data.get("upload");

  if (!title) return { error: "Add a title." };
  if (title.length > 200) return { error: "The title is too long (200 characters at most)." };
  if (!slug || RESERVED_SLUGS.has(slug)) return { error: "Choose a different web address (slug)." };
  if (excerpt.length > 500) return { error: "The summary is too long (500 characters at most)." };
  if (body.length > 60000) return { error: "The article is too long." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) return { error: "Choose a valid date." };
  if (published && !body) return { error: "Write the article before publishing it." };

  const [taken] = await query<{ id: number }>("SELECT id FROM news_posts WHERE slug = $1", [slug]);
  if (taken && taken.id !== id) return { error: `Another post already uses the address "${slug}".` };
  if (categoryId) {
    const [exists] = await query("SELECT 1 FROM news_categories WHERE id = $1", [categoryId]);
    if (!exists) return { error: "That category no longer exists." };
  }

  if (upload instanceof File && upload.size > 0) {
    try {
      image = await saveImage(upload);
    } catch (error) {
      return { error: error instanceof Error ? error.message : "The photo could not be uploaded." };
    }
  }
  const validImage = image in photos || (image.startsWith("media/") && isMediaFile(image.slice(6)));
  if (!validImage) return { error: "Choose a photo." };

  const values = [slug, title, excerpt, body, categoryId, image, published, date, user.id];
  let postId = id;
  let previousImage: string | undefined;
  let previousSlug: string | undefined;
  if (id) {
    const [old] = await query<{ image: string; slug: string }>("SELECT image, slug FROM news_posts WHERE id = $1", [id]);
    if (!old) return { error: "This post no longer exists." };
    previousImage = old.image;
    previousSlug = old.slug;
    await query(
      `UPDATE news_posts SET slug = $1, title = $2, excerpt = $3, body = $4, category_id = $5, image = $6,
         published = $7, published_at = $8, updated_by = $9, updated_at = now() WHERE id = $10`,
      [...values, id],
    );
  } else {
    const [row] = await query<{ id: number }>(
      `INSERT INTO news_posts (slug, title, excerpt, body, category_id, image, published, published_at, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      values,
    );
    postId = row.id;
  }
  if (previousImage && previousImage !== image) await removeUnusedUpload(previousImage);

  await refreshNews(slug, previousSlug);
  if (!id) redirect(`/admin/news/${postId}?created=1`);
  refresh();
  return { message: published ? "Saved and published. It is live on the website." : "Saved as a draft. It is not on the website yet." };
}

export async function deletePost(id: number): Promise<FormState> {
  await requireUser();
  const [post] = await query<{ image: string; slug: string }>("DELETE FROM news_posts WHERE id = $1 RETURNING image, slug", [id]);
  if (post) await removeUnusedUpload(post.image);
  await refreshNews(post?.slug);
  redirect("/admin/news");
}

export async function createCategory(_: FormState, data: FormData): Promise<FormState> {
  await requireUser();
  const name = field(data, "name");
  const slug = slugify(name);
  if (!name || !slug) return { error: "Enter a category name." };
  if (name.length > 60) return { error: "The name is too long." };
  const [exists] = await query("SELECT 1 FROM news_categories WHERE slug = $1", [slug]);
  if (exists) return { error: "That category already exists." };
  await query(
    "INSERT INTO news_categories (slug, name, sort) VALUES ($1, $2, (SELECT coalesce(max(sort), 0) + 1 FROM news_categories))",
    [slug, name],
  );
  await refreshNews();
  refresh();
  return { message: `Added "${name}".` };
}

export async function renameCategory(id: number, name: string): Promise<FormState> {
  await requireUser();
  const clean = name.trim();
  if (!clean || clean.length > 60) return { error: "Enter a name (60 characters at most)." };
  // The web address (slug) stays the same so existing links keep working.
  await query("UPDATE news_categories SET name = $1 WHERE id = $2", [clean, id]);
  await refreshNews();
  refresh();
  return { message: "Renamed." };
}

export async function deleteCategory(id: number): Promise<FormState> {
  await requireUser();
  const [{ n }] = await query<{ n: number }>("SELECT count(*)::int AS n FROM news_posts WHERE category_id = $1", [id]);
  if (n > 0) return { error: `Move its ${n} post${n === 1 ? "" : "s"} to another category first.` };
  await query("DELETE FROM news_categories WHERE id = $1", [id]);
  await refreshNews();
  refresh();
  return { message: "Deleted." };
}
