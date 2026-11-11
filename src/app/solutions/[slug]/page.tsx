import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDisc, Button } from "@/components/ui/Button";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { AiPractice } from "@/components/AiPractice";
import { Faq } from "@/components/Faq";
import { aiFaqs } from "@/content/faqs";
import { getService, services } from "@/content/services";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { serviceCovers } from "@/content/visuals";
import { MediaImg } from "@/components/ui/MediaImg";
import { ServiceScene } from "@/components/ui/DeviceMockup";
import { TrustPoints } from "@/components/conversion/TrustPoints";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { resolveLocal } from "@/lib/media";
import { ArrowUpRight, Check } from "lucide-react";
import { PracticeShowcase } from "@/components/solutions/PracticeShowcase";
import { CaseStudyCover } from "@/components/ui/CaseStudyCover";

/** Which published work best proves each practice. Numbers come from the
 *  case-studies content itself, so the claim never drifts from the data. */
const proofFilter: Record<string, (study: CaseStudy) => boolean> = {
  "app-development": (study) => Boolean(study.storeUrl),
  "ai-development": (study) => study.industry === "AI & photo",
  "web-platforms": (study) => Boolean(study.siteUrl) || study.stack.includes("WordPress"),
  cms: (study) => study.stack.includes("WordPress"),
  "mvp-prototyping": (study) => Boolean(study.storeUrl),
};

/** The strongest projects for each practice, in the order they should show.
 *  Hand-picked rather than "first N matches", which surfaced minor utilities.
 *  Maintenance & DevOps has none on purpose: no case study documents ops work. */
const topProjects: Record<string, string[]> = {
  "app-development": [
    "flight-tracker",
    "picsgen-ai-art-photo-editor",
    "live-earth-map",
    "translate-all",
    "screen-mirroring-tv",
    "wallbox-live-wallpapers",
  ],
  "ai-development": [
    "picsgen-ai-art-photo-editor",
    "pixnova-ai-photo-editor",
    "ai-voice-changer",
    "beauty-cam-ai-generation",
    "aspireai-art-video-generator",
    "inro",
  ],
  "web-platforms": [
    "real-chemistry",
    "logisnext-americas",
    "laugh-factory",
    "grace-bay-resorts",
    "sellio",
    "voice-actor-studio",
  ],
  "product-design": [
    "grace-bay-resorts",
    "laugh-factory",
    "picsgen-ai-art-photo-editor",
    "afzalmart",
    "wallbox-live-wallpapers",
    "glore-sense",
  ],
  "mvp-prototyping": ["sellio", "inro", "digsup", "voice-actor-studio", "flight-tracker", "translate-all"],
  cms: [
    "ecommerce-data-aggregator",
    "caredox",
    "ic-legal",
    "educon-international",
    "marqon",
    "dynamic-growth",
  ],
};

const topHeadings: Record<string, string> = {
  "app-development": "Top apps we have shipped",
  "ai-development": "Top AI products we have shipped",
  "web-platforms": "Top web platforms we have built",
  "product-design": "Top products we have designed and built",
  "mvp-prototyping": "Products we took from idea to launch",
  cms: "Top CMS sites we have built",
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} — fixed scope & price`,
    description: service.summary,
    alternates: {
      canonical: `/solutions/${slug}`,
    },
    openGraph: {
      title: `${service.title} | ${site.name}`,
      description: service.summary,
      url: `${site.url}/solutions/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const isAi = service.slug === "ai-development";

  const filter = proofFilter[service.slug];
  const matches = filter ? caseStudies.filter(filter) : [];
  const picked = (topProjects[service.slug] ?? [])
    .map((projectSlug) => caseStudies.find((study) => study.slug === projectSlug))
    .filter((study): study is CaseStudy => Boolean(study));
  const proof = picked.length > 0 ? picked : matches.slice(0, 6);
  const proofTotal = matches.length;
  const showcase = proof.flatMap((study) => {
    const src = resolveLocal(`/media/work/${study.slug}.jpg`);
    if (!src) return [];
    return [{ href: `/work/${study.slug}`, src, title: study.title, alt: `${study.title} — ${study.summary}` }];
  }).slice(0, 3);
  const cover = serviceCovers[service.slug] ?? serviceCovers["web-platforms"];
  const coverSrc = resolveLocal(cover.local);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: service.title, path: `/solutions/${service.slug}` },
        ])}
      />
      <Section className="dot-grid">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Eyebrow>
                {service.number} · Solutions
              </Eyebrow>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">{service.title}</h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{service.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-semibold text-navy">
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="mt-6 space-y-2.5 text-base text-navy">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2.5">
                    <Check size={16} strokeWidth={3} aria-hidden className="mt-1 shrink-0 text-emerald-700" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              <Button href="/contact" className="mt-8">
                Get a written scope
                <ArrowDisc />
              </Button>
              <TrustPoints layout="grid" className="mt-6" />
            </div>
            {showcase.length > 0 ? (
              <PracticeShowcase
                shots={showcase}
                label={service.slug === "app-development" && proofTotal > 0 ? `${proofTotal} on Google Play` : "Published work"}
              />
            ) : (
            <div className="overflow-hidden rounded-[28px] border border-black/8 bg-paper shadow-lg">
              {coverSrc ? (
                <MediaImg
                  local={coverSrc}
                  fallback={coverSrc}
                  alt=""
                  fit="contain"
                  className="h-64 w-full sm:h-[360px]"
                />
              ) : (
                <div className="h-64 sm:h-[360px]">
                  <ServiceScene slug={service.slug} />
                </div>
              )}
            </div>
            )}
          </div>
        </Container>
      </Section>
      {proof.length > 0 ? (
        <Section className="pt-4 pb-12 sm:pt-6 sm:pb-16">
          <Container>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <Eyebrow>Top projects</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {topHeadings[service.slug] ?? "Projects we have shipped"}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  {service.slug === "app-development"
                    ? `${proofTotal} of our apps are live on Google Play. These are the ones to open first.`
                    : "Real, published projects. Open one for the details."}
                </p>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-base font-semibold text-navy shadow-sm"
              >
                All work
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 reveal-kids">
              {proof.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-[0_18px_40px_rgba(9,6,26,0.10)]"
                >
                  <CaseStudyCover
                    industry={study.industry}
                    title={study.title}
                    local={resolveLocal(`/media/work/${study.slug}.jpg`)}
                    compact
                    className="aspect-video w-full"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-navy">{study.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{study.summary}</p>
                    <p className="mt-auto pt-4 text-sm font-semibold text-navy">
                      {study.storeUrl ? "On Google Play" : study.siteUrl ? "Live site" : "Case study"}{" "}
                      <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
      {isAi ? (
        <>
          <AiPractice />
          <Faq items={aiFaqs} />
        </>
      ) : null}
      <CtaBand />
    </>
  );
}
