"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button, ArrowDisc } from "@/components/ui/Button";
import { goToLead, whatsappLeadHref } from "@/lib/lead-intent";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const STORAGE_KEY = "mza-lead-dock-dismissed";

export function LeadDock() {
  const pathname = usePathname() ?? "";
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/contact") || pathname.startsWith("/privacy") || pathname.startsWith("/terms")) {
      setVisible(false);
      return;
    }
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const reveal = () => setVisible(true);
    const onScroll = () => {
      const scrolled = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      if (scrolled > 0.28) reveal();
    };
    const timer = window.setTimeout(reveal, reduced ? 16000 : 8000);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mza-lead-engage", reveal);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mza-lead-engage", reveal);
    };
  }, [pathname, reduced]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden w-[360px] md:block">
      <div className="rounded-3xl border border-white/15 bg-navy/95 p-4 text-white shadow-[0_20px_50px_rgba(9,6,26,0.45)] backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-emerald-300">Q4 deal · 45% off through 31 Dec</p>
            <p className="mt-1 text-base font-bold leading-snug">Lock the reduced rate. 20 minutes. No deck required.</p>
          </div>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white"
            aria-label="Dismiss lead offer"
            onClick={() => {
              sessionStorage.setItem(STORAGE_KEY, "1");
              setVisible(false);
            }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            href="/contact"
            className="h-11 px-4 text-sm font-bold"
            onClick={(event) => {
              if (document.getElementById("book")) {
                event.preventDefault();
                goToLead();
              }
            }}
          >
            Book a call
            <ArrowDisc />
          </Button>
          <a
            href={whatsappLeadHref()}
            className="inline-flex h-11 items-center rounded-full border border-white/20 px-4 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
