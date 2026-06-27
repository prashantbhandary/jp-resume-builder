import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { CharacterCounter } from "@/components/tools/CharacterCounter";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/tools/self-pr-counter`;

export const metadata: Metadata = {
  title: "Self-PR Character Counter (自己PR 文字数) — Resume Text Length",
  description:
    "Free character counter for the 自己PR and 志望動機 sections of a Japanese resume. Count characters against a recommended target so your text fits the box. Works in your browser.",
  keywords: [
    "自己PR 文字数",
    "志望動機 文字数",
    "character counter Japanese",
    "自己PR 何文字",
    "Japanese resume word count",
  ],
  alternates: { canonical: "/tools/self-pr-counter" },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "Self-PR Counter", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Self-PR Character Counter",
        url: PAGE_URL,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        publisher: { "@id": `${SITE_URL}/#org` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

const H2 = "mt-10 text-xl sm:text-2xl font-semibold tracking-tight";
const P = "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed";

export default function SelfPrCounterPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Self-PR Character Counter
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            自己PR・志望動機 文字数カウント
          </span>
        </h1>
        <p className={P}>
          Paste or type your 自己PR or 志望動機 to count its length and check it against a
          recommended target, so it fills the box without overflowing it.
        </p>

        <div className="mt-6">
          <CharacterCounter />
        </div>

        <h2 className={H2}>How long should it be?</h2>
        <p className={P}>
          There is no official limit, but the box on a rirekisho is small and reviewers skim. As a
          guide, a 自己PR of roughly <strong>200–400 characters</strong> and a 志望動機 of about{" "}
          <strong>150–300 characters</strong> fit comfortably and stay focused. Aim to fill most of
          the space — a box that is nearly empty reads as low effort, and one that overflows looks
          cramped.
        </p>

        <h2 className={H2}>Make every character count</h2>
        <p className={P}>
          Because the space is tight, cut filler and lead with substance: one clear strength, one
          concrete proof, and why this company. For the full structure and editable examples, see{" "}
          <Link href="/blog/how-to-write-jiko-pr-self-pr" className="underline hover:text-primary">
            how to write your 自己PR
          </Link>{" "}
          and, for part-time roles, the{" "}
          <Link href="/arubaito-resume" className="underline hover:text-primary">
            志望動機 examples by job type
          </Link>
          .
        </p>

        <h2 className={H2}>Write it in the editor</h2>
        <p className={P}>
          When the wording is right, drop it into the{" "}
          <Link href="/editor" className="underline hover:text-primary">
            free editor
          </Link>{" "}
          — type in any language and convert it to natural business Japanese — then download a
          print-ready PDF. More{" "}
          <Link href="/tools" className="underline hover:text-primary">
            resume tools
          </Link>{" "}
          are here.
        </p>
      </article>
    </MarketingShell>
  );
}
