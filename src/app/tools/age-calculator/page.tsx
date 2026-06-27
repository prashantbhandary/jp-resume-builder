import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { AgeCalculator } from "@/components/tools/AgeCalculator";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/tools/age-calculator`;

export const metadata: Metadata = {
  title: "Age Calculator (満年齢) — For Your Japanese Resume",
  description:
    "Free 満年齢 calculator. Work out your age in completed years as of any date — exactly how a Japanese resume (履歴書) needs it, so you never write the wrong age.",
  keywords: [
    "満年齢 計算",
    "age calculator Japanese resume",
    "rirekisho age",
    "履歴書 年齢 計算",
    "man-nenrei calculator",
  ],
  alternates: { canonical: "/tools/age-calculator" },
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
          { "@type": "ListItem", position: 3, name: "Age Calculator", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Age (満年齢) Calculator",
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

export default function AgeCalculatorPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Age Calculator
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            満年齢 — your age as of the submission date
          </span>
        </h1>
        <p className={P}>
          Enter your date of birth and the date you will submit the resume to get your 満年齢 — your
          age in completed years.
        </p>

        <div className="mt-6">
          <AgeCalculator />
        </div>

        <h2 className={H2}>What is 満年齢?</h2>
        <p className={P}>
          満年齢 (man-nenrei) is your age counted in completed years — the everyday meaning of
          &ldquo;age&rdquo; in most of the world, and what a Japanese resume asks for. It increases on
          your birthday, so the figure depends on the date you are measuring against.
        </p>

        <h2 className={H2}>Why the &ldquo;as of&rdquo; date matters</h2>
        <p className={P}>
          A rirekisho shows your age <em>as of</em> a particular date — usually the day you submit it
          or the interview date. If your birthday falls between today and that date, your age changes.
          Writing an age that does not match the submission date is a small but common error that
          tidy employers notice, so set the &ldquo;as of&rdquo; field to the date you will actually
          hand in the form.
        </p>

        <h2 className={H2}>Put it on your resume</h2>
        <p className={P}>
          ResumeJP calculates and places your age automatically from your birth date and the resume
          date, so it is always consistent. Build your full resume in the{" "}
          <Link href="/editor" className="underline hover:text-primary">
            free editor
          </Link>
          , or explore more{" "}
          <Link href="/tools" className="underline hover:text-primary">
            resume tools
          </Link>
          .
        </p>
      </article>
    </MarketingShell>
  );
}
