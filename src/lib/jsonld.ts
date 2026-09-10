import type { Service } from "@/content/services";
import { site, socials } from "@/lib/site";
import { services } from "@/content/services";
import { homeFaqs } from "@/content/faqs";
import { jobs } from "@/content/jobs";
import { pricingTracks } from "@/content/pricing";
import type { TeamMember } from "@/content/team";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneHref,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.locations[0].address,
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} — ${site.name}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    description: service.description,
    url: `${site.url}/solutions/${service.slug}`,
  };
}

export function servicesJsonLd() {
  return services.map(serviceJsonLd);
}

export function faqJsonLd(items: { question: string; answer: string }[] = homeFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function jobJsonLd() {
  return jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    employmentType: job.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
    hiringOrganization: { "@type": "Organization", name: site.name, url: site.url },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "Pakistan" },
  }));
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneHref,
    description: site.description,
    foundingDate: site.founded,
    areaServed: "Worldwide",
    sameAs: socials.map((social) => social.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.locations[0].address,
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    openingHours: "Mo-Fr 09:00-18:00",
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

export function personJsonLd(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.focus,
    url: `${site.url}/team/${member.slug}`,
    knowsAbout: member.skills,
    worksFor: { "@type": "Organization", name: site.name, url: site.url },
  };
}

/** One Offer per tier across both delivery tracks. */
export function pricingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${site.name} plans`,
    url: `${site.url}/pricing`,
    itemListElement: pricingTracks.flatMap((track) =>
      track.tiers.map((tier) => ({
        "@type": "Offer",
        name: `${tier.name} — ${track.label}`,
        description: tier.tagline,
        priceCurrency: "USD",
        price: tier.price.replace(/[^0-9]/g, ""),
        url: `${site.url}/pricing`,
        category: track.label,
      })),
    ),
  };
}
