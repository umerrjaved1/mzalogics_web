/**
 * The share image every page uses on LinkedIn, WhatsApp, Slack and X.
 *
 * A page that sets its own `openGraph` replaces the root one entirely in
 * Next.js, image included — so each page passes this explicitly. Without it
 * an inner page shared in a chat shows no picture at all.
 */
export const defaultOgImages = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "MZA Logics — mobile apps, web platforms, and AI features",
  },
];
