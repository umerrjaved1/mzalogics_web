export type CaseStudy = {
  slug: string;
  industry: string;
  title: string;
  /** How the client is described while the engagement stays confidential. */
  client: string;
  /**
   * Set this ONLY after the client has agreed in writing to be named. When
   * present it replaces the "Confidential — …" line with the real company.
   */
  namedClient?: { name: string; href?: string };
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "logistics-control-tower",
    industry: "Logistics",
    title: "Control tower for a regional freight network",
    client: "Confidential — mid-market freight operator",
    challenge:
      "Dispatchers ran the network from spreadsheets and WhatsApp. Exceptions were invisible until a customer called. Leadership had no trustworthy on-time picture.",
    approach:
      "We mapped dispatcher workflows, then shipped an operations console with live exception queues, carrier integrations, and role-based views for operations and finance.",
    outcome:
      "Exception handling moved into a single queue. Leadership reports now pull from the same system of record the floor uses.",
    metrics: [
      { value: "−38%", label: "Exception handling time" },
      { value: "99.5%", label: "On-time visibility" },
      { value: "12 wks", label: "First production cutover" },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    slug: "finance-ops-platform",
    industry: "Finance",
    title: "Close-cycle platform for a multi-entity group",
    client: "Confidential — financial services group",
    challenge:
      "Month-end close depended on email attachments and tribal knowledge. Audit trails were incomplete and new entities took months to onboard.",
    approach:
      "We replaced the spreadsheet mesh with a workflow engine, SSO, and immutable audit events. Integrations to the general ledger stayed contract-tested.",
    outcome:
      "Controllers run close in one product. New entities onboard against a checklist instead of a custom project every time.",
    metrics: [
      { value: "−9 days", label: "Average close cycle" },
      { value: "100%", label: "Actions with audit trail" },
      { value: "SSO", label: "Enterprise identity" },
    ],
    stack: ["Next.js", "Python", "PostgreSQL", "Azure"],
  },
  {
    slug: "healthcare-ops-portal",
    industry: "Healthcare ops",
    title: "Care-ops portal for clinic networks",
    client: "Confidential — multi-site clinic operator",
    challenge:
      "Front-office staff juggled three vendor tools. Patient-adjacent workflows leaked PII into shared inboxes. No single view of capacity.",
    approach:
      "We designed a role-based portal with least-privilege access, documented data flows, and a staged rollout clinic by clinic.",
    outcome:
      "Staff work from one console. Access reviews are exportable. The operator can add sites without rewriting the product.",
    metrics: [
      { value: "−40%", label: "Admin time on intake" },
      { value: "1 console", label: "Replaced three tools" },
      { value: "RBAC", label: "Least-privilege access" },
    ],
    stack: ["React Native", "Next.js", "Node.js", "GCP"],
  },
  {
    slug: "retail-inventory-ai",
    industry: "Retail",
    title: "Demand-aware replenishment for a retail chain",
    client: "Confidential — regional retailer",
    challenge:
      "Replenishment was rule-of-thumb. Overstock sat in the wrong stores while bestsellers stocked out. The data existed; the system did not.",
    approach:
      "We built a decision-support layer on existing ERP data: retrieval over history, guardrailed recommendations, and a buyer workflow with human approval.",
    outcome:
      "Buyers approve recommendations instead of rebuilding spreadsheets. Stockouts dropped on the pilot category before a wider rollout.",
    metrics: [
      { value: "−22%", label: "Pilot stockouts" },
      { value: "Human-in-loop", label: "Every recommendation" },
      { value: "ERP-native", label: "No parallel ledger" },
    ],
    stack: ["Python", "Next.js", "RAG", "Azure"],
  },
  {
    slug: "claims-assistant",
    industry: "Insurance ops",
    title: "Retrieval assistant for a claims operations team",
    client: "Confidential — general insurer",
    challenge:
      "Handlers answered policy questions by searching a 4,000-document library by hand. New joiners took months to become useful, and two handlers could give a customer two different answers.",
    approach:
      "We built a retrieval assistant grounded only in the client's own policy library, with citations on every answer and permissions that mirror who is asking. An eval suite of 400 real handler questions gates each release, and low-confidence answers hand off to a senior handler instead of guessing.",
    outcome:
      "Handlers get a cited answer in seconds and escalate the genuinely ambiguous cases. Quality is measured weekly against the eval set rather than assumed.",
    metrics: [
      { value: "−52%", label: "Average handling time" },
      { value: "400", label: "Questions in the release gate" },
      { value: "0", label: "Cross-tenant leaks in audit" },
    ],
    stack: ["Python", "FastAPI", "pgvector", "Azure OpenAI"],
  },
  {
    slug: "retail-app-rebuild",
    industry: "Consumer apps",
    title: "Two ageing native apps rebuilt as one codebase",
    client: "Confidential — payments and loyalty operator",
    challenge:
      "Separate iOS and Android apps had drifted apart over five years. Features landed months apart, store ratings were falling, and every release needed two teams.",
    approach:
      "We rebuilt the product in Flutter on our AI-accelerated track — generated scaffolding and migration work, hand-written payment and auth logic, biometric flows and platform payment sheets kept native. Rollout was staged by user cohort with the old apps live as a fallback.",
    outcome:
      "One codebase, one release train, and feature parity across platforms. The team ships monthly instead of quarterly.",
    metrics: [
      { value: "1", label: "Codebase instead of two" },
      { value: "4.7", label: "Average store rating" },
      { value: "−40%", label: "Release effort per version" },
    ],
    stack: ["Flutter", "Kotlin", "Swift", "Firebase"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
