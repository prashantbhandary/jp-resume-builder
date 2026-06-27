import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { TOOLS } from "@/lib/tools";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/tools`;

export const metadata: Metadata = {
  title: "Free Japanese Resume Tools — Era Converter, Age, Photo Cropper",
  description:
    "Free browser tools for building a Japanese resume: a 和暦・西暦 era-year converter, a 満年齢 age calculator, a 30×40 mm rirekisho photo cropper, and a 自己PR character counter. No signup, nothing leaves your browser.",
  keywords: [
    "Japanese resume tools",
    "和暦 西暦 変換",
    "満年齢 計算",
    "履歴書 写真 サイズ 変換",
    "自己PR 文字数",
    "rirekisho tools free",
  ],
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Free Japanese Resume Tools",
    description:
      "Era converter, age calculator, 30×40 photo cropper, and character counter — free, in your browser.",
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
          { "@type": "ListItem", position: 2, name: "Tools", item: PAGE_URL },
        ],
      },
      {
        "@type": "ItemList",
        name: "Free Japanese resume tools",
        itemListElement: TOOLS.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          url: `${PAGE_URL}/${t.slug}`,
        })),
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

export default function ToolsHub() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Free Japanese Resume Tools
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            便利ツール — small helpers for building your 履歴書
          </span>
        </h1>
        <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
          A set of free, no-signup tools for the fiddly parts of a Japanese resume — converting era
          dates, getting your age right, cropping your photo to size, and checking the length of your
          自己PR. Everything runs in your browser; nothing you enter or upload is sent to a server.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="group rounded-2xl border bg-white p-5 transition-colors hover:border-primary/40"
            >
              <h2 className="text-base font-semibold tracking-tight group-hover:text-primary">
                {t.name}
              </h2>
              <p className="mt-0.5 font-jp text-sm text-muted-foreground">{t.jp}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open tool <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
          Ready to put it all together? Build the full resume in the{" "}
          <Link href="/editor" className="underline hover:text-primary">
            free editor
          </Link>{" "}
          and download a print-ready PDF.
        </p>
      </article>
    </MarketingShell>
  );
}
