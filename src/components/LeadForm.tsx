"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, MessageCircle, Send, ShieldCheck, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import type { FormKind } from "@/lib/forms";
import { estimateForScope, type LeadScope } from "@/content/pricing";
import { site, whatsappHref } from "@/lib/site";

type ProjectType = LeadScope;
type TrackType = "undecided" | "ai" | "manual";

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
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  // Interactive Estimator State
  const [projectType, setProjectType] = useState<ProjectType>("mobile");
  const [selectedTrack, setSelectedTrack] = useState<TrackType>("ai");
  const [selectedEngineer, setSelectedEngineer] = useState<string>("");
  const [selectedSeniority, setSelectedSeniority] = useState<string>("");

  const planRef = useRef<HTMLInputElement>(null);
  const dealRef = useRef<HTMLInputElement>(null);
  const trackRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan") ?? "";
    const deal = params.get("deal") ?? "";
    const engineer = params.get("engineer") ?? "";
    const seniority = params.get("seniority") ?? "";

    if (planRef.current) planRef.current.value = plan;
    if (dealRef.current) dealRef.current.value = deal;
    if (trackRef.current && plan) {
      const isManual = plan.startsWith("manual");
      trackRef.current.value = isManual ? "manual" : "ai";
      setSelectedTrack(isManual ? "manual" : "ai");
    }
    if (engineer) {
      setSelectedEngineer(engineer);
      setSelectedSeniority(seniority);
      setProjectType("pod");
    }
  }, []);

  // Sync internal track with selector
  function handleTrackSelect(t: TrackType) {
    setSelectedTrack(t);
    if (trackRef.current) {
      trackRef.current.value = t;
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Include estimated scope info
    const enrichedData = {
      kind,
      ...data,
      projectTypeScope: projectType,
      selectedDeliveryTrack: selectedTrack,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrichedData),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Something went wrong. Try email or WhatsApp instead.");
        setStatus("error");
        return;
      }

      setStatus("ok");
      form.reset();
    } catch {
      setError("We could not reach the server. Check your connection and try again, or message us on WhatsApp.");
      setStatus("error");
    }
  }

  return (
    <Section id="book" className="relative pt-10 pb-10 sm:pt-12 sm:pb-12">
      <Container>
        <div className="overflow-hidden rounded-[32px] border border-black/8 bg-white p-6 shadow-[0_16px_50px_rgba(9,6,26,0.04)] sm:p-10 lg:p-12">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
            {/* Left Column: Heading & Value Prop */}
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">{title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>

              {/* Direct WhatsApp Quick-Connect Box */}
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-700 text-white shadow-sm">
                    <MessageCircle size={20} />
                  </span>
                  <div>
                    <div className="font-bold text-navy text-sm">Need an immediate answer?</div>
                    <div className="text-xs text-muted">Chat directly with our Technical Director on WhatsApp.</div>
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
                {site.calendarUrl ? (
                  <a
                    href={site.calendarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-navy/15 bg-white py-2.5 text-xs font-bold text-navy transition hover:bg-paper"
                  >
                    <Calendar size={15} />
                    Book 20 minutes
                  </a>
                ) : null}
              </div>

              {/* Trust assurances */}
              <div className="mt-8 space-y-3 border-t border-black/5 pt-6 text-xs text-navy/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                  <span>NDA signed before detailed architecture discussions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                  <span>Senior engineers in Lahore — 100% time-zone aligned</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                  <span>Guaranteed response within 1 business day</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Estimator + Form */}
            <div className="rounded-[28px] bg-paper p-6 sm:p-8">
              {selectedEngineer && (
                <div className="mb-6 rounded-2xl border border-accent-2/40 bg-accent-2/10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
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
                    className="text-[11px] font-semibold text-muted hover:text-navy underline"
                  >
                    Change
                  </button>
                </div>
              )}
              {kind === "contact" && (
                <div className="mb-8 border-b border-black/8 pb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy">
                    1. Select Project Type
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { id: "mobile" as ProjectType, label: "Mobile App" },
                      { id: "web" as ProjectType, label: "Web / SaaS" },
                      { id: "ai" as ProjectType, label: "AI Integration" },
                      { id: "mvp" as ProjectType, label: "MVP" },
                      { id: "pod" as ProjectType, label: "Dedicated Pod" },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        aria-pressed={projectType === btn.id}
                        onClick={() => setProjectType(btn.id)}
                        className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                          projectType === btn.id
                            ? "bg-navy text-white shadow-sm"
                            : "border border-black/8 bg-white text-navy hover:bg-black/5"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  <span className="mt-5 block text-xs font-bold uppercase tracking-wider text-navy">
                    2. Preferred Delivery Track
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <button
                      type="button"
                      aria-pressed={selectedTrack === "ai"}
                      onClick={() => handleTrackSelect("ai")}
                      className={`rounded-xl p-3 text-left transition ${
                        selectedTrack === "ai"
                          ? "border-2 border-accent-2 bg-navy text-white shadow-sm"
                          : "border border-black/8 bg-white text-navy hover:bg-black/5"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <Zap size={13} className="text-accent-2" />
                        AI-Accelerated
                      </div>
                      <div className={`mt-1 text-[11px] ${selectedTrack === "ai" ? "text-accent-2" : "text-muted"}`}>
                        2x Sprint Speed
                      </div>
                    </button>

                    <button
                      type="button"
                      aria-pressed={selectedTrack === "manual"}
                      onClick={() => handleTrackSelect("manual")}
                      className={`rounded-xl p-3 text-left transition ${
                        selectedTrack === "manual"
                          ? "border-2 border-navy bg-navy text-white shadow-sm"
                          : "border border-black/8 bg-white text-navy hover:bg-black/5"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <ShieldCheck size={13} />
                        Hand-Crafted
                      </div>
                      <div className={`mt-1 text-[11px] ${selectedTrack === "manual" ? "text-white/70" : "text-muted"}`}>
                        Zero AI &middot; Strict IP
                      </div>
                    </button>

                    <button
                      type="button"
                      aria-pressed={selectedTrack === "undecided"}
                      onClick={() => handleTrackSelect("undecided")}
                      className={`col-span-2 sm:col-span-1 rounded-xl p-3 text-left transition ${
                        selectedTrack === "undecided"
                          ? "border-2 border-navy bg-navy text-white shadow-sm"
                          : "border border-black/8 bg-white text-navy hover:bg-black/5"
                      }`}
                    >
                      <div className="text-xs font-bold">Advise Me</div>
                      <div className={`mt-1 text-[11px] ${selectedTrack === "undecided" ? "text-white/70" : "text-muted"}`}>
                        Recommend Track
                      </div>
                    </button>
                  </div>

                  {(() => {
                    const estimate = estimateForScope(projectType, selectedTrack);
                    return (
                      <p className="mt-5 rounded-2xl border border-navy/10 bg-white px-4 py-3 text-sm text-navy">
                        {estimate.compareAt ? (
                          <span className="mr-2 text-muted line-through">{estimate.compareAt}</span>
                        ) : null}
                        <span className="font-bold">{estimate.price}</span>
                        <span className="text-muted"> · {estimate.timeline} · {estimate.note}</span>
                      </p>
                    );
                  })()}
                </div>
              )}

              {/* Main Contact Form */}
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-navy">
                    Full Name *
                    <input
                      name="name"
                      required
                      placeholder="e.g. Alex Mercer"
                      className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    />
                  </label>

                  <label className="text-sm font-semibold text-navy">
                    Work Email *
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    />
                  </label>

                  <label className="text-sm font-semibold text-navy">
                    Phone
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+92 300 0000000"
                      className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    />
                  </label>

                  <label className="text-sm font-semibold text-navy">
                    Company / Organization
                    <input
                      name="company"
                      placeholder="e.g. your company"
                      className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    />
                  </label>

                  {/* Hidden or visible track select for form submission */}
                  <div className="hidden">
                    <select name="track" ref={trackRef} defaultValue={selectedTrack}>
                      <option value="undecided">undecided</option>
                      <option value="ai">ai</option>
                      <option value="manual">manual</option>
                    </select>
                  </div>

                  {extraFields === "talent" ? (
                    <label className="text-xs font-semibold text-navy sm:col-span-2">
                      Stack / Roles Needed
                      <input
                        name="stack"
                        placeholder="e.g. 2× Next.js, 1× Flutter, 1× Python AI"
                        className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                      />
                    </label>
                  ) : null}

                  {extraFields === "rescue" ? (
                    <>
                      <label className="text-xs font-semibold text-navy">
                        Current Tech Stack
                        <input
                          name="stack"
                          placeholder="e.g. React Native + Node"
                          className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                        />
                      </label>
                      <label className="text-xs font-semibold text-navy">
                        Service Needed
                        <select
                          name="role"
                          className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                        >
                          <option>Codebase Audit &amp; Health Report</option>
                          <option>Urgent Bug Fixes &amp; Stability</option>
                          <option>Complete Legacy Modernization</option>
                        </select>
                      </label>
                    </>
                  ) : null}

                  {extraFields === "career" ? (
                    <label className="text-xs font-semibold text-navy sm:col-span-2">
                      Position Applying For
                      <input
                        name="role"
                        placeholder="e.g. Senior Flutter Engineer"
                        className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                      />
                    </label>
                  ) : null}

                  <label className="text-sm font-semibold text-navy sm:col-span-2">
                    {extraFields === "rescue" ? "What issues is the project facing?" : "Project Overview & Goals *"}
                    <textarea
                      name="message"
                      required
                      minLength={8}
                      rows={4}
                      placeholder="Briefly describe your vision, timeline, or current technical bottlenecks..."
                      className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-12 px-7 text-sm font-bold shadow-lg shadow-navy/15"
                  >
                    {status === "loading" ? "Submitting…" : submitLabel}
                    <Send size={15} />
                  </Button>

                  <div role="status" aria-live="polite" className="min-w-0">
                    {status === "ok" ? (
                      <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                        <CheckCircle2 size={15} /> Received! We will review and reply within 24 hours.
                      </p>
                    ) : null}
                    {status === "error" ? (
                      <p className="text-xs font-bold text-red-700">{error}</p>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
