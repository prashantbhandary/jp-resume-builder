import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { FAQ_EN } from "@/lib/faq";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Root layout loads ONLY the two fonts needed on every page (landing + public
// routes). The additional 4 typefaces used in the editor's typography picker
// are loaded in src/app/editor/layout.tsx so they don't delay the landing page.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
  weight: ["400", "600"],  // regular + semibold — enough for landing + sheet body
  preload: true,
});

const SITE_URL = "https://www.resumejp.com";
const SITE_NAME = "ResumeJP";

const KEYWORDS = [
  "Japanese resume",
  "Japanese resume builder",
  "rirekisho",
  "履歴書",
  "履歴書 作成",
  "Japanese resume template",
  "Japanese CV",
  "shokumukeirekisho",
  "職務経歴書",
  "resume for jobs in Japan",
  "JIS rirekisho",
  "MHLW rirekisho",
  "厚生労働省 履歴書",
  "part time job resume Japan",
  "arubaito resume",
  "派遣 履歴書",
  "English resume Japan",
  "新卒 履歴書",
  "転職 履歴書",
  "rirekisho PDF",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // ≤580px: "Japanese Resume Builder — Free 履歴書 & 職務経歴書" fits comfortably.
    default: "Japanese Resume Builder — Free 履歴書 & Rirekisho Templates",
    template: "%s · ResumeJP",
  },
  // ≤1000px (≈155 chars) — concise and keyword-rich.
  description:
    "Free Japanese resume (履歴書 rirekisho) builder. JIS, MHLW, new-grad, part-time & English CV templates. Fill in any language, download a print-ready PDF.",
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // hreflang: x-default + en + ja, each pointing to the canonical URL.
  // Both language versions live at the same URL (client-side toggle), so
  // x-default is the canonical and en/ja are self-referencing alternates.
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      "x-default": `${SITE_URL}/`,
      en: `${SITE_URL}/`,
      ja: `${SITE_URL}/`,
    },
  },
  category: "productivity",
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    title: "Japanese Resume Builder — Free 履歴書 Templates & PDF",
    description:
      "Build a JIS or MHLW rirekisho in any language and download a print-ready PDF. Free, no signup.",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japanese Resume Builder — Free 履歴書 Templates",
    description:
      "Free 履歴書 & 職務経歴書 templates. Fill in any language, download a print-ready PDF.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Free online builder for authentic Japanese resumes (履歴書 rirekisho) and work-history sheets (職務経歴書).",
        inLanguage: ["en", "ja"],
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Japanese Resume Builder",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires a modern web browser",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoJp.variable}`}
    >
      <head>
        {/* GEO targeting — tells crawlers this service targets Japan */}
        <meta name="geo.region" content="JP" />
        <meta name="geo.placename" content="Japan" />
        <meta name="language" content="en, ja" />
        <meta httpEquiv="content-language" content="en, ja" />
        <meta name="google-adsense-account" content="ca-pub-6450900255050645" />
        {/* Splash-screen styles — inline so they apply before any CSS chunk loads */}
        <style dangerouslySetInnerHTML={{ __html: `
          #rj-splash{
            position:fixed;inset:0;z-index:9999;
            display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;
            background:#fff;
            animation:rj-hold 0.6s ease forwards,rj-fade 0.4s ease 0.6s forwards;
            pointer-events:none;
          }
          #rj-splash-mark{
            width:56px;height:56px;border-radius:16px;
            background:#0a0a0a;
            display:flex;align-items:center;justify-content:center;
            color:#fff;font-size:30px;font-weight:800;font-family:sans-serif;
            animation:rj-pop 0.5s cubic-bezier(.34,1.56,.64,1) both;
          }
          #rj-splash-name{
            margin-top:14px;
            font-family:sans-serif;font-size:17px;font-weight:600;
            color:#0a0a0a;letter-spacing:-0.01em;
            animation:rj-rise 0.45s ease 0.18s both;
          }
          #rj-splash-bar{
            margin-top:28px;width:48px;height:3px;border-radius:99px;
            background:#f0f0f0;overflow:hidden;
            animation:rj-rise 0.45s ease 0.25s both;
          }
          #rj-splash-fill{
            height:100%;border-radius:99px;background:#0a0a0a;
            animation:rj-load 0.5s cubic-bezier(.4,0,.2,1) 0.12s both;
          }
          @keyframes rj-pop{
            from{opacity:0;transform:scale(.7)}
            to{opacity:1;transform:scale(1)}
          }
          @keyframes rj-rise{
            from{opacity:0;transform:translateY(8px)}
            to{opacity:1;transform:translateY(0)}
          }
          @keyframes rj-load{
            from{width:0}
            to{width:100%}
          }
          @keyframes rj-hold{
            from{opacity:1}to{opacity:1}
          }
          @keyframes rj-fade{
            from{opacity:1;transform:scale(1)}
            to{opacity:0;transform:scale(1.03);visibility:hidden}
          }
        ` }} />
      </head>
      <body className="font-sans antialiased">
        {/* Splash screen — pure HTML/CSS, visible before any JS or React runs.
            The tiny inline script removes it from the DOM after the animation. */}
        <div id="rj-splash" aria-hidden="true">
          <div id="rj-splash-mark">R</div>
          <div id="rj-splash-name">ResumeJP</div>
          <div id="rj-splash-bar"><div id="rj-splash-fill" /></div>
        </div>
        <script dangerouslySetInnerHTML={{ __html:
          `(function(){var s=document.getElementById('rj-splash');` +
          `if(s){setTimeout(function(){s.remove();},1100);}})()`
        }} />
        <JsonLd />
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
        {/* AdSense — lazyOnload so it never blocks the critical render path. */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6450900255050645"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6450900255050645"
          data-ad-slot="2684471291"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Script
          id="adsense-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: "(window.adsbygoogle = window.adsbygoogle || []).push({});" }}
        />
      </body>
    </html>
  );
}
