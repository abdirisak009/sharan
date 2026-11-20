import type { Metadata } from "next";
import { NewsIndex } from "@/components/NewsIndex";
import { CtaBand, PageHero } from "@/components/ui";
import { getContent } from "@/lib/content";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "News & insights",
  description: "Announcements, insights and updates from SHARAN and the communities of the Shabelle.",
};

export default async function NewsPage() {
  const hero = (await getContent("pages")).news;
  return (
    <>
      <PageHero photo={photos.floodJowharVillage} eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} />
      <NewsIndex />
      <CtaBand />
    </>
  );
}
