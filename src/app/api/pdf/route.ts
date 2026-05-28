import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { ResumeSchema } from "@/lib/schema";
import { TEMPLATES, type TemplateKey } from "@/lib/templates";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Generates a PDF by:
 *   1. Launching headless Chromium via @sparticuz/chromium (works on Vercel)
 *   2. Navigating to /preview?template=...&puppeteer=1
 *   3. Injecting resume JSON directly via page.evaluate() — avoids the
 *      in-memory token store which breaks on Vercel (cross-instance state)
 *   4. Waiting for window.__rirekishoReady, then printing to PDF
 */

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ResumeSchema.safeParse((body as { resume?: unknown }).resume);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid resume shape" }, { status: 400 });
  }

  const rawTemplate = (body as { template?: string }).template;
  const template: TemplateKey =
    rawTemplate && rawTemplate in TEMPLATES ? (rawTemplate as TemplateKey) : "jis-a3";
  const meta = TEMPLATES[template];

  const json = JSON.stringify(parsed.data);
  const origin = originFromRequest(req);
  const url = `${origin}/preview?template=${template}&puppeteer=1`;

  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ?? (await chromium.executablePath());

  const browser = await puppeteer.launch({
    args: [...chromium.args, "--font-render-hinting=none"],
    executablePath,
    headless: true,
  });

  const page = await browser.newPage();

  try {
    const px = (mm: number) => Math.round((mm / 25.4) * 96);
    await page.setViewport({
      width: px(meta.widthMm),
      height: px(meta.heightMm),
      deviceScaleFactor: 2,
    });

    // Load the page shell, then inject data before React hydrates
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.evaluate((resumeJson: string) => {
      (window as unknown as { __puppeteerResumeData: string }).__puppeteerResumeData = resumeJson;
    }, json);

    await page.waitForFunction("window.__rirekishoReady === true", { timeout: 15_000 });
    await page.evaluateHandle("document.fonts.ready");

    const pdf = await page.pdf({
      format: meta.paper,
      landscape: meta.orientation === "landscape",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true,
    });

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": 'attachment; filename="rirekisho.pdf"',
        "cache-control": "no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "PDF render failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  } finally {
    await page.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

function originFromRequest(req: Request): string {
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}
