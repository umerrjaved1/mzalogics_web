export type Job = {
  slug: string;
  title: string;
  team: "Engineering" | "Design" | "Product" | "Operations";
  type: "Full-time" | "Part-time";
  location: string;
  experience: string;
  skills: string[];
  summary: string;
};

export const jobs: Job[] = [
  {
    slug: "senior-fullstack-engineer",
    title: "Senior full-stack engineer",
    team: "Engineering",
    type: "Full-time",
    location: "On-site / hybrid · Lahore",
    experience: "4–7 years",
    skills: ["TypeScript", "Next.js", "Node.js", "PostgreSQL"],
    summary:
      "Own features end-to-end on enterprise platforms: data model, API, UI, and the operational details that make a release boring in a good way.",
  },
  {
    slug: "platform-engineer",
    title: "Platform engineer",
    team: "Engineering",
    type: "Full-time",
    location: "On-site / hybrid · Lahore",
    experience: "3–6 years",
    skills: ["AWS", "Terraform", "Kubernetes", "Observability"],
    summary:
      "Build the landing zones, pipelines, and guardrails our delivery pods use so every product ships with environments, secrets, and telemetry.",
  },
  {
    slug: "product-designer",
    title: "Product designer",
    team: "Design",
    type: "Full-time",
    location: "On-site / hybrid · Lahore",
    experience: "3–5 years",
    skills: ["Figma", "Research", "Design systems", "Prototyping"],
    summary:
      "Design complex operator software. You will sit with real users, ship a system, and defend clarity when stakeholders want another dashboard.",
  },
  {
    slug: "delivery-lead",
    title: "Delivery lead",
    team: "Operations",
    type: "Full-time",
    location: "On-site / hybrid · Lahore",
    experience: "5+ years",
    skills: ["Delivery", "Stakeholders", "Risk", "Writing"],
    summary:
      "Run a pod: scope, weekly truth, risk, and client communication. You are the person who makes enterprise delivery feel calm.",
  },
  {
    slug: "associate-backend-engineer",
    title: "Associate backend engineer",
    team: "Engineering",
    type: "Full-time",
    location: "On-site · Lahore",
    experience: "1–2 years",
    skills: ["Node.js", "APIs", "SQL", "Testing"],
    summary:
      "Grow inside a pod shipping production APIs. You will write tests, read logs, and learn how integrations actually fail.",
  },
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}

export const jobTeams = ["All", "Engineering", "Design", "Product", "Operations"] as const;
