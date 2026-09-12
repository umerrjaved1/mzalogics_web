import { Container, Section } from "@/components/ui/Container";
import { studioPhotos } from "@/content/visuals";
import { MediaImg } from "@/components/ui/MediaImg";
import { resolveLocal } from "@/lib/media";

function StudioTile({
  local,
  alt,
  title,
  className,
}: {
  local: string;
  alt: string;
  title: string;
  className?: string;
}) {
  const src = resolveLocal(local);
  return (
    <div className={className}>
      {src ? (
        <MediaImg local={src} fallback={src} alt={alt} className="h-full w-full" />
      ) : (
        <div className="grid h-full min-h-40 place-items-center bg-navy text-sm font-semibold text-white/80">{title}</div>
      )}
    </div>
  );
}

export function TeamGallery() {
  return (
    <Section className="overflow-hidden">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Studio</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Built in DHA, shipped worldwide
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            144 G Block, DHA Phase 1, Lahore. Senior engineers who treat your product like our own.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {studioPhotos.slice(0, 4).map((tile) => (
            <div key={tile.title} className="overflow-hidden rounded-2xl border-4 border-white shadow-md">
              <StudioTile local={tile.local} alt={tile.alt} title={tile.title} className="h-40" />
              <span className="block bg-navy px-3 py-2 text-sm font-semibold text-white">{tile.title}</span>
            </div>
          ))}
        </div>
        <div className="relative hidden h-[400px] lg:block">
          {studioPhotos.map((tile, index) => (
            <div
              key={tile.title}
              className={`absolute top-6 h-64 w-44 overflow-hidden rounded-2xl border-8 border-white shadow-xl ${tile.rotate}`}
              style={{ left: `${index * 14}%` }}
            >
              <StudioTile local={tile.local} alt={tile.alt} title={tile.title} className="h-full" />
              <span className="absolute inset-x-0 bottom-0 bg-navy/70 px-3 py-2 text-sm font-semibold text-white">
                {tile.title}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
