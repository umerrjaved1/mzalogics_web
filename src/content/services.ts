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
      "Ship faster with AI inside our pipeline — and AI features inside your product. Every generated line reviewed by a named engineer.",
    description:
      "Two things live here. First, how we build: AI handles scaffolding, migrations, test drafts, and documentation so our engineers spend their hours on architecture and business logic — typically 30-40% fewer billable hours for the same scope. Second, what we build for you: retrieval assistants grounded in your own documents, document extraction with a human queue for low-confidence cases, workflow agents that log every action, and the eval suites that keep all of it honest after launch. If policy rules out generated code, our hand-crafted track uses no AI tooling at all and comes with a written attestation.",
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
    summary: "Smart, secure, and scalable apps for Android and iOS — native or cross-platform with Flutter and React Native.",
    description:
      "Unlock iOS and Android with high-performance apps built for store launch, security, and growth. We handle native (Swift, Kotlin, Java), Flutter, and React Native so you can build once and launch everywhere when that is the right call. From strategy and UI to store submission and post-launch support, we stay with the product.",
    tags: ["iOS", "Android", "Flutter", "React Native"],
    outcomes: [
      "Native-like speed and UI on both stores",
      "Faster launch with a unified codebase when it fits",
      "Store submission, QA, and post-launch updates",
    ],
  },
  {
    slug: "web-platforms",
    number: "03",
    title: "Custom web development",
    shortTitle: "Web",
    summary:
      "High-performance, modern web platforms engineered for speed, scalability, and business growth.",
    description:
      "We turn complex requirements into intuitive, high-performance web applications — platforms, dashboards, SaaS products, and internal systems. Laravel, Python (Django, Flask, FastAPI), and modern JavaScript stacks are chosen to fit the product, not the other way around.",
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
      "Beautiful, intuitive interfaces crafted for effortless usability — polished experiences that build trust and elevate your brand.",
    description:
      "We craft interfaces that blend beauty with function. Research, wireframes, high-fidelity Figma systems, interactive prototypes, and accessible responsive design — typically 2–6 weeks depending on screens.",
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
    summary: "Validate your idea fast. We build functional minimum viable products to help you pitch and launch sooner.",
    description:
      "Starter and growth engagements for small apps and MVP concepts: focused screens, UI/UX, backend integration, and a timeline you can take to investors or first customers. Typical starter scope includes basic setup, up to five screens, and 7–10 day delivery on tightly defined concepts.",
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
      "Ongoing server monitoring, security updates, and optimization to keep your software running 24/7.",
    description:
      "Cloud infrastructure and DevOps so operations can sleep. We monitor, patch, and optimize — AWS, GCP, and related tooling — with observability, security updates, and a team that treats uptime as part of the product.",
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
      "A CMS that adapts to your content — custom modules, intuitive dashboards, and workflows that match how your team publishes.",
    description:
      "We build CMS platforms around your operations: streamlined publishing, role-based access, real-time insights, and integrations with CRMs and marketing tools. Typical full implementation is 3–8 weeks, including migration of existing content when you need it.",
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
