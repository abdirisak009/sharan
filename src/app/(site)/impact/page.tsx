import Image from "next/image";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Container, CtaBand, PageHero, PhotoFrame, SectionHeading, accent } from "@/components/ui";
import { getContent } from "@/lib/content";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Impact & strategy",
  description:
    "SHARAN's strategic direction for 2027–2029: Build, Deliver, Connect. How we measure results, assure quality and align with Somali and global frameworks.",
};



export default async function ImpactPage() {
  const [strategicDirections, qualityGates, alignment, resourcing, pillars, pages] = await Promise.all([
    getContent("strategicDirections"),
    getContent("qualityGates"),
    getContent("alignment"),
    getContent("resourcing"),
    getContent("pillars"),
    getContent("pages"),
  ]);
  const hero = pages.impact;
  const sdgs = [...new Set(pillars.flatMap((p) => p.sdgs))].sort((a, b) => a - b);
  return (
    <>
      <PageHero
        photo={photos.farmAfgoi}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
      />

      {/* STRATEGY 2027-2029 */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Strategic direction 2027–2029"
              title="Build. Deliver. Connect."
              intro="Three strategic directions, nine goals and a clear outcome for each by 2029."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {strategicDirections.map((d, i) => {
              const a = accent[d.color];
              return (
                <Reveal key={d.name} delay={i * 120}>
                  <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-river-100">
                    <div className={`${a.bg} relative overflow-hidden p-8`}>
                      <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
                      <p className={`relative font-display text-4xl font-extrabold tracking-wider ${d.color === "sunrise" ? "text-deep-950" : "text-white"}`}>
                        {d.name}
                      </p>
                      <p className={`relative mt-1 font-semibold ${d.color === "sunrise" ? "text-deep" : "text-white/80"}`}>{d.subtitle}</p>
                    </div>
                    <ol className="flex-1 divide-y divide-river-100">
                      {d.goals.map((g, j) => (
                        <li key={g.goal} className="p-6">
                          <p className="flex gap-3 font-bold text-deep">
                            <span className={`${a.text} font-display`}>{i * 3 + j + 1}.</span>
                            {g.goal}
                          </p>
                          <p className="mt-2 pl-7 text-sm leading-relaxed text-muted">
                            <span className="font-semibold text-growth">By 2029 → </span>
                            {g.outcome}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* QUALITY GATES */}
      <section className="relative overflow-hidden bg-deep-900 py-24 text-white lg:py-32">
        <Image src={photos.elderCanal.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-950/95 via-deep-900/90 to-deep-950/95" aria-hidden="true" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Quality assurance"
              title="Four quality gates on every programme"
              intro="Results only count when they are verified, validated by communities and handed over with a plan to last."
            />
          </Reveal>
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-sunrise via-river-300 to-growth lg:block" aria-hidden="true" />
            <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {qualityGates.map((g, i) => (
                <Reveal as="li" key={g.title} delay={i * 120}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-deep-950 ring-4 ring-sunrise">
                    <ShieldCheck className="h-7 w-7 text-sunrise" />
                  </span>
                  <p className="mt-6 font-display text-sm font-bold text-sunrise">Gate {i + 1}</p>
                  <h3 className="mt-1 text-xl font-bold !text-white">{g.title}</h3>
                  <p className="mt-2 leading-relaxed text-river-200">{g.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="mt-16">
            <div className="rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 sm:p-9">
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-sunrise">Portfolio integrity</p>
              <p className="mt-3 text-lg leading-relaxed text-river-100">
                SHARAN clearly separates founders&apos; past experience, current projects and pipeline concepts. Concepts are
                never described as awarded grants, and past work of individuals is never presented as organisational
                results.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ALIGNMENT */}
      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Strategic alignment"
              title="From village to global commitments"
              intro="Our work starts with community priorities and connects upward to state, national, regional and global frameworks, so local results contribute to shared goals."
            />
          </Reveal>
          <div className="mt-12 overflow-hidden rounded-[2rem] ring-1 ring-river-100">
            {alignment.map((a, i) => (
              <Reveal key={a.level} delay={i * 60}>
                <div className={`grid gap-3 p-6 md:grid-cols-[180px_1fr_1fr] md:gap-8 md:p-7 ${i % 2 ? "bg-white" : "bg-sand"}`}>
                  <p className="font-display font-extrabold uppercase tracking-wider text-river">{a.level}</p>
                  <p className="text-sm leading-relaxed text-deep">{a.frameworks}</p>
                  <p className="text-sm leading-relaxed text-muted">{a.contribution}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <div className="flex flex-col items-start gap-6 rounded-[2rem] bg-river-50 p-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-display text-lg font-bold text-deep">Sustainable Development Goals we contribute to</p>
                <p className="mt-1 text-sm text-muted">Focused on the 5Ps of the 2030 Agenda: People · Planet · Prosperity · Peace · Partnership</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {sdgs.map((n) => (
                  <span key={n} className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-deep text-white shadow-md">
                    <span className="text-[0.6rem] font-bold tracking-wider text-river-200">SDG</span>
                    <span className="font-display text-xl font-extrabold leading-none">{n}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* RESOURCING */}
      <section className="bg-sand py-24 lg:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Sustainable resourcing"
              title="Diversified, and carefully stewarded"
              intro="We avoid dependence on any single funding source and treat every grant and donation with careful stewardship."
            />
            <PhotoFrame photo={photos.riverWaterWomen} className="mt-10 aspect-[4/3] rounded-[2rem]" />
            <p className="mt-6 rounded-2xl bg-river p-6 leading-relaxed text-white">
              SHARAN will build a modest <strong>emergency reserve</strong> so it can respond to floods and drought before
              external funds arrive.
            </p>
          </Reveal>
          <ul className="divide-y divide-river-200/70 border-y border-river-200/70">
            {resourcing.map((r, i) => (
              <Reveal as="li" key={r.source} delay={(i % 3) * 80} className="flex gap-6 py-7">
                <span className="w-10 shrink-0 font-display text-2xl font-extrabold text-sunrise">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold">{r.source}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{r.approach}</p>
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
