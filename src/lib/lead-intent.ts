"use client";

import { whatsappHref } from "@/lib/site";

export function markLeadEngage() {
  window.dispatchEvent(new Event("mza-lead-engage"));
}

export function goToLead() {
  markLeadEngage();
  const form = document.getElementById("book");
  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      form.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    }, 400);
    return;
  }
  // Plain helper called from many click handlers with no router in reach;
  // a full navigation to /contact is the intended fallback.
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.assign("/contact");
}

export function whatsappLeadHref(message?: string) {
  return whatsappHref(message);
}
