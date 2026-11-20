import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { NewsCard, NewsMeta } from "@/components/NewsCard";
import { Container, CtaBand, PhotoCredit, RiverWaves } from "@/components/ui";
import { getPost, getPosts } from "@/lib/news";
import { newsImage, parseBody } from "@/lib/news/format";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const img = newsImage(post.image, post.title);
  const image = typeof img.src === "string" ? img.src : img.src.src;
  return { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, images: [image] } };
}

export default async function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const article = await getPost(slug);
  if (!article) notFound();
  const all = await getPosts();
  const sameCategory = all.filter((p) => p.slug !== article.slug && p.category.slug === article.category.slug);
  const more = [...sameCategory, ...all.filter((p) => p.slug !== article.slug && !sameCategory.includes(p))].slice(0, 3);
  const img = newsImage(article.image, article.title);

  return (
    <>
      <section className="relative overflow-hidden bg-deep pb-32 pt-40 text-white">
        <Image src={img.src} alt="" fill preload sizes="100vw" placeholder={typeof img.src === "string" ? "empty" : "blur"} className="hero-parallax object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-950/95 via-deep/80 to-deep/50" aria-hidden="true" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl animate-rise">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-river-200 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> All news
            </Link>
            <Link
              href={`/news/category/${article.category.slug}`}
              className="mt-8 inline-block rounded-full bg-sunrise px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep-950 transition hover:bg-white"
            >
              {article.category.name}
            </Link>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight !text-white sm:text-5xl">{article.title}</h1>
            <NewsMeta post={article} className="mt-6 text-sm text-river-200" />
          </div>
        </Container>
        {img.photo && <PhotoCredit photo={img.photo} className="absolute bottom-28 right-4 z-10 hidden sm:block lg:right-8" />}
        <RiverWaves />
      </section>

      <article className="py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xl font-semibold leading-relaxed text-deep sm:text-2xl">{article.excerpt}</p>
            <div className="brand-rule my-10 h-1 w-24 rounded-full" />
            {parseBody(article.body).map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i} className="mb-4 mt-10 text-2xl font-bold first:mt-0">
                  {block.text}
                </h2>
              ) : block.type === "ul" ? (
                <ul key={i} className="mb-6 list-disc space-y-2 pl-6 text-lg leading-[1.8] text-ink/85 marker:text-sunrise">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="mb-5 text-lg leading-[1.8] text-ink/85">
                  {block.text}
                </p>
              ),
            )}
          </div>
        </Container>
      </article>

      <section className="bg-sand py-20">
        <Container>
          <h2 className="text-2xl font-extrabold">More from SHARAN</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
