/**
 * The team, as it actually is.
 *
 * Every fact here comes from the person's own CV or project list. Rules:
 *  - `previously` names only employers the person has LEFT. A current employer
 *    is never named: it exposes the person and reads as "part-time" to buyers.
 *  - `apps` are things the person worked on in other roles. They belong to
 *    their publishers and are shown on the personal profile only, never as
 *    MZA Logics client work or case studies.
 *  - Rates, ratings, seniority and availability are optional. Leave them out
 *    rather than guess; the pages hide what is missing.
 */

/** MZA Logics client work a member is credited on. Empty until it is real. */
export type TeamProject = {
  title: string;
  role: string;
  summary: string;
  stack: string[];
  metric: string;
  year: string;
  /** Slug in @/content/case-studies, when the project has a public write-up. */
  caseStudy?: string;
};

/** A published app the person worked on in another role. */
export type TeamApp = {
  name: string;
  note: string;
  /** Store listing. Omit when the listing could not be confirmed. */
  url?: string;
};

export type Department =
  | "Leadership"
  | "Engineering"
  | "AI engineering"
  | "Design"
  | "Quality"
  | "Cloud & DevOps"
  | "Delivery";

export type SeniorityLevel = "Senior / Lead" | "Mid-Level" | "Junior / Associate";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  seniority?: SeniorityLevel;
  department: Department;
  /** Portraits come from /public/media/team/{slug}.jpg; initials show until then. */
  initials: string;
  tone: string;
  location?: string;
  experience?: string;
  hourlyRate?: string;
  monthlyRate?: string;
  availability?: "Immediate" | "1 Pod Slot Left" | "Next Sprint";
  rating?: number;
  whyHire: string;
  focus: string;
  bio: string;
  skills: string[];
  track: "ai" | "manual" | "both";
  /** Employers the person has left. Plain text, no logos. */
  previously?: string[];
  apps?: TeamApp[];
  projects: TeamProject[];
  links?: { linkedin?: string; github?: string; dribbble?: string; portfolio?: string; showreel?: string };
};

export const departments: Department[] = [
  "Leadership",
  "Engineering",
  "AI engineering",
  "Design",
  "Quality",
  "Cloud & DevOps",
  "Delivery",
];

export const seniorityLevels: SeniorityLevel[] = [
  "Senior / Lead",
  "Mid-Level",
  "Junior / Associate",
];

const tones = {
  mint: "bg-[#d7efe9]",
  lilac: "bg-[#e8e4ff]",
  sand: "bg-[#f3e6c8]",
  sky: "bg-[#dce8f5]",
  clay: "bg-[#f0d9d6]",
} as const;

const play = (id: string) => `https://play.google.com/store/apps/details?id=${id}`;

