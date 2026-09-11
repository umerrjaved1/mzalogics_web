"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function Avatar({
  initials,
  tone,
  image,
  alt,
  className,
  size = "md",
  showStatus = false,
}: {
  initials: string;
  tone: string;
  image?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: "h-11 w-11 text-xs rounded-xl",
    md: "h-16 w-16 text-lg rounded-2xl",
    lg: "h-24 w-24 text-2xl rounded-3xl",
    xl: "h-32 w-32 text-3xl rounded-[28px]",
  };

  const statusDotSizes = {
    sm: "h-3 w-3 -bottom-0.5 -right-0.5",
    md: "h-3.5 w-3.5 bottom-0 right-0",
    lg: "h-4 w-4 bottom-1 right-1",
    xl: "h-5 w-5 bottom-1.5 right-1.5",
  };

  return (
    <div className={cn("relative shrink-0 select-none", className)}>
      {image && !imgError ? (
        <div
          className={cn(
            "relative overflow-hidden border border-black/10 shadow-sm transition-all duration-300",
            sizeClasses[size],
            tone
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={alt ?? initials}
            className="h-full w-full object-cover object-center"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>
      ) : (
        <span
          aria-hidden
          className={cn(
            "grid shrink-0 place-items-center font-extrabold tracking-tight text-navy shadow-inner",
            sizeClasses[size],
            tone
          )}
        >
          {initials}
        </span>
      )}

      {showStatus && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-white bg-emerald-500 shadow-sm ring-1 ring-black/5",
            statusDotSizes[size]
          )}
          title="Active in pod"
        />
      )}
    </div>
  );
}
