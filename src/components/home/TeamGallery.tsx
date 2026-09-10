import { Container, Section } from "@/components/ui/Container";

const tiles = [
  { title: "Studio", rotate: "-rotate-6", tone: "bg-[#d7efe9]" },
  { title: "Whiteboarding", rotate: "rotate-3", tone: "bg-[#e8e4ff]" },
  { title: "Pods", rotate: "-rotate-2", tone: "bg-[#f3e6c8]" },
  { title: "Reviews", rotate: "rotate-6", tone: "bg-[#dce8f5]" },
  { title: "Launch", rotate: "-rotate-3", tone: "bg-[#f0d9d6]" },
];

export function TeamGallery() {
  return (
    <Section className="overflow-hidden">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-navy/45">Team Gallery</p>
          <p className="mt-4 text-sm text-muted">25+ skilled professionals</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Let&apos;s build the future of work together
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Based at 144 G Block, DHA Phase 1, Lahore. Senior engineers who treat your product like our own.
          </p>
        </div>
        <div className="relative h-[380px]">
          {tiles.map((tile, index) => (
            <div
              key={tile.title}
              className={`absolute top-8 h-64 w-48 rounded-2xl border-8 border-white shadow-xl ${tile.tone} ${tile.rotate}`}
              style={{ left: `${index * 14}%` }}
            >
              <span className="absolute bottom-3 left-3 text-xs font-semibold text-navy/70">{tile.title}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
