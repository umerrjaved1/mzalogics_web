"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { nav, type NavItem } from "@/lib/site";
import { bookingHref } from "@/lib/booking";
import { promo, isPromoActive } from "@/content/promo";
import { cn } from "@/lib/cn";
import { useNavSurface } from "@/lib/use-nav-surface";

/** Never resubscribes — the snapshot only has to differ between server and client. */
const neverChanges = () => () => {};

export function Header() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const { surface, elevated } = useNavSurface();
  const dark = surface === "dark";
  const promoLive = isPromoActive();

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
    setOpenMenu(null);
    setMobileSubmenu(null);
  }, [pathname, menuPathname]);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hoverTimer = useRef<number | undefined>(undefined);

  const closeDropdown = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    setOpenMenu(null);
  }, []);

  /** A short grace period so the pointer can cross the gap to the panel. */
  const scheduleClose = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  }, []);

  const cancelClose = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
  }, []);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // Dismiss menus the way every other menu on the web does.
  useEffect(() => {
    if (!open && !openMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openMenu) {
        const trigger = triggerRefs.current[openMenu];
        closeDropdown();
        trigger?.focus();
        return;
      }
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
      closeDropdown();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, openMenu, closeDropdown]);

  const activeHref = nav.reduce<string | null>((best, item) => {
    const matches = pathname === item.href || pathname.startsWith(`${item.href}/`);
    if (!matches) return best;
    return best === null || item.href.length > best.length ? item.href : best;
  }, null);

  const itemClass = (active: boolean) =>
    cn(
      "relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13.5px] font-semibold transition-all duration-200 xl:px-3.5 xl:text-[14px]",
      dark
        ? active
          ? "bg-white text-navy shadow-sm"
          : "text-white/75 hover:bg-white/10 hover:text-white"
        : active
          ? "bg-navy text-white shadow-sm"
          : "text-navy/70 hover:bg-black/5 hover:text-navy",
    );

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto max-w-[1240px] rounded-[28px] border px-3.5 py-2.5 shadow-xl backdrop-blur-2xl transition-all duration-300 sm:rounded-[32px] sm:px-5 sm:py-2.5",
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
              "hidden items-center gap-1 justify-self-center rounded-full p-1 lg:flex",
              dark ? "bg-white/10" : "bg-black/[0.04]",
            )}
            aria-label="Primary"
          >
            {nav.map((item) => {
              const active = ready && item.href === activeHref;
              if (!item.children) {
                return (
                  <Link key={item.href} href={item.href} className={itemClass(active)}>
                    {item.label}
                  </Link>
                );
              }
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.href);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    ref={(node) => {
                      triggerRefs.current[item.href] = node;
                    }}
                    aria-expanded={openMenu === item.href}
                    aria-haspopup="true"
                    aria-controls={`menu-${item.label.toLowerCase()}`}
                    onClick={() => setOpenMenu((current) => (current === item.href ? null : item.href))}
                    className={itemClass(active)}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      aria-hidden
                      className={cn("transition-transform", openMenu === item.href && "rotate-180")}
                    />
                  </button>
                  {openMenu === item.href ? <MegaMenu item={item} onNavigate={closeDropdown} /> : null}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3">
            {promoLive ? (
              <div className="hidden items-center gap-1.5 text-xs font-semibold xl:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className={dark ? "text-white/80" : "text-navy/80"}>{promo.navLabel}</span>
              </div>
            ) : null}

            <Link
              href={bookingHref}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-bold shadow-sm transition-all duration-200 hover:scale-[1.02] sm:px-5 sm:text-[13.5px]",
                dark
                  ? "bg-accent-2 text-navy shadow-accent-2/20 hover:bg-emerald-300"
                  : "bg-navy text-white shadow-navy/20 hover:bg-navy-light",
              )}
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book a Call</span>
              <ArrowUpRight size={14} aria-hidden />
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

        {/* Mobile menu */}
        {open ? (
          <div
            id="mobile-menu"
            className="mt-3 max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-current/10 px-2 py-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.href}>
                    <div className="flex items-center gap-1">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex-1 rounded-xl px-3.5 py-2 text-sm font-semibold transition",
                          dark ? "text-white hover:bg-white/10" : "text-navy hover:bg-black/5",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={mobileSubmenu === item.href}
                        aria-label={`${mobileSubmenu === item.href ? "Collapse" : "Expand"} ${item.label}`}
                        onClick={() =>
                          setMobileSubmenu((current) => (current === item.href ? null : item.href))
                        }
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                          dark ? "bg-white/10 text-white" : "bg-black/5 text-navy",
                        )}
                      >
                        <ChevronDown
                          size={16}
                          aria-hidden
                          className={cn("transition-transform", mobileSubmenu === item.href && "rotate-180")}
                        />
                      </button>
                    </div>
                    {mobileSubmenu === item.href ? (
                      <ul className="mt-1 mb-2 ml-3 space-y-0.5 border-l border-current/10 pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm transition",
                                dark ? "text-white/80 hover:bg-white/10" : "text-navy/80 hover:bg-black/5",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
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
                ),
              )}
            </div>
            <Link
              href={bookingHref}
              className={cn(
                "mt-3 block rounded-full px-4 py-2.5 text-center text-sm font-bold shadow-md",
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

function MegaMenu({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <div
      id={`menu-${item.label.toLowerCase()}`}
      className="absolute left-1/2 top-full z-50 w-[620px] max-w-[calc(100vw-3rem)] -translate-x-1/2 pt-3"
    >
      <div className="overflow-hidden rounded-[24px] border border-black/8 bg-white p-3 shadow-[0_24px_60px_rgba(9,6,26,0.16)]">
        <ul className="grid gap-0.5 sm:grid-cols-2">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="block rounded-2xl px-3.5 py-2.5 transition hover:bg-paper"
              >
                <span className="block text-[13.5px] font-bold text-navy">{child.label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-muted">{child.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="mt-2 flex items-center justify-between rounded-2xl bg-paper px-4 py-3 text-[13.5px] font-bold text-navy transition hover:bg-black/5"
        >
          All solutions
          <ArrowUpRight size={15} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
