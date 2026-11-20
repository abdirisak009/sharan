import Image from "next/image";
import type { Metadata } from "next";
import { Briefcase, Building2, CheckCircle2, Coins, HandHeart, Handshake, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { DonateWidget } from "@/components/Forms";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { getContent } from "@/lib/content";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Partner with SHARAN, donate, volunteer or join our team to build lasting resilience along the Shabelle.",
};

const ways = [
  { href: "#partner", icon: Handshake, title: "Partner", text: "Funders, UN agencies, INGOs, authorities and researchers." },
  { href: "#donate", icon: HandHeart, title: "Donate", text: "Individuals, businesses and the Somali diaspora." },
  { href: "#volunteer", icon: Users, title: "Volunteer", text: "Community volunteers in every target village." },
  { href: "#careers", icon: Briefcase, title: "Careers", text: "Core staff, project staff and specialist roster." },
];


export default async function GetInvolvedPage() {
  const [partnerGroups, advantages, modalities, roster, pages] = await Promise.all([
    getContent("partnerGroups"),
    getContent("advantages"),
    getContent("modalities"),
    getContent("roster"),
    getContent("pages"),
  ]);
  const hero = pages.getInvolved;
  return (
    <>
      <PageHero
        photo={photos.classroom}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={hero.intro}
      />

      {/* WAYS */}
      <section className="relative z-10 -mt-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <a
                  href={w.href}
                  className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_24px_50px_-24px_rgba(20,54,92,0.45)] ring-1 ring-river-100 transition hover:-translate-y-1.5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-river-50 text-river transition group-hover:bg-sunrise group-hover:text-deep-950">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-xl font-bold">{w.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PARTNER */}
      <section id="partner" className="scroll-mt-24 py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Partner with us"
                title="Where SHARAN adds distinctive value"
                intro="We welcome partners who value local ownership, accountability and lasting results."
              />
              <ul className="mt-8 space-y-3">
                {advantages.map((a) => (
                  <li key={a} className="flex gap-3 leading-relaxed text-deep">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-growth" /> {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="divide-y divide-river-100 border-y border-river-100">
              {partnerGroups.map((p, i) => (
                <Reveal key={p.group} delay={i * 60}>
                  <div className="grid gap-2 py-6 sm:grid-cols-[1fr_1.3fr] sm:gap-6">
                    <p className="flex gap-3 font-bold text-deep">
                      <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-river" /> {p.group}
                    </p>
                    <p className="leading-relaxed text-muted">{p.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-16">
            <div className="rounded-[2rem] bg-deep p-8 text-white sm:p-10">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-sunrise">Engagement modalities</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {modalities.map((m) => (
                  <div key={m.title} className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/10">
                    <p className="font-display text-xl font-extrabold">{m.title}</p>
                    <p className="mt-1 text-sm text-river-200">{m.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="accent">
                  Start a partnership conversation
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* DONATE */}
      <section id="donate" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-river-50 via-white to-sunrise-50 py-24 lg:py-28">
        <div className="bg-dots absolute inset-0 opacity-40" aria-hidden="true" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Donate"
              title="Help communities act before the shock."
              intro="Your gift helps village committees prepare for floods and drought, keeps children learning and restores the land families depend on. Part of every gift strengthens our emergency reserve, so we can respond before external funds arrive."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Coins, t: "Stewarded with care", d: "Bank-based transactions, monthly reconciliation and annual external audit." },
                { icon: Users, t: "Diaspora giving", d: "Matched funding and partnerships with Somali businesses are welcome." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl bg-white p-5 ring-1 ring-river-100">
                  <x.icon className="h-6 w-6 text-sunrise-600" />
                  <p className="mt-3 font-bold text-deep">{x.t}</p>
                  <p className="mt-1 text-sm text-muted">{x.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_-30px_rgba(20,54,92,0.45)] ring-1 ring-river-100 sm:p-10">
              <h3 className="text-2xl font-extrabold">Make a gift</h3>
              <p className="mt-1 mb-7 text-sm text-muted">Choose an amount and we will send you secure giving details.</p>
              <DonateWidget />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* VOLUNTEER + CAREERS */}
      <section className="py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div id="volunteer" className="relative h-full scroll-mt-28 overflow-hidden rounded-[2rem] bg-growth p-8 text-white sm:p-10">
              <Image src={photos.floodJowharVillage.src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-growth-600/95 via-growth-600/85 to-deep/80" aria-hidden="true" />
              <div className="relative">
              <Users className="h-10 w-10" />
              <h2 className="mt-6 text-3xl font-extrabold !text-white">Volunteer</h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Community volunteers are at the heart of SHARAN&apos;s model. In every target village, volunteers support
                early warning committees, community mobilisation, feedback and monitoring. Every volunteer signs our code
                of conduct and is trained in safeguarding.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="ghost-light">
                  Register your interest
                </ButtonLink>
              </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div id="careers" className="h-full scroll-mt-28 rounded-[2rem] bg-white p-8 ring-1 ring-river-100 sm:p-10">
              <Briefcase className="h-10 w-10 text-river" />
              <h2 className="mt-6 text-3xl font-extrabold">Careers & specialist roster</h2>
              <p className="mt-4 leading-relaxed text-muted">
                We keep a small, accountable core team and scale through project staff and specialists contracted against
                clear terms of reference. Recruitment is fair and transparent, with gender balance in hiring. We welcome
                expressions of interest for our specialist roster:
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {roster.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-deep">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-river" /> {r}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href="/contact">Send your CV</ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
