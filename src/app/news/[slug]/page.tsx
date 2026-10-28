import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import { Container, CtaBand, RiverWaves } from "@/components/ui";
import { articles, formatDate, getArticle } from "@/lib/news";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-deep pb-32 pt-40 text-white">
        <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-sunrise/25 blur-3xl" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl animate-rise">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-river-200 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> All news
            </Link>
            <p className="mt-8 inline-block rounded-full bg-sunrise px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep-950">
              {article.category}
            </p>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight !text-white sm:text-5xl">{article.title}</h1>
            <div className="mt-6 flex items-center gap-3 text-sm text-river-200">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="h-1 w-1 rounded-full bg-river-300" />
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {article.readMinutes} min read
              </span>
            </div>
          </div>
        </Container>
        <RiverWaves />
      </section>

      <article className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xl font-semibold leading-relaxed text-deep sm:text-2xl">{article.excerpt}</p>
            <div className="brand-rule my-10 h-1 w-24 rounded-full" />
            {article.body.map((block, i) => (
              <div key={i} className="mt-8 first:mt-0">
                {block.heading && <h2 className="mb-4 text-2xl font-bold">{block.heading}</h2>}
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="mb-5 text-lg leading-[1.8] text-ink/85">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </article>

      <section className="bg-sand py-20">
        <Container>
          <h2 className="text-2xl font-extrabold">More from SHARAN</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
