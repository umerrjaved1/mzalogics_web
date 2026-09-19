import { whatsappHref } from "@/lib/site";

/**
 * One floating control, and only on mobile.
 *
 * Desktop already gets LeadDock in the bottom-right; a second floating rail
 * there competed with it and sat on top of the hero stats. LinkedIn lives in
 * the footer, which is where people look for it.
 */
export function FloatingSocial() {
  return (
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
  );
}
