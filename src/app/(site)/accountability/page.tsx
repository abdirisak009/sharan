import Image from "next/image";
import type { Metadata } from "next";
import { Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FeedbackForm } from "@/components/Forms";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { getContent } from "@/lib/content";
import { site } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Accountability & safeguarding",
  description:
    "How SHARAN applies the Core Humanitarian Standard, protects vulnerable people, manages resources and responds to feedback and complaints.",
};

export default async function AccountabilityPage() {
  const [chsCommitments, protection, systems, promises, pages] = await Promise.all([
    getContent("chsCommitments"),
    getContent("protection"),
    getContent("systems"),
    getContent("promises"),
    getContent("pages"),
  ]);
  const hero = pages.accountability;
  return (
    <>
      <PageHero
        photo={photos.idpWater}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
      />

      {/* CHS */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Core Humanitarian Standard"
              title="How we deliver the nine CHS commitments"
            />
          </Reveal>
          <div className="mt-12 overflow-hidden rounded-[2rem] ring-1 ring-river-100">
            <div className="hidden grid-cols-[1fr_1fr] gap-8 bg-deep px-7 py-4 text-xs font-bold uppercase tracking-wider text-white md:grid">
              <span>People and communities affected by crisis…</span>
              <span>SHARAN&apos;s practical commitment</span>
            </div>
            {chsCommitments.map((c, i) => (
              <Reveal
                key={c.right}
                delay={(i % 3) * 60}
                className={`grid gap-2 px-7 py-5 md:grid-cols-[1fr_1fr] md:items-center md:gap-8 ${i % 2 ? "bg-white" : "bg-sand"}`}
              >
                <p className="flex gap-4 font-display font-bold leading-snug text-deep">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-river text-sm text-white">{i + 1}</span>
                  <span className="pt-1">…{c.right}</span>
                </p>
                <p className="pl-12 leading-relaxed text-muted md:pl-0">{c.practice}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">SHARAN aims to work towards CHS verification as it grows.</p>
        </Container>
      </section>

      {/* PROTECTION */}
      <section className="relative overflow-hidden bg-deep-900 py-24 text-white lg:py-32">
        <Image src={photos.idpCamp.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-deep-950/95 via-deep-900/90 to-deep-900/60" aria-hidden="true" />
        <Container className="relative grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Protection of vulnerable groups"
              title="Zero tolerance for exploitation, abuse, fraud and corruption."
            />
          </Reveal>
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {protection.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 80} className="flex gap-5 py-6">
                <ShieldAlert className="mt-1 h-7 w-7 shrink-0 text-sunrise" />
                <div>
                  <h3 className="text-lg font-bold !text-white">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-river-100">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* SYSTEMS */}
      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Operational systems"
              title="Controls partners can trust"
              intro="Registration certificate, constitution, policies, financial records, audit reports, staff CVs and references are available to partners through a formal due-diligence process."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-river-100 ring-1 ring-river-100 sm:grid-cols-2 lg:grid-cols-4">
            {systems.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 70} className="bg-white p-6">
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FEEDBACK */}
      <section id="feedback" className="scroll-mt-24 bg-sand py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Feedback & complaints"
              title="Tell us. We will listen, act and respond."
              intro="Anyone can raise feedback, a complaint or a concern about SHARAN's staff, volunteers, partners or programmes, safely and confidentially. You may stay anonymous. Every complaint is logged, answered and reported."
            />
            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-river-100">
                <Phone className="h-6 w-6 text-river" />
                <span>
                  <span className="block text-sm text-muted">Feedback hotline</span>
                  <a href={`tel:${site.feedbackLine.replace(/\s/g, "")}`} className="font-display font-bold text-deep">
                    {site.feedbackLine}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-river-100">
                <Mail className="h-6 w-6 text-river" />
                <span>
                  <span className="block text-sm text-muted">Email</span>
                  <a href={`mailto:${site.email}`} className="font-display font-bold text-deep">
                    {site.email}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-river-100">
                <MessageSquare className="h-6 w-6 text-river" />
                <span>
                  <span className="block text-sm text-muted">In person</span>
                  <span className="font-display font-bold text-deep">Help desks, complaint boxes and community meetings</span>
                </span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(20,54,92,0.35)] ring-1 ring-river-100 sm:p-10">
              <FeedbackForm />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* PROMISE */}
      <section className="py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading center eyebrow="Our promise" title="Our promise of accountability" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {promises.map((p, i) => (
              <Reveal key={p.to} delay={(i % 2) * 100}>
                <div className="h-full rounded-3xl border-l-4 border-sunrise bg-sand p-7">
                  <h3 className="text-lg font-bold">{p.to}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <p className="mx-auto max-w-3xl text-center font-display text-2xl font-bold leading-snug text-deep sm:text-3xl">
              “We go where needs are greatest, act before the shock, and stay until communities can stand on their own.”
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
