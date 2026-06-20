import type { Metadata } from "next";
import Link from "next/link";
import { EditorialShell, Eyebrow } from "@/components/editorial/EditorialShell";
import { POSTS } from "@/lib/blog";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: "Blog — Japanese Resume & Part-Time Job Guides",
  description:
    "Practical, foreigner-aware guides to writing a Japanese resume and landing a part-time (arubaito) job: the 28-hour student work rule, rirekisho photo rules, 志望動機 and 本人希望記入欄 tips, and a phone script for applying.",
  keywords: [
    "Japanese resume blog",
    "arubaito guide",
    "rirekisho tips",
    "履歴書 書き方 ブログ",
    "part time job Japan guide",
    "foreigner working in Japan",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Japanese Resume & Part-Time Job Guides",
    description:
      "Practical guides for foreigners writing a rirekisho and applying for arubaito in Japan.",
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: PAGE_URL },
        ],
      },
      {
        "@type": "Blog",
        "@id": `${PAGE_URL}#blog`,
        name: "ResumeJP Blog",
        url: PAGE_URL,
        image: `${PAGE_URL}/opengraph-image`,
        description:
          "Guides to Japanese resumes (履歴書) and part-time (arubaito) job applications for foreigners in Japan.",
        publisher: { "@id": `${SITE_URL}/#org` },
        inLanguage: "en",
        blogPost: POSTS.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          url: `${SITE_URL}/blog/${p.slug}`,
          image: `${SITE_URL}/blog/${p.slug}/opengraph-image`,
          datePublished: p.date,
          dateModified: p.date,
          author: { "@type": "Organization", name: "ResumeJP" },
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

export default function BlogIndex() {
  return (
    <EditorialShell>
      <JsonLd />

      <header>
        <Eyebrow>ブログ · Field notes</Eyebrow>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-[var(--ink)]">
          Guides for the
          <br />
          Japanese job hunt
        </h1>
        <p className="mt-5 max-w-xl text-[0.95rem] sm:text-base leading-[1.75] text-[var(--ink-soft)]">
          Honest, foreigner-aware advice for writing a rirekisho (履歴書) and getting hired for
          part-time work (アルバイト) in Japan — the exact questions people search for right before
          they apply. Every guide links into the free{" "}
          <Link
            href="/editor"
            className="text-[var(--ink)] underline decoration-[var(--seal)] decoration-[1.5px] underline-offset-[3px] hover:text-[var(--seal)]"
          >
            resume editor
          </Link>
          .
        </p>
      </header>

      {/* Index — each guide is a ruled form row. */}
      <div className="mt-12 border-t border-[var(--rule)]">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group grid grid-cols-1 gap-1 border-b border-[var(--rule)] py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
          >
            <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-2 sm:pt-1">
              <span className="eyebrow text-[var(--seal)]">{p.category}</span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                {p.readingTime}
              </span>
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-[1.45rem] font-medium leading-snug tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--seal)]">
                {p.title}
              </h2>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--ink-soft)]">
                {p.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--ink)]">
                Read
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </EditorialShell>
  );
}
