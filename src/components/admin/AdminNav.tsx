"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, FileText, LayoutDashboard, Newspaper, Users } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/users", label: "Admin users", icon: Users },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 lg:flex-col">
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              active ? "bg-white/15 text-white" : "text-river-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" /> <span className={active ? "" : "hidden sm:inline"}>{label}</span>
          </Link>
        );
      })}
      <a
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-river-100 transition hover:bg-white/10 hover:text-white"
      >
        <ExternalLink className="h-4 w-4" /> <span className="hidden sm:inline">View website</span>
      </a>
    </nav>
  );
}
