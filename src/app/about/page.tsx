import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Eye, Target } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { Container, CtaBand, Icon, PageHero, SectionHeading, accent } from "@/components/ui";
import { governance, groups, lenses, objectives, team, values, workingMethods } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description:
    "SHARAN was born on the banks of the Shabelle. Learn about our story, vision, mission, values, governance and founding team.",
};

const nameParts = [
  { word: "Shabelle", text: "is where we are rooted.", color: "bg-river" },
  { word: "Resilience", text: "is the change we work for.", color: "bg-growth" },
  { word: "Action", text: "is how we work: early, practical and accountable.", color: "bg-sunrise" },
  { word: "Network", text: "is our method: we work through communities, local organisations and partners rather than around them.", color: "bg-deep" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SHARAN"
        title="Born on the banks of the Shabelle."
        intro="A Somali national non-governmental organisation working across the humanitarian, development and peace nexus, governed from Jowhar and accountable to the communities it serves."
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
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[2rem] bg-deep p-8 text-white sm:p-10">
              <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <LogoMark className="h-16 w-16" />
                  <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-sunrise">
                    What our name stands for
                  </p>
                </div>
                <ul className="mt-8 space-y-5">
                  {nameParts.map((n) => (
                    <li key={n.word} className="flex gap-4">
                      <span className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${n.color} font-display text-lg font-extrabold`}>
                        {n.word[0]}
                      </span>
                      <p className="leading-relaxed text-river-100">
                        <strong className="font-display text-white">{n.word}</strong> {n.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
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
      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              center
              eyebrow="S-H-A-R-A-N"
              title="Values expressed as operating commitments"
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-river-100 ring-1 ring-river-100 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 90} className="bg-white p-8 transition hover:bg-sand">
                <span className="font-display text-5xl font-extrabold text-river">{v.letter}</span>
                <h3 className="mt-3 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
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

      {/* GOVERNANCE */}
      <section className="py-24 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Governance"
              title="Oversight separated from execution"
              intro="Our governance separates member authority, strategic oversight and day-to-day management. This protects independence, builds partner confidence and ensures no individual can commit the organisation alone."
            />
            <div className="mt-8 rounded-2xl bg-sunrise-50 p-6 ring-1 ring-sunrise-100">
              <p className="font-display font-bold text-deep">Board composition principle</p>
              <p className="mt-2 leading-relaxed text-deep/80">
                The Board includes diverse professional backgrounds (humanitarian, education, finance, law, community
                leadership) and at least one-third women, with no single clan or interest group holding a majority.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ol className="relative space-y-4">
              <span className="absolute bottom-6 left-7 top-6 w-0.5 bg-gradient-to-b from-river via-sunrise to-growth" aria-hidden="true" />
              {governance.map((g, i) => (
                <li key={g.layer} className="relative flex gap-5">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white font-display text-lg font-extrabold text-river shadow-md ring-1 ring-river-100">
                    {i + 1}
                  </span>
                  <div className="flex-1 rounded-2xl bg-sand p-5 ring-1 ring-river-100">
                    <h3 className="font-bold">{g.layer}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{g.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">
              Secretariat units: Programmes · Monitoring, Evaluation, Accountability &amp; Learning (MEAL) · Finance &amp;
              Administration · Field Coordination &amp; Community Engagement.
            </p>
          </Reveal>
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
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, i) => {
              const tone = (["river", "sunrise", "growth"] as const)[i % 3];
              return (
                <Reveal key={g.title} delay={(i % 3) * 90}>
                  <div className="h-full rounded-3xl p-7 ring-1 ring-river-100 transition hover:-translate-y-1 hover:shadow-xl">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent[tone].soft} ${accent[tone].text}`}>
                      <Icon name={g.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{g.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{g.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
