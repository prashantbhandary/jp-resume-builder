import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import {
  JIKO_PR_SITUATION,
  JIKO_PR_PROFESSION,
  SHIBO_FULLTIME,
  type Example,
} from "@/lib/examples";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/examples`;

export const metadata: Metadata = {
  title: "自己PR・志望動機 Examples (例文) — Japanese Resume Samples",
  description:
    "Free 自己PR (self-PR) and 志望動機 (motivation) examples for a Japanese resume, by situation (new-grad, career change) and profession (sales, office, IT, retail, care). Natural keigo with English translations.",
  keywords: [
    "自己PR 例文",
    "志望動機 例文",
    "Japanese resume examples",
    "履歴書 例文 職種別",
    "self PR examples Japan",
    "志望動機 書き方 例",
  ],
  alternates: { canonical: "/examples" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "自己PR・志望動機 Examples (例文)",
    description:
      "Editable self-PR and motivation examples by situation and profession, with English translations.",
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
          { "@type": "ListItem", position: 2, name: "Examples", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How long should a 自己PR be?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Around 200–400 characters fits the rirekisho box comfortably. Lead with one clear strength, give one concrete proof, and link it to the job.",
            },
          },
          {
            "@type": "Question",
            name: "Can I copy these examples directly?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use them as a starting point, but change the specifics — the company name, your own example or number, and why this employer. Reviewers can spot a template used word-for-word.",
            },
          },
        ],
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

const H2 = "mt-12 text-xl sm:text-2xl font-semibold tracking-tight";
const P = "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed";

function ExampleCards({ items }: { items: Example[] }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {items.map((ex) => (
        <div key={ex.label} className="rounded-2xl border bg-white p-5">
          <p className="text-sm font-semibold">{ex.label}</p>
          <p className="mt-2 font-jp text-sm leading-relaxed text-foreground">{ex.jp}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ex.en}</p>
        </div>
      ))}
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export default function ExamplesPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          自己PR &amp; 志望動機 Examples
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            例文集 — editable samples with English translations
          </span>
        </h1>
        <p className={P}>
          The two free-form fields — 自己PR (self-PR) and 志望動機 (motivation) — are where most
          applicants get stuck, especially if Japanese is not your first language. Below are
          ready-to-edit examples in natural business Japanese, each with an English translation so you
          know exactly what you are writing. Pick the closest one and change the specifics. Looking
          for part-time samples?{" "}
          <Link href="/arubaito-resume" className="underline hover:text-primary">
            See 志望動機 by job type
          </Link>
          .
        </p>

        <h2 className={H2}>自己PR by situation</h2>
        <p className={P}>
          Use the &ldquo;strength → proof → relevance&rdquo; structure: state one strength, back it
          with a concrete example or number, then link it to the role.
        </p>
        <ExampleCards items={JIKO_PR_SITUATION} />

        <h2 className={H2}>自己PR by profession</h2>
        <ExampleCards items={JIKO_PR_PROFESSION} />
        <Note>
          Replace the example or number in each with your own — that single specific detail is what
          makes a 自己PR feel real rather than generic. Full structure:{" "}
          <Link
            href="/blog/how-to-write-jiko-pr-self-pr"
            className="underline hover:text-primary"
          >
            how to write your 自己PR
          </Link>
          .
        </Note>

        <h2 className={H2}>志望動機 (full-time) by situation</h2>
        <p className={P}>
          The ◯◯ marks are blanks to fill with the company, the specific work, or your own
          experience. Always name something concrete about <em>this</em> employer.
        </p>
        <ExampleCards items={SHIBO_FULLTIME} />

        <h2 className={H2}>Write it in natural Japanese, in any language</h2>
        <p className={P}>
          Here is the part other resume sites cannot do: in ResumeJP you can write your points in
          English, Nepali, or another language and convert them to polished business Japanese in one
          click. Get the <em>content</em> right first, then let the tool handle the keigo. Try it in
          the{" "}
          <Link href="/editor" className="underline hover:text-primary">
            free editor
          </Link>
          , count your length with the{" "}
          <Link href="/tools/self-pr-counter" className="underline hover:text-primary">
            character counter
          </Link>
          , and download a print-ready PDF.
        </p>
      </article>
    </MarketingShell>
  );
}
