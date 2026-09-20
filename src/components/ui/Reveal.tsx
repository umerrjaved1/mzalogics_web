"use client";

import { motion } from "framer-motion";

/**
 * Slides content into place on first view.
 *
 * Deliberately animates transform only: the server-rendered markup must stay
 * visible so the page still reads with JS disabled or mid-hydration. We burned
 * on the opposite once — the hero was rendered at opacity:0 until hydration and
 * sat blank for seconds on a slow connection. Motion here is never the reason
 * a client cannot read the page.
 *
 * `delay` staggers siblings; keep it under ~0.25s so nothing feels laggy.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reveals a list of children one after another. Each child keeps its own
 * layout; only the wrapper moves, so grids and flex rows are unaffected.
 */
export function RevealGroup({
  children,
  className,
  step = 0.07,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  y?: number;
}) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delay={Math.min(index * step, 0.35)} y={y}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
