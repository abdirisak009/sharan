import { Suspense, type ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** Skip link, header and footer around every public page. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-sunrise px-4 py-2 font-bold text-deep-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div aria-hidden="true" className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[70] hidden h-1 origin-left bg-sunrise shadow-[0_0_12px_rgba(242,163,58,0.8)]" />
      <Suspense>
        <Header />
      </Suspense>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
