import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsIndex } from "@/components/NewsIndex";
import { CtaBand, PageHero } from "@/components/ui";
import { getContent } from "@/lib/content";
import { getNewsCategories } from "@/lib/news";
import { photos } from "@/lib/photos";

export async function generateStaticParams() {
  return (await getNewsCategories()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getNewsCategories()).find((c) => c.slug === slug);
  return category ? { title: `${category.name} · News` } : {};
}

export default async function NewsCategoryPage({ params }: PageProps<"/news/category/[slug]">) {
  const { slug } = await params;
  const [categories, pages] = await Promise.all([getNewsCategories(), getContent("pages")]);
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  return (
    <>
      <PageHero photo={photos.floodJowharVillage} eyebrow={pages.news.eyebrow} title={category.name} intro={pages.news.intro} />
      <NewsIndex category={slug} />
      <CtaBand />
    </>
  );
}
