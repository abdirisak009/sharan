import Image from "next/image";
import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MapLegend, ShabelleMap } from "@/components/ShabelleMap";
import { Container, CtaBand, Icon, PageHero, PhotoCredit, SectionHeading, accent } from "@/components/ui";
import { getContent } from "@/lib/content";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Where we work",
  description:
    "Rooted in the Shabelle, serving South and Central Somalia. SHARAN grows in phases from Middle Shabelle to Hiraan, Lower Shabelle and beyond.",
};



export default async function WhereWeWorkPage() {
  const [regions, principles, helix, pages] = await Promise.all([
    getContent("regions"),
    getContent("principles"),
    getContent("helix"),
    getContent("pages"),
  ]);
  const hero = pages.whereWeWork;
  return (
    <>
      <PageHero
        photo={photos.riverAerial}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
      />

      <section className="py-20 lg:py-28">
        <Container className="grid items-start gap-14 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_30px_70px_-30px_rgba(20,54,92,0.45)] ring-1 ring-river-100">
              <ShabelleMap className="h-auto w-full rounded-[1.5rem]" />
            </div>
            <div className="mt-6">
              <MapLegend />
            </div>
            <p className="mt-4 text-xs text-muted">
              Schematic map for orientation only. Regional names do not imply a position on administrative or political
              status.
            </p>
          </Reveal>
          <div className="space-y-6">
            {regions.map((r, i) => {
              const a = accent[r.color];
              return (
                <Reveal key={r.phase} delay={i * 100}>
                  <div className={`overflow-hidden rounded-3xl bg-white ring-1 ring-river-100 border-t-4 ${a.border}`}>
                    <div className="p-7">
                      <div className="flex items-center justify-between">
                        <span className={`font-display text-sm font-bold uppercase tracking-[0.18em] ${a.text}`}>
                          {r.phase} · {r.label}
                        </span>
                        <Building2 className={`h-5 w-5 ${a.text}`} />
                      </div>
                      <h2 className="mt-3 text-2xl font-extrabold">{r.regions}</h2>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {r.districts.map((d) => (
                          <span key={d} className={`rounded-full px-3 py-1 text-sm font-semibold ${a.soft} text-deep`}>
                            {d}
                          </span>
                        ))}
                      </div>
                      <p className="mt-5 leading-relaxed text-muted">
                        <strong className="text-deep">Focus:</strong> {r.focus}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <Reveal>
              <div className="rounded-3xl bg-deep p-7 text-white">
                <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-sunrise">Headquarters</p>
                <p className="mt-3 font-display text-2xl font-bold">Jowhar, Middle Shabelle</p>
                <p className="mt-2 leading-relaxed text-river-200">
                  The capital of Hirshabelle State: inside the communities we serve, rather than managing them from a
                  distance.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-deep-900 py-24 text-white lg:py-32">
        <Image src={photos.floodFamilies.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-950/95 via-deep-900/90 to-deep-900/70" aria-hidden="true" />
        <Container className="relative">
          <Reveal>
            <SectionHeading light eyebrow="Coverage principles" title="How we decide where and how to work" />
          </Reveal>
          <div className="mt-14 grid gap-x-14 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 100} className="flex gap-6 border-t border-white/15 py-8">
                <span className="w-12 shrink-0 font-display text-4xl font-extrabold text-sunrise">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-bold !text-white">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-river-100">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <PhotoCredit photo={photos.floodFamilies} className="mt-10" />
        </Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Stakeholder engagement"
              title="Triple Nexus and Quadruple Helix"
              intro="Without peace, gains do not last. Because SHARAN is present before, during and after a crisis, it can respond fast and stay to rebuild. And no single actor can solve the Shabelle's problems alone, so we connect four groups."
            />
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {helix.map((h, i) => (
              <Reveal key={h.title} delay={i * 90}>
                <div className="h-full border-t-4 border-river pt-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-river-50">
                    <Icon name={h.icon} className="h-7 w-7 text-river" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
