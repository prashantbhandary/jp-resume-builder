import type { Resume } from "./schema";
import type { TemplateKey, TemplateMeta } from "./templates";
import type { SheetStyle } from "./sheet-style";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Server-rendered PDF: POSTs the resume to /api/pdf where headless Chromium
 * renders the real /preview page (pixel-identical to the editor preview, with
 * none of the html2canvas text-baseline artifacts) and streams back a PDF that
 * downloads in-page. Throws on any non-OK response so callers can fall back to
 * the client-side capture.
 */
export async function downloadServerPdf(opts: {
  resume: Resume;
  template: TemplateKey;
  style: SheetStyle;
  filename: string;
  blank?: boolean;
}): Promise<void> {
  const res = await fetch("/api/pdf", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      resume: opts.resume,
      template: opts.template,
      style: opts.style,
      blank: opts.blank ?? false,
    }),
  });
  if (!res.ok) throw new Error(`PDF service returned ${res.status}`);
  triggerDownload(await res.blob(), opts.filename);
}

/**
 * Rasterises an on-screen sheet element to a single-page PDF sized to the
 * given template and triggers a download. Shared by the editor's "Download
 * PDF" / "Download template" actions and the landing-page template gallery.
 *
 * The element is captured at its natural (un-transformed) size so the output
 * matches the real form dimensions regardless of any preview scaling.
 */
export async function downloadSheetPdf(
  el: HTMLElement,
  meta: TemplateMeta,
  filename: string,
): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const savedTransform = el.style.transform;
  el.style.transform = "none";

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });
  } finally {
    el.style.transform = savedTransform;
  }

  const pdf = new jsPDF({
    orientation: meta.orientation === "landscape" ? "landscape" : "portrait",
    unit: "mm",
    format: meta.paper.toLowerCase() as "a3" | "a4",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.97);
  pdf.addImage(imgData, "JPEG", 0, 0, meta.widthMm, meta.heightMm);

  triggerDownload(pdf.output("blob"), filename);
}
