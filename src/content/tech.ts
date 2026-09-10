export const techStack = [
  {
    group: "Web & frontend",
    items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Vue", "Laravel Blade"],
  },
  {
    group: "Mobile",
    items: ["Flutter", "React Native", "Swift", "Kotlin", "Java"],
  },
  {
    group: "Backend & APIs",
    items: ["Node.js", "NestJS", "Laravel", "Django", "FastAPI", "GraphQL"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "pgvector", "Elasticsearch"],
  },
  {
    group: "AI & ML",
    items: ["Claude", "Azure OpenAI", "LangChain", "Vector search", "Eval harnesses", "OCR pipelines"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
  {
    group: "Design & QA",
    items: ["Figma", "Storybook", "Playwright", "Cypress", "Lighthouse", "Axe"],
  },
] as const;

/** Milestones for the About page timeline. */
export const timeline = [
  { year: "2021", title: "MZA Logics founded", body: "Four senior engineers start the studio in Lahore with a first logistics client." },
  { year: "2022", title: "Mobile practice", body: "Flutter and React Native become a standing capability; first apps ship to both stores." },
  { year: "2023", title: "Enterprise platforms", body: "Multi-entity finance and healthcare operations work takes the team past 15 people." },
  { year: "2024", title: "Cloud & DevOps in-house", body: "Dedicated platform engineering, observability, and zero-downtime rollouts as standard." },
  { year: "2025", title: "AI practice", body: "AI-driven delivery pipeline and client AI features launch, with the hand-crafted track kept as a first-class option." },
];

/** Answers procurement asks for before they ask. */
export const trustSignals = [
  { title: "Contracts & IP", body: "Written scope, mutual NDA, and full IP transfer to you on final payment." },
  { title: "Security practice", body: "Least-privilege access, secrets management, dependency and licence scanning on every build." },
  { title: "Data handling", body: "Data-residency options, redaction before any AI tooling, and training disabled on every vendor account." },
  { title: "Continuity", body: "Your repository, your cloud accounts, documented handover — no lock-in to us." },
];
