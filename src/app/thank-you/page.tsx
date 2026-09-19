import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks — we have your enquiry",
  description: "Your enquiry reached MZA Logics. We reply within one business day.",
  alternates: {
    canonical: "/thank-you",
  },
  // A confirmation page has no business in search results.
  robots: {
    index: false,
    follow: false,
  },
};

const nextSteps = [
  {
    title: "We read it properly",
    body: "An engineer reads your brief — not a sales rep. If anything is unclear we ask before quoting.",
  },
  {
    title: "You hear back within one business day",
    body: `We reply to the email you gave us. Studio hours are ${site.hours}.`,
  },
  {
    title: "You get a written scope",
    body: "After a short call we send a written scope and a fixed quote. No obligation to proceed.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <Section className="dot-grid">
        <Container>
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-700 text-white shadow-lg">
            <CheckCircle2 size={28} aria-hidden />
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Thanks — your enquiry is in
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            We have it, and we reply within one business day. Need an answer sooner? Message us on
            WhatsApp and you will usually get a human straight away.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref("Hi MZA Logics — I just sent an enquiry through the site.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
            >
              <MessageCircle size={16} aria-hidden />
              WhatsApp {site.phoneDisplay}
            </a>
            <Link
              href="/work"
              className="inline-flex items-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-paper"
            >
              Read a case study
            </Link>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <ol className="grid gap-4 sm:grid-cols-3">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="rounded-[28px] border border-black/8 bg-white p-6">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h2 className="mt-4 text-base font-bold text-navy">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
