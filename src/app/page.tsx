import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import { HeroArt } from "@/components/HeroArt";
import { Reveal } from "@/components/Reveal";
import { MapLegend, ShabelleMap } from "@/components/ShabelleMap";
import { NewsCard } from "@/components/NewsCard";
import { ButtonLink, Container, CtaBand, Eyebrow, Icon, RiverWaves, SectionHeading, accent } from "@/components/ui";
import { gaps, groups, pillars, valueChain, values } from "@/lib/content";
import { articles } from "@/lib/news";

const pillarIcon: Record<string, string> = {
  "climate-resilience": "Leaf",
  "preparedness-response": "CloudRain",
  "education-health-skills": "GraduationCap",
  peacebuilding: "Handshake",
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-deep pb-40 pt-36 text-white lg:pb-48 lg:pt-44">
        <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
        <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-sunrise/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-river/50 blur-3xl" aria-hidden="true" />
        <Container className="relative grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-river-100 ring-1 ring-white/15 backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-growth opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-growth" />
              </span>
              Somali-led · Community-rooted · Jowhar, Hirshabelle
            </p>
            <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.04] !text-white sm:text-6xl lg:text-[4.2rem]">
              Rooted in the Shabelle.{" "}
              <span className="bg-gradient-to-r from-sunrise to-[#ffd08a] bg-clip-text text-transparent">
                Ready before the shock.
              </span>{" "}
              Resilient for good.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-river-100 sm:text-xl">
              SHARAN helps riverine, rural and displaced communities in South and Central Somalia anticipate climate
              shocks, recover with dignity and build lasting resilience.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/programs" variant="accent">
                Explore our work
              </ButtonLink>
              <ButtonLink href="/get-involved" variant="ghost-light">
                Partner with us
              </ButtonLink>
            </div>
          </div>
          <div className="animate-rise [animation-delay:200ms]">
            <HeroArt />
          </div>
        </Container>
        <RiverWaves />
      </section>

      {/* KEY FACTS */}
      <section className="relative z-10 -mt-24">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-river-100 shadow-[0_30px_70px_-30px_rgba(20,54,92,0.45)] ring-1 ring-river-100 grid-cols-2 lg:grid-cols-4">
            {[
              { n: "4", l: "Strategic pillars", s: "across the humanitarian–development–peace nexus", c: "text-river" },
              { n: "3", l: "Initial regions", s: "Middle Shabelle, Hiraan and Lower Shabelle", c: "text-growth" },
              { n: "6", l: "Core values", s: "that spell our name: S-H-A-R-A-N", c: "text-sunrise-600" },
              { n: "9", l: "CHS commitments", s: "guiding quality and accountability", c: "text-deep" },
            ].map((s, i) => (
              <Reveal
                key={s.l}
                delay={i * 90}
                className="bg-white p-5 sm:p-7"
              >
                <p className={`font-display text-4xl font-extrabold sm:text-5xl ${s.c}`}>{s.n}</p>
                <p className="mt-2 font-display text-lg font-bold text-deep">{s.l}</p>
                <p className="mt-1 text-sm text-muted">{s.s}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PROPOSITION + VALUE CHAIN */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Who we are"
                title={
                  <>
                    A local first responder with a <span className="text-river">long-term mandate</span>
                  </>
                }
              />
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-muted lg:pt-10">
                SHARAN is not a single-sector project implementer or a short-lived emergency outfit. It is a
                network-based local organisation that combines frontline response with long-term resilience, working
                through village committees, river and water-user groups, women&apos;s and youth groups, elders and local
                authorities, so that every intervention is owned locally and continues after funding ends.
              </p>
              <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-bold text-river hover:gap-3">
                Our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="relative mt-16">
            <div
              className="absolute left-0 right-0 top-9 hidden h-1 rounded-full bg-gradient-to-r from-river via-sunrise to-growth lg:block"
              aria-hidden="true"
            />
            <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {valueChain.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 120}>
                  <div className="flex h-full flex-col rounded-3xl bg-sand p-7 ring-1 ring-river-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-deep font-display text-lg font-extrabold text-white ring-8 ring-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* PILLARS */}
      <section className="relative overflow-hidden bg-sand py-24 lg:py-32">
        <div className="bg-dots absolute inset-0 opacity-50" aria-hidden="true" />
        <Container className="relative">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal>
              <SectionHeading
                eyebrow="What we do"
                title="Four pillars. One locally owned approach."
                intro="Our work links humanitarian response, development and peace, so each intervention leaves a lasting asset behind."
              />
            </Reveal>
            <Reveal delay={100}>
              <ButtonLink href="/programs" variant="secondary">
                All programs
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {pillars.map((p, i) => {
              const a = accent[p.color];
              return (
                <Reveal key={p.slug} delay={(i % 2) * 120}>
                  <Link
                    href={`/programs#${p.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-river-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(20,54,92,0.4)] lg:p-10"
                  >
                    <span
                      className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${a.soft} transition-transform duration-500 group-hover:scale-150`}
                      aria-hidden="true"
                    />
                    <span className="relative flex items-center justify-between">
                      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${a.bg} text-white shadow-lg`}>
                        <Icon name={pillarIcon[p.slug]} className="h-7 w-7" />
                      </span>
                      <span className="font-display text-6xl font-extrabold text-river-50">0{p.number}</span>
                    </span>
                    <h3 className="relative mt-7 text-2xl font-bold leading-snug">{p.title}</h3>
                    <p className="relative mt-3 flex-1 leading-relaxed text-muted">{p.summary}</p>
                    <span className="relative mt-6 flex items-center justify-between border-t border-river-100 pt-5">
                      <span className={`text-sm font-bold ${a.text}`}>{p.outcome}</span>
                      <ArrowUpRight className="h-5 w-5 text-river transition group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* WHY IT MATTERS */}
      <section className="relative overflow-hidden bg-deep-900 py-24 text-white lg:py-32">
        <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-river/30 blur-3xl" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                light
                eyebrow="Why SHARAN matters"
                title="Along the Shabelle, a crisis rarely arrives alone."
                intro="Flooding submerges IDP shelters and farmland and raises cholera risk. The next season, failed rains dry the river and push families into hunger and displacement. Communities need credible local actors who act early, deliver accountably and stay for the long term."
              />
              <figure className="mt-10 rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
                <Quote className="h-8 w-8 text-sunrise" />
                <blockquote className="mt-4 font-display text-xl font-semibold leading-relaxed text-white">
                  What if the people closest to the river led the response, before, during and after each shock?
                </blockquote>
                <figcaption className="mt-4 text-sm text-river-200">The question that founded SHARAN</figcaption>
              </figure>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {gaps.map((g, i) => (
                <Reveal key={g.title} delay={i * 100}>
                  <div className="h-full rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 transition hover:bg-white/10">
                    <span className="font-display text-sm font-bold text-sunrise">The gap 0{i + 1}</span>
                    <h3 className="mt-3 text-lg font-bold !text-white">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-river-200">{g.text}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={400} className="sm:col-span-2">
                <div className="rounded-3xl bg-gradient-to-br from-river to-river-700 p-7">
                  <h3 className="text-lg font-bold !text-white">SHARAN&apos;s niche as a local NGO</h3>
                  <ul className="mt-4 grid gap-3 text-sm text-river-50 sm:grid-cols-2">
                    {[
                      "First-line local responder embedded in the Shabelle basin",
                      "Connects response to recovery and development",
                      "Turns early warning into locally owned anticipatory action",
                      "Builds peace and social cohesion into every programme",
                    ].map((t) => (
                      <li key={t} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sunrise" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* VALUES */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              center
              eyebrow="Our values"
              title={
                <>
                  Six values that spell our name
                </>
              }
              intro="So that every staff member, volunteer and partner can remember them, and live them."
            />
          </Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const tone = ["river", "sunrise", "growth", "deep", "river", "growth"][i] as keyof typeof accent;
              return (
                <Reveal key={v.title} delay={(i % 3) * 100}>
                  <div className="group relative h-full overflow-hidden rounded-3xl p-8 ring-1 ring-river-100 transition hover:-translate-y-1 hover:shadow-xl">
                    <span
                      className={`absolute -right-4 -top-8 font-display text-[9rem] font-extrabold leading-none ${accent[tone].text} opacity-10 transition group-hover:opacity-20`}
                      aria-hidden="true"
                    >
                      {v.letter}
                    </span>
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent[tone].bg} font-display text-2xl font-extrabold text-white`}
                    >
                      {v.letter}
                    </span>
                    <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* WHERE WE WORK */}
      <section className="bg-river-50/60 py-24 lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_30px_70px_-30px_rgba(20,54,92,0.45)] ring-1 ring-river-100">
              <ShabelleMap className="h-auto w-full rounded-[1.5rem]" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Where we work"
              title="The river is our anchor, not our boundary."
              intro="Headquartered in Jowhar, the capital of Hirshabelle State, SHARAN grows in phases so that every new area is matched by real presence, community relationships and the capacity to deliver."
            />
            <div className="mt-8">
              <MapLegend />
            </div>
            <div className="mt-8 space-y-3">
              {[
                ["Phase 1 · Core", "Middle Shabelle: Jowhar, Balcad, Mahaday, Adale"],
                ["Phase 2 · Expansion", "Hiraan and Lower Shabelle"],
                ["Phase 3 · Wider reach", "Banadir, Galgaduud, Bay, Bakool, Gedo and the Juba regions"],
              ].map(([t, d]) => (
                <div key={t} className="flex flex-col rounded-2xl bg-white px-5 py-4 ring-1 ring-river-100 sm:flex-row sm:items-center sm:gap-4">
                  <span className="font-display text-sm font-bold text-river sm:w-44 sm:shrink-0">{t}</span>
                  <span className="text-sm text-deep">{d}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ButtonLink href="/where-we-work">Explore our reach</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* GROUPS */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Who we prioritise"
                title="Whole communities, with priority for those least heard."
                intro="We give priority to the people who face the greatest barriers to services, resources and decision-making."
              />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {groups.map((g, i) => (
                <Reveal key={g.title} delay={(i % 2) * 100}>
                  <div className="flex h-full gap-4 rounded-2xl bg-sand p-5 ring-1 ring-river-100 transition hover:bg-white hover:shadow-lg">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-river ring-1 ring-river-100">
                      <Icon name={g.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-bold">{g.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{g.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* NEWS */}
      <section className="bg-sand py-24 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <Eyebrow>News &amp; insights</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Latest from SHARAN</h2>
            </Reveal>
            <Link href="/news" className="inline-flex items-center gap-2 font-bold text-river hover:gap-3">
              View all news <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 100}>
                <NewsCard article={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
