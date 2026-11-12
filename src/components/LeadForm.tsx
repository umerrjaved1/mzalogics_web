"use client";

import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { useRouter } from "next/navigation";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";

import { checkUpload, UPLOAD_ACCEPT, UPLOAD_HINT } from "@/lib/uploads";
import { EstimateCapture } from "@/components/conversion/EstimateCapture";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import type { FormKind } from "@/lib/forms";
import { estimateForScope, starterSprint, type LeadScope } from "@/content/pricing";
import { site, whatsappHref } from "@/lib/site";

type ProjectType = LeadScope;
type TrackType = "undecided" | "ai" | "manual";

/** Never resubscribes; the snapshot only has to differ between server and client. */
const neverChanges = () => () => {};

export function LeadForm({
  kind,
  title,
  intro,
  submitLabel = "Send Enquiry",
  eyebrow = "Book a call",
  extraFields,
}: {
  kind: FormKind;
  title: string;
  intro: string;
  submitLabel?: string;
  eyebrow?: string;
  extraFields?: "talent" | "rescue" | "career";
}) {
  const router = useRouter();
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /** Fast feedback in the browser; the route re-checks before trusting it. */
  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) {
      setFileError(null);
      return;
    }
    const verdict = checkUpload(file.name, file.size, file.type);
    if (verdict.ok) {
      setFileError(null);
      return;
    }
    setFileError(verdict.error);
    event.currentTarget.value = "";
  }

  // Interactive Estimator State
  const [projectType, setProjectType] = useState<ProjectType>("mobile");
  const [selectedTrack, setSelectedTrack] = useState<TrackType>("ai");
  const [selectedEngineer, setSelectedEngineer] = useState<string>("");
  const [selectedSeniority, setSelectedSeniority] = useState<string>("");

  const planRef = useRef<HTMLInputElement>(null);
  const dealRef = useRef<HTMLInputElement>(null);
  const trackRef = useRef<HTMLSelectElement>(null);

  // The query string pre-fills the form (?plan=, ?deal=, ?engineer=). It is
  // empty on the server and read once the browser takes over.
  const search = useSyncExternalStore(
    neverChanges,
    () => window.location.search,
    () => "",
  );

  // Apply it to state while rendering, once per distinct query string, rather
  // than in an effect: an effect would paint the defaults first and then
  // re-render with the pre-fill.
  const [appliedSearch, setAppliedSearch] = useState("");
  if (search !== appliedSearch) {
    setAppliedSearch(search);
    const params = new URLSearchParams(search);
    const plan = params.get("plan") ?? "";
    const engineer = params.get("engineer") ?? "";
    if (plan) setSelectedTrack(plan.startsWith("manual") ? "manual" : "ai");
    if (engineer) {
      setSelectedEngineer(engineer);
      setSelectedSeniority(params.get("seniority") ?? "");
      setProjectType("pod");
    }
  }

  // The uncontrolled inputs are DOM nodes, so they are filled after mount.
  useEffect(() => {
    const params = new URLSearchParams(search);
    const plan = params.get("plan") ?? "";
    if (planRef.current) planRef.current.value = plan;
    if (dealRef.current) dealRef.current.value = params.get("deal") ?? "";
    if (trackRef.current && plan) {
      trackRef.current.value = plan.startsWith("manual") ? "manual" : "ai";
    }
  }, [search]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    // Multipart, so an optional brief can ride along with the fields.
    const formData = new FormData(form);
    formData.set("kind", kind);
    formData.set("projectTypeScope", projectType);
    formData.set("selectedDeliveryTrack", selectedTrack);
    if (kind === "contact") {
      const shown = estimateForScope(projectType, selectedTrack);
      formData.set("estimate", `${shown.price} · ${shown.timeline}`);
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Something went wrong. Try email or WhatsApp instead.");
        setStatus("error");
        return;
      }

      setStatus("ok");
      form.reset();
      // A distinct URL is what makes the conversion measurable in analytics.
      router.push(`/thank-you?kind=${encodeURIComponent(kind)}`);
    } catch {
      setError("We could not reach the server. Check your connection and try again, or message us on WhatsApp.");
      setStatus("error");
    }
  }

  return (
    <Section id="book" className="relative pt-14 pb-14 sm:pt-20 sm:pb-20">
      <Container>
        <div className="overflow-clip rounded-[28px] border border-black/8 bg-white p-4 shadow-[0_16px_50px_rgba(9,6,26,0.04)] sm:p-10 lg:p-12">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
            {/* Left Column: Heading & Value Prop */}
            {/* Sticky on desktop, so the WhatsApp option and the promises stay beside
                the form while someone works down its three steps. */}
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>

              {/* Direct WhatsApp Quick-Connect Box */}
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-700 text-white shadow-sm">
                    <MessageCircle size={20} />
                  </span>
                  <div>
                    <div className="font-bold text-navy text-sm">Need an immediate answer?</div>
                    <div className="text-xs text-muted">Message us directly on WhatsApp.</div>
                  </div>
                </div>
                <a
                  href={whatsappHref("Hi MZA Logics, I'd like to discuss a project")}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  <MessageCircle size={15} />
                  Chat on WhatsApp ({site.phoneDisplay})
                </a>
              </div>

              {/* Trust assurances — the four worries a buyer has before hitting send */}
              <div className="mt-8 space-y-3 border-t border-black/5 pt-6 text-xs text-navy/70">
                {[
                  "Fixed written scope and price before work starts",
                  "Only 20% to start — refunded if the first milestone misses the scope",
                  "NDA signed before any project details",
                  "Code in your repository from day one — you keep full IP",
                  "You talk to the engineers, not a salesperson",
                ].map((assurance) => (
                  <div key={assurance} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-700" />
                    <span>{assurance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: one form in three short, numbered steps, so a
                long enquiry reads as a sequence instead of a wall of boxes. */}
            <div className="rounded-[28px] bg-paper p-4 sm:p-8">
              {selectedEngineer && (
                <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-accent-2/40 bg-accent-2/10 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    <span>
                      Selected Pod Specialist:{" "}
                      <span className="capitalize underline">{selectedEngineer.replace(/-/g, " ")}</span>{" "}
                      {selectedSeniority ? `(${selectedSeniority})` : ""}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEngineer("");
                      setSelectedSeniority("");
                    }}
                    className="text-xs font-semibold text-muted underline hover:text-navy"
                  >
                    Change
                  </button>
                </div>
              )}

              {kind === "contact" && (
                <div className="mb-8 border-b border-black/8 pb-8">
                  <StepTitle number={1} title="What are you building?" hint="Pick the closest — you can explain below." />
                  <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Project type">
                    {PROJECT_TYPES.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={projectType === option.id}
                        onClick={() => setProjectType(option.id)}
                        className={`min-h-11 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                          projectType === option.id
                            ? "bg-navy text-white shadow-sm"
                            : "border border-black/10 bg-white text-navy hover:border-navy/30"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const estimate = estimateForScope(projectType, selectedTrack);
                    return (
                      <>
                        <div className="mt-5 rounded-2xl border border-navy/10 bg-white px-4 py-3.5">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                            Typical starting point
                          </div>
                          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 text-navy">
                            {estimate.compareAt ? (
                              <span className="text-sm text-muted line-through">{estimate.compareAt}</span>
                            ) : null}
                            <span className="text-xl font-bold">{estimate.price}</span>
                            <span className="text-sm text-muted">· {estimate.timeline}</span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted">{estimate.note}</p>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-navy">
                          Not ready for a full build? Start with a {starterSprint.durationLabel}{" "}
                          {starterSprint.title.toLowerCase()} for{" "}
                          <span className="font-bold">{starterSprint.price}</span> —{" "}
                          {starterSprint.credit.charAt(0).toLowerCase() + starterSprint.credit.slice(1)}
                        </p>
                        <EstimateCapture
                          estimate={`${estimate.price} · ${estimate.timeline}`}
                          projectType={projectType}
                          track={selectedTrack}
                        />
                      </>
                    );
                  })()}
                </div>
              )}

              <form onSubmit={onSubmit} className="relative">
                <input
                  type="text"
                  name="website"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <input type="hidden" name="plan" ref={planRef} />
                <input type="hidden" name="deal" ref={dealRef} />
                <input type="hidden" name="projectType" value={projectType} />
                <div className="hidden">
                  <select name="track" ref={trackRef} defaultValue={selectedTrack} tabIndex={-1} aria-hidden>
                    <option value="undecided">undecided</option>
                    <option value="ai">ai</option>
                    <option value="manual">manual</option>
                  </select>
                </div>

                <StepTitle number={kind === "contact" ? 2 : 1} title="How do we reach you?" />
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>
                    Your name
                    <input name="name" required autoComplete="name" placeholder="e.g. Alex Mercer" className={fieldClass} />
                  </label>

                  <label className={labelClass}>
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      placeholder="alex@company.com"
                      className={fieldClass}
                    />
                  </label>

                  <label className={labelClass}>
                    <span>
                      Phone or WhatsApp <Optional />
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+92 300 0000000"
                      className={fieldClass}
                    />
                  </label>

                  <label className={labelClass}>
                    <span>
                      Company <Optional />
                    </span>
                    <input name="company" autoComplete="organization" placeholder="Your company" className={fieldClass} />
                  </label>
                </div>

                <div className="mt-8 border-t border-black/8 pt-8">
                  <StepTitle
                    number={kind === "contact" ? 3 : 2}
                    title={extraFields === "career" ? "About you" : "About the project"}
                  />
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {extraFields === "talent" ? (
                      <label className={`${labelClass} sm:col-span-2`}>
                        Stack / roles needed
                        <input name="stack" placeholder="e.g. 2× Next.js, 1× Flutter, 1× Python AI" className={fieldClass} />
                      </label>
                    ) : null}

                    {extraFields === "rescue" ? (
                      <>
                        <label className={labelClass}>
                          Current tech stack
                          <input name="stack" placeholder="e.g. React Native + Node" className={fieldClass} />
                        </label>
                        <label className={labelClass}>
                          Service needed
                          <select name="role" className={fieldClass}>
                            <option>Codebase Audit &amp; Health Report</option>
                            <option>Urgent Bug Fixes &amp; Stability</option>
                            <option>Complete Legacy Modernization</option>
                          </select>
                        </label>
                      </>
                    ) : null}

                    {extraFields === "career" ? (
                      <label className={`${labelClass} sm:col-span-2`}>
                        Position applying for
                        <input name="role" placeholder="e.g. Senior Flutter Engineer" className={fieldClass} />
                      </label>
                    ) : null}

                    {kind === "contact" || kind === "talent" ? (
                      <>
                        <label className={labelClass}>
                          Budget
                          <select name="budget" defaultValue="" className={fieldClass}>
                            <option value="">Not sure yet</option>
                            <option value="under-5k">Under $5,000</option>
                            <option value="5k-15k">$5,000 – $15,000</option>
                            <option value="15k-40k">$15,000 – $40,000</option>
                            <option value="40k-plus">$40,000+</option>
                            <option value="retainer">Monthly retainer</option>
                          </select>
                        </label>

                        <label className={labelClass}>
                          Timeline
                          <select name="timeline" defaultValue="" className={fieldClass}>
                            <option value="">Flexible</option>
                            <option value="asap">As soon as possible</option>
                            <option value="1-3-months">In 1–3 months</option>
                            <option value="3-6-months">In 3–6 months</option>
                            <option value="exploring">Just exploring</option>
                          </select>
                        </label>
                      </>
                    ) : null}

                    <label className={`${labelClass} sm:col-span-2`}>
                      {extraFields === "rescue"
                        ? "What is going wrong?"
                        : extraFields === "career"
                          ? "A few lines about you"
                          : "Tell us about it"}
                      <textarea
                        name="message"
                        required
                        minLength={8}
                        rows={5}
                        placeholder={
                          extraFields === "rescue"
                            ? "What is breaking, since when, and what you have tried."
                            : extraFields === "career"
                              ? "What you have built and what you want to work on next."
                              : "What it should do, who it is for, and any deadline. A few lines is plenty."
                        }
                        className={`${fieldClass} resize-y`}
                      />
                    </label>

                    <div className="sm:col-span-2">
                      <label htmlFor={`${formId}-attachment`} className={labelClass}>
                        {extraFields === "career" ? "CV or portfolio" : "Attach a brief or RFP"} <Optional />
                      </label>
                      <input
                        id={`${formId}-attachment`}
                        ref={fileRef}
                        type="file"
                        name="attachment"
                        accept={UPLOAD_ACCEPT}
                        onChange={onFileChange}
                        aria-describedby={`${formId}-attachment-hint`}
                        className="mt-1.5 w-full cursor-pointer rounded-xl border border-dashed border-navy/20 bg-white px-3.5 py-3 text-sm text-muted outline-none transition file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-navy/5 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-navy hover:border-navy/40 hover:file:bg-navy/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                      />
                      <p
                        id={`${formId}-attachment-hint`}
                        className={`mt-1.5 text-xs ${fileError ? "font-semibold text-red-700" : "text-muted"}`}
                      >
                        {fileError ?? UPLOAD_HINT}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-12 w-full shrink-0 whitespace-nowrap px-7 text-[15px] font-semibold shadow-lg shadow-navy/15 sm:w-auto"
                  >
                    {status === "loading" ? "Sending…" : submitLabel}
                    <Send size={15} />
                  </Button>
                  <p className="text-sm text-muted">A real person replies within one business day.</p>
                </div>

                <div role="status" aria-live="polite" className="min-w-0">
                  {status === "ok" ? (
                    <p className="mt-4 flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm font-semibold text-emerald-800">
                      <CheckCircle2 size={16} /> Received. We will reply within one business day.
                    </p>
                  ) : null}
                  {status === "error" ? (
                    <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-semibold text-red-700">
                      {error}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

const PROJECT_TYPES: { id: ProjectType; label: string }[] = [
  { id: "mobile", label: "Mobile app" },
  { id: "web", label: "Web / SaaS" },
  { id: "ai", label: "AI feature" },
  { id: "mvp", label: "MVP" },
  { id: "pod", label: "Dedicated team" },
];

const labelClass = "block text-sm font-semibold text-navy";

/** 16px on phones so iOS Safari does not zoom the page when a field gets focus. */
const fieldClass =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-base text-navy outline-none transition placeholder:text-navy/35 hover:border-navy/30 focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:text-sm";

function StepTitle({ number, title, hint }: { number: number; title: string; hint?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white"
      >
        {number}
      </span>
      <div>
        <h3 className="text-base font-bold text-navy">{title}</h3>
        {hint ? <p className="mt-0.5 text-sm text-muted">{hint}</p> : null}
      </div>
    </div>
  );
}

function Optional() {
  return <span className="font-normal text-muted">(optional)</span>;
}
