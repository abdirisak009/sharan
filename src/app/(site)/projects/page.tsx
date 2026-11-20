import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, Handshake, MapPin, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { getContent } from "@/lib/content";
import { photos, type PhotoKey } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Projects",
  description: "SHARAN's projects along the Shabelle: what is in the pipeline, what is under way and what has been delivered.",
};

const statusStyle: Record<string, string> = {
  Concept: "bg-white/90 text-deep",
  "In discussion": "bg-sunrise text-deep-950",
  Active: "bg-growth text-white",
  Completed: "bg-river text-white",
};

const statusOrder = ["Active", "In discussion", "Concept", "Completed"];

export default async function ProjectsPage() {
  const [projects, deliveryCycle, pages] = await Promise.all([
    getContent("projects"),
    getContent("deliveryCycle"),
    getContent("pages"),
  ]);
  const hero = pages.projects;
  const sorted = [...projects].sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
  const counts = statusOrder.map((s) => [s, projects.filter((p) => p.status === s).length] as const).filter(([, n]) => n > 0);

  return (
    <>
      <PageHero photo={photos.floodFamilies} eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro}>
        <ul className="mt-10 flex flex-wrap gap-2">
          {counts.map(([status, n]) => (
            <li key={status} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 backdrop-blur">
              <span className="font-display text-base font-extrabold text-sunrise">{n}</span> {status}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="py-20 lg:py-28">
        <Container>
          {sorted.length === 0 ? (
            <p className="text-center text-lg text-muted">Projects will be published here soon.</p>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map((p, i) => {
                const photo = photos[p.photo as PhotoKey] ?? photos.riverAerial;
                return (
                  <Reveal as="li" key={p.title} delay={(i % 3) * 100}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-river-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(20,54,92,0.5)]">
                      <div className="relative h-56 overflow-hidden bg-deep">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          placeholder="blur"
                          className="scroll-zoom object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-950/70 via-transparent to-transparent" aria-hidden="true" />
                        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow ${statusStyle[p.status] ?? statusStyle.Concept}`}>
                          {p.status}
                        </span>
                        {p.pillar && (
                          <span className="absolute bottom-4 left-4 right-4 truncate text-sm font-semibold text-white">{p.pillar}</span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h2 className="text-xl font-bold leading-snug">{p.title}</h2>
                        <p className="mt-3 flex-1 leading-relaxed text-muted">{p.summary}</p>
                        <dl className="mt-6 space-y-2 border-t border-river-100 pt-5 text-sm">
                          {[
                            { icon: MapPin, label: "Location", value: p.location },
                            { icon: Handshake, label: "Partner", value: p.partner },
                            { icon: CalendarDays, label: "Period", value: p.period },
                          ]
                            .filter((m) => m.value)
                            .map(({ icon: MetaIcon, label, value }) => (
                              <div key={label} className="flex items-center gap-2.5 text-deep">
                                <MetaIcon className="h-4 w-4 shrink-0 text-river" />
                                <dt className="sr-only">{label}</dt>
                                <dd>{value}</dd>
                              </div>
                            ))}
                        </dl>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </ul>
          )}

          <Reveal className="mt-16">
            <div className="flex flex-col gap-6 rounded-[2rem] bg-deep p-8 text-white sm:flex-row sm:items-center sm:p-10">
              <ShieldCheck className="h-12 w-12 shrink-0 text-sunrise" />
              <div className="flex-1">
                <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-sunrise">Portfolio integrity</p>
                <p className="mt-2 text-lg leading-relaxed text-river-100">
                  SHARAN clearly separates founders&apos; past experience, current projects and pipeline concepts. Concepts are
                  never described as awarded grants, and past work of individuals is never presented as organisational results.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How every project is delivered */}
      <section className="bg-sand py-24 lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal>
              <SectionHeading
                eyebrow="How every project is delivered"
                title="From community voice to lasting results"
                intro="Every SHARAN project follows the same five-stage cycle, with accountability and learning built in at each step."
              />
            </Reveal>
            <Reveal>
              <ButtonLink href="/get-involved#partner" variant="secondary">
                Partner on a project
              </ButtonLink>
            </Reveal>
          </div>
          <div className="relative mt-14">
          <span
            className="absolute left-0 right-0 top-6 hidden h-1 rounded-full bg-gradient-to-r from-river via-sunrise to-growth md:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-6 md:grid-cols-5">
            {deliveryCycle.map((stage, i) => (
              <Reveal as="li" key={stage.title} delay={i * 90} className="relative">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-deep font-display text-lg font-extrabold text-white ring-8 ring-sand">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stage.text}</p>
              </Reveal>
            ))}
          </ol>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
