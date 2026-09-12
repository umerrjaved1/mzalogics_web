import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { getInsights } from "@/lib/insights";

import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Engineering Insights & Articles | Production Software & AI Architecture",
  description:
    "Practical architectural notes from our software engineering pods on enterprise delivery, production AI, mobile performance, and scalable systems.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Engineering Insights & Articles | MZA Logics",
    description:
      "Field notes on enterprise delivery, production AI, and software architecture from MZA Logics.",
    url: `${site.url}/insights`,
  },
};

export default function InsightsPage() {
  const posts = getInsights();

  return (
    <Section className="dot-grid">
      <Container>
        <Eyebrow>Insights</Eyebrow>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
          Software that has to survive Monday
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Field notes from delivery: how we scope, ship, and rescue production systems.
        </p>
        <div className="mt-12 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              className="block rounded-3xl border border-line bg-white p-6 hover:border-navy"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {post.category} · {post.date} · {post.minutes} min
              </p>
              <h2 className="mt-2 text-xl font-semibold text-navy">{post.title}</h2>
              <p className="mt-2 text-sm text-muted">{post.description}</p>
              <p className="mt-3 text-xs text-muted">By {post.author}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
