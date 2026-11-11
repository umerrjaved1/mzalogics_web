import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { team, teamPreviousEmployers } from "@/content/team";
import { teamPhotos } from "@/lib/media";

/**
 * The faces behind the work.
 *
 * Template agency sites borrow warmth from stock photos. We use the people a
 * client will actually meet. A portrait shows once /media/team/{slug}.jpg is
 * on disk; until then it is initials, never a stand-in face.
 */
export function TeamStrip() {
  const people = team;
  const previously = teamPreviousEmployers();
  const photos = teamPhotos(people.map((member) => member.slug));

  return (
    <Section id="people" className="section-tint pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal className="max-w-2xl">
            <Eyebrow>The people</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              The people you will actually work with
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              A small senior team in Lahore. The people you meet on the call are the ones who build
              it.
              {previously.length > 0 ? ` Our engineers have previously worked at ${previously.join(", ")}.` : ""}
            </p>
          </Reveal>
          <Link
            href="/team"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy"
          >
            Meet the whole team
            <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
          {people.map((member, index) => (
            <li key={member.slug}>
              <Reveal delay={Math.min(index * 0.05, 0.25)}>
              <Link href={`/team/${member.slug}`} className="group flex flex-col items-center text-center">
                <Avatar
                  initials={member.initials}
                  tone={member.tone}
                  local={photos[member.slug]}
                  alt={`${member.name}, ${member.role}`}
                  size="xl"
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
                <span className="mt-4 text-sm font-bold text-navy group-hover:underline">{member.name}</span>
                <span className="mt-1 text-xs leading-snug text-muted">{member.role}</span>
              </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
