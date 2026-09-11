"use client";

import React, { useState } from "react";
import { clientLogos } from "@/content/visuals";

export function LogoMarquee() {
  const [paused, setPaused] = useState(false);
  const items = [...clientLogos, ...clientLogos];

  return (
    <section className="relative z-10 border-y border-white/10 bg-navy py-8 text-white" data-nav-surface="dark">
      <div className="mb-5 flex flex-wrap items-center justify-center gap-4 px-5">
        <p className="text-sm font-semibold tracking-wide text-white/85">Teams we ship with</p>
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
          className="rounded-full border border-white/20 px-3 py-1 text-sm font-semibold text-white hover:bg-white/10"
        >
          {paused ? "Play logos" : "Pause logos"}
        </button>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="marquee-track flex w-max items-center gap-5"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {items.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2"
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${client.tone} text-xs font-extrabold text-navy`}
              >
                {client.mark}
              </span>
              <span className="text-base font-semibold text-white">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
