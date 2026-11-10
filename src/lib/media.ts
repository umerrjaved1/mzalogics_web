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

/**
 * Sample media: generated stand-in images, each stamped "SAMPLE IMAGE", so the
 * site can be previewed with pictures before the real assets exist. They live
 * in /public/media/_sample and are made by scripts/make-sample-media.py.
 *
 * On in development. Off in a production build unless
 * NEXT_PUBLIC_SAMPLE_MEDIA=1 is set, so a sample can never reach the live
 * site by accident. A real file in /public/media always wins over its sample.
 */
export const sampleMediaEnabled =
  process.env.NEXT_PUBLIC_SAMPLE_MEDIA === "1" ||
  (process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SAMPLE_MEDIA !== "0");

function sampleFor(local: string) {
  const sample = local.replace(/^\/media\//, "/media/_sample/");
  return sample !== local && hasPublicFile(sample) ? sample : undefined;
}

/** Only return a /public path when the file is on disk. */
export function resolveLocal(local: string | undefined) {
  if (hasPublicFile(local)) return local;
  return local && sampleMediaEnabled ? sampleFor(local) : undefined;
}

/** Use a /public file when it exists; otherwise keep the fallback URL. */
export function resolveMedia(local: string | undefined, fallback: string) {
  return resolveLocal(local) ?? fallback;
}

export function teamPhotos(slugs: readonly string[]) {
  return Object.fromEntries(slugs.map((slug) => [slug, resolveLocal(`/media/team/${slug}.jpg`)]));
}

/**
 * Headshots for clients who have agreed to be named. Resolved on the server
 * and handed to the client component, the same way team photos are.
 */
export function testimonialPhotos(slugs: readonly string[]) {
  return Object.fromEntries(
    slugs.map((slug) => [slug, resolveLocal(`/media/testimonials/${slug}.jpg`)]),
  );
}
