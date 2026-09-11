import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CareersClient } from "./careers-client";
import { jobJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Careers & Open Engineering Roles | Join Our Lahore Studio",
  description:
    "Open engineering, design, QA, and delivery roles at MZA Logics in Lahore. Work on production software and AI systems with senior engineers, clear review gates, and no bait-and-switch staffing.",
};

export default function CareersPage() {
  return (
    <>
      <JsonLd data={jobJsonLd()} />
      <CareersClient />
    </>
  );
}
