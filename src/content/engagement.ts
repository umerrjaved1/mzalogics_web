/**
 * Engagement shapes shown on /solutions. Tier names mirror @/content/pricing so
 * a client sees the same three words on both pages; the numbers live there.
 */
export const engagementModels = [
  {
    title: "Launch",
    body: "For MVPs, pilots, and single-purpose apps. Discovery, focused screens, UI/UX, and the essential backend — enough to put something real in front of users.",
    points: ["Fixed scope and price", "UI/UX included", "From $2,150 with AI · Q4 deal"],
  },
  {
    title: "Growth",
    body: "For production platforms with real users: custom modules, dashboards, role-based access, integrations, and an automated test suite.",
    points: ["Custom features", "Integrations & CI/CD", "From $6,290 with AI · Q4 deal"],
  },
  {
    title: "Enterprise",
    body: "For large-scale systems: custom architecture, a dedicated pod, AI features, SSO and audit logging, and long-term support under an SLA.",
    points: ["Dedicated pod", "Custom architecture", "From $15,400 with AI · Q4 deal"],
  },
] as const;

export const engagementNote =
  "Every plan runs on your choice of delivery track — AI-driven for speed, or fully hand-written when policy rules generated code out. The hand-crafted track is typically 1.4x the cost and takes longer.";
