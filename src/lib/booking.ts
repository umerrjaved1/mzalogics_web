import { site } from "@/lib/site";

/**
 * Where every "Book a call" control in the site points.
 * Kept in one place so the destination can change (dedicated route, modal,
 * third-party popup) without touching each call site.
 */
export const BOOKING_ANCHOR = "book-call";
export const bookingHref = `/contact#${BOOKING_ANCHOR}`;

/**
 * A scheduler is only offered when NEXT_PUBLIC_CALENDAR_URL is set.
 * Without it the contact page falls back to WhatsApp, phone, and the form —
 * no button ever promises a booking the site cannot deliver.
 */
export const calendarUrl = site.calendarUrl;
export const bookingEnabled = calendarUrl.length > 0;
