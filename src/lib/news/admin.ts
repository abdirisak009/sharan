import "server-only";
import { query } from "@/lib/db";
import type { EditablePost } from "@/components/admin/NewsForms";

export async function getAdminCategories() {
  return query<{ id: number; name: string; slug: string; posts: number }>(
    `SELECT c.id, c.name, c.slug, count(p.id)::int AS posts FROM news_categories c
     LEFT JOIN news_posts p ON p.category_id = c.id GROUP BY c.id ORDER BY c.sort, c.name`,
  );
}

export async function getAdminPost(id: number): Promise<EditablePost | undefined> {
  const [row] = await query<EditablePost>(
    `SELECT id, title, slug, excerpt, body, category_id AS "categoryId", image, published,
            to_char(published_at, 'YYYY-MM-DD') AS date
     FROM news_posts WHERE id = $1`,
    [id],
  );
  return row;
}
