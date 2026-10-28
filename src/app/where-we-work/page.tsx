import type { Metadata } from "next";
import { Building2, GraduationCap, Landmark, Store, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { MapLegend, ShabelleMap } from "@/components/ShabelleMap";
import { Container, CtaBand, PageHero, SectionHeading, accent } from "@/components/ui";
import { regions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Where we work",
  description:
    "Rooted in the Shabelle, serving South and Central Somalia. SHARAN grows in phases from Middle Shabelle to Hiraan, Lower Shabelle and beyond.",
};

const principles = [
  {
    title: "Federal and state interface",
    text: "We work with the Hirshabelle State Government, SoDMA, line ministries, district authorities and the humanitarian coordination system.",
  },
  {
    title: "Community-enabled delivery",
    text: "Village committees, water-user groups, women's and youth groups and elders provide local knowledge, access and accountability.",
  },
  {
    title: "Risk-led activation",
    text: "Where and how SHARAN works depends on need, access, security and duty of care.",
  },
  {
    title: "The river is the anchor, not the boundary",
    text: "The Shabelle basin is where SHARAN is rooted; its mandate covers South and Central Somalia.",
  },
];

const helix = [
  { icon: Landmark, title: "Public sector", text: "Federal and Hirshabelle ministries, SoDMA and district authorities set policy, coordinate and sustain services." },
  { icon: Users, title: "Civil society", text: "Communities, CBOs, women's and youth groups, elders and religious leaders own and drive change." },
  { icon: GraduationCap, title: "Academia", text: "Universities and research bodies provide evidence, applied research and skills; we offer field access and learning." },
  { icon: Store, title: "Private sector", text: "Local traders, telecoms, money transfer companies and agribusinesses support markets, jobs, cash transfers and innovation." },
];

export default function WhereWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we work"
        title="Rooted in the Shabelle, serving South & Central Somalia."
        intro="SHARAN grows in phases, so that every new area is matched by real presence, community relationships and the capacity to deliver."
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

      <section className="bg-sand py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading center eyebrow="Coverage principles" title="How we decide where and how to work" />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 100}>
                <div className="flex h-full gap-5 rounded-3xl bg-white p-7 ring-1 ring-river-100">
                  <span className="font-display text-4xl font-extrabold text-river-200">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {helix.map((h, i) => (
              <Reveal key={h.title} delay={i * 90}>
                <div className="h-full rounded-3xl bg-gradient-to-b from-river-50 to-white p-7 ring-1 ring-river-100">
                  <h.icon className="h-8 w-8 text-river" />
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
