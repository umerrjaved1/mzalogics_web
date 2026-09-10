import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { getInsight, getInsightSlugs } from "@/lib/insights";

export function generateStaticParams() {
  return getInsightSlugs().map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.description };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();

  return (
    <Section>
      <Container className="max-w-3xl">
        <Eyebrow>
          {post.meta.category} · {post.meta.date}
        </Eyebrow>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{post.meta.title}</h1>
        <p className="mt-3 text-sm text-muted">
          {post.meta.author} · {post.meta.minutes} min read
        </p>
        <div className="insight-body mt-10 space-y-4 text-[15px] leading-7 text-muted [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
          {post.mdx}
        </div>
      </Container>
    </Section>
  );
}
