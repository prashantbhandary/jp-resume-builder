"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Languages,
  Download,
  ShieldCheck,
  Sparkles,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "./Hero";
import { FeatureCard } from "./FeatureCard";
import { PreviewMock } from "./PreviewMock";
import { ResumeTypes } from "./ResumeTypes";
import { HowItWorks } from "./HowItWorks";
import { FaqSection } from "./FaqSection";
import { LangToggle } from "@/components/LangToggle";
import { AdSense } from "@/components/AdSense";
import { useLang, LANDING_COPY } from "@/lib/i18n";

const ICON_CLASS = "h-4 w-4";

const FEATURE_ICONS = [
  <FileText key="0" className={ICON_CLASS} />,
  <Languages key="1" className={ICON_CLASS} />,
  <Sparkles key="2" className={ICON_CLASS} />,
  <Download key="3" className={ICON_CLASS} />,
  <ShieldCheck key="4" className={ICON_CLASS} />,
  <FileCheck2 key="5" className={ICON_CLASS} />,
];

/**
 * All the language-reactive landing page content lives here as a Client
 * Component so that page.tsx can remain a Server Component. This prevents
 * Next.js from including RSC flight metadata (_N_T_/layout etc.) as visible
 * text nodes in the HTML body.
 */
export function LandingContent() {
  const [lang, setLang] = useLang();
  const c = LANDING_COPY[lang];

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <header className="fixed inset-x-0 top-0 z-40 glass border-b">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="font-jp text-lg">履</span>
            <span>ResumeJP</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <LangToggle lang={lang} onChange={setLang} />
            <Link
              href="/templates"
              className="hidden sm:block text-muted-foreground hover:text-foreground px-2"
            >
              {lang === "jp" ? "テンプレート" : "Templates"}
            </Link>
            <Link
              href="/arubaito-resume"
              className="hidden sm:block text-muted-foreground hover:text-foreground px-2"
            >
              {lang === "jp" ? "バイト" : "Part-time"}
            </Link>
            <Link
              href="/blog"
              className="hidden sm:block text-muted-foreground hover:text-foreground px-2"
            >
              {lang === "jp" ? "ブログ" : "Blog"}
            </Link>
            <Link
              href="/tools"
              className="hidden sm:block text-muted-foreground hover:text-foreground px-2"
            >
              {lang === "jp" ? "ツール" : "Tools"}
            </Link>
            <Link
              href="/editor"
              className="hidden sm:block text-muted-foreground hover:text-foreground px-2"
            >
              {c.nav.editor}
            </Link>
            <Button asChild size="sm">
              <Link href="/editor">
                {c.nav.getStarted} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <Hero copy={c.hero} />

      {/* Keyword-rich intro paragraph — raises text-to-code ratio for SEO
          crawlers while staying visually subtle below the fold. */}
      <div className="container px-4 pb-2">
        <p className="mx-auto max-w-3xl text-center text-xs sm:text-sm text-muted-foreground/70 leading-relaxed">
          {c.intro.body}
        </p>
      </div>

      {/* Feature grid */}
      <section className="container py-12 sm:py-20 lg:py-28 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">
            {c.features.heading}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
            {c.features.sub}
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.items.map((item, i) => (
            <FeatureCard
              key={i}
              icon={FEATURE_ICONS[i]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <HowItWorks copy={c.howItWorks} />
      <ResumeTypes copy={c.resumeTypes} />

      {/* Preview mock */}
      <section className="container pb-12 sm:pb-24 px-4">
        <PreviewMock lang={lang} copy={c.preview} />
      </section>

      <FaqSection copy={c.faq} />

      {/* In-content ad — sits between the FAQ and the closing CTA, surrounded
          by substantial editorial content as AdSense requires. */}
      <section className="container px-4 pb-4">
        <AdSense />
      </section>

      {/* CTA strip */}
      <section className="container pb-16 sm:pb-28 px-4">
        <div className="rounded-2xl border bg-gradient-to-br from-zinc-50 to-white p-6 sm:p-14 text-center shadow-sm">
          <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">{c.cta.heading}</h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            {c.cta.sub}
          </p>
          <div className="mt-5 sm:mt-6">
            <Button asChild size="lg" className="h-12 w-full sm:w-auto touch-manipulation">
              <Link href="/editor">
                {c.cta.button} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} ResumeJP — Japanese Resume Builder</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/templates" className="underline hover:text-primary">
              Resume Templates
            </Link>
            <Link href="/arubaito-resume" className="underline hover:text-primary">
              Part-Time Resume
            </Link>
            <Link href="/blog" className="underline hover:text-primary">
              Blog
            </Link>
            <Link href="/tools" className="underline hover:text-primary">
              Tools
            </Link>
            <Link
              href="/guide/how-to-write-a-japanese-resume"
              className="underline hover:text-primary"
            >
              How to Write a 履歴書
            </Link>
            <Link
              href="/guide/rirekisho-vs-shokumukeirekisho"
              className="underline hover:text-primary"
            >
              履歴書 vs 職務経歴書
            </Link>
            <Link href="/about" className="underline hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="underline hover:text-primary">
              Contact
            </Link>
            <Link href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="underline hover:text-primary">
              Terms
            </Link>
            <Link href="/disclaimer" className="underline hover:text-primary">
              Disclaimer
            </Link>
            <a
              href="https://www.digistartjp.com/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-primary"
            >
              Designed by DIGI スタート！
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
