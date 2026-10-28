import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Container, CtaBand, Icon, PageHero, SectionHeading, accent } from "@/components/ui";
import { capabilities, deliveryCycle, engagementFormats, pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "SHARAN's four strategic pillars: climate resilience and livelihoods; preparedness, response and durable solutions; education, health and skills; and peacebuilding and local governance.",
};

const pillarIcon: Record<string, string> = {
  "climate-resilience": "Leaf",
  "preparedness-response": "CloudRain",
  "education-health-skills": "GraduationCap",
  peacebuilding: "Handshake",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our programs"
        title="Four pillars across the humanitarian, development and peace nexus."
        intro="Together they link early action, essential services, livelihoods and peace, so that every response leaves communities stronger for the next shock."
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
                  <div className={`relative overflow-hidden p-8 text-white sm:p-12 ${a.bg} ${i % 2 ? "lg:order-2" : ""}`}>
                    <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
                    <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" aria-hidden="true" />
                    <span className="relative font-display text-8xl font-extrabold leading-none text-white/20">0{p.number}</span>
                    <span className="relative mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                      <Icon name={pillarIcon[p.slug]} className="h-7 w-7" />
                    </span>
                    <h2 className={`relative mt-6 text-2xl font-extrabold leading-snug sm:text-3xl ${p.color === "sunrise" ? "!text-deep-950" : "!text-white"}`}>
                      {p.title}
                    </h2>
                    <p className={`relative mt-4 text-lg font-semibold ${p.color === "sunrise" ? "text-deep" : "text-white/85"}`}>
                      Outcome: {p.outcome}
                    </p>
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
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={(i % 4) * 80}>
                <div className="group flex h-full flex-col rounded-3xl bg-sand p-6 ring-1 ring-river-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-river ring-1 ring-river-100 transition group-hover:bg-river group-hover:text-white">
                    <Icon name={c.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-bold leading-snug">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.how}</p>
                  <p className="mt-4 border-t border-river-100 pt-4 text-xs leading-relaxed text-deep">
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
          <ul className="space-y-3">
            {engagementFormats.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 80}>
                <div className="flex items-center gap-5 rounded-2xl bg-white p-5 ring-1 ring-river-100">
                  <span className="font-display text-2xl font-extrabold text-sunrise">0{i + 1}</span>
                  <span className="leading-relaxed text-deep">{f}</span>
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
