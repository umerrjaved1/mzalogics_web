import { site, whatsappHref } from "@/lib/site";

export function FloatingSocial() {
  return (
    <>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg md:hidden"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
          <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 2.08.55 4.1 1.6 5.9L2 22l4.4-1.15a10 10 0 0 0 5.64 1.6h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.76 14.18c-.24.68-1.4 1.26-1.95 1.34-.5.07-1.13.1-1.82-.11-.42-.13-.95-.31-1.64-.61-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.24-.28.53-.35.7-.35h.5c.16 0 .38-.06.6.46.24.54.8 1.96.87 2.1.07.14.12.3.02.49-.1.2-.14.32-.28.5-.14.17-.3.38-.43.51-.14.14-.29.29-.12.56.16.28.73 1.2 1.57 1.95 1.08.95 1.99 1.25 2.27 1.4.28.14.45.12.61-.07.16-.2.7-.81.89-1.09.18-.28.37-.23.62-.14.24.1 1.54.73 1.8.86.26.14.43.2.5.31.07.11.07.64-.17 1.32z" />
        </svg>
      </a>

      <div className="pointer-events-none fixed bottom-28 left-4 z-20 hidden w-[168px] flex-col items-start gap-2 xl:flex">
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="group pointer-events-auto inline-flex w-11 shrink-0 items-center gap-2 overflow-hidden rounded-full bg-navy p-2 text-[13px] font-medium text-white shadow-lg transition-[width] duration-300 hover:w-[168px] focus-visible:w-[168px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-reduce:transition-none"
          aria-label="Follow us on LinkedIn"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.5h4.52V24H.24zM8.34 8.5h4.33v2.12h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.02 5.42 6.95V24h-4.52v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.56 4.06V24H8.34z" />
            </svg>
          </span>
          <span className="whitespace-nowrap">Follow on LinkedIn</span>
        </a>
      </div>
    </>
  );
}
