import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CloudRain, Newspaper, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { LoginForm } from "@/components/admin/AdminForms";
import { RiverWaves } from "@/components/ui";
import { photos } from "@/lib/photos";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="grid min-h-screen flex-1 lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel */}
      <section className="relative isolate flex min-h-64 flex-col justify-between overflow-hidden bg-deep-950 p-8 text-white sm:p-12 lg:min-h-screen">
        <Image src={photos.riverAerial.src} alt="" fill preload sizes="(min-width: 1024px) 55vw, 100vw" placeholder="blur" className="login-pan -z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-deep-950/95 via-deep/80 to-river/40" aria-hidden="true" />
        <div className="bg-dots-light absolute inset-0 -z-10 opacity-60" aria-hidden="true" />

        <Link href="/" className="flex w-fit animate-rise items-center gap-3">
          <LogoMark className="h-12 w-12" />
          <span>
            <span className="block font-display text-lg font-extrabold tracking-wide">SHARAN</span>
            <span className="block text-xs text-river-100">Shabelle Resilience &amp; Action Network</span>
          </span>
        </Link>

        <div className="mt-12 max-w-lg animate-rise [animation-delay:150ms] lg:mt-0">
          <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-sunrise">Website admin</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] !text-white sm:text-5xl">
            Tell the story of the <span className="text-sunrise">Shabelle</span>.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-river-100">
            Publish news, update programmes and keep every page true to the communities SHARAN serves.
          </p>
        </div>

        <ul className="mt-10 hidden gap-3 sm:flex sm:flex-wrap lg:pb-16">
          {[
            { icon: Newspaper, text: "Publish news by category" },
            { icon: CloudRain, text: "Update programmes" },
            { icon: ShieldCheck, text: "Secure sign-in" },
          ].map(({ icon: Icon, text }, i) => (
            <li
              key={text}
              className="flex animate-rise items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 backdrop-blur"
              style={{ animationDelay: `${300 + i * 120}ms` }}
            >
              <Icon className="h-4 w-4 text-sunrise" /> {text}
            </li>
          ))}
        </ul>
        <RiverWaves className="hidden lg:block" fill="#faf7f2" />
      </section>

      {/* Sign-in */}
      <section className="relative flex items-center justify-center bg-sand px-4 py-14 sm:px-8">
        <div className="bg-dots absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative w-full max-w-md animate-rise [animation-delay:200ms]">
          <div className="rounded-[2rem] bg-white/90 p-8 shadow-[0_40px_90px_-40px_rgba(20,54,92,0.55)] ring-1 ring-river-100 backdrop-blur sm:p-10">
            <h2 className="text-3xl font-extrabold">Welcome back</h2>
            <p className="mb-8 mt-2 text-muted">Sign in to manage the website.</p>
            <LoginForm />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            <Link href="/" className="font-semibold text-river hover:underline">
              ← Back to the website
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
