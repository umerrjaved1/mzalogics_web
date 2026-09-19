/** "estimate" is the lighter capture from the pricing estimator. */
export type FormKind = "contact" | "talent" | "rescue" | "career" | "estimate";

export type FormPayload = {
  kind: FormKind;
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  role?: string;
  stack?: string;
  /** Indicative budget band — the first thing that qualifies an enquiry. */
  budget?: string;
  /** When they want it live. */
  timeline?: string;
  /** "ai" | "manual" | "undecided" — which delivery track the client wants. */
  track?: string;
  /** Pricing tier slug, when the enquiry came from a plan card. */
  plan?: string;
  website?: string;
};

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
