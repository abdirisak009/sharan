import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getContent } from "@/lib/content";
import { photos, type Photo } from "@/lib/photos";
import {
  Accessibility, ArrowRight, Baby, CloudRain, GraduationCap, Handshake, HeartHandshake, Landmark, Leaf,
  Lightbulb, Megaphone, Scale, Search, ShieldCheck, Sparkles, Stethoscope, Store, Tent, Users, Waves, Wheat,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Accessibility, Baby, CloudRain, GraduationCap, Handshake, HeartHandshake, Landmark, Leaf, Lightbulb,
  Megaphone, Scale, Search, ShieldCheck, Sparkles, Stethoscope, Store, Tent, Users, Waves, Wheat,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = icons[name] ?? Sparkles;
  return <C className={className} aria-hidden="true" />;
}

export const accent = {
  river: { bg: "bg-river", soft: "bg-river-50", text: "text-river", ring: "ring-river-200", border: "border-river" },
  sunrise: { bg: "bg-sunrise", soft: "bg-sunrise-50", text: "text-sunrise-600", ring: "ring-sunrise-100", border: "border-sunrise" },
  growth: { bg: "bg-growth", soft: "bg-growth-50", text: "text-growth", ring: "ring-growth-100", border: "border-growth" },
  deep: { bg: "bg-deep", soft: "bg-river-50", text: "text-deep", ring: "ring-river-100", border: "border-deep" },
} as const;

/** A photo that fills its (positioned, sized) parent, with an optional place caption and credit. */
export function PhotoFrame({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload = false,
  caption = true,
}: {
  photo: Photo;
  className?: string;
  sizes?: string;
  preload?: boolean;
  caption?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden bg-deep ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className="scroll-zoom object-cover"
      />
      {caption && <PhotoCredit photo={photo} className="absolute bottom-3 left-3 right-3" />}
    </figure>
  );
}

export function PhotoCredit({ photo, className = "" }: { photo: Photo; className?: string }) {
  return (
    <figcaption
      className={`pointer-events-auto w-fit max-w-full rounded-full bg-deep-950/55 px-3 py-1 text-[0.7rem] leading-snug text-white/85 backdrop-blur ${className}`}
    >
      {photo.place} ·{" "}
      <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
        Photo: {photo.credit} ({photo.license})
      </a>
    </figcaption>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.22em] ${
        light ? "text-sunrise" : "text-river"
      }`}
    >
      <span className={`h-0.5 w-8 rounded-full ${light ? "bg-sunrise" : "bg-sunrise"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem] ${light ? "!text-white" : ""}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-river-100" : "text-muted"}`}>{intro}</p>
      )}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost-light" | "accent";
}) {
  const styles = {
    primary: "bg-river text-white hover:bg-river-700 shadow-[0_10px_24px_-10px_rgba(35,115,190,0.9)]",
    secondary: "bg-white text-deep ring-1 ring-river-200 hover:ring-river hover:text-river",
    "ghost-light": "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 backdrop-blur",
    accent: "bg-sunrise text-deep-950 hover:bg-white shadow-[0_10px_24px_-10px_rgba(242,163,58,0.9)]",
  }[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-bold transition duration-300 hover:-translate-y-0.5 ${styles}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/** Layered animated river waves, used at the bottom of dark sections. */
export function RiverWaves({ className = "", fill = "#ffffff" }: { className?: string; fill?: string }) {
  const path =
    "M0 40 C120 10 240 70 360 40 C480 10 600 70 720 40 C840 10 960 70 1080 40 C1200 10 1320 70 1440 40 V100 H0Z";
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden ${className}`} aria-hidden="true">
      <svg className="absolute bottom-0 h-full w-[200%] animate-wave-slow opacity-30" viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path d={path} fill="#2373BE" />
        <path d={path} fill="#2373BE" transform="translate(1440 0)" />
      </svg>
      <svg className="absolute bottom-0 h-[80%] w-[200%] animate-wave opacity-60" viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path d={path} fill="#4890D1" />
        <path d={path} fill="#4890D1" transform="translate(1440 0)" />
      </svg>
      <svg className="absolute bottom-0 h-[55%] w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0 50 C240 20 480 80 720 50 C960 20 1200 80 1440 50 V100 H0Z" fill={fill} />
      </svg>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  photo?: Photo;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-deep pb-32 pt-40 text-white sm:pt-44 lg:pb-40 lg:pt-52">
      {photo ? (
        <>
          <Image src={photo.src} alt="" fill preload sizes="100vw" placeholder="blur" className="hero-parallax object-cover" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-deep-950/95 via-deep/80 to-deep/30"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-950/70 via-transparent to-transparent" aria-hidden="true" />
          <PhotoCredit photo={photo} className="absolute bottom-28 right-4 z-10 hidden sm:block lg:right-8" />
        </>
      ) : (
        <>
          <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
          <div
            className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-sunrise/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-river/40 blur-3xl" aria-hidden="true" />
        </>
      )}
      <Container className="hero-fade relative">
        <div className="max-w-3xl animate-rise">
          <Eyebrow light>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] !text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-river-100 sm:text-xl">{intro}</p>}
          {children}
        </div>
      </Container>
      <RiverWaves />
    </section>
  );
}

export async function CtaBand() {
  const cta = await getContent("cta");
  return (
    <section className="relative overflow-hidden py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-deep px-6 py-16 text-white sm:px-14 lg:py-24">
          <Image src={photos.farmAfgoi.src} alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" placeholder="blur" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-950/95 via-river-700/85 to-river/40" aria-hidden="true" />
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-sunrise/30 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow light>{cta.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight !text-white sm:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-river-100">{cta.text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/get-involved" variant="accent">
                Get involved
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost-light">
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
