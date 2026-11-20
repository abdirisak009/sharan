import "server-only";
import { redirect } from "next/navigation";
import { getSessionUser } from "./session";

/** Every admin page and Server Action calls this before touching data. */
export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}
