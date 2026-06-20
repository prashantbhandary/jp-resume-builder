import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/guide/rirekisho-vs-shokumukeirekisho`;

export const metadata: Metadata = {
  title: "Rirekisho vs Shokumukeirekisho — 履歴書 and 職務経歴書 Explained",
  description:
    "What is the difference between a 履歴書 (rirekisho) and a 職務経歴書 (shokumukeirekisho)? When Japanese employers expect each document, what goes in them, and how to create both for free.",
  keywords: [
    "rirekisho vs shokumukeirekisho",
    "履歴書 職務経歴書 違い",
    "shokumukeirekisho in English",
    "Japanese work history document",
    "職務経歴書 書き方",
    "Japanese job application documents",
    "rirekisho meaning",
  ],
  alternates: { canonical: "/guide/rirekisho-vs-shokumukeirekisho" },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Rirekisho vs Shokumukeirekisho", item: PAGE_URL },
        ],
      },
      {
        "@type": "Article",
        headline: "Rirekisho vs Shokumukeirekisho: Japan's Two Job-Application Documents",
        description:
          "The difference between the fixed-format 履歴書 and the free-form 職務経歴書, when each is required, and how to write both.",
        url: PAGE_URL,
        image: `${PAGE_URL}/opengraph-image`,
        author: { "@type": "Organization", name: "ResumeJP" },
        publisher: { "@type": "Organization", name: "ResumeJP" },
        inLanguage: "en",
        mainEntityOfPage: PAGE_URL,
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

const H2 = "mt-10 text-xl sm:text-2xl font-semibold tracking-tight";
const P = "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed";

const ROWS: [string, string, string][] = [
  ["Purpose", "Who you are — a standardised personal profile", "What you can do — a sales document for your experience"],
  ["Format", "Fixed grid: every applicant uses the same cells", "Free-form: you choose structure and emphasis"],
  ["Length", "1 sheet (A3 folded or two A4 pages)", "1–2 A4 pages, typed"],
  ["Photo", "Required (30×40 mm)", "Not included"],
  ["Content", "Education, work timeline, licenses, brief self-PR", "Detailed duties, projects, skills, achievements with numbers"],
  ["Handwriting", "Traditionally accepted, typed is now normal", "Always typed"],
  ["Who needs it", "Every application — full-time, part-time, dispatch", "Mid-career (転職) applications; rarely for new grads or arubaito"],
];

export default function ComparisonGuide() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Rirekisho vs Shokumukeirekisho
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            履歴書 and 職務経歴書 — what&apos;s the difference, and when do you need both?
          </span>
        </h1>

        <p className={P}>
          Job applications in Japan revolve around two documents. The <strong className="text-foreground">履歴書
          (rirekisho)</strong> is a fixed-format resume: a standardised grid with your photo,
          education, and employment timeline. The <strong className="text-foreground">職務経歴書
          (shokumukeirekisho)</strong> is a free-form work-history sheet where you describe what
          you actually did in each role — projects, responsibilities, results. A Western
          &ldquo;resume&rdquo; or &ldquo;CV&rdquo; sits somewhere between the two, which is
          exactly why first-time applicants in
          Japan get confused.
        </p>

        <h2 className={H2}>Side by side</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-zinc-50 text-left">
                <th className="p-3 font-medium"></th>
                <th className="p-3 font-medium">履歴書 Rirekisho</th>
                <th className="p-3 font-medium">職務経歴書 Shokumukeirekisho</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, a, b]) => (
                <tr key={label} className="border-b last:border-0 align-top">
                  <td className="p-3 font-medium whitespace-nowrap">{label}</td>
                  <td className="p-3 text-muted-foreground">{a}</td>
                  <td className="p-3 text-muted-foreground">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={H2}>When do you need both?</h2>
        <p className={P}>
          <strong className="text-foreground">Changing jobs (転職):</strong> almost always both.
          Recruiters screen the rirekisho for basics and the shokumukeirekisho for substance — if
          a mid-career posting doesn&apos;t mention documents, assume both are expected.
        </p>
        <p className={P}>
          <strong className="text-foreground">New graduates (新卒):</strong> usually only the
          rirekisho (or the company&apos;s own entry sheet), since there is no career history to detail.
        </p>
        <p className={P}>
          <strong className="text-foreground">Part-time, arubaito, and dispatch:</strong> the
          rirekisho alone is standard. Dispatch agencies often use their own registration sheet on
          top.
        </p>
        <p className={P}>
          <strong className="text-foreground">Foreign and global companies in Japan:</strong> many
          accept an English CV instead — but HR departments frequently still ask for a Japanese
          rirekisho at the offer stage, so having one ready never hurts.
        </p>

        <h2 className={H2}>Three formats of the 職務経歴書</h2>
        <ul className="mt-3 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed list-disc pl-5">
          <li>
            <strong className="text-foreground">逆編年体 (reverse-chronological)</strong> — newest
            role first. The default for tech and most experienced hires.
          </li>
          <li>
            <strong className="text-foreground">編年体 (chronological)</strong> — oldest first,
            showing steady progression. Preferred in traditional industries.
          </li>
          <li>
            <strong className="text-foreground">キャリア形式 (functional)</strong> — grouped by
            skill area rather than employer. Useful for freelancers and career gaps.
          </li>
        </ul>

        <h2 className={H2}>Create both in one place</h2>
        <p className={P}>
          ResumeJP builds the fixed-format rirekisho from{" "}
          <Link href="/templates" className="underline hover:text-primary">
            JIS, MHLW, new-grad, part-time, and English CV templates
          </Link>{" "}
          and supports the work-history formats above — type in any language and export
          print-ready PDFs for free. If you are filling one in for the first time, start with the{" "}
          <Link href="/guide/how-to-write-a-japanese-resume" className="underline hover:text-primary">
            step-by-step 履歴書 writing guide
          </Link>
          .
        </p>
      </article>
    </MarketingShell>
  );
}
