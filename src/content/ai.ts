/**
 * AI-driven development — how we use AI to build software, and the AI features
 * we build into client products. Two different things, kept clearly separate
 * because clients ask about both and mean different things.
 */

export const aiIntro = {
  eyebrow: "AI-driven development",
  headline: "AI writes the boilerplate. Our engineers own the outcome.",
  sub: "We put AI where it genuinely compounds — scaffolding, migrations, test drafts, documentation — and keep humans on architecture, judgement, and review. Nothing merges without a named engineer signing the diff. If you would rather we skip AI entirely, that is a supported option, not a favour.",
};

/** The delivery pipeline, step by step, with the human gate at each stage. */
export const aiPipeline = [
  {
    number: "01",
    title: "Scope with AI, decide with people",
    body: "We use AI to explore the problem space fast — competitor teardowns, data-model options, edge cases nobody listed. The architecture decision is made by an engineer and written down.",
    gate: "Architect signs the design doc",
  },
  {
    number: "02",
    title: "Generate the skeleton",
    body: "Project setup, data models, CRUD, API contracts, and typed clients are generated against our own templates rather than typed out for the hundredth time.",
    gate: "Lead engineer reviews the scaffold",
  },
  {
    number: "03",
    title: "Build the parts that matter by hand",
    body: "Business logic, pricing rules, permissions, anything with money or safety attached — written and reasoned about by a senior engineer.",
    gate: "Peer review, no self-merges",
  },
  {
    number: "04",
    title: "Draft tests with AI, harden them with QA",
    body: "AI proposes the happy paths and obvious edges; QA adds the cases only someone who has watched real users would think of.",
    gate: "Coverage delta must not fall",
  },
  {
    number: "05",
    title: "Review every diff, generated or not",
    body: "One checklist for all code: tests, dependency diff, licence scan, threat model impact, and a named human approver on the merge.",
    gate: "Named reviewer recorded per merge",
  },
  {
    number: "06",
    title: "Ship, watch, and iterate",
    body: "CI/CD, observability, and a weekly demo. Post-launch, AI helps triage logs and draft fixes — the fix still ships through the same gate.",
    gate: "Release sign-off by delivery lead",
  },
];

/** What clients get in writing before we run a single prompt on their code. */
export const aiGuardrails = [
  {
    title: "Your code and data stay yours",
    body: "We use business-tier tooling with training disabled. Client code and data are never contributed to a vendor training set, and secrets and personal data are redacted before any prompt.",
  },
  {
    title: "A human is accountable for every line",
    body: "Generated code carries no special status. It passes the same tests, review, and security checks, and a named engineer approves the merge.",
  },
  {
    title: "Licence and provenance checks",
    body: "Dependency licences are scanned on every build and we keep a generation log per merge, so procurement and legal have an answer when they ask.",
  },
  {
    title: "You can opt out entirely",
    body: "Choose the hand-crafted track and no generative tooling touches your project. You get a written attestation of a fully human-authored codebase.",
  },
];

/** AI capabilities we build *into* client products. */
export const aiCapabilities = [
  {
    title: "Retrieval assistants (RAG)",
    body: "Answers grounded in your own documents, with citations and permissions that respect who is asking.",
    tags: ["pgvector", "Azure OpenAI", "Citations"],
  },
  {
    title: "Document extraction",
    body: "Invoices, contracts, and scanned paperwork turned into structured data, with a confidence threshold that routes uncertain cases to a human queue.",
    tags: ["OCR", "Structured output", "Human-in-the-loop"],
  },
  {
    title: "Workflow agents",
    body: "Multi-step automations that call your systems, log every action, and stop at the approval step you define.",
    tags: ["Tool use", "Audit log", "Approvals"],
  },
  {
    title: "Classification & triage",
    body: "Routing for support tickets, leads, and claims — measured against a labelled set rather than a hunch.",
    tags: ["Evals", "Confidence scores"],
  },
  {
    title: "Search that understands intent",
    body: "Semantic search over catalogues and knowledge bases, blended with the keyword filters your users already trust.",
    tags: ["Hybrid search", "Ranking"],
  },
  {
    title: "Evaluation & monitoring",
    body: "An eval suite built before the feature, plus dashboards for quality, latency, and cost per request after launch.",
    tags: ["Eval sets", "Observability", "Cost control"],
  },
];

export const aiStats = [
  { value: "~35%", label: "Faster first delivery on the AI track" },
  { value: "100%", label: "Merges with a named human reviewer" },
  { value: "0", label: "Client datasets used for vendor training" },
  { value: "2", label: "Delivery tracks — with AI or fully manual" },
];

/** Honest boundaries. Clients trust the yes more when the no is on the page. */
export const aiWhenNot = [
  "The problem is a rules engine wearing an AI costume — deterministic code is cheaper and testable.",
  "There is no labelled data or evaluation set, and no appetite to build one.",
  "A wrong answer has no human in front of it and no way to appeal.",
  "The value is a demo for a board meeting rather than a workflow someone will use on Monday.",
];
