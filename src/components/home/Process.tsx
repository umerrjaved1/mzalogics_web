"use client";

import React, { useState } from "react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";

const frames = [
  {
    number: "01",
    title: "Blueprint",
    caption: "Goals become a clickable prototype.",
    art: "sketch",
  },
  {
    number: "02",
    title: "Pod live",
    caption: "Repo, CI, and staging in two days.",
    art: "repo",
  },
  {
    number: "03",
    title: "Sprint",
    caption: "You see a build every two weeks.",
    art: "board",
  },
  {
    number: "04",
    title: "Gate",
    caption: "Tests and a senior review before merge.",
    art: "shield",
  },
  {
    number: "05",
    title: "Launch",
    caption: "Stores and cloud, with an SLA.",
    art: "rocket",
  },
] as const;

function FrameArt({ art }: { art: (typeof frames)[number]["art"] }) {
  return (
    <svg viewBox="0 0 160 100" className="h-24 w-full" aria-hidden>
      {art === "sketch" && (
        <g fill="none" stroke="#09061a" strokeWidth="2">
          <rect x="20" y="18" width="70" height="64" rx="8" />
          <path d="M100 28h36M100 44h28M100 60h32" stroke="#3d3d54" />
        </g>
      )}
      {art === "repo" && (
        <g fill="none" stroke="#09061a" strokeWidth="2">
          <circle cx="40" cy="50" r="10" />
          <circle cx="80" cy="30" r="8" />
          <circle cx="80" cy="70" r="8" />
          <circle cx="120" cy="50" r="10" />
          <path d="M50 50h20M80 38v24M88 30h22M88 70h22" />
        </g>
      )}
      {art === "board" && (
        <g fill="#09061a">
          <rect x="18" y="22" width="36" height="56" rx="6" opacity="0.15" />
          <rect x="62" y="22" width="36" height="40" rx="6" opacity="0.35" />
          <rect x="106" y="22" width="36" height="28" rx="6" />
        </g>
      )}
      {art === "shield" && (
        <g fill="none" stroke="#09061a" strokeWidth="2.2">
          <path d="M80 16l40 16v24c0 22-18 36-40 42-22-6-40-20-40-42V32z" />
          <path d="M64 52l14 14 24-26" />
        </g>
      )}
      {art === "rocket" && (
        <g fill="none" stroke="#09061a" strokeWidth="2">
          <path d="M80 16c18 20 22 40 18 58H62c-4-18 0-38 18-58z" />
          <circle cx="80" cy="48" r="6" />
          <path d="M62 74l-10 12M98 74l10 12" />
        </g>
      )}
    </svg>
  );
}

export function Process() {
  const [active, setActive] = useState(0);

  return (
    <Section id="process">
      <Container>
        <Eyebrow>How we ship</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy sm:text-5xl">
          Five frames, then production
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Follow the story. Tap a frame to see that stage.
        </p>

        <div
          role="tablist"
          aria-label="Delivery stages"
          className="mt-10 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible"
        >
          {frames.map((frame, idx) => {
            const selected = active === idx;
            return (
              <button
                key={frame.number}
                type="button"
                role="tab"
                id={`process-tab-${idx}`}
                aria-selected={selected}
                aria-controls={`process-panel-${idx}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(idx)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActive((i) => (i + 1) % frames.length);
                  if (e.key === "ArrowLeft") setActive((i) => (i - 1 + frames.length) % frames.length);
                }}
                className={`min-w-[148px] shrink-0 rounded-3xl border p-4 text-left transition sm:min-w-0 ${
                  selected
                    ? "border-navy bg-navy text-white shadow-lg"
                    : "border-black/8 bg-white text-navy hover:border-black/20"
                }`}
              >
                <FrameArt art={frame.art} />
                <div className={`mt-2 text-sm font-bold ${selected ? "text-emerald-300" : "text-muted"}`}>
                  {frame.number}
                </div>
                <div className="text-base font-bold">{frame.title}</div>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`process-panel-${active}`}
          aria-labelledby={`process-tab-${active}`}
          className="mt-5 rounded-[28px] border border-black/8 bg-white px-6 py-8 sm:px-10"
        >
          <p className="text-2xl font-bold text-navy">{frames[active].title}</p>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted">{frames[active].caption}</p>
        </div>
      </Container>
    </Section>
  );
}
