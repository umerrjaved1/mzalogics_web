export type Testimonial = {
  quote: string;
  /** Job title while anonymous; replaced by the person's name once attributed. */
  name: string;
  role: string;
  note: string;
  initials: string;
  company: string;
  /**
   * Fill this in ONLY after the client has given written permission to be
   * named. Presence of this object is what turns an anonymous quote into an
   * attributed one — full name, real company, and a photo if you have one.
   *
   * Photo: drop a file at /public/media/testimonials/{slug}.jpg. If it is not
   * on disk the card falls back to initials, never to a stock face.
   */
  attributed?: {
    slug: string;
    fullName: string;
    company: string;
    /** Optional link to the client's site. */
    href?: string;
  };
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They sat with dispatchers for weeks before writing code. The exception queue replaced our spreadsheet-and-WhatsApp mesh, and leadership finally sees the same numbers the floor uses.",
    name: "Operations lead",
    role: "Regional freight operator",
    note: "AI-driven track",
    company: "Logistics",
    initials: "OL",
  },
  {
    quote:
      "Procurement needed a fully human-authored codebase. MZA offered a hand-written track with an attestation — no negotiation, no workaround. That decided the vendor.",
    name: "Head of IT",
    role: "Multi-entity services group",
    note: "Hand-crafted track",
    company: "Finance",
    initials: "IT",
  },
  {
    quote:
      "Front office stopped jumping between three vendor tools. Access reviews are exportable, and we can add a clinic without another implementation project.",
    name: "Care-ops manager",
    role: "Multi-site clinic operator",
    note: "AI-driven track",
    company: "Healthcare",
    initials: "CM",
  },
  {
    quote:
      "We had a clickable prototype in week one. Every generated change still came back with a named engineer on the pull request. That was the difference from a vibe-coded stall.",
    name: "COO",
    role: "Confidential logistics network",
    note: "AI-driven track",
    company: "Logistics",
    initials: "CO",
  },
];
