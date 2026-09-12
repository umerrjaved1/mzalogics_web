import React from "react";
import { cn } from "@/lib/cn";
import { MediaImg } from "@/components/ui/MediaImg";

/* Deterministic abstract cover art for case studies — no real screenshots needed.
   Each industry maps to a palette + motif so every card looks distinct. */

type Motif = "chart" | "network" | "shield" | "grid" | "nodes" | "pulse";

const paletteByIndustry: Record<string, { from: string; to: string; accent: string; motif: Motif }> = {
  Logistics: { from: "#0b3d91", to: "#00d2ff", accent: "#00f5a0", motif: "network" },
  Finance: { from: "#09061a", to: "#1e1845", accent: "#00f5a0", motif: "chart" },
  "Healthcare ops": { from: "#0a4d3a", to: "#00f5a0", accent: "#ffffff", motif: "shield" },
  Retail: { from: "#7a1f5a", to: "#ff5a8a", accent: "#ffd166", motif: "grid" },
  "Insurance ops": { from: "#09061a", to: "#3a2a7a", accent: "#00d2ff", motif: "nodes" },
  "Consumer apps": { from: "#0b0820", to: "#00d2ff", accent: "#00f5a0", motif: "pulse" },
};

const fallback = { from: "#09061a", to: "#1e1845", accent: "#00f5a0", motif: "chart" as Motif };

function MotifSvg({ motif, accent }: { motif: Motif; accent: string }) {
  const common = { fill: "none", stroke: accent, strokeWidth: 1.5, opacity: 0.9 };
  return (
    <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {/* chart */}
      {motif === "chart" && (
        <g {...common}>
          <polyline points="20,150 70,120 120,135 170,90 220,105 270,60 320,75 380,40" />
          <line x1="20" y1="180" x2="380" y2="180" opacity="0.25" />
          <line x1="20" y1="20" x2="20" y2="180" opacity="0.25" />
        </g>
      )}
      {/* network */}
      {motif === "network" && (
        <g {...common}>
          <circle cx="80" cy="60" r="6" />
          <circle cx="200" cy="100" r="8" />
          <circle cx="320" cy="50" r="6" />
          <circle cx="150" cy="150" r="6" />
          <circle cx="300" cy="140" r="7" />
          <line x1="80" y1="60" x2="200" y2="100" />
          <line x1="200" y1="100" x2="320" y2="50" />
          <line x1="200" y1="100" x2="150" y2="150" />
          <line x1="200" y1="100" x2="300" y2="140" />
          <line x1="150" y1="150" x2="300" y2="140" />
        </g>
      )}
      {/* shield */}
      {motif === "shield" && (
        <g {...common}>
          <path d="M200 30 L300 70 V120 C300 150 250 170 200 180 C150 170 100 150 100 120 V70 Z" />
          <path d="M170 110 L195 135 L240 90" strokeWidth="2.5" />
        </g>
      )}
      {/* grid */}
      {motif === "grid" && (
        <g {...common}>
          {[60, 120, 180, 240, 300, 360].map((x) => (
            <line key={x} x1={x} y1="20" x2={x} y2="180" opacity="0.2" />
          ))}
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="20" y1={y} x2="380" y2={y} opacity="0.2" />
          ))}
          <rect x="60" y="60" width="80" height="50" rx="6" opacity="0.4" />
          <rect x="160" y="100" width="80" height="50" rx="6" opacity="0.7" />
          <rect x="260" y="40" width="80" height="50" rx="6" opacity="0.5" />
        </g>
      )}
      {/* nodes */}
      {motif === "nodes" && (
        <g {...common}>
          {[60, 140, 220, 300].map((x, i) => (
            <circle key={x} cx={x} cy={70 + (i % 2) * 50} r={5 + i} opacity={0.6} />
          ))}
          <path d="M60 120 L140 80 L220 130 L300 90" />
        </g>
      )}
      {/* pulse */}
      {motif === "pulse" && (
        <g {...common}>
          <path d="M20 100 L80 100 L100 60 L140 140 L180 80 L220 100 L380 100" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

export function CaseStudyCover({
  industry,
  title,
  className,
  compact = false,
  image,
  local,
}: {
  industry: string;
  title: string;
  className?: string;
  compact?: boolean;
  image?: string;
  local?: string;
}) {
  const p = paletteByIndustry[industry] ?? fallback;
  const photo = local ?? image;
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)` }}
    >
      {photo ? (
        <MediaImg
          local={local}
          fallback={image ?? local ?? ""}
          alt=""
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <>
          <div
            className="pointer-events-none absolute -top-1/3 left-1/2 h-[120%] w-[80%] -translate-x-1/2 rounded-full opacity-30 blur-2xl"
            style={{ background: `radial-gradient(circle, ${p.accent} 0%, transparent 70%)` }}
            aria-hidden="true"
          />
          <MotifSvg motif={p.motif} accent={p.accent} />
        </>
      )}

      <div
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        aria-hidden="true"
      />

      {/* label */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <span className="w-fit rounded-full bg-white/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {industry}
        </span>
        {!compact && (
          <span className="mt-2 line-clamp-2 text-lg font-extrabold leading-snug text-white">
            {title}
          </span>
        )}
      </div>
    </div>
  );
}
