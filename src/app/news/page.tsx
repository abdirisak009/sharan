import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { NewsCard, NewsCover } from "@/components/NewsCard";
import { Container, CtaBand, PageHero } from "@/components/ui";
import { articles, formatDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "News & insights",
  description: "Announcements, insights and updates from SHARAN and the communities of the Shabelle.",
};

export default function NewsPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <PageHero
        eyebrow="News & insights"
        title="Stories and updates from the Shabelle."
        intro="Announcements, analysis and lessons from our work with riverine, rural and displaced communities."
      />
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <Link
              href={`/news/${featured.slug}`}
              className="group grid overflow-hidden rounded-[2rem] bg-white ring-1 ring-river-100 transition hover:shadow-[0_30px_60px_-25px_rgba(20,54,92,0.4)] lg:grid-cols-2"
            >
              <NewsCover article={featured} large />
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-sunrise-600">Featured</span>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight transition group-hover:text-river">{featured.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-muted">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span className="h-1 w-1 rounded-full bg-muted/40" />
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {featured.readMinutes} min read
                  </span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-bold text-river group-hover:gap-3">
                  Read the story <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {rest.map((a, i) => (
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
