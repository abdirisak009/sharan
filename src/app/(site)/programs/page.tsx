import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Container, CtaBand, Icon, PageHero, SectionHeading, accent } from "@/components/ui";
import { getContent } from "@/lib/content";
import { photos, type PhotoKey } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "SHARAN's four strategic pillars: climate resilience and livelihoods; preparedness, response and durable solutions; education, health and skills; and peacebuilding and local governance.",
};

const pillarPhoto: Record<string, PhotoKey> = {
  "climate-resilience": "farmAfgoi",
  "preparedness-response": "floodJowharVillage",
  "education-health-skills": "classroom",
  peacebuilding: "riverWaterWomen",
};

const pillarIcon: Record<string, string> = {
  "climate-resilience": "Leaf",
  "preparedness-response": "CloudRain",
  "education-health-skills": "GraduationCap",
  peacebuilding: "Handshake",
};

export default async function ProgramsPage() {
  const [pillars, deliveryCycle, capabilities, engagementFormats, pages] = await Promise.all([
    getContent("pillars"),
    getContent("deliveryCycle"),
    getContent("capabilities"),
    getContent("engagementFormats"),
    getContent("pages"),
  ]);
  const hero = pages.programs;
  return (
    <>
      <PageHero
        photo={photos.elderCanal}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {pillars.map((p) => (
            <Link
              key={p.slug}
              href={`#${p.slug}`}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white hover:text-deep"
            >
              {p.number}. {p.short}
            </Link>
          ))}
        </div>
      </PageHero>

      {/* PILLARS */}
      <section className="py-20 lg:py-28">
        <Container className="space-y-10 lg:space-y-14">
          {pillars.map((p, i) => {
            const a = accent[p.color];
            return (
              <Reveal key={p.slug}>
                <article
                  id={p.slug}
                  className="scroll-mt-28 overflow-hidden rounded-[2rem] bg-white ring-1 ring-river-100 lg:grid lg:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className={`relative flex min-h-[24rem] flex-col justify-end overflow-hidden p-8 text-white sm:p-12 ${i % 2 ? "lg:order-2" : ""}`}>
                    <Image
                      src={photos[pillarPhoto[p.slug] ?? "riverAerial"].src}
                      alt={photos[pillarPhoto[p.slug] ?? "riverAerial"].alt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      placeholder="blur"
                      className="scroll-zoom object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-950 via-deep-950/70 to-deep-950/10" aria-hidden="true" />
                    <span className="relative flex items-center gap-4">
                      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${a.bg} shadow-lg`}>
                        <Icon name={pillarIcon[p.slug] ?? "Sparkles"} className="h-7 w-7" />
                      </span>
                      <span className="font-display text-6xl font-extrabold leading-none text-white/30">0{p.number}</span>
                    </span>
                    <h2 className="relative mt-6 text-2xl font-extrabold leading-snug !text-white sm:text-3xl">{p.title}</h2>
                    <p className="relative mt-4 font-semibold text-sunrise">Outcome: {p.outcome}</p>
                  </div>
                  <div className="p-8 sm:p-12">
                    <p className="text-lg leading-relaxed text-muted">{p.summary}</p>
                    <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.18em] text-river">What we do</h3>
                    <ul className="mt-4 space-y-3">
                      {p.activities.map((act) => (
                        <li key={act} className="flex gap-3 leading-relaxed text-deep">
                          <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${a.text}`} /> {act}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-river-100 pt-6">
                      <span className="mr-2 text-xs font-bold uppercase tracking-wider text-muted">Aligned with</span>
                      <span className="rounded-full bg-river-50 px-3 py-1 text-xs font-semibold text-river">{p.alignment}</span>
                      {p.sdgs.map((n) => (
                        <span key={n} className="rounded-full bg-deep px-3 py-1 text-xs font-bold text-white">
                          SDG {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
          <Reveal>
            <p className="rounded-2xl bg-sand p-6 text-center leading-relaxed text-deep ring-1 ring-river-100">
              <strong>Cross-cutting practice in every pillar:</strong> locally led action · gender equality and women&apos;s
              empowerment · protection and child safeguarding · disability inclusion · accountability to affected people ·
              PSEA · conflict sensitivity and Do No Harm · environmental sustainability · evidence and learning.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* DELIVERY CYCLE */}
      <section className="relative overflow-hidden bg-deep-900 py-24 text-white lg:py-28">
        <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              light
              center
              eyebrow="Operating model"
              title="From community voice to lasting results"
              intro="Every SHARAN programme follows a five-stage cycle, with accountability and learning built in at each step."
            />
          </Reveal>
          <ol className="mt-16 grid gap-5 md:grid-cols-5">
            {deliveryCycle.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 110}>
                <div className="relative h-full rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sunrise font-display text-lg font-extrabold text-deep-950">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold !text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-river-200">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <p className="mt-10 text-center text-sm text-river-200">
            Cross-cutting controls throughout: inclusion · safeguarding · conflict sensitivity · complaints and feedback ·
            financial accountability
          </p>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Technical capabilities"
              title="Methods and outputs partners can assess"
              intro="Every programme starts from the community's priority and the change that must happen. Evidence is gathered with communities, verified before use, and shared back with them. Every asset built has a plan for who will maintain it."
            />
          </Reveal>
          <div className="mt-14 grid gap-x-14 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 80} className="flex gap-5 border-t border-river-100 py-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-river-50 text-river">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.how}</p>
                  <p className="mt-3 text-sm leading-relaxed text-deep">
                    <span className="font-bold uppercase tracking-wider text-growth">Deliverables · </span>
                    {c.deliverables}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ENGAGEMENT FORMATS */}
      <section className="bg-sand py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Typical engagements"
              title="How partners work with us on the ground"
            />
          </Reveal>
          <ul className="border-t border-river-200/70">
            {engagementFormats.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 80}>
                <div className="flex items-center gap-5 border-b border-river-200/70 py-5">
                  <span className="w-10 shrink-0 font-display text-2xl font-extrabold text-sunrise">0{i + 1}</span>
                  <span className="text-lg leading-relaxed text-deep">{f}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
