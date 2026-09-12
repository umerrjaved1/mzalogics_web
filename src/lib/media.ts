import { existsSync } from "node:fs";
import path from "node:path";

function publicPath(local: string) {
  const relative = local.replace(/^\//, "").split("/").join(path.sep);
  return path.join(process.cwd(), "public", relative);
}

export function hasPublicFile(local: string | undefined) {
  if (!local) return false;
  return existsSync(publicPath(local));
}

/** Only return a /public path when the file is on disk. */
export function resolveLocal(local: string | undefined) {
  return hasPublicFile(local) ? local : undefined;
}

/** Use a /public file when it exists; otherwise keep the fallback URL. */
export function resolveMedia(local: string | undefined, fallback: string) {
  return resolveLocal(local) ?? fallback;
}

export function teamPhotos(slugs: readonly string[]) {
  return Object.fromEntries(slugs.map((slug) => [slug, resolveLocal(`/media/team/${slug}.jpg`)]));
}
