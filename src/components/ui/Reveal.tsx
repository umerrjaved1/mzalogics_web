"use client";

import { motion } from "framer-motion";

/**
 * Slides content into place on first view.
 *
 * Deliberately animates transform only: the server-rendered markup must stay
 * visible so the page still reads with JS disabled or mid-hydration.
 */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
