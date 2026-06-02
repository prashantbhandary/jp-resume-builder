"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LandingCopy } from "@/lib/i18n";

export function Hero({ copy }: { copy: LandingCopy["hero"] }) {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="container relative">
        {/* Rendered visible on first paint — no JS-gated opacity:0 entrance, so
            the above-the-fold hero never flashes blank before hydration. */}
        <div className="mx-auto max-w-3xl text-center motion-safe:animate-fade-in">
          <div className="inline-flex items-center gap-1.5 rounded-full border bg-white/60 px-3 py-1 text-xs text-muted-foreground shadow-sm">
            <Sparkles className="h-3 w-3" />
            <span>{copy.badge}</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
            {copy.titleLine1}
            <br />
            <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
              {copy.titleLine2}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            {copy.subtitle}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/editor">
                {copy.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#preview">{copy.ctaSecondary}</a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">{copy.fineprint}</p>
        </div>
      </div>
    </section>
  );
}
