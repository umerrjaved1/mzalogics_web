/**
 * Dummy visual assets until real ones are ready.
 * Search REPLACE_LATER in this file, then swap URLs / marks.
 *
 * What to add later (real data):
 * 1. Client logos — SVG/PNG in /public/clients/{slug}.svg (replace clientLogos[].logo)
 * 2. Product screenshots — PNG/WebP of shipped UIs (replace caseStudies[].screenshot)
 * 3. Case-study hero crops — wide 1600×900 product shots (replace caseStudies[].heroImage)
 * 4. Testimonial portraits — approved headshots (replace testimonials[].image)
 * 5. Studio / office photos — DHA office, whiteboarding, launch (replace studioPhotos)
 * 6. Industry stills — real environments, not stock (replace industries[].image)
 * 7. Team photos — already on team.ts Unsplash faces; swap to staff portraits
 */

export const clientLogos = [
  { name: "NovaTech", mark: "NT", tone: "from-sky-400 to-blue-600" },
  { name: "BrightPath", mark: "BP", tone: "from-emerald-400 to-teal-600" },
  { name: "CloudVerve", mark: "CV", tone: "from-violet-400 to-indigo-600" },
  { name: "BlueEdge", mark: "BE", tone: "from-cyan-300 to-blue-500" },
  { name: "SwiftLaunch", mark: "SL", tone: "from-amber-300 to-orange-500" },
  { name: "FlowTech", mark: "FT", tone: "from-rose-400 to-pink-600" },
  { name: "Meridian", mark: "ML", tone: "from-lime-300 to-emerald-600" },
  { name: "Northfield", mark: "NF", tone: "from-slate-300 to-slate-600" },
] as const;

export const studioPhotos = [
  {
    title: "Studio",
    alt: "Placeholder: MZA Logics studio floor — replace with DHA office photo",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop",
    rotate: "-rotate-6",
  },
  {
    title: "Whiteboarding",
    alt: "Placeholder: team whiteboarding a sprint — replace with real session photo",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop",
    rotate: "rotate-3",
  },
  {
    title: "Pods",
    alt: "Placeholder: engineering pod at desks — replace with real pod photo",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop",
    rotate: "-rotate-2",
  },
  {
    title: "Reviews",
    alt: "Placeholder: code review huddle — replace with real review photo",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop",
    rotate: "rotate-6",
  },
  {
    title: "Launch",
    alt: "Placeholder: launch celebration — replace with a real ship-day photo",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=1000&fit=crop",
    rotate: "-rotate-3",
  },
] as const;

export const REPLACE_LATER = [
  "Client logo SVGs → src/content/visuals.ts clientLogos",
  "App screenshots → src/content/case-studies.ts screenshot + heroImage",
  "Reviewer portraits → src/content/testimonials.ts image",
  "Office photos → src/content/visuals.ts studioPhotos",
  "Industry photos → src/content/industries.ts image",
  "Staff headshots → src/content/team.ts image",
] as const;
