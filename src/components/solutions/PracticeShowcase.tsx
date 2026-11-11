import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type PracticeShot = {
  href: string;
  src: string;
  title: string;
  alt: string;
};

/**
 * Real project stills for a practice hero.
 *
 * The old cover was one collage image: captions ran off the edge and the
 * screenshots sat on top of each other. These are the same projects, each
 * fully visible and openable.
 */
export function PracticeShowcase({
  shots,
  label,
}: {
  shots: PracticeShot[];
  label: string;
}) {
  const [lead, ...rest] = shots;
  if (!lead) return null;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-navy p-3 text-white shadow-[0_24px_60px_-28px_rgba(9,6,26,0.45)] sm:p-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px]"
        aria-hidden
      />
      <div className="relative mb-3 flex items-center justify-between gap-3 px-1">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          {label}
        </span>
        <span className="text-[11px] font-semibold text-white/65">Open a project</span>
      </div>

      <Link
        href={lead.href}
        className="group relative block overflow-hidden rounded-2xl bg-white text-navy"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lead.src}
          alt={lead.alt}
          className="aspect-[16/10] w-full object-cover object-top"
        />
        <span className="flex items-center justify-between gap-3 px-3.5 py-3 text-sm font-bold">
          <span className="min-w-0 truncate">{lead.title}</span>
          <ArrowUpRight size={16} aria-hidden className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>

      {rest.length > 0 ? (
        <div className="relative mt-3 grid grid-cols-2 gap-3">
          {rest.map((shot) => (
            <Link
              key={shot.href}
              href={shot.href}
              className="group relative block overflow-hidden rounded-2xl bg-white text-navy"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <span className="flex items-center justify-between gap-2 px-2.5 py-2 text-[12px] font-bold leading-tight">
                <span className="min-w-0 line-clamp-2">{shot.title}</span>
                <ArrowUpRight size={14} aria-hidden className="shrink-0" />
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
