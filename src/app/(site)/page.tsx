import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, CloudRain, MapPin, Quote, Sprout } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MapLegend, ShabelleMap } from "@/components/ShabelleMap";
import { NewsCard } from "@/components/NewsCard";
import {
  ButtonLink, Container, CtaBand, Eyebrow, Icon, PhotoCredit, PhotoFrame, RiverWaves, SectionHeading, accent,
} from "@/components/ui";
import { getContent } from "@/lib/content";
import { getPosts } from "@/lib/news";
import { photos, type PhotoKey } from "@/lib/photos";

const pillarIcon: Record<string, string> = {
  "climate-resilience": "Leaf",
  "preparedness-response": "CloudRain",
  "education-health-skills": "GraduationCap",
  peacebuilding: "Handshake",
};

const factColor = ["text-river", "text-growth", "text-sunrise-600", "text-deep"];

const pillarPhoto: Record<string, PhotoKey> = {
  "climate-resilience": "elderCanal",
  "preparedness-response": "floodFamilies",
  "education-health-skills": "classroom",
  peacebuilding: "idpWater",
};

export default async function Home() {
  const [home, keyFacts, valueChain, pillars, gaps, values, groups] = await Promise.all([
    getContent("home"),
    getContent("keyFacts"),
    getContent("valueChain"),
    getContent("pillars"),
    getContent("gaps"),
    getContent("values"),
    getContent("groups"),
  ]);
  const latestNews = (await getPosts()).slice(0, 3);
  const hero = photos.riverAerial;
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-deep pb-44 pt-36 text-white lg:min-h-[52rem] lg:pb-52 lg:pt-48">
        <Image src={hero.src} alt="" fill preload sizes="100vw" placeholder="blur" className="hero-parallax object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-950/95 via-deep/75 to-deep/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-950/80 via-transparent to-deep-950/40" aria-hidden="true" />
        <Container className="hero-fade relative grid items-end gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-river-50 ring-1 ring-white/20 backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-growth opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-growth" />
              </span>
              {home.badge}
            </p>
            <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.04] !text-white drop-shadow-sm sm:text-6xl lg:text-[4.4rem]">
              {home.titleStart} <span className="text-sunrise">{home.titleHighlight}</span> {home.titleEnd}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-river-50 sm:text-xl">
              {home.intro}
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

          <div className="hidden animate-rise flex-col items-end gap-4 [animation-delay:250ms] lg:flex">
            {[
              { icon: MapPin, k: "Headquarters", v: "Jowhar, Hirshabelle State", c: "bg-sunrise text-deep-950" },
              { icon: CloudRain, k: "Act early", v: "Before the flood and the drought", c: "bg-river text-white" },
              { icon: Sprout, k: "Stay for", v: "Lasting, locally owned resilience", c: "bg-growth text-white" },
            ].map(({ icon: I, k, v, c }, i) => (
              <div
                key={k}
                className="flex w-80 items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-md"
                style={{ marginRight: `${i * 2.5}rem` }}
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c}`}>
                  <I className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-river-100">{k}</span>
                  <span className="block font-display font-bold text-white">{v}</span>
                </span>
              </div>
            ))}
          </div>
        </Container>
        <PhotoCredit photo={hero} className="absolute bottom-32 right-4 z-10 hidden sm:block lg:right-8" />
        <RiverWaves />
      </section>

      {/* KEY FACTS */}
      <section className="relative z-10 -mt-24">
        <Container>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-river-100 shadow-[0_30px_70px_-30px_rgba(20,54,92,0.45)] ring-1 ring-river-100 lg:grid-cols-4">
            {keyFacts.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="bg-white p-5 sm:p-7">
                <p className={`font-display text-4xl font-extrabold sm:text-5xl ${factColor[i % factColor.length]}`}>{s.number}</p>
                <p className="mt-2 font-display text-lg font-bold text-deep">{s.label}</p>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* WHO WE ARE: text + photo collage */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Who we are"
                title={
                  <>
                    A local first responder with a <span className="text-river">long-term mandate</span>
                  </>
                }
              />
              <p className="mt-6 text-lg leading-relaxed text-muted">{home.whoWeAreLead}</p>
              <p className="mt-4 leading-relaxed text-muted">{home.whoWeAreBody}</p>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-river-100 pt-8">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-river">Headquarters</dt>
                  <dd className="mt-1 font-display font-bold text-deep">Jowhar, Middle Shabelle</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-river">Operational focus</dt>
                  <dd className="mt-1 font-display font-bold text-deep">Shabelle basin, South &amp; Central Somalia</dd>
                </div>
              </dl>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-bold text-river hover:gap-3">
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <Reveal delay={120} className="relative pb-16 sm:pb-20">
              <PhotoFrame
                photo={photos.floodJowharVillage}
                className="aspect-[4/3] w-[88%] rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(20,54,92,0.6)]"
              />
              <PhotoFrame
                photo={photos.farmAfgoi}
                caption={false}
                sizes="(min-width: 1024px) 25vw, 60vw"
                className="absolute bottom-0 right-0 aspect-[4/3] w-[52%] rounded-[1.5rem] ring-8 ring-white shadow-2xl"
              />
              <div className="absolute -left-3 top-8 hidden rounded-2xl bg-sunrise px-5 py-4 font-display text-deep-950 shadow-xl sm:block">
                <p className="text-xs font-bold uppercase tracking-wider">Flood one season</p>
                <p className="text-lg font-extrabold">Drought the next</p>
              </div>
            </Reveal>
          </div>

          {/* Value chain as a connected timeline */}
          <div className="mt-24">
            <Reveal>
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-river">
                Our value chain, from local reality to lasting resilience
              </p>
            </Reveal>
            <div className="relative mt-10">
            <div
              className="absolute left-0 right-0 top-6 hidden h-1 rounded-full bg-gradient-to-r from-river via-sunrise to-growth lg:block"
              aria-hidden="true"
            />
            <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {valueChain.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 120} className="relative">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-deep font-display text-lg font-extrabold text-white ring-8 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                </Reveal>
              ))}
            </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* PILLARS: photo tiles */}
      <section className="relative overflow-hidden bg-sand py-24 lg:py-32">
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
              const photo = photos[pillarPhoto[p.slug] ?? "riverAerial"];
              return (
                <Reveal key={p.slug} delay={(i % 2) * 120}>
                  <Link
                    href={`/programs#${p.slug}`}
                    className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-deep p-8 text-white shadow-[0_30px_60px_-30px_rgba(20,54,92,0.6)] lg:min-h-[30rem] lg:p-10"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      placeholder="blur"
                      className="scroll-zoom object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-950 via-deep-950/60 to-transparent" aria-hidden="true" />
                    <span className="relative mb-auto flex items-center gap-3 pb-10">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${a.bg} text-white shadow-lg`}>
                        <Icon name={pillarIcon[p.slug] ?? "Sparkles"} className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 font-display text-xs font-bold tracking-wider backdrop-blur">
                        PILLAR 0{p.number}
                      </span>
                    </span>
                    <h3 className="relative text-2xl font-bold leading-snug !text-white lg:text-[1.7rem]">{p.title}</h3>
                    <p className="relative mt-3 max-w-lg leading-relaxed text-river-50/90">{p.summary}</p>
                    <span className="relative mt-6 flex items-center justify-between border-t border-white/20 pt-5">
                      <span className="text-sm font-bold text-sunrise">{p.outcome}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-deep transition group-hover:bg-sunrise">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* WHY IT MATTERS: photo background */}
      <section className="relative overflow-hidden bg-deep-900 py-24 text-white lg:py-32">
        <Image src={photos.idpCamp.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-950/95 via-deep-900/85 to-deep-900/70" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <SectionHeading
                light
                eyebrow="Why SHARAN matters"
                title="Along the Shabelle, a crisis rarely arrives alone."
                intro={home.whyIntro}
              />
              <p className="mt-5 leading-relaxed text-river-100">{home.whyFunding}</p>
              <figure className="mt-10 border-l-4 border-sunrise pl-6">
                <Quote className="h-7 w-7 text-sunrise" aria-hidden="true" />
                <blockquote className="mt-3 font-display text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                  {home.foundingQuestion}
                </blockquote>
                <figcaption className="mt-3 text-sm text-river-200">The question that founded SHARAN</figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-sunrise">The gap SHARAN fills</p>
              </Reveal>
              <ol className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {gaps.map((g, i) => (
                  <Reveal as="li" key={g.title} delay={i * 90} className="flex gap-6 py-6">
                    <span className="w-12 shrink-0 font-display text-3xl font-extrabold text-sunrise/60">0{i + 1}</span>
                    <div>
                      <h3 className="text-lg font-bold !text-white">{g.title}</h3>
                      <p className="mt-1 leading-relaxed text-river-200">{g.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
              <Reveal delay={200}>
                <div className="mt-8 rounded-3xl bg-river/90 p-7 backdrop-blur">
                  <h3 className="text-lg font-bold !text-white">SHARAN&apos;s niche as a local NGO</h3>
                  <ul className="mt-4 grid gap-3 text-sm text-river-50 sm:grid-cols-2">
                    {home.niche.map((t) => (
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

      {/* VALUES: letter band */}
      <section className="py-24 lg:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              center
              eyebrow="Our values"
              title="Six values that spell our name"
              intro="So that every staff member, volunteer and partner can remember them, and live them."
            />
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-0 lg:divide-x lg:divide-river-100">
            {values.map((v, i) => {
              const tone = ["river", "sunrise", "growth", "deep", "river", "growth"][i] as keyof typeof accent;
              return (
                <Reveal key={v.title} delay={i * 80} className="lg:px-5 lg:first:pl-0 lg:last:pr-0">
                  <span className={`block font-display text-7xl font-extrabold leading-none ${accent[tone].text}`}>
                    {v.letter}
                  </span>
                  <span className={`mt-4 block h-1 w-10 rounded-full ${accent[tone].bg}`} aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold leading-snug">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
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
            <ol className="mt-8 space-y-5 border-l-2 border-river-200 pl-6">
              {[
                ["Phase 1 · Core", "Middle Shabelle: Jowhar, Balcad, Mahaday, Adale", "HQ operations, flood and drought response, education, livelihoods"],
                ["Phase 2 · Expansion", "Hiraan and Lower Shabelle", "Riverine resilience, durable solutions, peacebuilding"],
                ["Phase 3 · Wider reach", "Banadir, Galgaduud, Bay, Bakool, Gedo and the Juba regions", "Partnership and consortium-based programmes"],
              ].map(([t, d, f]) => (
                <li key={t} className="relative">
                  <span className="absolute -left-[1.95rem] top-1 h-3.5 w-3.5 rounded-full bg-river ring-4 ring-river-50" aria-hidden="true" />
                  <p className="font-display text-sm font-bold text-river">{t}</p>
                  <p className="font-semibold text-deep">{d}</p>
                  <p className="text-sm text-muted">{f}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <ButtonLink href="/where-we-work">Explore our reach</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* GROUPS: photo + list */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Who we prioritise"
                title="Whole communities, with priority for those least heard."
                intro="SHARAN serves whole communities, but gives priority to those who face the greatest barriers to services, resources and decision-making."
              />
              <PhotoFrame photo={photos.clinic} className="mt-10 aspect-[4/3] rounded-[2rem]" />
            </Reveal>
            <ul className="divide-y divide-river-100 border-y border-river-100">
              {groups.map((g, i) => (
                <Reveal as="li" key={g.title} delay={(i % 3) * 80} className="flex gap-5 py-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-river-50 text-river">
                    <Icon name={g.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{g.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{g.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
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
            {latestNews.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <NewsCard post={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
