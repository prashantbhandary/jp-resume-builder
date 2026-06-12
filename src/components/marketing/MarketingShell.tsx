import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Server-rendered shell for SEO/content pages (/templates, /guide/*).
 * Mirrors the landing page header/footer but ships zero client JS of its own
 * so the pages stay fully static and fast.
 */
export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-40 glass border-b">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="font-jp text-lg">履</span>
            <span>ResumeJP</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/templates"
              className="hidden sm:block text-muted-foreground hover:text-foreground px-2"
            >
              Templates
            </Link>
            <Link
              href="/guide/how-to-write-a-japanese-resume"
              className="hidden sm:block text-muted-foreground hover:text-foreground px-2"
            >
              Guide
            </Link>
            <Button asChild size="sm">
              <Link href="/editor">
                Get started <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container max-w-3xl px-4 pt-24 pb-12 sm:pt-28 sm:pb-16">{children}</main>

      <section className="container max-w-3xl px-4 pb-16 sm:pb-24">
        <div className="rounded-2xl border bg-gradient-to-br from-zinc-50 to-white p-6 sm:p-10 text-center shadow-sm">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Build your Japanese resume now — free
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Fill it in any language, switch templates without retyping, and download a print-ready
            PDF. No account, no email.
          </p>
          <div className="mt-5">
            <Button asChild size="lg" className="h-12 w-full sm:w-auto touch-manipulation">
              <Link href="/editor">
                Open the editor <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} ResumeJP — Japanese Resume Builder</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/templates" className="underline hover:text-primary">
              Resume Templates
            </Link>
            <Link href="/guide/how-to-write-a-japanese-resume" className="underline hover:text-primary">
              How to Write a 履歴書
            </Link>
            <Link href="/guide/rirekisho-vs-shokumukeirekisho" className="underline hover:text-primary">
              履歴書 vs 職務経歴書
            </Link>
            <Link href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
