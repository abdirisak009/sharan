import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3, Building2, ClipboardList, Compass, Eye, Landmark, MapPinned, Scale, Target, Users, Wallet,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { Container, CtaBand, Icon, PageHero, PhotoFrame, SectionHeading, accent } from "@/components/ui";
import { getContent } from "@/lib/content";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About us",
  description:
    "SHARAN was born on the banks of the Shabelle. Learn about our story, vision, mission, values, organisational structure and founding team.",
};


const unitIcons: LucideIcon[] = [ClipboardList, BarChart3, Wallet, MapPinned];
const valueTone = ["bg-river", "bg-sunrise", "bg-growth", "bg-deep", "bg-river-600", "bg-growth-600"];
const valueText = ["text-river", "text-sunrise-600", "text-growth", "text-deep", "text-river-600", "text-growth-600"];

function OrgCard({ node, icon: NodeIcon, tone, level }: { node: { title: string; text: string }; icon: LucideIcon; tone: string; level: string }) {
  return (
    <Reveal className="w-full">
      <div className={`relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${tone} p-6 text-white shadow-[0_24px_50px_-28px_rgba(20,54,92,0.8)] sm:p-7`}>
        <div className="bg-dots-light absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
            <NodeIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white/70">{level}</p>
            <h3 className="mt-0.5 text-xl font-extrabold !text-white">{node.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/85">{node.text}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Connector() {
  return (
    <span className="relative block h-10 w-0.5 bg-gradient-to-b from-river-300 to-river-200" aria-hidden="true">
      <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sunrise ring-4 ring-sand" />
    </span>
  );
}

export default async function AboutPage() {
  const [objectives, values, org, team, nameParts, workingMethods, lenses, groups, pages] = await Promise.all([
    getContent("objectives"),
    getContent("values"),
    getContent("orgStructure"),
    getContent("team"),
    getContent("nameParts"),
    getContent("workingMethods"),
    getContent("lenses"),
    getContent("groups"),
    getContent("pages"),
  ]);
  const hero = pages.about;
  return (
    <>
      <PageHero
        photo={photos.floodFamilies}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
      />

      {/* STORY */}
      <section className="py-24 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="A simple question, asked by the people closest to the river." />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                SHARAN&apos;s founders are Somali professionals in humanitarian response, education, research and
                community development. They watched the same villages around Jowhar flood one season and go hungry the
                next, while support arrived late and left little behind.
              </p>
              <p>
                They asked a simple question: <strong className="text-deep">what if the people closest to the river led the
                response, before, during and after each shock?</strong> They came together to build a local organisation
                that could answer it, combining frontline response with schools, clinics, irrigation, skills and peace.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <PhotoFrame
              photo={photos.floodJowharVillage}
              className="aspect-[4/5] rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(20,54,92,0.6)] lg:aspect-[5/6]"
            />
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-sunrise px-5 py-4 font-display text-deep-950 shadow-xl sm:-left-8">
              <p className="text-xs font-bold uppercase tracking-wider">Founded in</p>
              <p className="text-lg font-extrabold">Jowhar, Middle Shabelle</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* NAME */}
      <section className="relative overflow-hidden bg-deep py-20 text-white">
        <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Reveal className="flex items-center gap-4">
            <LogoMark className="h-14 w-14" />
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-sunrise">The name says what SHARAN stands for</p>
          </Reveal>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
            {nameParts.map((n, i) => (
              <Reveal as="li" key={n.word} delay={i * 100} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent[n.color].bg} font-display text-xl font-extrabold`}>
                  {n.word[0]}
                </span>
                <p className="mt-5 font-display text-2xl font-extrabold text-white">{n.word}</p>
                <p className="mt-2 leading-relaxed text-river-100">{n.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* VISION / MISSION */}
      <section className="bg-sand py-24 lg:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                icon: Eye,
                label: "Vision",
                text: "Resilient, peaceful and self-reliant communities in the Shabelle basin and across Somalia, able to withstand shocks and shape their own future.",
                tone: "from-river to-river-700",
              },
              {
                icon: Compass,
                label: "Mission",
                text: "To save lives and build lasting resilience among vulnerable communities in South and Central Somalia through locally led early action, quality basic services, sustainable livelihoods and peacebuilding.",
                tone: "from-deep to-deep-900",
              },
            ].map((b, i) => (
              <Reveal key={b.label} delay={i * 120}>
                <div className={`relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br ${b.tone} p-10 text-white`}>
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" aria-hidden="true" />
                  <b.icon className="relative h-10 w-10 text-sunrise" />
                  <p className="relative mt-6 font-display text-sm font-bold uppercase tracking-[0.25em] text-sunrise">{b.label}</p>
                  <p className="relative mt-4 font-display text-2xl font-semibold leading-snug sm:text-[1.7rem]">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <div className="rounded-[2rem] bg-white p-8 ring-1 ring-river-100 sm:p-12">
              <div className="flex items-center gap-3">
                <Target className="h-7 w-7 text-river" />
                <h2 className="text-2xl font-extrabold">Core objectives</h2>
              </div>
              <ol className="mt-8 grid gap-4 md:grid-cols-2">
                {objectives.map((o, i) => (
                  <li key={o} className="flex gap-4 rounded-2xl bg-sand p-5">
                    <span className="font-display text-3xl font-extrabold text-sunrise">{i + 1}</span>
                    <span className="pt-1 leading-relaxed text-deep">{o}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* VALUES */}
      <section id="values" className="scroll-mt-24 py-24 lg:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              center
              eyebrow="Core values · S-H-A-R-A-N"
              title="Six values that spell our name"
              intro="Values expressed as operating commitments, so that every staff member, volunteer and partner can remember them and live them."
            />
          </Reveal>
          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 90}>
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] bg-white p-8 ring-1 ring-river-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(20,54,92,0.45)]">
                  <span
                    className={`absolute -right-6 -top-10 font-display text-[10rem] font-extrabold leading-none opacity-[0.07] transition duration-500 group-hover:scale-110 group-hover:opacity-[0.14] ${valueText[i % valueText.length]}`}
                    aria-hidden="true"
                  >
                    {v.letter}
                  </span>
                  <span className={`relative flex h-16 w-16 items-center justify-center rounded-2xl font-display text-3xl font-extrabold text-white shadow-lg ${valueTone[i % valueTone.length]}`}>
                    {v.letter}
                  </span>
                  <h3 className="relative mt-6 text-xl font-bold">{v.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* HOW WE WORK */}
      <section className="relative overflow-hidden bg-deep-900 py-24 text-white lg:py-28">
        <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              light
              eyebrow="How we work"
              title="Six working methods, four cross-cutting lenses"
              intro="Our four pillars are delivered through six working methods and four cross-cutting lenses, held to the Core Humanitarian Standard."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workingMethods.map((m, i) => (
              <Reveal key={m.title} delay={(i % 3) * 90}>
                <div className="h-full rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 transition hover:bg-white/10">
                  <Icon name={m.icon} className="h-8 w-8 text-sunrise" />
                  <h3 className="mt-5 text-lg font-bold !text-white">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-river-200">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {lenses.map((l, i) => (
              <Reveal key={l.title} delay={i * 90}>
                <div className="h-full rounded-2xl border-l-4 border-sunrise bg-white/[0.04] p-6">
                  <h3 className="font-bold !text-white">{l.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-river-200">{l.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ORGANISATIONAL STRUCTURE */}
      <section id="structure" className="relative scroll-mt-24 overflow-hidden bg-sand py-24 lg:py-32">
        <div className="bg-dots absolute inset-0 opacity-50" aria-hidden="true" />
        <Container className="relative">
          <Reveal>
            <SectionHeading center eyebrow="Organisational structure" title={org.heading} intro={org.intro} />
          </Reveal>

          <div className="mx-auto mt-16 max-w-5xl">
            {/* Governance chain */}
            <div className="mx-auto flex max-w-xl flex-col items-center">
              <OrgCard node={org.assembly} icon={Users} tone="from-river to-deep" level="Members" />
              <Connector />
              <OrgCard node={org.board} icon={Landmark} tone="from-deep to-deep-900" level="Oversight" />
              <Connector />
              <OrgCard node={org.director} icon={Compass} tone="from-growth to-growth-600" level="Management" />
              <Connector />
            </div>

            {/* Secretariat */}
            <Reveal className="relative rounded-[2rem] bg-white/70 p-5 ring-1 ring-river-100 backdrop-blur sm:p-8">
              <p className="mb-6 flex items-center justify-center gap-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-river">
                <Building2 className="h-4 w-4" /> {org.secretariatLabel}
              </p>
              <div className="relative">
                <span
                  className="absolute left-[12.5%] right-[12.5%] top-0 hidden h-0.5 bg-gradient-to-r from-river via-sunrise to-growth lg:block"
                  aria-hidden="true"
                />
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:pt-6">
                  {org.units.map((u, i) => {
                    const UnitIcon = unitIcons[i % unitIcons.length];
                    return (
                      <Reveal as="li" key={u.title} delay={i * 90} className="relative">
                        <span className="absolute -top-6 left-1/2 hidden h-6 w-0.5 -translate-x-1/2 bg-river-200 lg:block" aria-hidden="true" />
                        <div className="group h-full rounded-2xl bg-white p-5 shadow-[0_18px_40px_-28px_rgba(20,54,92,0.5)] ring-1 ring-river-100 transition hover:-translate-y-1 hover:ring-river">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-river-50 text-river transition group-hover:bg-river group-hover:text-white">
                            <UnitIcon className="h-5 w-5" />
                          </span>
                          <h3 className="mt-4 font-bold leading-snug">{u.title}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">{u.text}</p>
                        </div>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <div className="flex justify-center">
              <Connector />
            </div>

            {/* Field level */}
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-deep-950 px-6 py-8 text-center text-white sm:px-10">
                <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
                <MapPinned className="relative mx-auto h-8 w-8 text-sunrise" />
                <h3 className="relative mt-3 text-xl font-extrabold !text-white">{org.field.title}</h3>
                <p className="relative mx-auto mt-2 max-w-2xl leading-relaxed text-river-100">{org.field.text}</p>
              </div>
            </Reveal>

            {/* Values as the foundation */}
            <Reveal className="mt-4">
              <a href="#values" className="group block rounded-[2rem] bg-white p-5 ring-1 ring-river-100 transition hover:ring-river sm:p-6">
                <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-muted">Every level is guided by our values</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                  {values.map((v, i) => (
                    <li key={v.title} className="flex items-center gap-2 rounded-xl bg-sand px-3 py-2">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display font-extrabold text-white ${valueTone[i % valueTone.length]}`}>
                        {v.letter}
                      </span>
                      <span className="truncate text-xs font-semibold text-deep">{v.title.split(" ")[0]}</span>
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>

            <Reveal className="mt-10">
              <div className="flex gap-4 rounded-2xl bg-sunrise-50 p-6 ring-1 ring-sunrise-100">
                <Scale className="mt-0.5 h-6 w-6 shrink-0 text-sunrise-600" />
                <div>
                  <p className="font-display font-bold text-deep">Board composition principle</p>
                  <p className="mt-1 leading-relaxed text-deep/80">{org.boardPrinciple}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* TEAM */}
      <section className="bg-sand py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Founding team"
              title="A new organisation built on proven practice"
              intro="SHARAN is a new non-profit, but its founders bring years of humanitarian, education, research and community work in South and Central Somalia. Their experience is theirs; we never present it as SHARAN's own programme record."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {team.map((m) => (
              <Reveal key={m.name} className="lg:col-span-2">
                <div className="flex h-full flex-col gap-6 rounded-[2rem] bg-white p-8 ring-1 ring-river-100 sm:flex-row">
                  <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-river to-deep font-display text-3xl font-extrabold text-white">
                    {m.initials}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{m.name}</h3>
                    <p className="mt-1 font-semibold text-river">{m.role}</p>
                    <p className="mt-4 leading-relaxed text-muted">{m.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={120}>
              <div className="flex h-full flex-col justify-center rounded-[2rem] border-2 border-dashed border-river-200 p-8 text-center">
                <p className="font-display text-lg font-bold text-deep">Growing our team</p>
                <p className="mt-2 text-muted">
                  A lean, accountable core team, community volunteers in every target village and specialists contracted
                  against clear terms of reference.
                </p>
                <Link href="/get-involved#careers" className="mt-4 font-bold text-river hover:underline">
                  See opportunities →
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PRIORITISED GROUPS */}
      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading center eyebrow="Our prioritised groups" title="Those who face the greatest barriers come first" />
          </Reveal>
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <PhotoFrame photo={photos.idpCamp} className="aspect-[4/5] rounded-[2rem]" />
            </Reveal>
            <ul className="divide-y divide-river-100 border-y border-river-100">
              {groups.map((g, i) => {
                const tone = (["river", "sunrise", "growth"] as const)[i % 3];
                return (
                  <Reveal as="li" key={g.title} delay={(i % 3) * 80} className="flex gap-5 py-6">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accent[tone].soft} ${accent[tone].text}`}>
                      <Icon name={g.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">{g.title}</h3>
                      <p className="mt-1 leading-relaxed text-muted">{g.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
