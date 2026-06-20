import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialShell, Eyebrow } from "@/components/editorial/EditorialShell";
import { POSTS, getPost } from "@/lib/blog";

const SITE_URL = "https://www.resumejp.com";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.cardTitle,
      description: post.description,
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return null;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.cardTitle, item: url },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url,
        image: `${url}/opengraph-image`,
        mainEntityOfPage: url,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en",
        author: { "@type": "Organization", name: "ResumeJP", url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#org` },
        keywords: post.keywords.join(", "),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const { Body } = post;

  return (
    <EditorialShell>
      <JsonLd slug={slug} />

      <Link
        href="/blog"
        className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--ink-soft)] hover:text-[var(--seal)]"
      >
        ← All guides
      </Link>

      <article className="mt-6">
        <Eyebrow>
          {post.category} · {post.readingTime}
        </Eyebrow>
        <h1 className="mt-4 font-display text-[1.95rem] sm:text-[2.6rem] font-medium leading-[1.12] tracking-tight text-[var(--ink)]">
          {post.title}
        </h1>
        <p className="mt-5 border-l-2 border-[var(--seal)] pl-4 text-[0.98rem] sm:text-[1.08rem] leading-[1.7] text-[var(--ink-soft)]">
          {post.description}
        </p>

        <div className="editorial-prose mt-8 pl-5 sm:pl-7">
          <Body />
        </div>
      </article>

      {/* Continue reading — ruled cells. */}
      <section className="mt-16 border-t border-[var(--rule)] pt-8">
        <Eyebrow>Keep reading</Eyebrow>
        <div className="mt-5 grid gap-px overflow-hidden border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-3">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex min-h-[7rem] flex-col justify-between bg-[var(--cell)] p-4 transition-colors hover:bg-[var(--paper)]"
            >
              <span className="eyebrow text-[var(--seal)]">{p.category}</span>
              <span className="mt-3 font-display text-[0.98rem] leading-snug text-[var(--ink)] group-hover:text-[var(--seal)]">
                {p.cardTitle}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </EditorialShell>
  );
}
