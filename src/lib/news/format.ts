// News helpers shared by the public site and the admin (no data access here).
import type { StaticImageData } from "next/image";
import { photos, type Photo, type PhotoKey } from "@/lib/photos";

export type Block = { type: "h2"; text: string } | { type: "p"; text: string } | { type: "ul"; items: string[] };

/** Parses an article body: blank lines separate blocks, "## " starts a heading, "- " lines form a list. */
export function parseBody(body: string): Block[] {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3).trim() };
      const lines = chunk.split("\n").map((l) => l.trim());
      if (lines.every((l) => l.startsWith("- "))) return { type: "ul", items: lines.map((l) => l.slice(2).trim()) };
      return { type: "p", text: lines.join(" ") };
    });
}

export function readMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(isoDate: string) {
  return new Date(isoDate + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export type NewsImage = { src: StaticImageData | string; alt: string; photo?: Photo };

/** A post's image is either a photo from the library or an uploaded file ("media/<file>"). */
export function newsImage(image: string, title: string): NewsImage {
  if (image.startsWith("media/")) return { src: `/${image}`, alt: title };
  const photo = photos[image as PhotoKey] ?? photos.riverAerial;
  return { src: photo.src, alt: photo.alt, photo };
}
