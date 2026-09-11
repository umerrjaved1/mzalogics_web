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

export type SeniorityLevel = "Senior / Lead" | "Mid-Level" | "Junior / Associate";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  seniority: SeniorityLevel;
  department: Department;
  image: string;
  initials: string;
  tone: string;
  location: string;
  experience: string;
  hourlyRate: string;
  monthlyRate: string;
  availability: "Immediate" | "1 Pod Slot Left" | "Next Sprint";
  rating: number;
  whyHire: string;
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

export const team: TeamMember[] = [
  {
    slug: "umer-javed",
    name: "Umer Javed",
    role: "Founder & Principal Solutions Architect",
    seniority: "Senior / Lead",
    department: "Leadership",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    initials: "UJ",
    tone: tones.mint,
    location: "Lahore, PK",
    experience: "12 years",
    hourlyRate: "$65/hr",
    monthlyRate: "$5,200/mo",
    availability: "1 Pod Slot Left",
    rating: 5.0,
    whyHire:
      "Direct technical oversight from a veteran architect who has led 50+ enterprise rollouts. Eliminates scope creep and guarantees zero misaligned architecture decisions before a single line of code merges.",
    focus: "Product strategy, high-scale architecture, client delivery partnership",
    bio: "Umer started MZA Logics in 2021 after a decade shipping enterprise systems for logistics and financial operators. He sits in discovery for every engagement, writes the technical scope himself, and stays on the account through launch.",
    skills: ["Product strategy", "Solution architecture", "Technical scoping", "Next.js", "Team building", "AWS Cloud"],
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
    role: "Chief Technology Officer & Lead Architect",
    seniority: "Senior / Lead",
    department: "Leadership",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    initials: "HM",
    tone: tones.lilac,
    location: "Lahore, PK",
    experience: "14 years",
    hourlyRate: "$70/hr",
    monthlyRate: "$5,600/mo",
    availability: "1 Pod Slot Left",
    rating: 5.0,
    whyHire:
      "Enterprise systems architect with 14 years specializing in distributed systems, bank-grade encryption, and zero-leakage AI guardrails. Guaranteed flawless technical compliance.",
    focus: "Distributed architecture, enterprise security standards, AI guardrails",
    bio: "Hira owns the technical bar. She wrote the studio review checklist — the one that says AI-generated code ships under the same tests, threat model, and named human reviewer as anything typed by hand. Previously a principal engineer on multi-tenant fintech platforms.",
    skills: ["Distributed systems", "Threat modelling", "Code review", "Cost engineering", "FastAPI", "PostgreSQL"],
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
    role: "Lead Full-Stack Web Architect",
    seniority: "Senior / Lead",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    initials: "BR",
    tone: tones.sky,
    location: "Lahore, PK",
    experience: "8 years",
    hourlyRate: "$50/hr",
    monthlyRate: "$4,200/mo",
    availability: "Immediate",
    rating: 4.9,
    whyHire:
      "High-velocity Next.js & Node.js specialist who builds resilient database schemas and high-throughput APIs. Known for delivering clean, test-covered platforms that scale past 100k daily users without refactors.",
    focus: "Next.js App Router, high-throughput APIs, clean relational data modelling",
    bio: "Bilal builds the spine of our web platforms: the data model, the API contract, and the release process that follows. He is the engineer clients ask for by name when complex migrations must happen smoothly.",
    skills: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    track: "both",
    projects: [
      {
        title: "Care-ops portal for clinic networks",
        role: "Lead engineer",
        summary:
          "Built the role-based portal and least-privilege access layer, then rolled it out clinic by clinic without a single scheduled downtime.",
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
    role: "Senior Mobile Engineer (Flutter & iOS)",
    seniority: "Senior / Lead",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    initials: "ST",
    tone: tones.clay,
    location: "Lahore, PK",
    experience: "7 years",
    hourlyRate: "$48/hr",
    monthlyRate: "$4,000/mo",
    availability: "Immediate",
    rating: 5.0,
    whyHire:
      "Shipped 20+ mobile apps to Apple App Store & Google Play Store with 4.8+ average ratings. Deep expertise in offline-first caching, biometric security, and silky 60 FPS UI performance.",
    focus: "Flutter, React Native, native Swift/Kotlin bridges, offline sync",
    bio: "Sana has shipped 20+ apps to both stores and knows exactly which review guideline your build is about to encounter. She argues for native when the product needs it and cross-platform when it does not.",
    skills: ["Flutter", "React Native", "Swift", "Kotlin", "Store releases", "SQLite"],
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
    role: "AI & Machine Learning Engineering Lead",
    seniority: "Senior / Lead",
    department: "AI engineering",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    initials: "AS",
    tone: tones.mint,
    location: "Lahore, PK",
    experience: "9 years",
    hourlyRate: "$55/hr",
    monthlyRate: "$4,600/mo",
    availability: "1 Pod Slot Left",
    rating: 4.9,
    whyHire:
      "Constructs production-ready RAG architectures and autonomous agentic pipelines that never hallucinate in front of clients. Builds comprehensive benchmark eval suites before deploying any model to production.",
    focus: "RAG architectures, autonomous agent workflows, model evaluation harnesses",
    bio: "Ahmed runs the AI practice and builds the eval set before the feature. He bridges state-of-the-art LLM capabilities with rigorous enterprise engineering guardrails.",
    skills: ["Python", "PyTorch", "LangChain", "RAG Systems", "pgvector", "FastAPI"],
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
    role: "AI Solutions & Automation Engineer",
    seniority: "Mid-Level",
    department: "AI engineering",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    initials: "ZI",
    tone: tones.lilac,
    location: "Remote - Karachi, PK",
    experience: "5 years",
    hourlyRate: "$35/hr",
    monthlyRate: "$3,200/mo",
    availability: "Immediate",
    rating: 4.8,
    whyHire:
      "Accelerates developer sprint velocity by 30-40% using automated test synthesis, prompt optimization, and CI/CD agent tooling.",
    focus: "AI-assisted delivery tooling, prompt optimization, test generation",
    bio: "Zoya keeps the AI-assisted pipeline sharp: the scaffolding agents, test-generation harnesses, and review gates. She measures exactly how much time tooling saves per sprint.",
    skills: ["TypeScript", "Agent tooling", "Test generation", "Python", "OpenAI APIs"],
    track: "ai",
    projects: [
      {
        title: "Internal delivery accelerator",
        role: "Owner",
        summary:
          "Built the codegen and test-scaffold toolchain behind our AI-accelerated track, including the diff-review gate no PR can skip.",
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
    role: "Head of Product Design & Systems",
    seniority: "Senior / Lead",
    department: "Design",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=400&fit=crop&crop=face",
    initials: "MS",
    tone: tones.sand,
    location: "Lahore, PK",
    experience: "10 years",
    hourlyRate: "$52/hr",
    monthlyRate: "$4,400/mo",
    availability: "1 Pod Slot Left",
    rating: 5.0,
    whyHire:
      "Combines thorough user research with high-converting design systems. Cuts development time in half by delivering pixel-perfect, accessible component libraries directly mapped to Tailwind CSS.",
    focus: "UX research, scalable design systems, accessibility (WCAG AA)",
    bio: "Maryam runs research before pixels. She has redesigned enough operational software to know that the prettiest screen loses to the one that matches how the team actually operates.",
    skills: ["Figma", "Design systems", "UX research", "WCAG", "Prototyping", "Design tokens"],
    track: "both",
    projects: [
      {
        title: "Dispatcher console redesign",
        role: "Design lead",
        summary:
          "Shadowed dispatchers for a week, then rebuilt the exception queue around the three critical decisions they make under pressure.",
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
    role: "Product & Motion Designer",
    seniority: "Mid-Level",
    department: "Design",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=face",
    initials: "DF",
    tone: tones.sky,
    location: "Remote - Islamabad, PK",
    experience: "4 years",
    hourlyRate: "$32/hr",
    monthlyRate: "$2,800/mo",
    availability: "Immediate",
    rating: 4.8,
    whyHire:
      "Rapid prototyping wizard who turns wireframe sketches into interactive clickable prototypes in days, complete with fluid micro-interactions and mobile motion.",
    focus: "Mobile UI, motion design, interactive Figma prototypes",
    bio: "Daniyal turns rough flows into prototypes clients can click through in the first fortnight. Motion is his lever for making a complex app feel intuitive rather than decorated.",
    skills: ["Figma", "Mobile UI", "Motion design", "Lottie", "Design QA"],
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
    role: "QA Automation & Release Lead",
    seniority: "Senior / Lead",
    department: "Quality",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    initials: "NA",
    tone: tones.clay,
    location: "Lahore, PK",
    experience: "8 years",
    hourlyRate: "$42/hr",
    monthlyRate: "$3,600/mo",
    availability: "Immediate",
    rating: 4.9,
    whyHire:
      "Prevents costly production bugs before they reach users. Implements automated end-to-end regression suites and load tests that ensure 99.9% release stability.",
    focus: "Test automation, CI release gates, AI output verification",
    bio: "Nabeel treats quality as a continuous discipline. He owns the automated test suites and exploratory testing passes, ensuring every build is battle-tested.",
    skills: ["Playwright", "Cypress", "API testing", "Load testing", "GitHub Actions"],
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
          "Checklist and tooling for reviewing generated code: test coverage delta, dependency diff, and mandatory human sign-off.",
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
    role: "Cloud & DevOps Solutions Architect",
    seniority: "Senior / Lead",
    department: "Cloud & DevOps",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop&crop=face",
    initials: "UL",
    tone: tones.mint,
    location: "Lahore, PK",
    experience: "9 years",
    hourlyRate: "$52/hr",
    monthlyRate: "$4,400/mo",
    availability: "1 Pod Slot Left",
    rating: 5.0,
    whyHire:
      "Cuts monthly AWS/Azure cloud spend by 30%+ while provisioning zero-downtime CI/CD Kubernetes clusters with automated recovery.",
    focus: "AWS, Azure, Infrastructure as Code (Terraform), Kubernetes",
    bio: "Usman builds the pipelines and dashboards that make deployments uneventful. He optimizes infrastructure cost, security hardening, and observability.",
    skills: ["AWS", "Azure", "Terraform", "Kubernetes", "Docker", "Grafana"],
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
        summary: "Right-sized a SaaS platform footprint and moved asset delivery to the edge.",
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
    role: "Senior Delivery & Agile Project Lead",
    seniority: "Senior / Lead",
    department: "Delivery",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    initials: "AN",
    tone: tones.lilac,
    location: "Lahore, PK",
    experience: "7 years",
    hourlyRate: "$40/hr",
    monthlyRate: "$3,400/mo",
    availability: "Immediate",
    rating: 4.9,
    whyHire:
      "Keeps complex technical projects 100% on schedule and within budget. Provides daily Slack updates, transparent sprint roadmaps, and instant risk mitigation.",
    focus: "Agile delivery, stakeholder communications, sprint velocity management",
    bio: "Ayesha is the person who keeps delivery predictable. She runs the sprint cadence, the demo calendar, and the change log clients quote back to their own boards.",
    skills: ["Scrum", "Roadmapping", "Risk tracking", "Stakeholder comms", "Jira"],
    track: "both",
    projects: [
      {
        title: "Seven-entity finance rollout",
        role: "Delivery manager",
        summary:
          "Sequenced entity onboarding against a repeatable checklist so each new entity was a clean sprint, not a project restart.",
        stack: ["Jira", "Confluence", "Weekly demos"],
        metric: "On plan across 7 entities",
        year: "2023",
        caseStudy: "finance-ops-platform",
      },
      {
        title: "Rescue engagement handover",
        role: "Delivery manager",
        summary:
          "Took over a stalled vendor build, produced a fortnight-one audit, and restarted delivery with an agreed fixed scope.",
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
    role: "Senior Backend & Integrations Engineer",
    seniority: "Mid-Level",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop&crop=face",
    initials: "HR",
    tone: tones.sand,
    location: "Remote - Faisalabad, PK",
    experience: "5 years",
    hourlyRate: "$34/hr",
    monthlyRate: "$3,000/mo",
    availability: "Immediate",
    rating: 4.8,
    whyHire:
      "Specialist in complex third-party APIs, legacy ERP sync, Stripe/PayPal payment webhooks, and fault-tolerant database queues.",
    focus: "API integrations, payments, background queues, Laravel & Python",
    bio: "Hassan handles complex integrations: payment gateways, legacy SOAP endpoints, and ERP exports. Everything ends up idempotent and contract-tested.",
    skills: ["Laravel", "Python", "REST APIs", "Webhooks", "MySQL", "Redis"],
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
  {
    slug: "hamza-tariq",
    name: "Hamza Tariq",
    role: "Junior Full-Stack Developer",
    seniority: "Junior / Associate",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face",
    initials: "HT",
    tone: tones.sky,
    location: "Lahore, PK",
    experience: "2 years",
    hourlyRate: "$22/hr",
    monthlyRate: "$2,000/mo",
    availability: "Immediate",
    rating: 4.7,
    whyHire:
      "Cost-effective, energetic full-stack developer ideal for building rapid UI components, API endpoints, bug triage, and automated unit tests under senior mentorship.",
    focus: "React & Next.js frontend, Node.js endpoints, component styling",
    bio: "Hamza is a fast-learning engineer who delivers pixel-perfect Tailwind layouts, integrates REST/GraphQL endpoints, and writes clean TypeScript code under senior code review.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Jest"],
    track: "both",
    projects: [
      {
        title: "Internal Dashboard Component Suite",
        role: "Frontend developer",
        summary: "Built 35+ responsive reusable UI widgets with dark mode and full keyboard accessibility.",
        stack: ["Next.js", "TypeScript", "Tailwind CSS"],
        metric: "100% design system compliance",
        year: "2025",
      },
      {
        title: "Inventory Admin Subsystem",
        role: "Full-stack developer",
        summary: "Implemented paginated product filters, bulk CSV export, and barcode lookup APIs.",
        stack: ["Next.js", "Prisma", "PostgreSQL"],
        metric: "-60% data entry time",
        year: "2024",
      },
    ],
    links: { linkedin: "#", github: "#" },
  },
  {
    slug: "khadija-ali",
    name: "Khadija Ali",
    role: "Junior Mobile App Developer",
    seniority: "Junior / Associate",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    initials: "KA",
    tone: tones.clay,
    location: "Lahore, PK",
    experience: "2 years",
    hourlyRate: "$20/hr",
    monthlyRate: "$1,800/mo",
    availability: "Immediate",
    rating: 4.8,
    whyHire:
      "Affordable mobile specialist who implements responsive Flutter screens, state management (Provider/Riverpod), and Firebase integrations with rapid turnaround.",
    focus: "Flutter UI screens, state management, Firebase backend integration",
    bio: "Khadija specializes in converting Figma designs into fluid, responsive Flutter apps across iOS and Android, ensuring consistent look and feel on all screen sizes.",
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "State Management", "Git"],
    track: "both",
    projects: [
      {
        title: "Community Event Companion App",
        role: "Mobile developer",
        summary: "Delivered interactive schedule, push notifications, and attendee QR ticketing system in 3 weeks.",
        stack: ["Flutter", "Firebase", "Cloud Functions"],
        metric: "1,200 active event attendees",
        year: "2025",
      },
      {
        title: "Fitness Tracker Mobile UI",
        role: "Mobile developer",
        summary: "Built animated progress rings, workout log forms, and offline SQLite local storage.",
        stack: ["Flutter", "SQLite", "Provider"],
        metric: "4.8 App Store rating",
        year: "2024",
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

export function teamBySeniority(level?: SeniorityLevel) {
  if (!level) return team;
  return team.filter((member) => member.seniority === level);
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
