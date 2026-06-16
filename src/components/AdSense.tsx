"use client";

import Script from "next/script";
import { AdSenseSlot } from "./AdSenseSlot";

const CLIENT = "ca-pub-6450900255050645";
const DEFAULT_SLOT = "2684471291";

/**
 * Bundles the AdSense loader script with a single ad slot. This is mounted
 * ONLY on content-rich public pages (home, /templates, /guide/*, privacy) —
 * never on /editor or /preview, which are interactive tools with no publisher
 * content. Google's AdSense programme policies prohibit running ad code on
 * pages without meaningful content ("Low value content"), so keeping ads off
 * the tool surfaces is required for review approval.
 *
 * The <Script> carries a stable `id` so Next.js de-duplicates it across client
 * navigations between content pages (it loads once per session). The loader
 * uses lazyOnload so it never blocks the critical render path.
 */
export function AdSense({ slot = DEFAULT_SLOT }: { slot?: string }) {
  return (
    <>
      <Script
        id="adsbygoogle-js"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <AdSenseSlot client={CLIENT} slot={slot} />
    </>
  );
}
