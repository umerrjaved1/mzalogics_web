"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline at the very top showing how far through the page you are.
 *
 * On a page this long that is orientation, not decoration — it answers "how
 * much more is there?" without the reader having to guess from the scrollbar.
 * Deliberately 2px and behind the header pill so it never competes with the
 * navigation.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-2 via-accent-cyan to-accent-2"
      style={{ scaleX }}
    />
  );
}
