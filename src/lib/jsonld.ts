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
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: site.email,
    telephone: site.phoneHref,
    description: site.description,
    sameAs: socials.map((social) => social.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.locations[0].address,
      addressLocality: site.locations[0].city,
      addressRegion: site.locations[0].region,
      postalCode: site.locations[0].postalCode,
      addressCountry: site.locations[0].country,
    },
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} — ${site.name}`,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    description: service.description,
    url: `${site.url}/solutions/${service.slug}`,
    areaServed: ["Worldwide", "United States", "United Kingdom", "United Arab Emirates", "Pakistan"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Plans`,
      itemListElement: [
        {
          "@type": "Offer",
          name: `${service.title} AI-Accelerated Track`,
          priceCurrency: "USD",
          price: "2150",
          description: "Rapid delivery pod powered by AI synthesis with senior architect review",
        },
        {
          "@type": "Offer",
          name: `${service.title} Hand-Crafted Track`,
          priceCurrency: "USD",
          price: "3250",
          description: "100% human-authored codebase with strict IP isolation and formal verification",
        },
      ],
    },
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
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function jobJsonLd() {
  return jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: "2026-09-01",
    validThrough: "2027-03-01",
    employmentType: job.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
    hiringOrganization: { "@type": "Organization", name: site.name, url: site.url },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locations[0].city,
        addressCountry: site.locations[0].country,
      },
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "Pakistan" },
    directApply: true,
    url: `${site.url}/careers`,
  }));
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: "MZA Logics Software Studio",
    url: site.url,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    image: `${site.url}/icon.svg`,
    url: site.url,
    email: site.email,
    telephone: site.phoneHref,
    priceRange: "$$ - $$$",
    description: site.description,
    foundingDate: site.founded,
    areaServed: ["Worldwide", "Pakistan", "United States", "United Kingdom", "United Arab Emirates"],
    sameAs: socials.map((social) => social.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.locations[0].address,
      addressLocality: site.locations[0].city,
      addressRegion: site.locations[0].region,
      postalCode: site.locations[0].postalCode,
      addressCountry: site.locations[0].country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
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
    worksFor: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}

/** One Offer per tier across both delivery tracks. */
export function pricingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${site.name} Engineering Plans`,
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
