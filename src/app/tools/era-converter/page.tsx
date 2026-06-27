import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { EraConverter } from "@/components/tools/EraConverter";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/tools/era-converter`;

export const metadata: Metadata = {
  title: "Japanese Era Converter (和暦 ⇄ 西暦) — Reiwa, Heisei, Showa",
  description:
    "Free two-way converter between the Japanese era calendar (令和 / 平成 / 昭和 / 大正 / 明治) and the Western year. Get the right year for your rirekisho in one click.",
  keywords: [
    "和暦 西暦 変換",
    "Japanese era converter",
    "Reiwa to Western year",
    "令和 西暦",
    "平成 西暦 変換",
    "wareki seireki converter",
  ],
  alternates: { canonical: "/tools/era-converter" },
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
          { "@type": "ListItem", position: 3, name: "Era Converter", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Japanese Era Converter",
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

export default function EraConverterPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Japanese Era Converter
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            和暦 ⇄ 西暦 — Reiwa, Heisei, Showa and more
          </span>
        </h1>
        <p className={P}>
          Convert between the Japanese era calendar and the Western year in both directions. Type a
          year on either side to see the result instantly.
        </p>

        <div className="mt-6">
          <EraConverter />
        </div>

        <h2 className={H2}>Why this matters on a resume</h2>
        <p className={P}>
          Japanese forms use two calendars: the Western year (西暦) and the era year (和暦). On a
          rirekisho you may use either, but you must use the <strong>same one everywhere</strong> —
          mixing 令和 and 西暦 across your birth date, school dates, and work history is a classic
          mistake that makes an application look careless. This tool helps you line every date up in
          one system.
        </p>

        <h2 className={H2}>How the eras line up</h2>
        <ul className="mt-3 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed list-disc pl-5">
          <li>令和 (Reiwa) began in 2019 — Reiwa 1 = 2019, Reiwa 8 = 2026.</li>
          <li>平成 (Heisei): 1989–2019. Heisei 1 = 1989.</li>
          <li>昭和 (Showa): 1926–1989.</li>
          <li>大正 (Taisho): 1912–1926.</li>
          <li>明治 (Meiji): 1868–1912.</li>
        </ul>
        <p className={P}>
          In years when an era changed (1989, 2019), this converter uses the newer era, which is the
          usual convention on resumes. For more on choosing a system, read{" "}
          <Link
            href="/blog/japanese-era-dates-reiwa-resume"
            className="underline hover:text-primary"
          >
            令和 vs Western dates on your resume
          </Link>
          .
        </p>

        <h2 className={H2}>Build the whole resume</h2>
        <p className={P}>
          ResumeJP keeps your chosen date format consistent across the entire sheet automatically.
          Once your dates are sorted, fill in the rest in the{" "}
          <Link href="/editor" className="underline hover:text-primary">
            free editor
          </Link>{" "}
          and download a print-ready PDF, or browse more{" "}
          <Link href="/tools" className="underline hover:text-primary">
            resume tools
          </Link>
          .
        </p>
      </article>
    </MarketingShell>
  );
}
