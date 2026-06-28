import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Printer } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { TemplateThumb } from "@/components/templates/TemplateThumb";
import { BlankPdfButton } from "@/components/templates/BlankPdfButton";
import {
  CATALOG,
  TEMPLATE_CATEGORIES,
  type CatalogTemplate,
} from "@/lib/templateCatalog";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/templates`;
const COUNT = CATALOG.length;

export const metadata: Metadata = {
  title: `Free Japanese Resume Templates — ${COUNT} 履歴書 Layouts (PDF)`,
  description: `Browse ${COUNT} free Japanese resume (履歴書 rirekisho) templates — JIS A3/A4, MHLW, part-time/arubaito, new-grad, mid-career, dispatch, modern and English CV. Preview each, open it in the editor, or download a blank to print.`,
  keywords: [
    "Japanese resume template",
    "履歴書 テンプレート 無料",
    "rirekisho template PDF",
    "バイト 履歴書 テンプレート",
    "JIS 履歴書 テンプレート",
    "blank rirekisho template",
    "Japanese CV template",
  ],
  alternates: { canonical: "/templates" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: `Free Japanese Resume Templates — ${COUNT} Layouts`,
    description:
      "Preview and use free 履歴書 templates for full-time, part-time, new-grad, career-change, and English applications.",
  },
};

const TEMPLATE_FAQ: { q: string; a: string }[] = [
  {
    q: "Are these Japanese resume templates really free?",
    a: "Yes — every template is free with no account, no email, and no watermark. Fill it in online and download a print-ready PDF, or download a blank to fill in by hand.",
  },
  {
    q: "Can I download a blank rirekisho template to fill in by hand?",
    a: "Yes. Open any template in the editor and use Download blank PDF to get an empty 履歴書 at the correct A4 or A3 size for handwriting.",
  },
  {
    q: "Which Japanese resume template do employers prefer?",
    a: "Most companies accept the MHLW (厚生労働省) format, the government-recommended standard since 2021. Traditional companies may expect the classic JIS layout. Both are here, plus part-time and English options.",
  },
  {
    q: "Can I switch templates without retyping my information?",
    a: "Yes. Your data carries over as you switch between JIS, MHLW, modern, part-time, and English layouts — the sheet reflows automatically.",
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
          { "@type": "ListItem", position: 2, name: "Japanese Resume Templates", item: PAGE_URL },
        ],
      },
      {
        "@type": "ItemList",
        name: "Free Japanese Resume Templates",
        numberOfItems: COUNT,
        itemListElement: CATALOG.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${t.name} (${t.jp})`,
          url: `${SITE_URL}/editor?template=${t.editorKey}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: TEMPLATE_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

function TemplateCard({ t, featured = false }: { t: CatalogTemplate; featured?: boolean }) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border bg-white transition-colors hover:border-primary/40 ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div className={`relative bg-zinc-50 p-4 ${featured ? "sm:w-2/5" : ""}`}>
        {t.badge && (
          <span className="absolute left-5 top-5 z-10 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
            {t.badge}
          </span>
        )}
        <TemplateThumb orientation={t.orientation} hue={t.hue} paper={t.paper} />
      </div>

      <div className={`flex flex-1 flex-col p-5 ${featured ? "sm:p-7" : ""}`}>
        <h3 className={`font-semibold tracking-tight ${featured ? "text-lg sm:text-xl" : "text-base"}`}>
          {t.name} <span className="font-jp font-normal text-muted-foreground">· {t.jp}</span>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {t.paper} {t.orientation} · Best for {t.bestFor}
        </p>
        <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{t.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/editor?template=${t.slug}`}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Use this template <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <BlankPdfButton editorKey={t.editorKey} label="Download blank PDF" />
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const featured = CATALOG.find((t) => t.badge === "Featured") ?? CATALOG[0];

  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Free Japanese Resume Templates
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            {COUNT} 履歴書 layouts — preview, fill online, or download blank
          </span>
        </h1>
        <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {COUNT} free templates covering every common situation — part-time (アルバイト), new
          graduate, career change, dispatch, and English CV, plus the JIS and MHLW standards. Open
          any one in the editor and fill it in English, Japanese, or Nepali, then download a
          print-ready PDF. No account, no watermark. Need to write by hand? Open a template and tap{" "}
          <strong>Download blank PDF</strong> to print an empty form at the right size.
        </p>

        {/* Featured */}
        <h2 className="mt-10 text-xl sm:text-2xl font-semibold tracking-tight">Featured</h2>
        <div className="mt-4">
          <TemplateCard t={featured} featured />
        </div>

        {/* Grouped catalog */}
        {TEMPLATE_CATEGORIES.map((cat) => {
          const items = CATALOG.filter((t) => t.category === cat && t.slug !== featured.slug);
          if (items.length === 0) return null;
          return (
            <section key={cat} className="mt-10">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{cat}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {items.map((t) => (
                  <TemplateCard key={t.slug} t={t} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Blank-download callout */}
        <div className="mt-12 rounded-2xl border bg-secondary/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Printer className="h-5 w-5" /> Download a blank template to print
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            No printer at home? Open any template, choose <strong>Download blank PDF</strong>, and
            print it at a convenience store for about ¥20 —{" "}
            <Link
              href="/blog/print-rirekisho-convenience-store"
              className="underline hover:text-primary"
            >
              here is how
            </Link>
            . Or fill it in online and export the finished sheet.
          </p>
        </div>

        {/* FAQ */}
        <h2 className="mt-12 text-xl sm:text-2xl font-semibold tracking-tight">
          Template questions
        </h2>
        <div className="mt-4 space-y-4">
          {TEMPLATE_FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="flex items-start gap-2 text-sm sm:text-base font-semibold">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f.q}
              </h3>
              <p className="mt-1 pl-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
