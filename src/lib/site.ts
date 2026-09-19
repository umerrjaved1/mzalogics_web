export const site = {
  name: "MZA Logics",
  legalName: "MZA Logics",
  tagline: "Software Built Around You — Not the Other Way Around",
  headline: "Custom Software, Built for the Way You Work",
  description:
    "MZA Logics is a senior-led software engineering studio in Lahore. We build custom mobile apps, web platforms, and AI systems tailored around your business — not the other way around.",
  shortDescription:
    "Software studio in Lahore engineering mobile apps, web platforms, and AI systems built around your business.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mzalogics.com",
  email: "mzalogics@gmail.com",
  careersEmail: "mzalogics@gmail.com",
  phoneDisplay: "0300 3600188",
  phoneHref: "+923003600188",
  whatsapp: "923003600188",
  linkedin: "https://www.linkedin.com/company/mza-logics",
  calendarUrl: process.env.NEXT_PUBLIC_CALENDAR_URL ?? "",
  founded: "2021",
  teamSize: "16",
  customers: "50+",
  availability: "Booking Q4 2026 pods",
  responseTime: "We reply to new enquiries within one business day.",
  hours: "Mon-Fri, 9:00-18:00 PKT (UTC+5)",
  geo: {
    latitude: 31.4704,
    longitude: 74.4108,
  },
  locations: [
    {
      label: "Studio",
      address: "144 G Block, D.H.A. Main Blvd, Sector G DHA Phase 1",
      city: "Lahore",
      region: "Punjab",
      postalCode: "54792",
      country: "PK",
      detail: "Lahore, Pakistan",
    },
  ],
} as const;

export function whatsappHref(
  message = "Hi MZA Logics — I want a 20-minute discovery call about a product build.",
) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const socials = [{ label: "LinkedIn", href: site.linkedin }] as const;

export type NavChild = { href: string; label: string; note: string };
export type NavItem = { href: string; label: string; children?: readonly NavChild[] };

/**
 * The seven practices plus the two engagement offers that used to be
 * reachable only from the footer.
 */
export const solutionsMenu: readonly NavChild[] = [
  { href: "/solutions/app-development", label: "Mobile app development", note: "iOS and Android, native or Flutter" },
  { href: "/solutions/web-platforms", label: "Custom web development", note: "Dashboards and platforms that scale" },
  { href: "/solutions/ai-development", label: "AI-driven development", note: "LLM features with a human gate" },
  { href: "/solutions/product-design", label: "UI/UX design", note: "Research, flows, and design systems" },
  { href: "/solutions/mvp-prototyping", label: "MVP & prototyping", note: "Validate the idea in weeks" },
  { href: "/solutions/cloud", label: "Maintenance & DevOps", note: "CI/CD, observability, and SLAs" },
  { href: "/solutions/cms", label: "CMS development", note: "Editable sites your team owns" },
  { href: "/talent", label: "Hire our engineers", note: "Dedicated specialists, billed monthly" },
  { href: "/rescue", label: "Project rescue", note: "Audit and stabilise a stalled build" },
] as const;

export const nav: readonly NavItem[] = [
  { href: "/solutions", label: "Solutions", children: solutionsMenu },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = {
  company: [
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/work", label: "Work" },
    { href: "/pricing", label: "Pricing" },
    { href: "/careers", label: "Careers" },
    { href: "/insights", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ],
  solutions: [
    { href: "/solutions/ai-development", label: "AI-driven development" },
    { href: "/solutions/app-development", label: "Mobile app development" },
    { href: "/solutions/web-platforms", label: "Custom web development" },
    { href: "/solutions/product-design", label: "UI/UX design" },
    { href: "/solutions/mvp-prototyping", label: "MVP & prototyping" },
    { href: "/solutions/cloud", label: "Maintenance & DevOps" },
    { href: "/solutions/cms", label: "CMS development" },
  ],
  resources: [
    { href: "/pricing", label: "Pricing & plans" },
    { href: "/faq", label: "FAQ" },
    { href: "/talent", label: "Hire our engineers" },
    { href: "/rescue", label: "Project rescue" },
    { href: "/insights", label: "Insights" },
    { href: "/contact#book-call", label: "Book a call" },
  ],
} as const;

export const metrics = [
  { value: site.customers, label: "Products shipped" },
  { value: site.teamSize, label: "Named specialists" },
  { value: site.founded, label: "Established" },
  { value: "2 tracks", label: "AI-driven or hand-crafted" },
] as const;
