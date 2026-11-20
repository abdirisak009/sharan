import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard, NewsCover, NewsMeta } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/ui";
import { getNewsCategories, getPosts } from "@/lib/news";

/** The news listing with category tabs, used by /news and /news/category/[slug]. */
export async function NewsIndex({ category }: { category?: string }) {
  const [posts, categories] = await Promise.all([getPosts(category), getNewsCategories()]);
  const [featured, ...rest] = posts;
  const tab = (active: boolean) =>
    `shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition ${
      active ? "bg-deep text-white shadow-lg" : "bg-white text-deep ring-1 ring-river-100 hover:ring-river hover:text-river"
    }`;

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <nav aria-label="News categories" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          <Link href="/news" className={tab(!category)} aria-current={!category ? "page" : undefined}>
            All news
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/news/category/${c.slug}`} className={tab(category === c.slug)} aria-current={category === c.slug ? "page" : undefined}>
              {c.name}
            </Link>
          ))}
        </nav>

        {!featured ? (
          <p className="mt-16 text-center text-lg text-muted">No news in this category yet.</p>
        ) : (
          <>
            <Reveal className="mt-10">
              <Link
                href={`/news/${featured.slug}`}
                className="group grid overflow-hidden rounded-[2rem] bg-white ring-1 ring-river-100 transition hover:shadow-[0_30px_60px_-25px_rgba(20,54,92,0.4)] lg:grid-cols-2"
              >
                <NewsCover post={featured} large />
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-sunrise-600">Latest</span>
                  <h2 className="mt-3 text-3xl font-extrabold leading-tight transition group-hover:text-river">{featured.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{featured.excerpt}</p>
                  <NewsMeta post={featured} className="mt-6 text-sm text-muted" />
                  <span className="mt-8 inline-flex items-center gap-2 font-bold text-river group-hover:gap-3">
                    Read the story <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
            {rest.length > 0 && (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <Reveal key={p.slug}>
                    <NewsCard post={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
