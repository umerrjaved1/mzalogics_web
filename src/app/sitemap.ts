import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { getInsights } from "@/lib/insights";
import { team } from "@/content/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/solutions",
    "/work",
    "/pricing",
    "/team",
    "/faq",
    "/talent",
    "/rescue",
    "/careers",
    "/insights",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const urls = [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    })),
    ...services.map((service) => ({
      url: `${site.url}/solutions/${service.slug}`,
      lastModified: new Date(),
    })),
    ...team.map((member) => ({
      url: `${site.url}/team/${member.slug}`,
      lastModified: new Date(),
    })),
    ...caseStudies.map((study) => ({
      url: `${site.url}/work/${study.slug}`,
      lastModified: new Date(),
    })),
    ...getInsights().map((post) => ({
      url: `${site.url}/insights/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];

  return urls;
}
