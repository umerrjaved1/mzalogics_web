"use client";

import { useState } from "react";
import Link from "next/link";
import { CaseStudyCover } from "@/components/ui/CaseStudyCover";
import { cn } from "@/lib/cn";

export type WorkCard = {
  slug: string;
  industry: string;
  title: string;
  summary: string;
  label: string;
  image?: string;
  kind: "website" | "app";
};

const tabs = [
  { id: "all", label: "All" },
  { id: "websites", label: "Websites" },
  { id: "apps", label: "Apps" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const notes: Record<TabId, string> = {
  all: "Websites first, then the apps.",
  websites: "Live sites for real businesses.",
  apps: "AI apps first, then the rest of the Play catalog.",
};

export function WorkCatalog({ items }: { items: WorkCard[] }) {
  const [tab, setTab] = useState<TabId>("all");
  const visible = items.filter((item) => tab === "all" || (tab === "websites" ? item.kind === "website" : item.kind === "app"));
  const counts: Record<TabId, number> = {
    all: items.length,
    websites: items.filter((item) => item.kind === "website").length,
    apps: items.filter((item) => item.kind === "app").length,
  };

  return (
    <div>
      <div role="tablist" aria-label="Project types" className="flex flex-wrap gap-2">
        {tabs.map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`work-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`work-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={(event) => {
                const index = tabs.findIndex((entry) => entry.id === tab);
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
                  setTab(tabs[next].id);
                  document.getElementById(`work-tab-${tabs[next].id}`)?.focus();
                }
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                selected ? "border-navy bg-navy text-white" : "border-black/10 bg-white text-navy hover:border-navy/30",
              )}
            >
              {item.label}
              <span className={cn("text-xs", selected ? "text-white/70" : "text-muted")}>{counts[item.id]}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted">{notes[tab]}</p>
      <div
        role="tabpanel"
        id={`work-panel-${tab}`}
        aria-labelledby={`work-tab-${tab}`}
        className="mt-6 grid gap-5 md:grid-cols-2"
      >
        {visible.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-sm transition hover:border-navy/30 hover:shadow-lg"
          >
            <CaseStudyCover
              industry={study.industry}
              title={study.title}
              local={study.image}
              compact
              className="aspect-video w-full"
            />
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-navy">{study.industry}</p>
              <h2 className="mt-2 text-xl font-semibold text-navy">{study.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{study.summary}</p>
              <p className="mt-4 text-sm font-semibold text-navy">{study.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
