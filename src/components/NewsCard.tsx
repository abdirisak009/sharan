import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { type Article, formatDate } from "@/lib/news";

const gradients = {
  river: "from-river to-deep",
  sunrise: "from-sunrise to-sunrise-600",
  growth: "from-growth to-deep",
  deep: "from-deep to-deep-950",
};

export function NewsCover({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradients[article.accent]} ${large ? "h-72 sm:h-96" : "h-52"}`}
    >
      <div className="bg-dots-light absolute inset-0" aria-hidden="true" />
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C60 20 120 60 200 40 C280 20 340 60 400 40 V80 H0Z" fill="#fff" opacity="0.15" />
        <path d="M0 55 C80 35 140 75 220 55 C300 35 350 70 400 55 V80 H0Z" fill="#fff" opacity="0.22" />
      </svg>
      <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-white/15" aria-hidden="true" />
      <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep">
        {article.category}
      </span>
    </div>
  );
}

export function NewsCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-river-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(20,54,92,0.35)]"
    >
      <NewsCover article={article} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs font-semibold text-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span className="h-1 w-1 rounded-full bg-muted/40" />
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {article.readMinutes} min read
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold leading-snug transition group-hover:text-river">{article.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 font-bold text-river">
          Read more <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
