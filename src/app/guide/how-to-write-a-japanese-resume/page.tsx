import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/guide/how-to-write-a-japanese-resume`;

export const metadata: Metadata = {
  title: "How to Write a Japanese Resume (履歴書) — Step-by-Step Guide",
  description:
    "Complete guide to writing a Japanese resume: rirekisho photo rules, date and era formats, 学歴・職歴 phrasing, licenses, self-PR (自己PR), and the 本人希望記入欄 — with a free online builder.",
  keywords: [
    "how to write a Japanese resume",
    "how to fill out rirekisho",
    "履歴書 書き方",
    "rirekisho guide",
    "Japanese resume format",
    "Japanese resume photo size",
    "学歴 職歴 書き方",
    "自己PR 履歴書",
    "Japanese resume for foreigners",
  ],
  alternates: { canonical: "/guide/how-to-write-a-japanese-resume" },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "How to Write a Japanese Resume", item: PAGE_URL },
        ],
      },
      {
        "@type": "Article",
        headline: "How to Write a Japanese Resume (履歴書): Step-by-Step Guide",
        description:
          "Section-by-section instructions for filling out a rirekisho — photo rules, date formats, education and work history phrasing, licenses, and self-PR.",
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

export default function HowToWriteGuide() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          How to Write a Japanese Resume
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            履歴書の書き方 — a step-by-step guide for foreigners and first-timers
          </span>
        </h1>

        <p className={P}>
          A Japanese resume (履歴書, <em>rirekisho</em>) is a fixed-format document — unlike a
          Western CV, you do not design it, you fill it in. Employers compare candidates on the
          same grid, so what matters is getting every section right. This guide walks through each
          field in the order it appears on the sheet. You can follow along in the{" "}
          <Link href="/editor" className="underline hover:text-primary">
            free online editor
          </Link>{" "}
          and download the finished PDF when you are done.
        </p>

        <h2 className={H2}>1. Basic information (氏名・生年月日・住所)</h2>
        <p className={P}>
          Write your name exactly as it appears on your residence card or passport, and add the
          reading in the ふりがな line above it (hiragana if the form says ふりがな, katakana if it
          says フリガナ). Dates can use either the Western calendar (西暦, e.g. 2026) or the
          Japanese era (令和) — but you must use the same system everywhere on the resume. Include
          the postal code (〒) with your address, and write the address out fully, down to the
          building and room number.
        </p>

        <h2 className={H2}>2. The photo (証明写真)</h2>
        <p className={P}>
          The standard rirekisho photo is 30×40 mm, taken within the last 3 months, front-facing
          against a plain white, blue, or grey background. Wear business attire — a dark suit is
          the safe default — and keep a neutral, slightly pleasant expression. Photo-booth
          (スピード写真) pictures are acceptable for most jobs. In ResumeJP the photo is
          automatically resized to fit the standard cell.
        </p>

        <h2 className={H2}>3. Education history (学歴)</h2>
        <p className={P}>
          Write 学歴 in the centre of the first row, then list schools in chronological order —
          oldest first. The usual starting point is graduation from junior high school or
          entrance to high school. Each school takes two rows: one for entrance (入学) and one for
          graduation (卒業). Write official school names in full — no abbreviations. Foreign
          schools are fine: add the country and write the school name in katakana or as-is with a
          short note.
        </p>

        <h2 className={H2}>4. Work history (職歴)</h2>
        <p className={P}>
          After education, skip one line, write 職歴 in the centre, and list each employer in
          order. The standard phrasing is 「株式会社○○ 入社」 when joining and
          「一身上の都合により退社」 (left for personal reasons) when leaving. If you are still
          employed, end with 「現在に至る」 on its own line, then 「以上」 right-aligned on the
          final line. Part-time work is normally omitted unless you are applying for arubaito or
          it is directly relevant.
        </p>

        <h2 className={H2}>5. Licenses & qualifications (免許・資格)</h2>
        <p className={P}>
          List qualifications in the order you obtained them, using official names: 「普通自動車
          第一種運転免許 取得」 for a driver&apos;s licence, 「日本語能力試験N2 合格」 for JLPT. For
          foreigners, JLPT level is often the first thing recruiters look for — put it in even if
          you are still at N3. Nothing to list? Write 「特になし」 rather than leaving it blank.
        </p>

        <h2 className={H2}>6. Self-PR & motivation (自己PR・志望動機)</h2>
        <p className={P}>
          This is the only free-form section, and the one hiring managers actually read. Write 3–4
          sentences in polite business Japanese: what you are good at, one concrete example or
          number that proves it, and why this company. Avoid generic lines like
          「頑張ります」. If writing natural keigo is the hard part, type your points in English
          and let the editor&apos;s translate feature rewrite them into business Japanese.
        </p>

        <h2 className={H2}>7. Commute, dependents, and the request field</h2>
        <p className={P}>
          通勤時間 is your one-way commute to this employer, rounded to 5 minutes. 扶養家族 counts
          dependents excluding your spouse. In the 本人希望記入欄 (personal requests), unless you
          have a hard constraint, the convention is a single line:
          「貴社の規定に従います。」 (I will follow company policy). Salary demands here are a
          common mistake — save them for the interview.
        </p>

        <h2 className={H2}>Common mistakes to avoid</h2>
        <ul className="mt-3 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed list-disc pl-5">
          <li>Mixing Western and Japanese era dates — pick one and use it everywhere.</li>
          <li>Abbreviating company or school names (㈱ instead of 株式会社).</li>
          <li>Leaving fields blank instead of writing 特になし.</li>
          <li>Reusing one resume for every company — tailor the 志望動機 each time.</li>
          <li>Submitting a photo older than 3 months or taken casually.</li>
          <li>Forgetting 以上 at the end of the work-history table.</li>
        </ul>

        <h2 className={H2}>Printing and submitting</h2>
        <p className={P}>
          The traditional rirekisho is printed on A3 paper folded once (so it opens like a book);
          A4 two-page printing is widely accepted now. Use plain white paper, never staple the
          pages, and put the resume in a clear file inside a white A4 envelope if submitting by
          hand or post. ResumeJP exports the PDF at the exact paper size of the{" "}
          <Link href="/templates" className="underline hover:text-primary">
            template you choose
          </Link>
          , so it prints to scale with no adjustment. Mid-career applicants usually pair the
          rirekisho with a 職務経歴書 —{" "}
          <Link href="/guide/rirekisho-vs-shokumukeirekisho" className="underline hover:text-primary">
            here is when you need both
          </Link>
          .
        </p>
      </article>
    </MarketingShell>
  );
}
