/**
 * Visual assets.
 *
 * Every entry points at a file in /public/media. When the file is not on disk
 * the component renders an honest placeholder — a generated diagram, a
 * gradient, or initials. Nothing here falls back to a stock photo, and nothing
 * here invents a client. See public/media/README.txt for the filenames.
 */

export const studioPhotos = [
  {
    title: "Studio",
    alt: "MZA Logics studio",
    local: "/media/studio/studio.jpg",
    rotate: "-rotate-6",
  },
  {
    title: "Whiteboarding",
    alt: "Sprint whiteboarding",
    local: "/media/studio/whiteboarding.jpg",
    rotate: "rotate-3",
  },
  {
    title: "Pods",
    alt: "Engineering pod",
    local: "/media/studio/pods.jpg",
    rotate: "-rotate-3",
  },
  {
    title: "Reviews",
    alt: "Code review session",
    local: "/media/studio/reviews.jpg",
    rotate: "rotate-6",
  },
  {
    title: "Launch",
    alt: "Launch day",
    local: "/media/studio/launch.jpg",
    rotate: "-rotate-3",
  },
] as const;

export const serviceCovers: Record<string, { local: string }> = {
  "ai-development": { local: "/media/solutions/ai-development.jpg" },
  "app-development": { local: "/media/solutions/app-development.jpg" },
  "web-platforms": { local: "/media/solutions/web-platforms.jpg" },
  "product-design": { local: "/media/solutions/product-design.jpg" },
  "mvp-prototyping": { local: "/media/solutions/mvp-prototyping.jpg" },
  cloud: { local: "/media/solutions/cloud.jpg" },
  cms: { local: "/media/solutions/cms.jpg" },
};

export const aboutHero = {
  local: "/media/studio/studio.jpg",
};

export const REPLACE_LATER = [
  "Client logos → public/media/clients/{name}.svg (only real, permitted clients)",
  "Case study stills → public/media/work/{slug}.jpg and {slug}-hero.jpg",
  "Practice covers → public/media/solutions/{slug}.jpg",
  "Studio photos → public/media/studio/*.jpg",
  "Staff portraits → public/media/team/{slug}.jpg",
  "Client headshots → public/media/testimonials/{slug}.jpg",
] as const;
