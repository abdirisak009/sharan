import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { query } from "@/lib/db";
import { defaultCategories, defaultPosts, type NewsCategory } from "./defaults";
import { readMinutes } from "./format";

export type { NewsCategory } from "./defaults";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  date: string; // YYYY-MM-DD
  category: NewsCategory;
  readMinutes: number;
};

export const NEWS_TAG = "news";

type Row = Omit<Post, "category" | "readMinutes"> & { category_slug: string | null; category_name: string | null };

/** All published posts (newest first) and the categories that have posts. Cached until news changes. */
async function loadNews(): Promise<{ posts: Post[]; categories: NewsCategory[] }> {
  "use cache";
  cacheTag(NEWS_TAG);
  try {
    const rows = await query<Row>(
      `SELECT p.slug, p.title, p.excerpt, p.body, p.image, to_char(p.published_at, 'YYYY-MM-DD') AS date,
              c.slug AS category_slug, c.name AS category_name
       FROM news_posts p LEFT JOIN news_categories c ON c.id = p.category_id
       WHERE p.published ORDER BY p.published_at DESC, p.id DESC`,
    );
    const categoryRows = await query<NewsCategory>("SELECT slug, name FROM news_categories ORDER BY sort, name");
    cacheLife("max");
    const posts = rows.map(({ category_slug, category_name, ...p }) => ({
      ...p,
      category: { slug: category_slug ?? "news", name: category_name ?? "News" },
      readMinutes: readMinutes(p.body),
    }));
    const used = new Set(posts.map((p) => p.category.slug));
    return { posts, categories: categoryRows.filter((c) => used.has(c.slug)) };
  } catch (error) {
    console.error("[news] Could not load news from the database; using the built-in posts.", error);
    cacheLife("minutes");
    const posts = defaultPosts.map(({ category, ...p }) => ({
      ...p,
      category: defaultCategories.find((c) => c.slug === category) ?? { slug: category, name: category },
      readMinutes: readMinutes(p.body),
    }));
    return { posts, categories: defaultCategories };
  }
}

export async function getPosts(categorySlug?: string) {
  const { posts } = await loadNews();
  return categorySlug ? posts.filter((p) => p.category.slug === categorySlug) : posts;
}

export async function getPost(slug: string) {
  const { posts } = await loadNews();
  return posts.find((p) => p.slug === slug);
}

export async function getNewsCategories() {
  return (await loadNews()).categories;
}
