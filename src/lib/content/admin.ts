import "server-only";
import { query } from "@/lib/db";

export type EditInfo = { key: string; updated_at: Date; editor: string | null };

/** When each collection was last edited, and by whom. */
export async function getEditInfo() {
  const rows = await query<EditInfo>(
    `SELECT c.key, c.updated_at, u.name AS editor FROM content c
     LEFT JOIN users u ON u.id = c.updated_by ORDER BY c.updated_at DESC`,
  );
  return rows;
}

export const formatWhen = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(d);
