"use client";

import React, { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

/**
 * Captures the lead that reads the estimate and then leaves.
 *
 * The estimator was showing a number and throwing it away — the highest-intent
 * moment on the page with nothing attached to it. One field, no obligation,
 * and it reuses the same delivery path as the main form.
 */
export function EstimateCapture({
  estimate,
  projectType,
  track,
}: {
  estimate: string;
  projectType: string;
  track: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "estimate",
          email,
          estimate,
          projectType,
          track,
          message: `Estimate request — ${projectType} on the ${track} track: ${estimate}`,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? "Could not send that. Try the full form below.");
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setError("Could not reach the server. Try the full form below.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <p className="mt-3 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-sm font-semibold text-emerald-800">
        <CheckCircle2 size={16} aria-hidden />
        Sent — check your inbox. We will follow up within one business day.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy underline underline-offset-4 hover:text-navy-2"
      >
        <Mail size={15} aria-hidden />
        Email me this estimate
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-2xl border border-navy/10 bg-white p-4">
      <label htmlFor="estimate-email" className="text-sm font-semibold text-navy">
        Where should we send it?
      </label>
      <p className="mt-0.5 text-xs text-muted">
        Just the estimate and what it covers. No obligation, no sequence.
      </p>
      {/* Nested forms are invalid HTML — this posts on its own. */}
      <form onSubmit={onSubmit} className="mt-2.5 flex flex-wrap gap-2">
        <input
          id="estimate-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="min-w-0 flex-1 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-navy-2 disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send it"}
        </button>
      </form>
      <div role="status" aria-live="polite">
        {status === "error" ? <p className="mt-2 text-xs font-bold text-red-700">{error}</p> : null}
      </div>
    </div>
  );
}
