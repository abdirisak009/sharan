import { Readable } from "node:stream";
import { isMediaFile, readImage } from "@/lib/media";

// Serves photos uploaded in the admin. File names are random and never reused,
// so responses can be cached for a year.
export async function GET(_request: Request, { params }: RouteContext<"/media/[file]">) {
  const { file } = await params;
  if (!isMediaFile(file)) return new Response("Not found", { status: 404 });
  try {
    const { stream, size } = await readImage(file);
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
