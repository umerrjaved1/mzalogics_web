import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CareersClient } from "./careers-client";
import { breadcrumbJsonLd, jobJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers & Open Engineering Roles | Join Our Lahore Studio",
  description:
    "Open engineering, design, QA, and delivery roles at MZA Logics in Lahore. Work on production software and AI systems with senior engineers, clear review gates, and no bait-and-switch staffing.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers at MZA Logics | Engineering Roles in Lahore",
    description:
      "Open engineering, design, QA, and delivery roles. Senior review, clear gates, no bait-and-switch staffing.",
    url: `${site.url}/careers`,
  },
};

export default function CareersPage() {
  return (
    <>
      <JsonLd data={jobJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
      <CareersClient />
    </>
  );
}
