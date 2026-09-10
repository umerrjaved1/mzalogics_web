"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import type { FormKind } from "@/lib/forms";

export function LeadForm({
  kind,
  title,
  intro,
  submitLabel = "Send",
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
  // Plan cards link here as /contact?plan=ai-growth so the enquiry says which
  // tier was clicked. The form fields are filled from the DOM after mount,
  // which keeps this page static and the markup identical on server and client.
  const planRef = useRef<HTMLInputElement>(null);
  const trackRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan") ?? "";
    if (planRef.current) planRef.current.value = plan;
    if (trackRef.current && plan) {
      trackRef.current.value = plan.startsWith("manual") ? "manual" : "ai";
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...data }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      setError(body.error ?? "Something went wrong. Try email instead.");
      setStatus("error");
      return;
    }
    setStatus("ok");
    form.reset();
  }

  return (
    <Section id="book">
      <Container>
        <div className="grid items-start gap-10 rounded-[32px] border border-black/8 bg-white p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">{title}</h2>
          <p className="mt-3 text-muted">{intro}</p>
        </div>
        <form onSubmit={onSubmit} className="rounded-[24px] bg-paper p-5 sm:p-6">
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="plan" ref={planRef} />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-navy">
              Name
              <input
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </label>
            <label className="text-sm text-navy">
              Work email
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </label>
            <label className="text-sm text-navy sm:col-span-2">
              Company
              <input
                name="company"
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </label>
            {extraFields === "talent" ? (
              <label className="text-sm text-navy sm:col-span-2">
                Stack / roles needed
                <input
                  name="stack"
                  placeholder="e.g. 2× Next.js, 1× platform"
                  className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
                />
              </label>
            ) : null}
            {extraFields === "rescue" ? (
              <>
                <label className="text-sm text-navy">
                  Tech stack
                  <input
                    name="stack"
                    className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </label>
                <label className="text-sm text-navy">
                  I need
                  <select
                    name="role"
                    className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
                  >
                    <option>App audit</option>
                    <option>Audit + execution quote</option>
                    <option>Legacy modernization</option>
                  </select>
                </label>
              </>
            ) : null}
            {extraFields === "career" ? (
              <label className="text-sm text-navy sm:col-span-2">
                Role
                <input
                  name="role"
                  className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
                />
              </label>
            ) : null}
            {kind === "contact" ? (
              <label className="text-sm text-navy sm:col-span-2">
                Delivery track
                <select
                  name="track"
                  ref={trackRef}
                  defaultValue="undecided"
                  className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
                >
                  <option value="undecided">Not sure yet — advise me</option>
                  <option value="ai">AI-driven development (faster, lower cost)</option>
                  <option value="manual">Hand-crafted, no AI (maximum control)</option>
                </select>
              </label>
            ) : null}
            <label className="text-sm text-navy sm:col-span-2">
              {extraFields === "rescue" ? "What are you worried about?" : "How can we help?"}
              <textarea
                name="message"
                required
                rows={4}
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-accent"
              />
            </label>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Button type="submit" disabled={status === "loading"} className="px-5 py-2.5 pr-5">
              {status === "loading" ? "Sending…" : submitLabel}
            </Button>
            {status === "ok" ? <p className="text-sm text-accent">Received. We reply within 24 hours.</p> : null}
            {status === "error" ? <p className="text-sm text-red-600">{error}</p> : null}
          </div>
        </form>
        </div>
      </Container>
    </Section>
  );
}
