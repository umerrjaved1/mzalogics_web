"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
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

  const ready = useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );

  const [menuPathname, setMenuPathname] = useState(pathname);

  useEffect(() => {
    if (pathname === menuPathname) return;
    setMenuPathname(pathname);
    setOpen(false);
  }, [pathname, menuPathname]);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Dismiss the mobile menu the way every other menu on the web does.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const activeHref = nav.reduce<string | null>((best, item) => {
    const matches = pathname === item.href || pathname.startsWith(`${item.href}/`);
    if (!matches) return best;
    return best === null || item.href.length > best.length ? item.href : best;
  }, null);

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-[1240px] rounded-[28px] border px-3.5 py-2.5 shadow-xl backdrop-blur-2xl transition-all duration-300 sm:rounded-full sm:px-5 sm:py-2.5",
          dark
            ? "border-white/15 bg-navy/85 text-white shadow-black/40"
            : elevated
              ? "border-black/10 bg-white/90 text-navy shadow-[0_12px_36px_rgba(9,6,26,0.08)]"
              : "border-black/6 bg-white/80 text-navy shadow-[0_6px_24px_rgba(9,6,26,0.03)]",
        )}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[auto_1fr_auto]">
          <div className="flex items-center gap-3 justify-self-start pl-1">
            <Link href="/" aria-label="MZA Logics home">
              <Logo invert={dark} />
            </Link>
          </div>

          <nav
            className={cn(
              "hidden justify-self-center rounded-full p-1 lg:flex items-center gap-1",
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
                    "relative rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold transition-all duration-200 xl:px-4 xl:text-[14px]",
                    dark
                      ? active
                        ? "bg-white text-navy shadow-sm"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                      : active
                        ? "bg-navy text-white shadow-sm"
                        : "text-navy/70 hover:text-navy hover:bg-black/5",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            {/* Availability Pill */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-navy">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={dark ? "text-white/80" : "text-navy/80"}>Q4 · 45% off</span>
            </div>

            <Link
              href="/contact"
              className={cn(
                "hidden rounded-full px-5 py-2 text-[13.5px] font-bold transition-all duration-200 sm:inline-flex items-center gap-1.5 shadow-sm hover:scale-[1.02]",
                dark
                  ? "bg-accent-2 text-navy hover:bg-emerald-300 shadow-accent-2/20"
                  : "bg-navy text-white hover:bg-navy-light shadow-navy/20",
              )}
            >
              Book a Call
              <ArrowUpRight size={14} />
            </Link>

            <button
              type="button"
              ref={toggleRef}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full lg:hidden",
                dark ? "bg-white/10 text-white" : "bg-black/5 text-navy",
              )}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {open ? (
          <div id="mobile-menu" className="mt-3 flex flex-col gap-1 border-t border-current/10 px-2 py-4 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3.5 py-2 text-sm font-semibold transition",
                  dark ? "text-white hover:bg-white/10" : "text-navy hover:bg-black/5",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                "mt-2 rounded-full px-4 py-2.5 text-center text-sm font-bold shadow-md",
                dark ? "bg-accent-2 text-navy" : "bg-navy text-white",
              )}
              onClick={() => setOpen(false)}
            >
              Book a Discovery Call
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
