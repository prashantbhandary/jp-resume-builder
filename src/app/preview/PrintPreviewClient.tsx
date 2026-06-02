"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sheet } from "@/components/rirekisho/Sheet";
import { emptyResume, type Resume } from "@/lib/schema";
import { loadResume } from "@/lib/storage";
import { TEMPLATES, type TemplateKey, loadTemplate } from "@/lib/templates";
import {
  loadSheetStyle,
  FONT_MAP,
  WEIGHT_MAP,
  type SheetStyle,
  type FontKey,
  type WeightKey,
  DEFAULT_SHEET_STYLE,
} from "@/lib/sheet-style";
import "@/components/rirekisho/sheet.css";
import "@/components/rirekisho/print.css";

/**
 * Renders the resume at real size with print CSS applied.
 *
 * Puppeteer fetches `/preview?data=<base64-json>&template=<key>`. If `data`
 * is absent we fall back to localStorage so users can open this page
 * directly for a full-size browser preview.
 */
export function PrintPreviewClient() {
  const params = useSearchParams();
  const [data, setData] = useState<Resume | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("jis-a3");
  const [style, setStyle] = useState<SheetStyle>(DEFAULT_SHEET_STYLE);

  useEffect(() => {
    const t = (params.get("template") as TemplateKey | null) ?? loadTemplate();
    setTemplate(t in TEMPLATES ? t : "jis-a3");

    // Prefer style from query (set by the server PDF route, which has no
    // localStorage); otherwise read the user's saved choice.
    const fontParam = params.get("font");
    const weightParam = params.get("weight");
    if ((fontParam && fontParam in FONT_MAP) || (weightParam && weightParam in WEIGHT_MAP)) {
      setStyle({
        font: fontParam && fontParam in FONT_MAP ? (fontParam as FontKey) : DEFAULT_SHEET_STYLE.font,
        weight:
          weightParam && weightParam in WEIGHT_MAP
            ? (weightParam as WeightKey)
            : DEFAULT_SHEET_STYLE.weight,
      });
    } else {
      setStyle(loadSheetStyle());
    }

    const token = params.get("token");
    const encoded = params.get("data");
    const isPuppeteer = params.get("puppeteer") === "1";

    // ?blank=1 → render an empty template (used by "Download blank template").
    if (params.get("blank") === "1") {
      setData(emptyResume());
      return;
    }

    if (isPuppeteer) {
      // Data is injected by Puppeteer via page.evaluate() after domcontentloaded.
      // Poll until it appears (usually already set by the time useEffect runs).
      const interval = setInterval(() => {
        const injected = (window as unknown as { __puppeteerResumeData?: string }).__puppeteerResumeData;
        if (injected) {
          clearInterval(interval);
          try {
            setData(JSON.parse(injected) as Resume);
          } catch {
            setData(emptyResume());
          }
        }
      }, 20);
      return () => clearInterval(interval);
    } else if (token) {
      fetch(`/api/preview-data?token=${encodeURIComponent(token)}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((json) => setData(json as Resume))
        .catch(() => setData(emptyResume()));
    } else if (encoded) {
      try {
        const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
        const decoded = new TextDecoder().decode(bytes);
        setData(JSON.parse(decoded) as Resume);
      } catch {
        setData(emptyResume());
      }
    } else {
      setData(loadResume());
    }
  }, [params]);

  useEffect(() => {
    if (!data) return;
    // Signal to Puppeteer that render is done. waitForFunction polls this.
    (window as unknown as { __rirekishoReady?: boolean }).__rirekishoReady = true;

    // Auto-print when opened via the Download PDF button (?print=1)
    if (params.get("print") === "1") {
      document.fonts.ready.then(() => {
        setTimeout(() => {
          window.print();
          window.addEventListener("afterprint", () => window.close(), { once: true });
        }, 400);
      });
    }
  }, [data, template, params]);

  if (!data) return null;
  const meta = TEMPLATES[template];
  const pageSize = `${meta.paper} ${meta.orientation}`;
  return (
    <>
      <style>{`@page { size: ${pageSize}; margin: 0; }`}</style>
      <Sheet template={template} data={data} style={style} />
    </>
  );
}
