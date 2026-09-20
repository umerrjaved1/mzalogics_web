"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Drifts a layer against the scroll to give a section depth.
 *
 * Only ever wrap DECORATION — ambient glows, mockups, background art. Parallax
 * moves things out of their normal position, so putting text or a control in
 * here would fight the reader. Content uses Reveal instead.
 *
 * `useScroll` is not covered by MotionConfig's reduced-motion handling, so the
 * preference is checked here and the effect removed entirely.
 */
export function Parallax({
  children,
  className,
  /** Total travel in px across the section's pass through the viewport. */
  distance = 60,
  /** Negative leads the scroll, positive trails it. */
  direction = 1,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  direction?: 1 | -1;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance * direction, -distance * direction],
  );

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
