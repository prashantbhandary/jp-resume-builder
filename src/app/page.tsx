import { LandingContent } from "@/components/landing/LandingContent";
import { FAQ_EN } from "@/lib/faq";

const SITE_URL = "https://www.resumejp.com";

/**
 * Homepage-specific structured data. The site-wide Organization/WebSite graph
 * lives in the root layout; these nodes (app, FAQ, HowTo) belong only to the
 * landing page — Google allows at most one FAQPage per page, and the
 * /templates page carries its own.
 */
function HomeJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Japanese Resume Builder",
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        screenshot: `${SITE_URL}/opengraph-image`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires a modern web browser",
        publisher: { "@id": `${SITE_URL}/#org` },
        inLanguage: ["en", "ja"],
        description:
          "Create JIS, MHLW, mid-career, new-graduate, part-time, dispatch, and English Japanese resume templates and export a print-ready PDF.",
        featureList: [
          "JIS standard 履歴書 template",
          "MHLW (厚生労働省) template",
          "職務経歴書 work-history formats",
          "Part-time / arubaito and dispatch layouts",
          "English résumé / Western CV",
          "Type in any language with automatic Japanese conversion",
          "Print-ready PDF download",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_EN.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#howto`,
        name: "How to make a Japanese resume (履歴書)",
        description:
          "Create a JIS or MHLW Japanese resume (rirekisho) in any language and export a print-ready PDF — for free.",
        totalTime: "PT5M",
        estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
        step: [
          {
            "@type": "HowToStep",
            name: "Pick a template",
            text: "Choose the JIS or MHLW rirekisho, or a mid-career, new-grad, part-time, or English CV layout.",
          },
          {
            "@type": "HowToStep",
            name: "Fill it in any language",
            text: "Enter your details in English, Nepali, or Japanese using the step-by-step editor with a live preview.",
          },
          {
            "@type": "HowToStep",
            name: "Convert to natural Japanese",
            text: "Click translate to rewrite every field into polished business Japanese that employers expect.",
          },
          {
            "@type": "HowToStep",
            name: "Download a print-ready PDF",
            text: "Export an A3 or A4 PDF sized exactly to the standard form, ready to email or print.",
          },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/**
 * Server Component shell — keeps page.tsx free of "use client" so Next.js
 * does not inject RSC flight metadata (_N_T_/layout, Vary header values) as
 * visible text nodes in the HTML body. All interactive/language content lives
 * in LandingContent (a dedicated Client Component).
 */
export default function LandingPage() {
  return (
    <>
      <HomeJsonLd />
      <LandingContent />
    </>
  );
}
