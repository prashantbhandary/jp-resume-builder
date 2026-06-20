import { ImageResponse } from "next/og";

/**
 * Shared renderer for per-route Open Graph / social-share images. Each route's
 * `opengraph-image.tsx` calls renderOgImage() with its own title so every page
 * gets a distinct, on-brand 1200×630 PNG — better social cards, and real image
 * assets Google can index (the URLs are registered in sitemap.ts and the page
 * structured data).
 *
 * Latin text + drawn shapes only: next/og cannot reliably fetch a CJK/symbol
 * webfont in this environment, so the seal "○" and the 履 mark are drawn with
 * divs rather than glyphs (anything non-Latin renders as tofu otherwise).
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgOptions {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** "editorial" = warm form-paper + seal accent; "brand" = monochrome. */
  variant?: "editorial" | "brand";
}

export function renderOgImage({ eyebrow, title, subtitle, variant = "editorial" }: OgOptions) {
  const editorial = variant === "editorial";
  const paper = editorial ? "#fbfaf6" : "#ffffff";
  const ink = editorial ? "#14110e" : "#0a0a0a";
  const inkSoft = editorial ? "#6f6a62" : "#52525b";
  const seal = "#c0402e";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
          // Faint horizontal ruling — the Japanese-form motif.
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, #ece6da 47px, #ece6da 48px)",
          padding: "76px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: R mark + brand + eyebrow with a drawn seal ring */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                background: ink,
                color: paper,
                fontSize: "32px",
                fontWeight: 800,
              }}
            >
              R
            </div>
            <div style={{ fontSize: "30px", fontWeight: 700, color: ink }}>ResumeJP</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "22px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: inkSoft,
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "999px",
                border: `3px solid ${seal}`,
              }}
            />
            {eyebrow}
          </div>
        </div>

        {/* Title block with a short seal rule above it */}
        <div style={{ display: "flex", flexDirection: "column", gap: "26px", maxWidth: "1010px" }}>
          <div style={{ display: "flex", width: "84px", height: "5px", background: seal }} />
          <div
            style={{
              fontSize: title.length > 58 ? "62px" : "78px",
              fontWeight: 800,
              color: ink,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: "32px", color: inkSoft, lineHeight: 1.35 }}>{subtitle}</div>
          ) : null}
        </div>

        {/* Footer: domain + free badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "26px", color: inkSoft }}>resumejp.com</div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: paper,
              background: ink,
              padding: "12px 24px",
            }}
          >
            Free · Rirekisho PDF
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
