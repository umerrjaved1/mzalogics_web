import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { JsonLd } from "@/components/JsonLd";
import { getInsight, getInsightSlugs } from "@/lib/insights";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

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
  return {
    title: `${post.meta.title} | Engineering Insights`,
    description: post.meta.description,
    authors: [{ name: post.meta.author }],
    alternates: {
      canonical: `/insights/${slug}`,
    },
    openGraph: {
      title: `${post.meta.title} | MZA Logics`,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author],
      url: `${site.url}/insights/${slug}`,
    },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.meta.title,
    description: post.meta.description,
    author: {
      "@type": "Person",
      name: post.meta.author,
    },
    datePublished: post.meta.date,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/insights/${slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: post.meta.title, path: `/insights/${slug}` },
        ])}
      />
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
    </>
  );
}
