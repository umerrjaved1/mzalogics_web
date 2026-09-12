/**
 * Visual assets. Local files in /public/media win; stock is the fallback.
 * See public/media/README.txt for filenames.
 */

export function photo(id: string, w: number, h: number, extra = "") {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85${extra}`;
}

export const clientLogos = [
  { name: "NovaTech", mark: "NT", tone: "from-sky-400 to-blue-600", local: "/media/clients/novatech.svg" },
  { name: "BrightPath", mark: "BP", tone: "from-emerald-400 to-teal-600", local: "/media/clients/brightpath.svg" },
  { name: "CloudVerve", mark: "CV", tone: "from-violet-400 to-indigo-600", local: "/media/clients/cloudverve.svg" },
  { name: "BlueEdge", mark: "BE", tone: "from-cyan-300 to-blue-500", local: "/media/clients/blueedge.svg" },
  { name: "SwiftLaunch", mark: "SL", tone: "from-amber-300 to-orange-500", local: "/media/clients/swiftlaunch.svg" },
  { name: "FlowTech", mark: "FT", tone: "from-rose-400 to-pink-600", local: "/media/clients/flowtech.svg" },
  { name: "Meridian", mark: "ML", tone: "from-lime-300 to-emerald-600", local: "/media/clients/meridian.svg" },
  { name: "Northfield", mark: "NF", tone: "from-slate-300 to-slate-600", local: "/media/clients/northfield.svg" },
] as const;

export const studioPhotos = [
  {
    title: "Studio",
    alt: "MZA Logics studio",
    local: "/media/studio/studio.jpg",
    image: photo("photo-1497366811353-6870744d04b2", 900, 1200),
    rotate: "-rotate-6",
  },
  {
    title: "Whiteboarding",
    alt: "Sprint whiteboarding",
    local: "/media/studio/whiteboarding.jpg",
    image: photo("photo-1542744173-8e7e53415bb0", 900, 1200),
    rotate: "rotate-3",
  },
  {
    title: "Pods",
    alt: "Engineering pod",
    local: "/media/studio/pods.jpg",
    image: photo("photo-1522071820081-009f0129c71c", 900, 1200),
    rotate: "-rotate-2",
  },
  {
    title: "Reviews",
    alt: "Code review",
    local: "/media/studio/reviews.jpg",
    image: photo("photo-1600880292203-757bb62b4baf", 900, 1200),
    rotate: "rotate-6",
  },
  {
    title: "Launch",
    alt: "Launch day",
    local: "/media/studio/launch.jpg",
    image: photo("photo-1559136555-9303baea8ebd", 900, 1200),
    rotate: "-rotate-3",
  },
] as const;

export const serviceCovers: Record<string, { local: string; fallback: string }> = {
  "ai-development": { local: "/media/solutions/ai-development.jpg", fallback: photo("photo-1677442136019-21780ecad995", 1400, 880) },
  "app-development": { local: "/media/solutions/app-development.jpg", fallback: photo("photo-1556656793-08538906a9f8", 1400, 880) },
  "web-platforms": { local: "/media/solutions/web-platforms.jpg", fallback: photo("photo-1460925895917-afdab827c52f", 1400, 880) },
  "product-design": { local: "/media/solutions/product-design.jpg", fallback: photo("photo-1558655146-d09347e92766", 1400, 880) },
  "mvp-prototyping": { local: "/media/solutions/mvp-prototyping.jpg", fallback: photo("photo-1517245386807-bb43f82c33c4", 1400, 880) },
  cloud: { local: "/media/solutions/cloud.jpg", fallback: photo("photo-1451187580459-43490279c0fa", 1400, 880) },
  cms: { local: "/media/solutions/cms.jpg", fallback: photo("photo-1499750310107-5fef28a66643", 1400, 880) },
};

export const aboutHero = {
  local: "/media/studio/studio.jpg",
  fallback: photo("photo-1497366811353-6870744d04b2", 2000, 1100),
};

export const REPLACE_LATER = [
  "Client logos → public/media/clients/{name}.svg",
  "Case study stills → public/media/work/{slug}.jpg and {slug}-hero.jpg",
  "Practice covers → public/media/solutions/{slug}.jpg",
  "Studio photos → public/media/studio/*.jpg",
  "Staff portraits → public/media/team/{slug}.jpg",
] as const;
