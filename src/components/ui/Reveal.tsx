"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useInView } from "framer-motion";
import { registerPendingReveal } from "@/lib/reveal-failsafe";

/**
 * Reveals content as it scrolls into view.
 *
 * Content is allowed to fade here only because of two guarantees. Both exist
 * because we once shipped a hero at opacity:0 until hydration and it sat blank
 * for seconds on a slow connection.
 *
 *  1. The hidden state is NEVER server-rendered. Until JS confirms it is
 *     running this is an ordinary visible div, so no JS means no blank page.
 *  2. If the element is geometrically on screen but the viewport observer has
 *     not reported it, we reveal anyway. IntersectionObserver can be missing,
 *     or suspended entirely while a tab is hidden — without this, content that
 *     was visible would vanish at hydration and never come back.
 *
 * Off-screen content is untouched by the failsafe, so scrolling still reveals.
 */

/** Never resubscribes; the snapshot only has to differ between server and client. */
const neverChanges = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );

/** How long to wait for the observer before trusting geometry instead. */
const FAILSAFE_MS = 1200;

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger siblings. Keep under ~0.3s or the last card feels late. */
  delay?: number;
  /** Travel distance. Larger reads as more deliberate. */
  y?: number;
  /** Slight zoom, for cards and panels. */
  scale?: number;
  /** Drift in from the side instead of upward. */
  x?: number;
};

export function Reveal({ children, className, delay = 0, y = 40, scale = 0.98, x = 0 }: RevealProps) {
  const mounted = useMounted();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -60px 0px" });
  const [failsafe, setFailsafe] = useState(false);
  const show = inView || failsafe;

  useEffect(() => {
    if (!mounted || show) return;

    // One-shot check for content already on screen at hydration, then stay
    // registered so a later scroll still rescues us if the observer is dead.
    const timer = window.setTimeout(() => {
      const node = ref.current;
      if (node && node.getBoundingClientRect().top < window.innerHeight) setFailsafe(true);
    }, FAILSAFE_MS);

    const unregister = registerPendingReveal({
      el: () => ref.current,
      show: () => setFailsafe(true),
    });

    return () => {
      window.clearTimeout(timer);
      unregister();
    };
  }, [mounted, show]);

  if (!mounted) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      animate={show ? { opacity: 1, y: 0, x: 0, scale: 1 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A heading that assembles line by line. Reserved for the one or two moments
 * worth the extra weight — the whole page doing this would be exhausting.
 *
 * Lines slide up behind a clipping mask, so nothing relies on opacity and the
 * text is readable the instant it is on screen. The full string stays in one
 * accessible label; the split copy is hidden from screen readers.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const mounted = useMounted();
  const text = lines.join(" ");

  if (!mounted) return <span className={className}>{text}</span>;

  return (
    <span className={className} role="text" aria-label={text}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden" aria-hidden>
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, delay: delay + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
