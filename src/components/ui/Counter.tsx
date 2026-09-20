"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { formatStat, parseStat } from "@/lib/stat-format";

/**
 * Counts a stat up when it scrolls into view.
 *
 * Two deliberate choices:
 *
 * 1. The real value is what renders on the server, and the reset to zero
 *    happens only at the instant counting begins. A stat that never scrolls
 *    into view — hidden tab, zero-height container, no IntersectionObserver —
 *    keeps its real number. Not animating is fine; showing "0+" is not.
 * 2. Frames are written straight to the DOM through the ref rather than React
 *    state, which would otherwise re-render sixty times a second per stat.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const parsed = parseStat(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const animatable = Boolean(parsed) && !reduced;

  useEffect(() => {
    const node = ref.current;
    if (!animatable || !parsed || !inView || !node) return;

    node.textContent = formatStat(parsed, 0);
    const controls = animate(0, parsed.value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = formatStat(parsed, Math.round(latest));
      },
    });
    return () => controls.stop();
    // parsed is derived from `value`; tracking that is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatable, inView, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
