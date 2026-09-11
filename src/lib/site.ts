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
  email: "Mzalogics@gmail.com",
  careersEmail: "Mzalogics@gmail.com",
  phoneDisplay: "0300 3600188",
  phoneHref: "+923003600188",
  whatsapp: "923003600188",
  linkedin: "https://www.linkedin.com/company/mza-logics",
  founded: "2021",
  teamSize: "25+",
  customers: "50+",
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

export const socials = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: "https://github.com/mza-logics" },
  { label: "X", href: "https://x.com/mzalogics" },
  { label: "Dribbble", href: "https://dribbble.com/mzalogics" },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/solutions/ai-development", label: "AI" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/team", label: "Team" },
  { href: "/talent", label: "Talent" },
  { href: "/insights", label: "Insights" },
] as const;

export const footerNav = {
  company: [
    { href: "/", label: "Home" },
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
    { href: "/contact", label: "Book a call" },
  ],
} as const;

export const metrics = [
  { value: "50+", label: "Customers worldwide" },
  { value: "25+", label: "Skilled professionals" },
  { value: "2021", label: "Established" },
  { value: "2 tracks", label: "AI-driven or hand-crafted" },
] as const;
