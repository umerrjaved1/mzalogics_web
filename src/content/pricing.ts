/**
 * Indicative starting prices for the two delivery tracks.
 * Final quotes follow a written scope after discovery.
 */
import { promo, effectivePrice, promoNote, isPromoActive } from "@/content/promo";

/** Blended hourly rate, labelled as a deal rate only while the offer runs. */
function hourlyRateLabel() {
  return isPromoActive() ? `$18 / hour blended (${promo.eyebrow})` : "$18 / hour blended";
}

export type PricingTier = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  compareAt?: string;
  saveLabel?: string;
  priceNote: string;
  timeline: string;
  bestFor: string;
  team: string;
  includes: string[];
  featured?: boolean;
};

export type TrackId = "ai" | "manual";

export type PricingTrack = {
  id: TrackId;
  label: string;
  short: string;
  badge: string;
  blurb: string;
  points: string[];
  tiers: PricingTier[];
};

export const pricingTracks: PricingTrack[] = [
  {
    id: "ai",
    label: "AI-driven development",
    short: "With AI",
    badge: "Fastest to launch",
    blurb:
      "Our engineers lead; AI does the repetitive work. Scaffolding, boilerplate, test drafts, migrations, and documentation are generated inside our pipeline, then reviewed line by line by a named senior engineer before anything merges. You get the same standard of code in fewer hours.",
    points: [
      "~30-40% fewer billable hours on comparable scope",
      "Working prototype in the first week on most projects",
      "Generated code passes the same tests, review, and threat model",
      "Full audit trail of what was generated and who approved it",
    ],
    tiers: [
      {
        slug: "ai-launch",
        name: "Launch",
        tagline: "MVPs, pilots, and single-purpose apps",
        price: "$2,150",
        compareAt: "$3,900",
        saveLabel: promo.discountLabel,
        priceNote: "Q4 deal · fixed scope, starting at",
        timeline: "2-4 weeks",
        bestFor: "Founders validating an idea with real users",
        team: "1 senior engineer + designer, part-time delivery lead",
        includes: [
          "Discovery workshop and written scope",
          "Up to 8 core screens, UI/UX included",
          "AI-assisted build with human review on every diff",
          "Auth, essential backend, and one integration",
          "Store or web launch + 30 days of fixes",
        ],
      },
      {
        slug: "ai-growth",
        name: "Growth",
        tagline: "Production platforms with real users",
        price: "$6,290",
        compareAt: "$11,500",
        saveLabel: promo.discountLabel,
        priceNote: "Q4 deal · typical engagement, starting at",
        timeline: "6-10 weeks",
        bestFor: "Teams replacing spreadsheets or scaling a live product",
        team: "2-3 engineers, designer, QA, delivery lead",
        includes: [
          "Everything in Launch",
          "Custom modules, dashboards, and role-based access",
          "Automated test suite and CI/CD pipeline",
          "Third-party integrations (CRM, payments, cloud)",
          "Performance budget and observability dashboards",
          "90 days of priority support",
        ],
        featured: true,
      },
      {
        slug: "ai-enterprise",
        name: "Enterprise",
        tagline: "Multi-team systems and AI products",
        price: "From $15,400",
        compareAt: "From $28,000",
        saveLabel: promo.discountLabel,
        priceNote: "Q4 deal · quoted after architecture review",
        timeline: "12 weeks+",
        bestFor: "Operators with compliance, scale, or AI feature needs",
        team: "Dedicated pod: 4+ engineers, AI lead, QA, DevOps, delivery",
        includes: [
          "Everything in Growth",
          "Custom architecture and threat model",
          "AI features: retrieval, agents, evals, guardrails",
          "SSO, audit logging, and data-residency options",
          "Load testing and disaster-recovery rehearsal",
          "SLA-backed maintenance and roadmap planning",
        ],
      },
    ],
  },
  {
    id: "manual",
    label: "Hand-crafted development",
    short: "Without AI",
    badge: "Maximum control",
    blurb:
      "Every line written by an MZA engineer, no code generation in the pipeline. Choose this when policy, procurement, licensing, or IP rules require it — or when you simply want a human author for every file. Same team, same standards, more hours on the clock.",
    points: [
      "No generative tooling anywhere in the delivery pipeline",
      "Written attestation of a fully human-authored codebase",
      "Clean-room IP provenance for legal and procurement review",
      "Typically 30-40% longer and priced accordingly",
    ],
    tiers: [
      {
        slug: "manual-launch",
        name: "Launch",
        tagline: "MVPs, pilots, and single-purpose apps",
        price: "$3,250",
        compareAt: "$5,900",
        saveLabel: promo.discountLabel,
        priceNote: "Q4 deal · fixed scope, starting at",
        timeline: "4-6 weeks",
        bestFor: "Founders with IP or policy constraints from day one",
        team: "1 senior engineer + designer, part-time delivery lead",
        includes: [
          "Discovery workshop and written scope",
          "Up to 8 core screens, UI/UX included",
          "Fully hand-written codebase with attestation",
          "Auth, essential backend, and one integration",
          "Store or web launch + 30 days of fixes",
        ],
      },
      {
        slug: "manual-growth",
        name: "Growth",
        tagline: "Production platforms with real users",
        price: "$8,990",
        compareAt: "$16,500",
        saveLabel: promo.discountLabel,
        priceNote: "Q4 deal · typical engagement, starting at",
        timeline: "10-16 weeks",
        bestFor: "Regulated teams that need human-authored code on record",
        team: "2-3 engineers, designer, QA, delivery lead",
        includes: [
          "Everything in Launch",
          "Custom modules, dashboards, and role-based access",
          "Hand-written test suite and CI/CD pipeline",
          "Third-party integrations (CRM, payments, cloud)",
          "Architecture decision records for every major choice",
          "90 days of priority support",
        ],
        featured: true,
      },
      {
        slug: "manual-enterprise",
        name: "Enterprise",
        tagline: "Multi-team, audit-heavy systems",
        price: "From $20,900",
        compareAt: "From $38,000",
        saveLabel: promo.discountLabel,
        priceNote: "Q4 deal · quoted after architecture review",
        timeline: "16 weeks+",
        bestFor: "Enterprises with strict vendor and audit requirements",
        team: "Dedicated pod: 4+ engineers, QA, DevOps, delivery lead",
        includes: [
          "Everything in Growth",
          "Custom architecture, threat model, and security review",
          "SSO, audit logging, and data-residency options",
          "Contributor-level provenance records for the full codebase",
          "Load testing and disaster-recovery rehearsal",
          "SLA-backed maintenance and roadmap planning",
        ],
      },
    ],
  },
];

