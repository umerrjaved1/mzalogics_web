"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Tries a local /public file first. If it 404s, uses the fallback URL.
 * Drop a file at the local path later — no code change needed.
 */
export function MediaImg({
  local,
  fallback,
  alt,
  className,
  fit = "cover",
}: {
  local?: string;
  fallback: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [src, setSrc] = useState(local || fallback);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn(fit === "contain" ? "object-contain" : "object-cover", "object-center", className)}
      onError={() => {
        if (src !== fallback) setSrc(fallback);
      }}
    />
  );
}
