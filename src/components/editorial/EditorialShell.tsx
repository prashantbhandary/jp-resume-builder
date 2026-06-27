import Link from "next/link";
import type { ReactNode } from "react";
import { Newsreader, IBM_Plex_Mono, Noto_Serif_JP } from "next/font/google";
import { AdSense } from "@/components/AdSense";

/**
 * Shell for the editorial surface — /blog, /blog/[slug], /arubaito-resume.
 * Deliberately distinct from MarketingShell (templates/guides keep that look):
 * a warm form-paper background, a literary serif + Mincho display voice, a
 * mono utility face for furigana-style field labels, and a single seal
 * vermilion accent. Fonts are loaded here so they ship only on these routes.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});
const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  weight: ["400", "500", "600"],
});

const NAV = [
  { href: "/arubaito-resume", label: "Part-time" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/templates", label: "Templates" },
];

/** Mono field-label set above a heading — the page's recurring annotation. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow inline-flex items-center gap-2">
      <span aria-hidden className="text-[var(--seal)]">
        ○
      </span>
      {children}
    </span>
  );
}

/** Sharp, form-stamp style call-to-action link. */
export function StampLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--ink)] px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-[var(--seal)] hover:border-[var(--seal)]"
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export function EditorialShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={`editorial editorial-paper min-h-screen ${newsreader.variable} ${plexMono.variable} ${notoSerifJp.variable}`}
    >
      {/* Top bar — hairline ruled, like the header band of a form. */}
      <header className="fixed inset-x-0 top-0 z-40 glass border-b border-[var(--rule)]">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-jpserif text-lg text-[var(--seal)]">履</span>
            <span className="font-display text-lg tracking-tight text-[var(--ink)]">ResumeJP</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="hidden px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--ink-soft)] hover:text-[var(--ink)] sm:block"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/editor"
              className="border border-[var(--ink)] px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Editor
            </Link>
          </nav>
        </div>
      </header>

      <main className="container max-w-2xl px-4 pt-24 pb-12 sm:pt-28 sm:pb-16">{children}</main>

      <div className="container max-w-2xl px-4 pb-10">
        <AdSense />
      </div>

      {/* Footer — a small "form footer" block of mono labels. */}
      <footer className="border-t border-[var(--rule)]">
        <div className="container max-w-2xl px-4 py-10">
          <div className="flex items-baseline gap-2">
            <span className="font-jpserif text-base text-[var(--seal)]">履</span>
            <span className="font-display text-base text-[var(--ink)]">ResumeJP</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
            {[
              { href: "/arubaito-resume", label: "Part-time resume" },
              { href: "/blog", label: "Blog" },
              { href: "/tools", label: "Tools" },
              { href: "/templates", label: "Templates" },
              { href: "/guide/how-to-write-a-japanese-resume", label: "Writing guide" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/editor", label: "Open editor" },
              { href: "/privacy-policy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/disclaimer", label: "Disclaimer" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--ink-soft)] hover:text-[var(--seal)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="eyebrow mt-8">
            © {new Date().getFullYear()} ResumeJP — Japanese Resume Builder
          </p>
        </div>
      </footer>
    </div>
  );
}
