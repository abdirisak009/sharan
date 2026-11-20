import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/lib/news";
import { formatDate, newsImage } from "@/lib/news/format";

export function NewsCover({ post, large = false }: { post: Post; large?: boolean }) {
  const img = newsImage(post.image, post.title);
  return (
    <div className={`relative overflow-hidden bg-deep ${large ? "h-72 sm:h-full sm:min-h-96" : "h-52"}`}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
        placeholder={typeof img.src === "string" ? "empty" : "blur"}
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-950/50 to-transparent" aria-hidden="true" />
      <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep">
        {post.category.name}
      </span>
    </div>
  );
}

export function NewsMeta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-xs font-semibold ${className}`}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="h-1 w-1 rounded-full bg-current opacity-40" />
      <span className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
      </span>
    </div>
  );
}

export function NewsCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-river-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(20,54,92,0.35)]"
    >
      <NewsCover post={post} />
      <div className="flex flex-1 flex-col p-6">
        <NewsMeta post={post} className="text-muted" />
        <h3 className="mt-3 text-xl font-bold leading-snug transition group-hover:text-river">{post.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1 font-bold text-river">
          Read more <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
