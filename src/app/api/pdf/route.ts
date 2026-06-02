import { NextResponse } from "next/server";
import { ResumeSchema } from "@/lib/schema";
import { TEMPLATES, type TemplateKey } from "@/lib/templates";

export const runtime = "nodejs";
export const maxDuration = 60;

const CHROMIUM_BINARY_URL =
  process.env.CHROMIUM_BINARY_URL ??
  "https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar";

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
  let origin: string;
  try {
    origin = resolveSelfOrigin(req);
  } catch {
    return NextResponse.json({ error: "Untrusted request origin" }, { status: 400 });
  }
  // Carry the chosen font/boldness so the headless render matches the editor
  // (the preview page has no access to the user's localStorage).
  const rawStyle = (body as { style?: { font?: string; weight?: string } }).style;
  const styleQs =
    rawStyle && typeof rawStyle === "object"
      ? `&font=${encodeURIComponent(String(rawStyle.font ?? ""))}&weight=${encodeURIComponent(
          String(rawStyle.weight ?? ""),
        )}`
      : "";
  const blankQs = (body as { blank?: boolean }).blank ? "&blank=1" : "";
  const url = `${origin}/preview?template=${template}&puppeteer=1${styleQs}${blankQs}`;

  // Dynamic imports — avoids webpack converting static imports to require() for ESM-only packages
  const [{ default: puppeteer }, { default: chromium }] = await Promise.all([
    import("puppeteer-core"),
    import("@sparticuz/chromium-min"),
  ]);

  const localExecutable = process.env.PUPPETEER_EXECUTABLE_PATH;
  const executablePath =
    localExecutable ??
    (await (chromium as { executablePath: (url: string) => Promise<string> }).executablePath(
      CHROMIUM_BINARY_URL,
    ));

  const browser = await (puppeteer as { launch: (opts: unknown) => Promise<import("puppeteer-core").Browser> }).launch({
    // A locally-installed Chrome chokes on Sparticuz's serverless args
    // (e.g. --single-process); use minimal flags for local dev only.
    args: localExecutable
      ? ["--no-sandbox", "--disable-setuid-sandbox"]
      : (chromium as { args: string[] }).args,
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

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.evaluate((resumeJson: string) => {
      (window as unknown as { __puppeteerResumeData: string }).__puppeteerResumeData = resumeJson;
    }, json);

    await page.waitForFunction("window.__rirekishoReady === true", { timeout: 20_000 });
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

/**
 * Origin that Puppeteer should navigate to in order to render OUR /preview
 * page. Puppeteer should only ever hit this app, so we prefer an explicitly
 * trusted origin from the environment and otherwise fall back to the request
 * origin — rejecting private/loopback/link-local hosts (e.g. cloud metadata
 * at 169.254.169.254) in production to prevent Host-header SSRF.
 */
function resolveSelfOrigin(req: Request): string {
  const configured =
    process.env.PUBLIC_BASE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);
  if (configured) return new URL(configured).origin;

  const url = new URL(req.url);
  if (process.env.NODE_ENV === "production" && isPrivateHost(url.hostname)) {
    throw new Error("Refusing to render from a private/loopback host");
  }
  return url.origin;
}

function isPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (h === "localhost" || h.endsWith(".localhost")) return true;

  // IPv6 literals contain a colon — only then apply IPv6 private/loopback
  // checks, so real domains that merely start with "fc"/"fd" aren't flagged.
  if (h.includes(":")) {
    if (h === "::1") return true; // loopback
    if (h.startsWith("fc") || h.startsWith("fd")) return true; // unique-local
    if (h.startsWith("fe80")) return true; // link-local
    return false;
  }

  // IPv4 private / loopback / link-local ranges.
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    if (a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true; // link-local incl. cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 0) return true;
  }
  return false;
}
