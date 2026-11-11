/* eslint-disable @next/next/no-img-element -- same plain-img convention as the rest of the site */
import Link from "next/link";
import { BrowserFrame } from "@/components/ui/DeviceMockup";
import { caseStudies } from "@/content/case-studies";
import { resolveLocal } from "@/lib/media";
import { site } from "@/lib/site";

/**
 * The About hero's picture, until there are real studio photographs.
 *
 * It is built only from things we actually shipped — two live client sites
 * and one published app — so it says "this is the studio" without a stock
 * photo or a generated stand-in. Every piece links to its write-up.
 */
const pieces = {
  back: "laugh-factory",
  front: "grace-bay-resorts",
  app: "picsgen-ai-art-photo-editor",
} as const;

function piece(slug: string, hero = false) {
  const study = caseStudies.find((item) => item.slug === slug);
  const src = resolveLocal(`/media/work/${slug}${hero ? "-hero" : ""}.jpg`);
  if (!study || !src) return null;
  const host = study.siteUrl ? new URL(study.siteUrl).hostname.replace(/^www\./, "") : undefined;
  return { slug, src, title: study.title, host };
}

export function StudioBoard() {
  const back = piece(pieces.back);
  const front = piece(pieces.front);
  const app = piece(pieces.app, true);
  const storeApps = caseStudies.filter((study) => study.storeUrl).length;
  if (!back || !front) return null;

  return (
    <div className="night-panel relative aspect-[5/4] w-full overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(9,6,26,0.28)]">
      {/* Live client site, set back. */}
      <Link
        href={`/work/${back.slug}`}
        aria-label={`${back.title} — case study`}
        className="group absolute left-[6%] top-[9%] w-[66%] transition duration-500 hover:-translate-y-1"
      >
        <BrowserFrame url={back.host} className="border-white/10 [&>div:first-child]:py-1.5">
          <img src={back.src} alt={`${back.title} website, built by MZA Logics`} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
        </BrowserFrame>
      </Link>

      {/* Second live site, in front. */}
      <Link
        href={`/work/${front.slug}`}
        aria-label={`${front.title} — case study`}
        className="group absolute bottom-[8%] right-[5%] w-[62%] transition duration-500 hover:-translate-y-1"
      >
        <BrowserFrame url={front.host} className="border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] [&>div:first-child]:py-1.5">
          <img src={front.src} alt={`${front.title} website, built by MZA Logics`} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
        </BrowserFrame>
      </Link>

      {/* Published app, tilted on top. */}
      {app ? (
        <Link
          href={`/work/${app.slug}`}
          aria-label={`${app.title} — case study`}
          className="absolute right-[5%] top-[7%] hidden w-[34%] rotate-3 overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] transition duration-500 hover:rotate-0 sm:block"
        >
          <img src={app.src} alt={`${app.title} Android app, built by MZA Logics`} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
        </Link>
      ) : null}

      {/* Facts, as chips. */}
      <span className="animate-float absolute bottom-[30%] left-[4%] inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy/85 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur sm:text-xs">
        <span className="h-2 w-2 rounded-full bg-accent-2" aria-hidden />
        {storeApps} apps live on Google Play
      </span>
      <span className="absolute bottom-[5%] left-[5%] inline-flex items-center rounded-full bg-accent-2 px-3 py-1.5 text-[11px] font-bold text-navy shadow-[0_0_30px_-6px_rgba(0,245,160,0.7)] sm:text-xs">
        Lahore · since {site.founded}
      </span>
    </div>
  );
}
