"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useNavSurface } from "@/lib/use-nav-surface";

/** Never resubscribes — the snapshot only has to differ between server and client. */
const neverChanges = () => () => {};

export function Header() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const { surface, elevated } = useNavSurface();
  const dark = surface === "dark";

  // The active pill is client-only: the server render has no way to know which
  // rewrite or dynamic segment the browser actually landed on, so painting it
  // during SSR risks a hydration mismatch.
  const ready = useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );

  // Close the mobile menu on navigation. Links close it themselves; this covers
  // back/forward and any other route change, adjusted during render rather than
  // in an effect so the menu never paints open on the new route.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setOpen(false);
  }

  // Longest matching href wins, so /solutions/ai-development highlights "AI"
  // rather than lighting up "Solutions" as well.
  const activeHref = nav.reduce<string | null>((best, item) => {
    const matches =
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href || pathname.startsWith(`${item.href}/`);
    if (!matches) return best;
    return best === null || item.href.length > best.length ? item.href : best;
  }, null);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-[1240px] rounded-[28px] border px-3 py-2 shadow-lg backdrop-blur-xl transition-colors duration-300 sm:rounded-full sm:px-4",
          dark
            ? "border-white/10 bg-navy/90 text-white shadow-black/30"
            : elevated
              ? "border-black/8 bg-white/90 text-navy shadow-black/10"
              : "border-white/80 bg-white/75 text-navy shadow-black/5",
        )}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[auto_1fr_auto]">
          <Link href="/" aria-label="MZA Logics home" className="justify-self-start pl-1">
            <Logo invert={dark} />
          </Link>

          <nav
            className={cn(
              "hidden justify-self-center rounded-full px-2 py-1 lg:flex",
              dark ? "bg-white/10" : "bg-black/[0.04]",
            )}
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active = ready && item.href === activeHref;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[13.5px] font-medium transition xl:px-3.5 xl:text-[14px]",
                    dark
                      ? active
                        ? "bg-white text-navy"
                        : "text-white/75 hover:text-white"
                      : active
                        ? "bg-navy text-white"
                        : "text-navy/70 hover:text-navy",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <Link
              href="/contact"
              className={cn(
                "hidden rounded-full px-4 py-2 text-[14px] font-medium transition sm:inline-flex",
                dark ? "bg-white text-navy hover:bg-accent-2" : "bg-navy text-white hover:bg-navy-2",
              )}
            >
              Book a Call
            </Link>
            <button
              type="button"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full lg:hidden",
                dark ? "bg-white/10 text-white" : "bg-black/5 text-navy",
              )}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-2 flex flex-col gap-1 border-t border-current/10 px-1 py-3 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("rounded-xl px-3 py-2 text-sm", dark ? "text-white" : "text-navy")}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                "mt-1 rounded-full px-4 py-2.5 text-center text-sm font-medium",
                dark ? "bg-white text-navy" : "bg-navy text-white",
              )}
              onClick={() => setOpen(false)}
            >
              Book a Call
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
