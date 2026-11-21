import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { ButtonLink, Container, RiverWaves } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <SiteChrome>
    <section className="relative overflow-hidden bg-deep pb-40 pt-44 text-white">
      <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
      <Container className="relative text-center">
        <p className="font-display text-8xl font-extrabold text-sunrise">404</p>
        <h1 className="mt-4 text-3xl font-extrabold !text-white sm:text-4xl">This page has drifted downstream.</h1>
        <p className="mx-auto mt-4 max-w-lg text-river-100">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/" variant="accent">
            Back to home
          </ButtonLink>
        </div>
      </Container>
      <RiverWaves />
    </section>
    </SiteChrome>
  );
}
