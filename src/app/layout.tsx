import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { AdSenseSlot } from "@/components/AdSenseSlot";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Brand-first so Google/AI search associates "ResumeJP" / "resume jp"
    // with this domain (entity recognition), then the head keywords.
    default: "ResumeJP — Japanese Resume Builder | Free 履歴書 & Rirekisho",
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

// Site-wide identity graph only (Organization + WebSite). Page-specific
// structured data (WebApplication, FAQPage, HowTo) lives in page.tsx so it
// doesn't duplicate onto every route — Google requires e.g. at most one
// FAQPage per page.
function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: SITE_NAME,
        // Entity aliases — how people actually type the brand into search.
        alternateName: ["resume jp", "resumejp", "resumejp.com", "Resume JP"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon-512.png`,
          width: 512,
          height: 512,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: "resumejp.com",
        publisher: { "@id": `${SITE_URL}/#org` },
        description:
          "Free online builder for authentic Japanese resumes (履歴書 rirekisho) and work-history sheets (職務経歴書).",
        inLanguage: ["en", "ja"],
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
            pointer-events:none;
          }
          #rj-splash.rj-hide{
            animation:rj-fade 0.4s ease forwards;
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
          @keyframes rj-fade{
            from{opacity:1;transform:scale(1)}
            to{opacity:0;transform:scale(1.03);visibility:hidden}
          }
        ` }} />
      </head>
      <body className="font-sans antialiased">
        {/* Splash screen — pure HTML/CSS, visible before any JS or React runs.
            The inline script fades it out once the page has actually finished
            loading (min 650ms so the animation reads, max 2.5s so a slow asset
            can never trap the visitor), then removes it from the DOM.
            The splash lives inside a dangerouslySetInnerHTML host so React
            never reconciles its children — on slow devices hydration can
            finish AFTER the script has removed the splash, and a React-owned
            node vanishing mid-hydration throws (React 19 treats any mismatch
            as an error → "Application error" screen). The host div itself is
            never touched by the script, so hydration always matches. */}
        <div
          id="rj-splash-host"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html:
            `<div id="rj-splash" aria-hidden="true">` +
            `<div id="rj-splash-mark">R</div>` +
            `<div id="rj-splash-name">ResumeJP</div>` +
            `<div id="rj-splash-bar"><div id="rj-splash-fill"></div></div>` +
            `</div>`
          }}
        />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `#rj-splash{display:none}` }} />
        </noscript>
        {/* kill() injects a permanent display:none rule in addition to removing
            the node: if a hydration-failure fallback ever re-renders the layout
            (e.g. a browser extension mutated the DOM before React hydrated),
            the re-created splash is dead on arrival instead of covering the
            page forever. Splash runs on the homepage only — other routes kill
            it immediately. */}
        <script dangerouslySetInnerHTML={{ __html:
          `(function(){` +
          `function kill(){var st=document.createElement('style');` +
          `st.textContent='#rj-splash{display:none!important}';` +
          `document.head.appendChild(st);` +
          `var n=document.getElementById('rj-splash');if(n)n.remove();}` +
          `if(location.pathname!=='/'){kill();return;}` +
          `var s=document.getElementById('rj-splash');if(!s)return;` +
          `var t0=Date.now(),done=false;` +
          `function hide(){if(done)return;done=true;` +
          `var wait=Math.max(0,650-(Date.now()-t0));` +
          `setTimeout(function(){s.className='rj-hide';` +
          `setTimeout(kill,450);},wait);}` +
          `if(document.readyState==='complete'){hide();}` +
          `else{window.addEventListener('load',hide);}` +
          `setTimeout(hide,2500);})()`
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
        {/* AdSenseSlot renders the <ins> imperatively via useEffect so AdSense's
            injected iframe never conflicts with React's reconciliation. */}
        <AdSenseSlot client="ca-pub-6450900255050645" slot="2684471291" />
      </body>
    </html>
  );
}
