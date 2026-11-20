"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, FolderKanban, Heart, Home, Info, Layers, Mail, MapPin, Menu, Newspaper, TrendingUp, X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  home: Home,
  about: Info,
  programs: Layers,
  projects: FolderKanban,
  map: MapPin,
  impact: TrendingUp,
  news: Newspaper,
  contact: Mail,
};

const mobileNav = [{ href: "/", label: "Home", icon: "home", hint: "Back to the start" }, ...nav];

/**
 * Site header. Transparent over the dark page heroes, frosted glass once the
 * page scrolls; it slides away while scrolling down and returns on scroll up.
 */
export function Header() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setAtTop(y < 24);
      // Hide only after the hero, and only when clearly scrolling down.
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 360);
        lastY.current = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  const clear = atTop && !open; // transparent over the hero
  const close = () => setOpen(false);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        clear
          ? "bg-gradient-to-b from-deep-950/60 to-transparent"
          : "bg-white/85 shadow-[0_10px_40px_-18px_rgba(20,54,92,0.45)] backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <div className="brand-rule h-1 w-full" />
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-500 sm:px-6 lg:px-8 ${
          clear ? "h-20" : "h-16"
        }`}
      >
        <div className="shrink-0">
          <Logo variant={clear ? "light" : "dark"} onClick={close} />
        </div>

        <nav aria-label="Main" className="hidden xl:block">
          <ul
            className={`flex items-center gap-0.5 rounded-full p-1 transition-colors duration-500 ${
              clear ? "bg-white/10 ring-1 ring-white/15 backdrop-blur-md" : "bg-sand/80 ring-1 ring-river-100"
            }`}
          >
            {nav.map((item) => {
              const Icon = icons[item.icon];
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    title={item.hint}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[0.85rem] font-semibold transition duration-300 ${
                      active
                        ? clear
                          ? "bg-white text-deep shadow-lg"
                          : "bg-deep text-white shadow-md"
                        : clear
                          ? "text-white/90 hover:bg-white/15 hover:text-white"
                          : "text-deep hover:bg-white hover:text-river"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 ${
                        active ? "text-sunrise" : clear ? "text-white/70 group-hover:text-sunrise" : "text-river group-hover:text-sunrise-600"
                      }`}
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/get-involved"
            onClick={close}
            aria-label="Get involved"
            className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-sunrise px-5 py-2.5 text-sm font-bold text-deep-950 shadow-[0_8px_20px_-8px_rgba(242,163,58,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-8px_rgba(242,163,58,1)] sm:inline-flex xl:px-3 2xl:px-5"
          >
            <Heart className="h-4 w-4 transition group-hover:scale-125 group-hover:fill-deep-950" />
            <span className="xl:hidden 2xl:inline">Get involved</span>
          </Link>
          <button
            type="button"
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full transition xl:hidden ${
              clear ? "text-white hover:bg-white/15" : "text-deep hover:bg-river-50"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className={`absolute h-6 w-6 transition duration-300 ${open ? "rotate-90 scale-0 opacity-0" : ""}`} />
            <X className={`absolute h-6 w-6 transition duration-300 ${open ? "" : "-rotate-90 scale-0 opacity-0"}`} />
          </button>
        </div>
      </div>

    </header>

      {/* Menu panel for phones, tablets and small laptops. Kept outside <header>:
          the header's transform and backdrop blur would otherwise clip it. */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-white/95 backdrop-blur-xl transition duration-500 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-3xl px-4 pb-10 pt-6 sm:px-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {mobileNav.map((item, i) => {
              const Icon = icons[item.icon];
              const active = isActive(item.href);
              return (
                <li
                  key={item.href}
                  className={`transition duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-4 rounded-2xl p-4 ring-1 transition ${
                      active ? "bg-deep text-white ring-deep" : "bg-white text-deep ring-river-100 hover:ring-river"
                    }`}
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
                        active ? "bg-white/15 text-sunrise" : "bg-river-50 text-river group-hover:bg-river group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold">{item.label}</span>
                      <span className={`block truncate text-sm ${active ? "text-river-200" : "text-muted"}`}>{item.hint}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/get-involved"
            onClick={close}
            className={`mt-6 flex items-center justify-center gap-2 rounded-2xl bg-sunrise px-5 py-4 font-bold text-deep-950 transition duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${80 + mobileNav.length * 40}ms` : "0ms" }}
          >
            <Heart className="h-5 w-5" /> Get involved
          </Link>
        </nav>
      </div>
    </>
  );
}
