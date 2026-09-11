"use client";

import React from "react";

interface TechItem {
  name: string;
  category: string;
  iconText: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: "Next.js 16", category: "Full-Stack Web", iconText: "N", color: "from-white to-gray-400" },
  { name: "Flutter 3", category: "iOS & Android", iconText: "F", color: "from-cyan-400 to-blue-500" },
  { name: "React Native", category: "Cross-Platform", iconText: "⚛", color: "from-blue-400 to-cyan-300" },
  { name: "Python & PyTorch", category: "AI & ML", iconText: "Py", color: "from-amber-300 to-orange-400" },
  { name: "AWS Cloud", category: "Infrastructure", iconText: "AWS", color: "from-amber-400 to-yellow-500" },
  { name: "Docker & K8s", category: "DevOps & Scale", iconText: "🐳", color: "from-blue-500 to-indigo-500" },
  { name: "TypeScript", category: "Type Safety", iconText: "TS", color: "from-blue-400 to-blue-600" },
  { name: "PostgreSQL", category: "Enterprise DB", iconText: "PG", color: "from-indigo-300 to-blue-400" },
  { name: "Node.js", category: "Backend APIs", iconText: "JS", color: "from-emerald-400 to-green-500" },
  { name: "Tailwind CSS", category: "Design System", iconText: "TW", color: "from-cyan-300 to-teal-400" },
  { name: "Figma", category: "UI/UX & Systems", iconText: "Fg", color: "from-purple-400 to-pink-500" },
  { name: "Laravel", category: "Web Services", iconText: "Lv", color: "from-rose-500 to-red-600" },
];

export function LogoMarquee() {
  const items = [...techStack, ...techStack];

  return (
    <section className="relative z-10 border-y border-white/10 bg-navy py-8 text-white" data-nav-surface="dark">
      {/* Glow lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-2/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />

      {/* Header Eyebrow */}
      <div className="mb-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-white/70 uppercase">
          Battle-Tested Technologies &middot; Production Grade Systems
        </p>
      </div>

      {/* Gradient Mask Container */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-6">
          {items.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:border-accent-2/50 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,245,160,0.15)]"
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${tech.color} text-[10px] font-extrabold text-navy shadow-sm`}
              >
                {tech.iconText}
              </span>
              <span className="font-semibold text-white/90 group-hover:text-white">{tech.name}</span>
              <span className="hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70 group-hover:text-accent-2 sm:inline-block">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
