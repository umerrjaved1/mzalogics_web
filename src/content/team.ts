/**
 * PLACEHOLDER TEAM DATA.
 *
 * Names, initials-in-lieu-of-photos, and portfolio entries below are dummy
 * content for layout and copy review. Replace with real profiles before launch —
 * every field here is rendered publicly on /team and /team/[slug].
 */

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

export type Department =
  | "Leadership"
  | "Engineering"
  | "AI engineering"
  | "Design"
  | "Quality"
  | "Cloud & DevOps"
  | "Delivery";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  department: Department;
  initials: string;
  tone: string;
  location: string;
  experience: string;
  focus: string;
  bio: string;
  skills: string[];
  track: "ai" | "manual" | "both";
  projects: TeamProject[];
  links?: { linkedin?: string; github?: string; dribbble?: string };
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

const tones = {
  mint: "bg-[#d7efe9]",
  lilac: "bg-[#e8e4ff]",
  sand: "bg-[#f3e6c8]",
  sky: "bg-[#dce8f5]",
  clay: "bg-[#f0d9d6]",
} as const;

export const team: TeamMember[] = [
  {
    slug: "umer-javed",
    name: "Umer Javed",
    role: "Founder & CEO",
    department: "Leadership",
    initials: "UJ",
    tone: tones.mint,
    location: "Lahore, PK",
    experience: "12 years",
    focus: "Product strategy, delivery, client partnership",
    bio: "Umer started MZA Logics in 2021 after a decade shipping enterprise systems for logistics and financial operators. He sits in discovery for every engagement, writes the scope himself, and stays on the account through launch. His rule for the studio: no estimate leaves the building that an engineer has not signed off on.",
    skills: ["Product strategy", "Solution architecture", "Scoping", "Team building"],
    track: "both",
    projects: [
      {
        title: "Control tower for a regional freight network",
        role: "Engagement lead",
        summary:
          "Ran discovery with dispatchers for three weeks before a line of code, then led the pod that replaced a spreadsheet-and-WhatsApp operation with one exception queue.",
        stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
        metric: "-38% exception handling time",
        year: "2024",
        caseStudy: "logistics-control-tower",
      },
      {
        title: "Close-cycle platform for a multi-entity group",
        role: "Engagement lead",
        summary:
          "Structured a staged rollout across seven entities so finance never ran two systems in the same month.",
        stack: ["Next.js", "Python", "PostgreSQL", "Azure"],
        metric: "-9 days average close",
        year: "2023",
        caseStudy: "finance-ops-platform",
      },
    ],
    links: { linkedin: "https://www.linkedin.com/company/mza-logics" },
  },
  {
    slug: "hira-mansoor",
    name: "Hira Mansoor",
    role: "Chief Technology Officer",
    department: "Leadership",
    initials: "HM",
    tone: tones.lilac,
    location: "Lahore, PK",
    experience: "14 years",
    focus: "Architecture, engineering standards, AI guardrails",
    bio: "Hira owns the technical bar. She wrote the studio review checklist — the one that says AI-generated code ships under the same tests, threat model, and named human reviewer as anything typed by hand. Previously a principal engineer on multi-tenant fintech platforms.",
    skills: ["Distributed systems", "Threat modelling", "Code review", "Cost engineering"],
    track: "both",
    projects: [
      {
        title: "Assistant for a claims operations team",
        role: "Architect",
        summary:
          "Designed the retrieval layer and the permission model that keeps the assistant from ever surfacing a document the asker cannot open.",
        stack: ["Python", "FastAPI", "pgvector", "Azure OpenAI"],
        metric: "0 cross-tenant leaks in audit",
        year: "2025",
        caseStudy: "claims-assistant",
      },
      {
        title: "Multi-tenant SaaS re-platform",
        role: "Principal engineer",
        summary:
          "Split a single-tenant monolith into a pooled architecture with per-tenant encryption and noisy-neighbour limits.",
        stack: ["TypeScript", "PostgreSQL", "Terraform", "AWS"],
        metric: "4x tenants on the same footprint",
        year: "2024",
      },
    ],
    links: { linkedin: "#", github: "#" },
  },
  {
    slug: "bilal-rashid",
    name: "Bilal Rashid",
    role: "Lead Full-Stack Engineer",
    department: "Engineering",
    initials: "BR",
    tone: tones.sky,
    location: "Lahore, PK",
    experience: "8 years",
    focus: "Next.js platforms, APIs, data modelling",
    bio: "Bilal builds the spine of most of our web platforms: the data model, the API contract, and the boring release process that follows. He is the engineer clients ask for by name when a migration has to happen over a weekend.",
    skills: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma"],
    track: "both",
    projects: [
      {
        title: "Care-ops portal for clinic networks",
        role: "Lead engineer",
        summary:
          "Built the role-based portal and the least-privilege access layer, then rolled it out clinic by clinic without a single scheduled downtime.",
        stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
        metric: "9 sites live in 14 weeks",
        year: "2024",
        caseStudy: "healthcare-ops-portal",
      },
      {
        title: "Wholesale ordering platform",
        role: "Lead engineer",
        summary:
          "Replaced a PDF-and-email order flow with a catalogue, credit rules, and ERP sync that finance could reconcile daily.",
        stack: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
        metric: "2.1k orders/day at launch",
        year: "2023",
      },
    ],
    links: { linkedin: "#", github: "#" },
  },
  {
    slug: "sana-tariq",
    name: "Sana Tariq",
    role: "Senior Mobile Engineer",
    department: "Engineering",
    initials: "ST",
    tone: tones.clay,
    location: "Lahore, PK",
    experience: "7 years",
    focus: "Flutter, React Native, native iOS",
    bio: "Sana has shipped 20+ apps to both stores and knows exactly which review guideline your build is about to trip over. She argues for native when the product needs it and cross-platform when it does not — and puts the reasoning in writing either way.",
    skills: ["Flutter", "React Native", "Swift", "Kotlin", "Store releases"],
    track: "both",
    projects: [
      {
        title: "Field-service app for an equipment servicer",
        role: "Mobile lead",
        summary:
          "Offline-first job sheets with photo evidence and signature capture, syncing whenever a technician found signal.",
        stack: ["Flutter", "SQLite", "Firebase"],
        metric: "94% of jobs closed on-site",
        year: "2025",
      },
      {
        title: "Consumer wallet companion app",
        role: "Senior engineer",
        summary:
          "Rebuilt two ageing native apps into one Flutter codebase, keeping biometric auth and platform payment sheets native.",
        stack: ["Flutter", "Kotlin", "Swift"],
        metric: "4.7 stars across both stores",
        year: "2024",
        caseStudy: "retail-app-rebuild",
      },
    ],
    links: { linkedin: "#", github: "#" },
  },
  {
    slug: "ahmed-shafiq",
    name: "Ahmed Shafiq",
    role: "AI Engineering Lead",
    department: "AI engineering",
    initials: "AS",
    tone: tones.mint,
    location: "Lahore, PK",
    experience: "9 years",
    focus: "RAG systems, agents, evaluation harnesses",
    bio: "Ahmed runs the AI practice and is the first to say when a problem does not need a model. When it does, he builds the eval set before the feature — because a demo that impresses a stakeholder and a system that survives Monday morning are different products.",
    skills: ["Python", "LLM orchestration", "Retrieval", "Evals", "Guardrails"],
    track: "ai",
    projects: [
      {
        title: "Assistant for a claims operations team",
        role: "AI lead",
        summary:
          "Grounded answers in the client policy library with citations, plus an eval suite of 400 real questions gating every release.",
        stack: ["Python", "FastAPI", "pgvector", "Azure OpenAI"],
        metric: "-52% average handling time",
        year: "2025",
        caseStudy: "claims-assistant",
      },
      {
        title: "Document intake pipeline",
        role: "AI engineer",
        summary:
          "Classification and extraction over scanned supplier paperwork, with a confidence threshold that routes the uncertain cases to a human queue.",
        stack: ["Python", "OCR", "LLM extraction", "PostgreSQL"],
        metric: "88% straight-through processing",
        year: "2024",
      },
    ],
    links: { linkedin: "#", github: "#" },
  },
  {
    slug: "zoya-imran",
    name: "Zoya Imran",
    role: "AI Solutions Engineer",
    department: "AI engineering",
    initials: "ZI",
    tone: tones.lilac,
    location: "Remote - Karachi, PK",
    experience: "5 years",
    focus: "AI-assisted delivery, prompt systems, tooling",
    bio: "Zoya keeps the AI-assisted pipeline sharp: the scaffolding agents, the test-generation harness, the review gates. She measures how much time the tooling actually saves per sprint and prunes whatever cannot show its work.",
    skills: ["TypeScript", "Agent tooling", "Test generation", "DX automation"],
    track: "ai",
    projects: [
      {
        title: "Internal delivery accelerator",
        role: "Owner",
        summary:
          "Built the codegen and test-scaffold toolchain behind our AI-accelerated track, including the diff-review gate no pull request can skip.",
        stack: ["TypeScript", "Node.js", "CI pipelines"],
        metric: "~35% faster first delivery",
        year: "2025",
      },
      {
        title: "Support triage copilot",
        role: "AI engineer",
        summary:
          "Draft replies and tag suggestions for a support desk, with a human approve step and a weekly quality sample.",
        stack: ["Python", "LLM APIs", "Zendesk API"],
        metric: "-41% first-response time",
        year: "2024",
      },
    ],
    links: { linkedin: "#", github: "#" },
  },
  {
    slug: "maryam-siddiqui",
    name: "Maryam Siddiqui",
    role: "Head of Product Design",
    department: "Design",
    initials: "MS",
    tone: tones.sand,
    location: "Lahore, PK",
    experience: "10 years",
    focus: "UX research, design systems, accessibility",
    bio: "Maryam runs research before pixels. She has redesigned enough operational software to know that the prettiest screen loses to the one that matches how the floor already works — and she will show you the session recordings to prove it.",
    skills: ["Figma", "Design systems", "UX research", "WCAG", "Prototyping"],
    track: "both",
    projects: [
      {
        title: "Dispatcher console redesign",
        role: "Design lead",
        summary:
          "Shadowed dispatchers for a week, then rebuilt the exception queue around the three decisions they actually make under pressure.",
        stack: ["Figma", "Design tokens", "Usability testing"],
        metric: "-38% exception handling time",
        year: "2024",
        caseStudy: "logistics-control-tower",
      },
      {
        title: "MZA design system",
        role: "Owner",
        summary:
          "One token set and component library shared across client products, with contrast and focus states audited at the source.",
        stack: ["Figma", "Tailwind", "Storybook"],
        metric: "AA contrast across 120 components",
        year: "2023",
      },
    ],
    links: { linkedin: "#", dribbble: "#" },
  },
  {
    slug: "daniyal-farooq",
    name: "Daniyal Farooq",
    role: "Product Designer",
    department: "Design",
    initials: "DF",
    tone: tones.sky,
    location: "Remote - Islamabad, PK",
    experience: "4 years",
    focus: "Mobile UI, motion, prototypes",
    bio: "Daniyal turns rough flows into prototypes clients can click through in the first fortnight. Motion is his lever for making a complex app feel obvious rather than decorated.",
    skills: ["Figma", "Mobile UI", "Motion design", "Design QA"],
    track: "both",
    projects: [
      {
        title: "Consumer wallet companion app",
        role: "Product designer",
        summary:
          "Unified two divergent native apps into a single design language without losing the platform conventions users relied on.",
        stack: ["Figma", "Lottie", "Prototyping"],
        metric: "4.7 stars across both stores",
        year: "2024",
        caseStudy: "retail-app-rebuild",
      },
      {
        title: "Onboarding flow for an eLearning product",
        role: "Product designer",
        summary: "Cut a nine-step signup to four and moved the paywall to the moment the value was visible.",
        stack: ["Figma", "A/B tests"],
        metric: "+24% activation",
        year: "2023",
      },
    ],
    links: { linkedin: "#", dribbble: "#" },
  },
  {
    slug: "nabeel-akhtar",
    name: "Nabeel Akhtar",
    role: "QA Lead",
    department: "Quality",
    initials: "NA",
    tone: tones.clay,
    location: "Lahore, PK",
    experience: "8 years",
    focus: "Test automation, release gates, AI output review",
    bio: "Nabeel treats quality as a phase that runs alongside development, not after it. He owns the automated suites and the manual exploratory passes, and he is the named reviewer on AI-generated diffs more often than anyone else in the studio.",
    skills: ["Playwright", "Cypress", "API testing", "Load testing", "Accessibility audits"],
    track: "both",
    projects: [
      {
        title: "Regression suite for a close-cycle platform",
        role: "QA lead",
        summary:
          "Contract tests against the general ledger integration plus an audit-event suite that fails the build on any untracked action.",
        stack: ["Playwright", "Pact", "GitHub Actions"],
        metric: "100% actions with audit trail",
        year: "2023",
        caseStudy: "finance-ops-platform",
      },
      {
        title: "AI output review harness",
        role: "Co-owner",
        summary:
          "Checklist and tooling for reviewing generated code: test coverage delta, dependency diff, and a mandatory human sign-off.",
        stack: ["TypeScript", "CI pipelines"],
        metric: "Every AI diff human-reviewed",
        year: "2025",
      },
    ],
    links: { linkedin: "#" },
  },
  {
    slug: "usman-latif",
    name: "Usman Latif",
    role: "Cloud & DevOps Engineer",
    department: "Cloud & DevOps",
    initials: "UL",
    tone: tones.mint,
    location: "Lahore, PK",
    experience: "9 years",
    focus: "AWS, Azure, IaC, observability",
    bio: "Usman builds the pipelines and dashboards that make a release uneventful. He would rather spend a day on alerting thresholds than a night on an incident, and the on-call log backs him up.",
    skills: ["AWS", "Azure", "Terraform", "Kubernetes", "Grafana"],
    track: "both",
    projects: [
      {
        title: "Zero-downtime migration for a clinic network",
        role: "DevOps lead",
        summary:
          "Blue-green cutover per site with a rollback path rehearsed before each rollout, and dashboards the operator still uses.",
        stack: ["AWS", "Terraform", "Grafana"],
        metric: "0 minutes planned downtime",
        year: "2024",
        caseStudy: "healthcare-ops-portal",
      },
      {
        title: "Cost and performance hardening",
        role: "DevOps engineer",
        summary: "Right-sized a SaaS platform footprint and moved image and asset delivery to the edge.",
        stack: ["Azure", "CDN", "Kubernetes"],
        metric: "-31% monthly cloud spend",
        year: "2025",
      },
    ],
    links: { linkedin: "#", github: "#" },
  },
  {
    slug: "ayesha-noor",
    name: "Ayesha Noor",
    role: "Delivery Manager",
    department: "Delivery",
    initials: "AN",
    tone: tones.lilac,
    location: "Lahore, PK",
    experience: "7 years",
    focus: "Agile delivery, client communication, scope control",
    bio: "Ayesha is the person who tells you a date has moved before you notice. She runs the sprint cadence, the demo calendar, and the change log clients quote back to their own boards.",
    skills: ["Scrum", "Roadmapping", "Risk tracking", "Stakeholder comms"],
    track: "both",
    projects: [
      {
        title: "Seven-entity finance rollout",
        role: "Delivery manager",
        summary:
          "Sequenced entity onboarding against a repeatable checklist so each new entity was a task, not a project.",
        stack: ["Jira", "Confluence", "Weekly demos"],
        metric: "On plan across 7 entities",
        year: "2023",
        caseStudy: "finance-ops-platform",
      },
      {
        title: "Rescue engagement handover",
        role: "Delivery manager",
        summary:
          "Took over a stalled vendor build, produced a fortnight-one audit, and restarted delivery with a scope both sides signed.",
        stack: ["Audit", "Backlog reset", "Fixed milestones"],
        metric: "Shipped 6 weeks after takeover",
        year: "2025",
      },
    ],
    links: { linkedin: "#" },
  },
  {
    slug: "hassan-raza",
    name: "Hassan Raza",
    role: "Backend Engineer",
    department: "Engineering",
    initials: "HR",
    tone: tones.sand,
    location: "Remote - Faisalabad, PK",
    experience: "5 years",
    focus: "Laravel, Python, integrations",
    bio: "Hassan handles the integrations nobody volunteers for: legacy SOAP endpoints, payment gateways with creative documentation, ERP exports that change shape every quarter. They end up contract-tested and boring.",
    skills: ["Laravel", "Python", "REST", "Webhooks", "MySQL"],
    track: "manual",
    projects: [
      {
        title: "Payment and ledger integrations",
        role: "Backend engineer",
        summary:
          "Idempotent payment handling with reconciliation reports finance could tie back to the gateway line by line.",
        stack: ["Laravel", "MySQL", "Stripe", "Local gateways"],
        metric: "99.98% reconciliation match",
        year: "2024",
      },
      {
        title: "CMS migration for a media operator",
        role: "Backend engineer",
        summary: "Moved 40k articles with redirects, media, and editorial roles intact over a single weekend.",
        stack: ["Laravel", "Python", "Elasticsearch"],
        metric: "40k articles, 0 broken links",
        year: "2023",
      },
    ],
    links: { linkedin: "#", github: "#" },
  },
];

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

/** Every portfolio entry, newest first — powers the team portfolio wall. */
export function teamPortfolio() {
  return team
    .flatMap((member) => member.projects.map((project) => ({ ...project, member })))
    .sort((a, b) => Number(b.year) - Number(a.year));
}