/** Side-by-side of the two tracks — same rate card, different hour count. */
export const trackComparison: { dimension: string; ai: string; manual: string }[] = [
  { dimension: "Who writes the code", ai: "Engineers direct AI, then review and refactor every diff", manual: "MZA engineers, every line, no generation" },
  { dimension: "Typical timeline", ai: "2-10 weeks for most scopes", manual: "4-16 weeks for the same scope" },
  { dimension: "Indicative cost", ai: "Baseline", manual: "Roughly 1.4x the AI track" },
  { dimension: "Hourly rate", ai: hourlyRateLabel(), manual: hourlyRateLabel() },
  { dimension: "Human review", ai: "Mandatory named reviewer on every merge", manual: "Standard peer review on every merge" },
  { dimension: "Test coverage target", ai: "Same target, tests drafted by AI and hardened by QA", manual: "Same target, tests written by QA" },
  { dimension: "IP provenance", ai: "Generation log per merge, licence scan on dependencies", manual: "Clean-room attestation, contributor-level records" },
  { dimension: "Your data in AI tools", ai: "Never used for vendor training; redaction before any prompt", manual: "Not applicable — no AI tooling used" },
  { dimension: "Best when", ai: "Speed and budget matter and you want AI features in the product", manual: "Policy, procurement, or licensing rules out generated code" },
];

