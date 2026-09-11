"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honours the OS "reduce motion" setting for every framer-motion animation.
 * The CSS keyframes in globals.css are handled by their own media query.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
