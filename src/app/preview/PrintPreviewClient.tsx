"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sheet } from "@/components/rirekisho/Sheet";
import { emptyResume, type Resume } from "@/lib/schema";
import { loadResume } from "@/lib/storage";
import { TEMPLATES, type TemplateKey, loadTemplate } from "@/lib/templates";
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

  useEffect(() => {
    const t = (params.get("template") as TemplateKey | null) ?? loadTemplate();
    setTemplate(t in TEMPLATES ? t : "jis-a3");

    const token = params.get("token");
    const encoded = params.get("data");
    const isPuppeteer = params.get("puppeteer") === "1";

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
    if (data) {
      // Signal to Puppeteer that render is done. waitForFunction polls this.
      (window as unknown as { __rirekishoReady?: boolean }).__rirekishoReady = true;
    }
  }, [data, template]);

  if (!data) return null;
  const meta = TEMPLATES[template];
  const pageSize = `${meta.paper} ${meta.orientation}`;
  return (
    <>
      <style>{`@page { size: ${pageSize}; margin: 0; }`}</style>
      <Sheet template={template} data={data} />
    </>
  );
}
