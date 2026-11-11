import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame, CloudMapScreen, MvpStoryboard } from "@/components/ui/DeviceMockup";

const scenes = [
  {
    href: "/solutions/app-development",
    title: "Mobile apps",
    caption: "35 of our apps are live on Google Play.",
    // eslint-disable-next-line @next/next/no-img-element -- same plain-img convention as the rest of the site
    visual: <img src="/media/work/arabic-keyboard.jpg" loading="lazy" decoding="async" alt="Arabic Keyboard app for Android, built by MZA Logics" className="aspect-video w-full bg-[#f4f6f8] object-contain object-center" />,
  },
  {
    href: "/solutions/web-platforms",
    title: "Web platforms",
    caption: "Dashboards and stores your team runs all day.",
    // eslint-disable-next-line @next/next/no-img-element -- same plain-img convention as the rest of the site
    visual: <img src="/media/work/afzalmart.jpg" loading="lazy" decoding="async" alt="Afzalmart Shopify store, built by MZA Logics" className="aspect-video w-full bg-[#f4f6f8] object-contain object-center" />,
  },
  {
    href: "/solutions/ai-development",
    title: "AI in the product",
    caption: "Answers with citations, a human on doubt.",
    // eslint-disable-next-line @next/next/no-img-element -- same plain-img convention as the rest of the site
    visual: <img src="/media/work/picsgen-ai-art-photo-editor.jpg" loading="lazy" decoding="async" alt="PicsGen AI photo editor app, built by MZA Logics" className="aspect-video w-full bg-[#f4f6f8] object-contain object-center" />,
  },
  {
    href: "/solutions/mvp-prototyping",
    title: "MVP in 2–4 weeks",
    caption: "Spec, build, launch — one fixed price.",
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

export function Solutions() {
  return (
    <Section id="solutions" className="section-tint pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Apps, platforms, and AI — shipped in weeks
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Mobile apps, web platforms, AI features, MVPs, and the cloud they run on. Open any one
              to see what you get, how long it takes, and what it costs.
            </p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-base font-semibold text-navy"
          >
            All practices
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </Reveal>

        {/* Two wide cards, then three: five practices fill the grid with no
            orphan left hanging in a half-empty row. */}
        <div className="mt-10 grid gap-5 lg:grid-cols-6">
          {scenes.map((scene, idx) => (
            <Reveal
              key={scene.href}
              delay={Math.min(idx * 0.07, 0.28)}
              className={idx < 2 ? "lg:col-span-3" : "lg:col-span-2"}
            >
            <Link
              href={scene.href}
              className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-[0_18px_40px_rgba(9,6,26,0.10)]"
            >
              <div className="media-zoom bg-paper">{scene.visual}</div>
              <div className="flex flex-1 items-center justify-between gap-4 p-5 lg:p-6">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-navy sm:text-xl">{scene.title}</h3>
                  <p className="mt-1 text-sm text-muted sm:text-base">{scene.caption}</p>
                </div>
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/5 text-navy transition duration-300 group-hover:bg-navy group-hover:text-white"
                  aria-hidden
                >
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>


      </Container>
    </Section>
  );
}
