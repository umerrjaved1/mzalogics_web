export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  tags: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "ai-development",
    number: "01",
    title: "AI-driven development",
    shortTitle: "AI",
    summary:
      "AI features in your product — and an AI-assisted build that cuts billable hours 30-40%. A named engineer reviews every line.",
    description:
      "Two things live here. What we build for you: assistants that answer from your own documents with citations, extraction from paperwork with a human queue for anything uncertain, and workflow agents that log every action — each shipped with an eval suite you keep. And how we build: AI drafts the scaffolding, tests, and documentation so our engineers spend their hours on your business logic, which is why the same scope costs 30-40% fewer hours. If policy rules out generated code, the hand-crafted track uses no AI tooling at all and comes with a written attestation.",
    tags: ["RAG", "Agents", "Evals", "Guardrails"],
    outcomes: [
      "Working prototype in the first week on most projects",
      "AI features with citations, permissions, and an eval suite you keep",
      "A fully manual delivery track when you need one",
    ],
  },
  {
    slug: "app-development",
    number: "02",
    title: "Mobile app development",
    shortTitle: "Mobile",
    summary:
      "Your app on both stores in 2-10 weeks — native, Flutter, or React Native. Our published work includes 35 Android apps live on Google Play.",
    description:
      "We design, build, and submit iOS and Android apps — native (Swift, Kotlin, Java) or one Flutter or React Native codebase when that saves you money. Android is our deepest bench: 35 published apps on Google Play covering AI photo tools, media players, utilities, and scanners. You get a written scope before work starts, a build you can install every week, and store submission handled for you.",
    tags: ["iOS", "Android", "Flutter", "React Native"],
    outcomes: [
      "A weekly installable build from week one",
      "One codebase for both stores when it fits, native when it matters",
      "Store submission, review replies, and post-launch fixes handled",
    ],
  },
  {
    slug: "web-platforms",
    number: "03",
    title: "Custom web development",
    shortTitle: "Web",
    summary:
      "Dashboards, SaaS products, and internal systems your team can run all day — on Laravel, Python, or Next.js.",
    description:
      "We build the web system your operation runs on: customer-facing platforms, admin dashboards, SaaS products, and the internal tools that replace spreadsheet chains. The stack — Laravel, Python (Django, FastAPI), or Next.js — is picked to fit your product and your team's skills, and the code lives in your repository from day one.",
    tags: ["Laravel", "Python", "Next.js", "APIs"],
    outcomes: [
      "Custom platforms from concept to launch",
      "Workflow automation and real-time dashboards",
      "Integrations with CRM, payments, and cloud",
    ],
  },
  {
    slug: "product-design",
    number: "04",
    title: "UI/UX design",
    shortTitle: "Design",
    summary:
      "Research, flows, and a clickable Figma prototype in 2-6 weeks — developer-ready designs your engineers build from directly.",
    description:
      "We design the screens before anyone pays for code. User research, wireframes, high-fidelity Figma designs, and a clickable prototype you can put in front of customers or investors — typically 2-6 weeks depending on screens. Handoff is developer-ready: components, states, and a design system, not a folder of pictures.",
    tags: ["Figma", "Design systems", "Prototypes", "UX research"],
    outcomes: [
      "Research-driven, conversion-focused UI",
      "Brand-aligned design systems",
      "Developer-ready Figma handoff",
    ],
  },
  {
    slug: "mvp-prototyping",
    number: "05",
    title: "MVP & prototyping",
    shortTitle: "MVP",
    summary:
      "A working MVP in 2-4 weeks: the core screens, UI/UX, and backend — fixed price, ready to demo to users or investors.",
    description:
      "We cut your idea to the smallest version worth paying for, then build it: focused screens, UI/UX, essential backend, and launch. Tightly defined starter concepts (up to five screens) ship in 7-10 days; most MVPs run 2-4 weeks on a fixed written scope. You get a product real users can touch, not a slide deck.",
    tags: ["Discovery", "Prototype", "Launch", "Pitch-ready"],
    outcomes: [
      "A working product you can demo",
      "Clear scope and delivery window",
      "A path from MVP to scale",
    ],
  },
  {
    slug: "cloud",
    number: "06",
    title: "Maintenance & DevOps",
    shortTitle: "DevOps",
    summary:
      "Monitoring, security patching, and releases on a monthly retainer — your product stays up without hiring DevOps.",
    description:
      "We run the infrastructure so you do not have to: 24/7 monitoring, security patches, dependency updates, store and web releases, and a monthly health report in plain English. AWS, GCP, and your existing tooling — with rollback ready before every deploy.",
    tags: ["AWS", "GCP", "Monitoring", "Security"],
    outcomes: [
      "24/7 monitoring and updates",
      "Performance and security hardening",
      "Remote recovery and deployment",
    ],
  },
  {
    slug: "cms",
    number: "07",
    title: "CMS development",
    shortTitle: "CMS",
    summary:
      "A CMS your team edits without calling a developer — custom modules, roles, and migration done for you in 3-8 weeks.",
    description:
      "We build the publishing system around how your team actually works: custom content modules, role-based access, dashboards, and integrations with your CRM and marketing tools. We migrate your existing content as part of the job. A typical implementation is 3-8 weeks, and your team gets training and written docs at handover.",
    tags: ["Custom CMS", "Dashboards", "RBAC", "Integrations"],
    outcomes: [
      "Workflows that match your team",
      "Migration from an existing CMS",
      "Training, docs, and long-term support",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
