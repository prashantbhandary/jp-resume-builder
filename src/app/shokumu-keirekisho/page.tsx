import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/shokumu-keirekisho`;

export const metadata: Metadata = {
  title: "職務経歴書 Templates & How to Write One (Work-History Sheet)",
  description:
    "Free guide to the 職務経歴書 (Japanese work-history sheet): the three layout formats (編年式, 逆編年式, キャリア式), what to write by profession, and how to build one alongside your rirekisho.",
  keywords: [
    "職務経歴書 テンプレート",
    "職務経歴書 書き方",
    "shokumukeirekisho template",
    "work history sheet Japan",
    "職務経歴書 フォーマット 職種別",
    "Japanese career history document",
  ],
  alternates: { canonical: "/shokumu-keirekisho" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "職務経歴書 Templates & How to Write One",
    description:
      "The three 職務経歴書 formats, what to write by profession, and how to build one for free.",
  },
};

const FORMATS = [
  {
    name: "編年式 (Chronological)",
    body: "Lists your jobs oldest-first. The most common and easiest to read — best for steady careers with clear progression.",
  },
  {
    name: "逆編年式 (Reverse-chronological)",
    body: "Lists your most recent role first. Good when your latest job is the most relevant and you want it seen immediately.",
  },
  {
    name: "キャリア式 (Functional)",
    body: "Groups your experience by skill or project rather than by date. Best for specialists, career changers, or anyone with varied or non-linear experience.",
  },
];

const BY_PROFESSION = [
  {
    name: "営業 (Sales)",
    body: "Lead with numbers: targets, achievement rate, territory, client size, and named results. Quantify everything you can.",
  },
  {
    name: "事務・管理 (Office / admin)",
    body: "Emphasise accuracy, the systems and software you used, process improvements, and the scope of work you handled reliably.",
  },
  {
    name: "IT・エンジニア (IT / engineer)",
    body: "Include a skills table — languages, frameworks, tools — plus project scale, your role, and the impact (performance, bugs, users).",
  },
  {
    name: "販売・接客 (Retail / service)",
    body: "Show sales figures, customer-satisfaction results, staff training or shift leadership, and any store-level improvements.",
  },
  {
    name: "製造・技術 (Manufacturing / technical)",
    body: "List equipment and processes operated, certifications, safety record, quality metrics, and any efficiency gains.",
  },
  {
    name: "介護・医療 (Care / medical)",
    body: "Note facility type, the number of people supported, your certifications, and your approach to teamwork and resident care.",
  },
];

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "職務経歴書", item: PAGE_URL },
        ],
      },
      {
        "@type": "Article",
        headline: "職務経歴書 Templates & How to Write a Japanese Work-History Sheet",
        description:
          "The three 職務経歴書 layout formats, what to write by profession, and how to build one alongside a rirekisho.",
        url: PAGE_URL,
        image: `${PAGE_URL}/opengraph-image`,
        author: { "@type": "Organization", name: "ResumeJP" },
        publisher: { "@id": `${SITE_URL}/#org` },
        inLanguage: "en",
        mainEntityOfPage: PAGE_URL,
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

const H2 = "mt-12 text-xl sm:text-2xl font-semibold tracking-tight";
const P = "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed";

export default function ShokumuKeirekishoPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          職務経歴書 Templates &amp; Guide
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            The Japanese work-history sheet — formats, by profession, and how to write it
          </span>
        </h1>
        <p className={P}>
          For most career and full-time roles in Japan you submit two documents: the fixed-format{" "}
          <Link href="/templates" className="underline hover:text-primary">
            rirekisho (履歴書)
          </Link>{" "}
          and the free-form <strong>職務経歴書 (shokumukeirekisho)</strong> — a work-history sheet
          that details your roles, skills, and achievements. Unlike the rirekisho, you design this
          one, which is exactly why a clear format matters. Not sure if you need both?{" "}
          <Link
            href="/guide/rirekisho-vs-shokumukeirekisho"
            className="underline hover:text-primary"
          >
            Here is when each is required
          </Link>
          .
        </p>

        <h2 className={H2}>The three layout formats</h2>
        <div className="mt-5 space-y-3">
          {FORMATS.map((f) => (
            <div key={f.name} className="rounded-2xl border bg-white p-5">
              <h3 className="text-base font-semibold tracking-tight">{f.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>

        <h2 className={H2}>What to write, by profession</h2>
        <p className={P}>
          A strong 職務経歴書 is specific and measurable. Whatever your field, show scope and results
          rather than just duties.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {BY_PROFESSION.map((p) => (
            <div key={p.name} className="rounded-2xl border bg-white p-5">
              <h3 className="text-base font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <h2 className={H2}>The sections to include</h2>
        <ul className="mt-3 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed list-disc pl-5">
          <li>
            <strong>職務要約</strong> — a 3–4 line summary of your career at the top.
          </li>
          <li>
            <strong>職務経歴</strong> — each employer with dates, your role, responsibilities, and
            concrete results.
          </li>
          <li>
            <strong>活かせる経験・スキル</strong> — skills and tools you can bring to this role.
          </li>
          <li>
            <strong>資格</strong> — relevant qualifications and certifications.
          </li>
          <li>
            <strong>自己PR</strong> — a short, focused pitch; see{" "}
            <Link href="/examples" className="underline hover:text-primary">
              self-PR examples
            </Link>
            .
          </li>
        </ul>

        <h2 className={H2}>Build it free — in any language</h2>
        <p className={P}>
          ResumeJP supports the 職務経歴書 alongside the rirekisho, and you can write your content in
          English, Nepali, or another language and convert it to natural business Japanese in one
          click — something Japanese-only resume tools cannot do. Start in the{" "}
          <Link href="/editor" className="underline hover:text-primary">
            free editor
          </Link>{" "}
          and download a print-ready PDF, then print it at a{" "}
          <Link
            href="/blog/print-rirekisho-convenience-store"
            className="underline hover:text-primary"
          >
            convenience store
          </Link>{" "}
          if you do not have a printer.
        </p>
      </article>
    </MarketingShell>
  );
}
