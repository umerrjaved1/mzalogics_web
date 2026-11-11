import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { WorkCatalog, type WorkCard } from "@/components/work/WorkCatalog";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { site } from "@/lib/site";
import { resolveLocal } from "@/lib/media";

const clientLead = [
  "laugh-factory",
  "grace-bay-resorts",
  "real-chemistry",
  "logisnext-americas",
  "unicarriers",
  "inro",
  "digsup",
  "afzalmart",
  "sellio",
  "tempura-food-usa",
  "voice-actor-studio",
];

function leadFirst<T extends { slug: string }>(items: T[], lead: string[]) {
  const rank = new Map(lead.map((slug, index) => [slug, index]));
  return [...items].sort((a, b) => (rank.get(a.slug) ?? lead.length) - (rank.get(b.slug) ?? lead.length));
}

const androidApps = caseStudies.filter((study) => study.storeUrl && study.industry !== "AI & photo");
const aiApps = caseStudies.filter((study) => study.storeUrl && study.industry === "AI & photo");
const clientSites = leadFirst(
  caseStudies.filter((study) => !study.storeUrl),
  clientLead,
);

function toCard(study: CaseStudy, kind: WorkCard["kind"]): WorkCard {
  return {
    slug: study.slug,
    industry: study.industry,
    title: study.title,
    summary: study.summary,
    label: study.storeUrl ? "Google Play" : study.siteUrl ? "Live site" : study.stack[0],
    image: resolveLocal(`/media/work/${study.slug}.jpg`),
    kind,
  };
}

const catalog: WorkCard[] = [
  ...clientSites.map((study) => toCard(study, "website")),
  ...aiApps.map((study) => toCard(study, "app")),
  ...androidApps.map((study) => toCard(study, "app")),
];

export const metadata: Metadata = {
  title: "Work: Published Apps & Live Client Sites",
  description: `${androidApps.length + aiApps.length} Android apps live on Google Play, plus live client sites. Open any project for the details and the live link.`,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work: Published Apps & Live Client Sites | MZA Logics",
    description:
      "Published Android apps and live client sites.",
    url: `${site.url}/work`,
  },
};

export default function WorkPage() {
  return (
    <>
      <Section className="pb-8 sm:pb-8">
        <Container>
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Published work you can check
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {androidApps.length + aiApps.length} Android apps live on Google Play, plus live client
            sites. Open a project for the short note and, where it exists, the live link.
          </p>
        </Container>
      </Section>
      <Section className="pt-0 sm:pt-0 pb-8 sm:pb-10">
        <Container>
          <WorkCatalog items={catalog} />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
