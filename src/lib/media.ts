import "server-only";
import { randomUUID } from "node:crypto";
import { Client } from "minio";
import sharp from "sharp";

// Uploaded images are stored in MinIO and served by app/media/[file]/route.ts.

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const bucket = () => process.env.MINIO_BUCKET || "sharan-media";

const globalForMinio = globalThis as unknown as { sharanMinio?: Client };

function client() {
  const { MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY } = process.env;
  if (!MINIO_ENDPOINT || !MINIO_ACCESS_KEY || !MINIO_SECRET_KEY) throw new Error("MinIO is not configured");
  if (!globalForMinio.sharanMinio) {
    const url = new URL(MINIO_ENDPOINT);
    const useSSL = url.protocol === "https:";
    globalForMinio.sharanMinio = new Client({
      endPoint: url.hostname,
      port: Number(url.port) || (useSSL ? 443 : 80),
      useSSL,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });
  }
  return globalForMinio.sharanMinio;
}

export const isMediaFile = (name: string) => /^[0-9a-f-]{36}\.webp$/.test(name);

/**
 * Stores an uploaded photo and returns its reference ("media/<file>"). Photos are
 * resized to at most 2000px and re-encoded as WebP, which also strips metadata
 * such as GPS location.
 */
export async function saveImage(file: File) {
  if (!ACCEPTED.includes(file.type)) throw new Error("Upload a JPG, PNG or WebP photo.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("The photo is larger than 8 MB.");

  const output = await sharp(Buffer.from(await file.arrayBuffer()))
    .rotate()
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const c = client();
  if (!(await c.bucketExists(bucket()))) await c.makeBucket(bucket());
  const name = `${randomUUID()}.webp`;
  await c.putObject(bucket(), name, output, output.length, { "Content-Type": "image/webp" });
  return `media/${name}`;
}

export async function readImage(name: string) {
  const c = client();
  const stat = await c.statObject(bucket(), name);
  return { stream: await c.getObject(bucket(), name), size: stat.size };
}

export async function deleteImage(name: string) {
  await client().removeObject(bucket(), name);
}
