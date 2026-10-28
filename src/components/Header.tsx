"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white shadow-[0_8px_30px_-12px_rgba(20,54,92,0.25)]" : "bg-white"
      }`}
    >
      <div className="brand-rule h-1 w-full" />
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`relative rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition-colors ${
                isActive(item.href) ? "text-river" : "text-deep hover:text-river"
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-sunrise transition-transform duration-300 ${
                  isActive(item.href) ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/get-involved"
            onClick={() => setOpen(false)}
            className="hidden items-center gap-2 rounded-full bg-sunrise px-5 py-2.5 text-sm font-bold text-deep-950 shadow-[0_8px_20px_-8px_rgba(242,163,58,0.9)] transition hover:-translate-y-0.5 hover:bg-sunrise-600 hover:text-white sm:inline-flex"
          >
            <Heart className="h-4 w-4" /> Get involved
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-deep hover:bg-river-50 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-river-100 bg-white transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[calc(100vh-76px)]" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {[{ href: "/", label: "Home" }, ...nav].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 font-display text-lg font-semibold ${
                (item.href === "/" ? pathname === "/" : isActive(item.href)) ? "bg-river-50 text-river" : "text-deep"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-involved"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-sunrise px-5 py-3.5 font-bold text-deep-950"
          >
            <Heart className="h-4 w-4" /> Get involved
          </Link>
        </nav>
      </div>
    </header>
  );
}
