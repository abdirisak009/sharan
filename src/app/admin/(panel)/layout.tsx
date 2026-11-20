import { Suspense } from "react";
import { Loader2, LogOut } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireUser } from "@/lib/auth/dal";
import { logout } from "../actions";

// Admin pages read the session cookie on every request, so they render on
// demand rather than from a prerendered shell.
export const instant = false;

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="bg-deep-950 px-4 py-4 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:px-5 lg:py-7">
        <div className="flex items-center justify-between gap-4 lg:block">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <div>
              <p className="font-display font-extrabold tracking-wide">SHARAN</p>
              <p className="text-xs text-river-200">Website admin</p>
            </div>
          </div>
          <div className="lg:mt-10">
            <AdminNav />
          </div>
        </div>
        <div className="mt-auto hidden lg:block">
          <Suspense>
            <SignedInAs />
          </Suspense>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:py-10">
        <Suspense
          fallback={
            <p className="flex items-center gap-2 text-muted">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading…
            </p>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}

async function SignedInAs() {
  const user = await requireUser();
  return (
    <div className="border-t border-white/10 pt-5">
      <p className="truncate text-sm font-semibold">{user.name}</p>
      <p className="truncate text-xs text-river-200">{user.email}</p>
      <form action={logout} className="mt-3">
        <button type="submit" className="inline-flex items-center gap-2 text-sm font-semibold text-sunrise hover:text-white">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </form>
    </div>
  );
}
