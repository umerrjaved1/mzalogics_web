import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { CareersClient } from "./careers-client";
import { jobJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Careers",
  description: "Engineering, design, and delivery roles at MZA Logics.",
};

export default function CareersPage() {
  return (
    <>
      <JsonLd data={jobJsonLd()} />
      <CareersClient />
    </>
  );
}
