import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

export type InsightMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  minutes: number;
};

const insightsDir = path.join(process.cwd(), "src/content/insights");

export function getInsightSlugs() {
  if (!fs.existsSync(insightsDir)) return [];
  return fs.readdirSync(insightsDir).filter((file) => file.endsWith(".mdx"));
}

export function getInsights(): InsightMeta[] {
  return getInsightSlugs()
    .map((file) => {
      const raw = fs.readFileSync(path.join(insightsDir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title),
        description: String(data.description),
        date: String(data.date),
        category: String(data.category),
        author: String(data.author),
        minutes: Number(data.minutes ?? 4),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getInsight(slug: string) {
  const file = path.join(insightsDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  const { content: mdx } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  });
  return {
    mdx,
    meta: {
      slug,
      title: String(data.title),
      description: String(data.description),
      date: String(data.date),
      category: String(data.category),
      author: String(data.author),
      minutes: Number(data.minutes ?? 4),
    } satisfies InsightMeta,
  };
}
