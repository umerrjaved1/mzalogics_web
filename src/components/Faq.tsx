"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import type { FaqItem } from "@/content/faqs";
import { cn } from "@/lib/cn";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Got Questions?
            <br />
            We Got Answers
          </h2>
          <p className="mt-4 max-w-sm text-muted">
            Straightforward, no-fluff answers to help you feel confident about working with us.
          </p>
        </div>
        <div className="divide-y divide-line">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span className="text-[15px] font-semibold text-navy">
                    <span className="mr-3 text-navy/35">0{index + 1}</span>
                    {item.question}
                  </span>
                  <ChevronDown className={cn("shrink-0 text-muted transition", isOpen && "rotate-180")} size={18} />
                </button>
                {isOpen ? <p className="pb-5 text-sm leading-7 text-muted">{item.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
