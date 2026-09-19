import { promo, isPromoActive } from "@/content/promo";

export type FaqItem = { question: string; answer: string };

export const homeFaqs: FaqItem[] = [
  {
    question: "Do you build with AI, or by hand?",
    answer:
      "Both — you choose. On the AI-driven track our engineers direct AI through scaffolding, migrations, test drafts, and documentation, then review every diff before it merges; that usually means 30-40% fewer hours for the same scope. On the hand-crafted track no generative tooling touches your project and you get a written attestation of a fully human-authored codebase. Same team and same standards either way.",
  },
  {
    question: "What does it cost?",
    answer: isPromoActive()
      ? `While the ${promo.eyebrow.toLowerCase()} runs (${promo.endsLabel.toLowerCase()}), prices start at $2,150 on the AI-driven track and $3,250 hand-crafted — ${promo.discountLabel} the standard $3,900 / $5,900. Production platforms typically start at $6,290 and $8,990, and dedicated engineers at $2,290 per month. The final number always follows a discovery call, not a tier.`
      : "Projects start at $3,900 on the AI-driven track and $5,900 hand-crafted. Production platforms typically start at $11,500 and $16,500, and dedicated engineers at $4,160 per month. The final number always follows a discovery call, not a tier.",
  },
  {
    question: "What does MZA Logics actually build?",
    answer:
      "Custom software, mobile apps (Android, iOS, Flutter, React Native), web and CMS platforms, cloud and DevOps, UI/UX, and QA. We are technology-agnostic and pick the stack that fits your product.",
  },
  {
    question: "How do you run a project?",
    answer:
      "Planning and strategy, design and prototype, then development and testing. You get open communication, regular updates, and collaborative reviews. We treat your product like our own.",
  },
  {
    question: "How fast can we launch an MVP?",
    answer:
      "Tightly defined MVP concepts can include basic setup, focused screens, UI/UX, and basic backend in a short window (starter packages often 7–10 days). Broader products follow a scoped roadmap.",
  },
  {
    question: "Can you work with our existing team and tools?",
    answer:
      "Yes. We integrate with CRMs, payments, cloud, and the tools you already use, and we can work as an extension of your team.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Maintenance and DevOps cover monitoring, security updates, store and web updates, and ongoing optimization so the product keeps running.",
  },
];

export const rescueFaqs: FaqItem[] = [
  {
    question: "Can you migrate or rebuild an existing app?",
    answer:
      "Yes. We often rebuild outdated native apps into a unified cross-platform codebase, and we migrate CMS content, databases, and design.",
  },
  {
    question: "Will a cross-platform app feel native?",
    answer:
      "We deliver native-like speed and design with Flutter and React Native. For most products it is faster and more affordable, with the large majority of features working identically on both stores.",
  },
  {
    question: "How long does CMS or UI work take?",
    answer:
      "CMS implementation is typically 3–8 weeks depending on complexity. UI projects are typically 2–6 weeks depending on screens. We design in Figma and can redesign existing products.",
  },
];

export const pricingFaqs: FaqItem[] = [
  {
    question: "Why is the AI-driven track cheaper?",
    answer:
      "The hourly rate is identical. AI removes hours, not people — scaffolding, migrations, test drafts, and documentation stop being typed by hand, so the same scope needs roughly 30-40% fewer billable hours. You pay for the hours we actually work.",
  },
  {
    question: "Is the quality lower on the AI track?",
    answer:
      "It is held to the same bar. Generated code has no special status: it passes the same test suite, the same peer review, the same dependency and licence scan, and a named engineer signs the merge. Business logic, permissions, and anything touching money or safety are written by hand on both tracks.",
  },
  {
    question: "Why would I choose the hand-crafted track?",
    answer:
      "Policy, procurement, licensing, or IP rules. Some clients cannot accept generated code in their supply chain, and some auditors want contributor-level provenance for every file. If that is you, the manual track exists precisely for it — no arguing required.",
  },
  {
    question: "Are these prices fixed?",
    answer:
      "They are indicative starting points. We quote a fixed price against a written scope after a free discovery call. If scope changes mid-project you get a written change note with cost and schedule impact before anyone starts work.",
  },
  {
    question: "How does payment work?",
    answer:
      "Fixed-scope projects are billed 40% to start, 30% at the mid-point demo, and 30% on delivery. Retainers and dedicated engagements are billed monthly in advance with 30 days notice to end. All figures are USD and exclude taxes and third-party cloud or licence costs.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. Source lives in your repository from day one and full IP transfers to you on final payment — on both tracks.",
  },
];

export const aiFaqs: FaqItem[] = [
  {
    question: "Will our code or data be used to train an AI model?",
    answer:
      "No. We use business-tier tooling with training disabled, and secrets and personal data are redacted before any prompt. Client code and data are never contributed to a vendor training set.",
  },
  {
    question: "Who is accountable when AI writes something wrong?",
    answer:
      "We are. Every merge carries a named human reviewer, and generated code goes through the same tests, threat-model check, and licence scan as anything typed by hand. The generation log tells you what was produced and who approved it.",
  },
  {
    question: "Can you add AI features to our existing product?",
    answer:
      "Yes — retrieval assistants over your own documents, extraction from paperwork, workflow agents, classification and triage, and semantic search. We build the evaluation set before the feature so quality is measured, not assumed.",
  },
  {
    question: "When would you tell us not to use AI?",
    answer:
      "When the problem is really a rules engine, when there is no labelled data or appetite to build an eval set, when a wrong answer reaches a customer with no human in between, or when the goal is a board demo rather than a workflow someone uses on Monday. We would rather say so early.",
  },
];

/** Full list for the /faq page, grouped for scanning. */
export const faqGroups = [
  { title: "Working with us", items: homeFaqs },
  { title: "Pricing & contracts", items: pricingFaqs },
  { title: "AI-driven development", items: aiFaqs },
  { title: "Rescue & migration", items: rescueFaqs },
];

export const allFaqs: FaqItem[] = faqGroups.flatMap((group) => group.items);