/** Shared across both tracks — stated once so neither table has to repeat it. */
export const everyEngagementIncludes = [
  "A written scope with named deliverables before work starts",
  "Weekly demo, written status note, and access to the board",
  "Source code in your repository from day one",
  "Automated tests and CI/CD on every project",
  "Accessibility and performance checks before launch",
  "Full IP transfer on final payment",
];

export const addOns = [
  {
    title: "Dedicated engineer",
    price: "$2,290 / month",
    compareAt: "$4,200 / month",
    saveLabel: promo.discountLabel,
    body: "One senior engineer embedded in your team, full-time, minimum one month. Add the AI-assisted pipeline at no extra rate.",
  },
  {
    title: "Dedicated pod",
    price: "From $8,190 / month",
    compareAt: "From $14,900 / month",
    saveLabel: promo.discountLabel,
    body: "Three to five people — engineering, design, QA, delivery — running your roadmap as a unit with a fixed monthly cost.",
  },
  {
    title: "Maintenance & DevOps retainer",
    price: "From $469 / month",
    compareAt: "From $850 / month",
    saveLabel: promo.discountLabel,
    body: "Monitoring, security patching, dependency updates, store releases, and a monthly health report.",
  },
  {
    title: "AI feature sprint",
    price: "$3,590 / 3 weeks",
    compareAt: "$6,500 / 3 weeks",
    saveLabel: promo.discountLabel,
    body: "A scoped AI capability in your existing product: retrieval, assistant, extraction, or classification — with an eval suite you keep.",
  },
  {
    title: "Product design sprint",
    price: "$1,590 / 2 weeks",
    compareAt: "$2,900 / 2 weeks",
    saveLabel: promo.discountLabel,
    body: "Research, flows, and a clickable high-fidelity prototype you can put in front of users or investors.",
  },
  {
    title: "Code & architecture audit",
    price: "$790 fixed",
    compareAt: "$1,400 fixed",
    saveLabel: promo.discountLabel,
    body: "A written review of an existing codebase: risks, security findings, effort estimate, and a prioritised remediation plan.",
  },
];

/** Reads from the single promo config so the offer expires on its own. */
export const activeDeal = {
  id: promo.id,
  eyebrow: promo.eyebrow,
  title: promo.title,
  body: promo.body,
  endsLabel: promo.endsLabel,
  cta: promo.cta,
  href: `/contact?deal=${promo.id}`,
  extras: promo.extras,
} as const;

export const pricingNotes = [
  ...(isPromoActive()
    ? [
        `${promo.eyebrow} prices are ${promo.discountLabel} our standard starting rates and apply to statements of work signed by the end of the offer (${promo.endsLabel.toLowerCase()}).`,
      ]
    : []),
  "All figures are in USD and exclude applicable taxes and third-party licence or cloud costs.",
  "Fixed-scope projects are billed 40% to start, 30% at the mid-point demo, and 30% on delivery.",
  "Retainers and dedicated engagements are billed monthly in advance, with 30 days notice to end.",
  "Final quotes follow a free discovery call — the scope drives the number, not the tier you picked.",
];

export type LeadScope = "mobile" | "web" | "ai" | "mvp" | "pod";

export function estimateForScope(scope: LeadScope, track: "ai" | "manual" | "undecided") {
  const id = track === "manual" ? "manual" : "ai";
  const tiers = pricingTracks.find((item) => item.id === id)?.tiers ?? pricingTracks[0].tiers;
  const launch = tiers[0];
  const growth = tiers[1];

  if (scope === "pod") {
    return {
      ...effectivePrice(addOns[1].price, addOns[1].compareAt),
      timeline: "monthly",
      note: promoNote("Q4 deal · dedicated-pod starting point. We confirm capacity on the call."),
    };
  }

  if (scope === "ai" && id === "ai") {
    return {
      ...effectivePrice(addOns[3].price, addOns[3].compareAt),
      timeline: "3 weeks",
      note: promoNote("Q4 deal · typical starting point for a scoped AI feature."),
    };
  }

  const tier = scope === "web" ? growth : launch;
  return {
    ...effectivePrice(tier.price, tier.compareAt),
    timeline: tier.timeline,
    note: `${promoNote(tier.priceNote)}. This is a starting range, not a quote.`,
  };
}
