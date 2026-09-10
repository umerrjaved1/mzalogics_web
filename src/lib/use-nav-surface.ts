"use client";

import { useEffect, useState } from "react";

export type NavSurface = "light" | "dark";

export function useNavSurface() {
  const [surface, setSurface] = useState<NavSurface>("light");
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const probe = () => {
      const y = 36;
      setElevated(window.scrollY > 12);
      const bands = document.querySelectorAll<HTMLElement>("[data-nav-surface]");
      let next: NavSurface = "light";
      bands.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= y && rect.bottom >= y) {
          const value = el.dataset.navSurface;
          if (value === "dark" || value === "light") next = value;
        }
      });
      setSurface(next);
    };

    probe();
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    return () => {
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
  }, []);

  return { surface, elevated };
}