export const team: TeamMember[] = [
  {
    slug: "umer-javed",
    name: "Umer Javed",
    role: "Founder & CEO, AI Product Engineer",
    seniority: "Senior / Lead",
    department: "Leadership",
    initials: "UJ",
    tone: tones.mint,
    location: "Lahore, PK",
    experience: "8+ years",
    whyHire:
      "The person who scopes your project is a working engineer: 8+ years of Android development and hands-on AI product work since 2024.",
    focus: "Android architecture, LLM integration, AI product engineering",
    bio: "Umer founded MZA Logics in 2021. He has 8+ years of Android development in Kotlin and Java, and since August 2024 has built AI product features on Claude and GPT models, including prompt and context engineering and tool integrations over the Model Context Protocol (MCP). He joins discovery and writes the technical scope.",
    skills: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "MVVM & Clean Architecture",
      "LLM integration",
      "Prompt & context engineering",
      "MCP tool integration",
      "RAG & vector search",
      "Firebase",
      "Performance optimization",
    ],
    track: "both",
    projects: [],
    links: { linkedin: "https://www.linkedin.com/in/umerjaved10/" },
  },
  {
    slug: "sadaqat-hussain",
    name: "Sadaqat Hussain",
    role: "Senior Android Developer",
    seniority: "Senior / Lead",
    department: "Engineering",
    initials: "SH",
    tone: tones.sky,
    location: "Lahore, PK",
    experience: "6+ years",
    whyHire:
      "6+ years building and maintaining production Android apps in Kotlin and Java, including apps with 10M+ downloads.",
    focus: "Android apps: AI creative tools, media players, photo editors, scanners",
    bio: "Sadaqat is a senior Android developer with 6+ years across AI creative tools, media players, photo editors, scanners and consumer utilities. He works in Kotlin and Java with Jetpack Compose, dependency injection, automated testing and CI/CD, and has hands-on experience with media playback, Firebase and monetization. He holds a BS in Computer Science from Lahore Garrison University.",
    skills: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "Hilt / Dagger",
      "Room",
      "ExoPlayer & media playback",
      "Chromecast",
      "Retrofit & REST APIs",
      "Firebase",
      "JUnit, Mockito, Espresso",
      "CI/CD with GitHub Actions",
      "Google AdMob",
    ],
    track: "both",
    previously: ["eShaafi", "Techloops"],
    apps: [
      {
        name: "PicsGen - AI Art & Photo Editor",
        note: "AI artwork from text prompts and style references, with touch-ups, masking and export.",
        url: play("com.picsgen.ai.art.photo.editor"),
      },
      {
        name: "AspireAi Art & Video Generator",
        note: "AI image, video and text creation with social sharing and creator competitions.",
        url: play("com.aspire.ai.photo.video.hub"),
      },
      {
        name: "Beauty Cam & AI Generation",
        note: "Selfie camera with facial landmarks, segmentation, live beauty filters and AI backgrounds.",
        url: play("ai.photo.video.hdcamera.selfie.beauty.cam"),
      },
      {
        name: "AI Tattoo Generator - Tattoome",
        note: "Tattoo generation and preview with body-contour blending and live AR.",
        url: play("tattoome.ai.tattoogenerator"),
      },
      {
        name: "AI Voice Changer & Sound Effects",
        note: "Voice modulation, pitch and reverb effects, waveform visualization and sharing.",
        url: play("ai.voice.changer.app"),
      },
      {
        name: "Any Video Downloader",
        note: "Media downloading with pause and resume, foreground services and Scoped Storage.",
        url: play("com.allvideo.downloader.reels"),
      },
      {
        name: "Data Recovery - Restore Deleted Files",
        note: "Storage scanning and recovery for images, videos, audio and documents.",
        url: play("com.filerecovery.photosrecovery.deletedrestore"),
      },
      {
        name: "Caller Screen & Ringtone",
        note: "Call-screen themes, animated accept and decline buttons, and flash alerts.",
        url: play("com.call.theme.callscreen.ringtone"),
      },
      {
        name: "WallBox HD Live Wallpapers 4k",
        note: "HD and 4K wallpaper collections with animated live backgrounds.",
        url: play("com.wallbox.wallpaper.live"),
      },
      {
        name: "Translate All: Voice & Photo",
        note: "Translation app supporting voice and photo input.",
        url: play("com.tfl.alllanguagestranslator.text.voice.fasttranslation.camera"),
      },
      {
        name: "Clap to Find Phone - Klapit",
        note: "Find a phone by clap or whistle, with flash alerts and alarm sounds.",
        url: play("claptofind.findmyphone.app"),
      },
      {
        name: "goQR Code Scanner & Creator",
        note: "QR and barcode scanning and creation, scan history and Drive backup.",
        url: play("com.xilli.qrscanner.app"),
      },
      {
        name: "Snaptune AI Photo Editor",
        note: "AI enhancement, background erasing, collages and photo effects.",
        url: play("com.snaptune.ai.photoeditor.collagemaker"),
      },
      {
        name: "Fire Text Photo Frame App",
        note: "Name art, photo frames and editing effects; trusted by 10M+ users.",
        url: play("com.bpva.firetext.photoframes.photoeffects"),
      },
    ],
    projects: [],
    links: { linkedin: "https://www.linkedin.com/in/sadahacks" },
  },
  {
    slug: "ghulam-rasool",
    name: "Ghulam Rasool",
    role: "Android Developer",
    department: "Engineering",
    initials: "GR",
    tone: tones.sand,
    whyHire:
      "Has worked on nine published Android apps on Google Play, across utilities, screen casting, translation and location.",
    focus: "Consumer Android apps: utilities, casting, translation, location",
    bio: "Ghulam Rasool builds consumer Android apps. His published work covers utility tools, screen casting and TV remote control, translation, and location sharing.",
    skills: ["Android apps", "Utility tools", "Screen casting", "Location features", "Translation"],
    track: "both",
    apps: [
      {
        name: "Caller Number Locator",
        note: "Caller number lookup and location.",
        url: play("com.tas.phone.number.locator"),
      },
      {
        name: "Language Translate App",
        note: "Translation across languages.",
        url: play("com.fl.language.translator.all"),
      },
      {
        name: "Bubble Level - Level Tool",
        note: "On-screen spirit level.",
        url: play("leveltool.bubblelevel.level.leveler"),
      },
      {
        name: "Speaker Cleaner - Water Eject",
        note: "Clears water from the phone speaker with sound.",
        url: play("com.ant.seaker.cleaner"),
      },
      {
        name: "Screen Mirroring TV - Miracast",
        note: "Casts the phone screen to a TV.",
        url: play("com.tas.tv.cast"),
      },
      {
        name: "Family Locator: Phone Location",
        note: "Location sharing for families.",
        url: play("com.phonelocation.share.familylocator"),
      },
      {
        name: "Prank Call: Fake Video Call",
        note: "Simulated incoming calls and video calls.",
        url: play("com.tas.prank.video.call"),
      },
      {
        name: "Universal TV Remote Control",
        note: "Controls a TV from the phone.",
        url: play("com.tas.tv.remote.universal"),
      },
      {
        name: "Flight Tracker: Flight Status",
        note: "Live flight status and tracking.",
        url: play("com.fl.flight.tracker.flightstatus.flight.radar"),
      },
    ],
    projects: [],
  },
  {
    slug: "abdul-basit",
    name: "Abdul Basit",
    role: "Graphic Designer & Social Media Marketer",
    department: "Design",
    initials: "AB",
    tone: tones.lilac,
    whyHire: "One person for graphic design, social media marketing and video editing.",
    focus: "Graphic design, social media marketing, video editing",
    bio: "Abdul Basit handles graphic design, social media marketing and video editing. His design and editing portfolios are linked on this page.",
    skills: ["Graphic design", "Social media marketing", "Video editing"],
    track: "both",
    projects: [],
    links: {
      portfolio: "https://bit.ly/Portfolioabasit",
      showreel: "https://bit.ly/editingportfolioab",
    },
  },
];

/** Contact link that carries the chosen person, and their level when we state one. */
export function hireHref(member: TeamMember) {
  const level = member.seniority ? `&seniority=${encodeURIComponent(member.seniority)}` : "";
  return `/contact?engineer=${member.slug}${level}`;
}

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}

export function teamByDepartment() {
  return departments
    .map((department) => ({
      department,
      members: team.filter((member) => member.department === department),
    }))
    .filter((group) => group.members.length > 0);
}

export function teamBySeniority(level?: SeniorityLevel) {
  if (!level) return team;
  return team.filter((member) => member.seniority === level);
}

/** Every employer a team member has left, de-duplicated, in roster order. */
export function teamPreviousEmployers() {
  return [...new Set(team.flatMap((member) => member.previously ?? []))];
}

/** Every portfolio entry, newest first — powers the team portfolio wall. */
export function teamPortfolio() {
  const all = team
    .flatMap((member) => member.projects.map((project) => ({ ...project, member })))
    .sort((a, b) => Number(b.year) - Number(a.year));

  // Several people are credited on the same project, so the flattened list can
  // repeat one case study. Keep the first (most recent) credit for each.
  const seen = new Set<string>();
  return all.filter((project) => {
    const key = project.caseStudy ?? project.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
