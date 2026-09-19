import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import {
  AiAgentScreen,
  BrowserFrame,
  CloudMapScreen,
  DashboardScreen,
  FinTechAppScreen,
  MvpStoryboard,
  PhoneFrame,
} from "@/components/ui/DeviceMockup";

const scenes = [
  {
    href: "/solutions/app-development",
    title: "Mobile apps",
    caption: "iOS and Android that feel native.",
    visual: (
      <div className="flex justify-center pt-4">
        <PhoneFrame className="scale-[0.72] origin-top">
          <FinTechAppScreen />
        </PhoneFrame>
      </div>
    ),
  },
  {
    href: "/solutions/web-platforms",
    title: "Web platforms",
    caption: "Dashboards operators can run all day.",
    visual: (
      <BrowserFrame url="ops.client.app">
        <div className="max-h-[260px] overflow-hidden">
          <DashboardScreen />
        </div>
      </BrowserFrame>
    ),
  },
  {
    href: "/solutions/ai-development",
    title: "AI in the product",
    caption: "Cited answers. Human gate on doubt.",
    visual: (
      <BrowserFrame url="assistant.client.app">
        <AiAgentScreen />
      </BrowserFrame>
    ),
  },
  {
    href: "/solutions/mvp-prototyping",
    title: "MVP in 14 days",
    caption: "Spec, build, launch — one board.",
    visual: (
      <BrowserFrame url="pilot.mzalogics.com">
        <MvpStoryboard />
      </BrowserFrame>
    ),
  },
  {
    href: "/solutions/cloud",
    title: "Cloud & SLA",
    caption: "Regions live. Rollback ready.",
    visual: (
      <BrowserFrame url="status.client.app">
        <CloudMapScreen />
      </BrowserFrame>
    ),
  },
];

/** Practices without a scene above — kept reachable from the homepage. */
const alsoPractices = [
  { href: "/solutions/product-design", title: "UI/UX design" },
  { href: "/solutions/cms", title: "CMS development" },
  { href: "/talent", title: "Hire our engineers" },
  { href: "/rescue", title: "Project rescue" },
];

export function Solutions() {
  return (
    <Section id="solutions" className="pt-10 pb-10 sm:pt-12 sm:pb-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
              What we can build for you
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Mobile apps, web platforms, AI features, MVPs, and the cloud they run on. Tap any one
              to see how we deliver it.
            </p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-base font-semibold text-navy"
          >
            All practices
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {scenes.map((scene, idx) => (
            <Link
              key={scene.href}
              href={scene.href}
              className={`group overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-sm transition hover:border-navy/25 hover:shadow-lg ${
                idx === 0 ? "lg:row-span-2" : ""
              }`}
            >
              {/* The mockups are the point on a wide screen. On a phone five
                  stacked frames cost ~2.5 screens of scroll and say nothing a
                  title does not, so the card collapses to a scannable row. */}
              <div
                className={`hidden overflow-hidden bg-paper lg:block ${
                  idx === 0 ? "min-h-[420px]" : "min-h-[220px]"
                }`}
              >
                {scene.visual}
              </div>
              <div className="flex items-center justify-between gap-4 p-5 lg:block lg:p-6">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-navy sm:text-xl">{scene.title}</h3>
                  <p className="mt-1 text-sm text-muted sm:text-base">{scene.caption}</p>
                </div>
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/5 text-navy transition-transform group-hover:translate-x-0.5 lg:hidden"
                  aria-hidden
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-navy">Also:</span>
          {alsoPractices.map((practice) => (
            <Link
              key={practice.href}
              href={practice.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-navy/25 hover:bg-paper"
            >
              {practice.title}
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
