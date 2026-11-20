import type { MetadataRoute } from "next";
import { getNewsCategories, getPosts } from "@/lib/news";
import { nav, site } from "@/lib/site";

// Lists every public page for search engines. News comes from the cached news
// data, so new posts appear here as soon as they are published.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getPosts(), getNewsCategories()]);
  const pages = ["", ...nav.map((n) => n.href), "/get-involved", "/accountability"];
  return [
    ...[...new Set(pages)].map((path) => ({ url: `${site.url}${path}` })),
    ...categories.map((c) => ({ url: `${site.url}/news/category/${c.slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/news/${p.slug}`, lastModified: p.date })),
  ];
}
