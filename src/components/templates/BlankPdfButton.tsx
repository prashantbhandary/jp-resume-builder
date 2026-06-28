"use client";

import { useState } from "react";
import { Printer, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { downloadServerPdf } from "@/lib/pdf";
import { emptyResume } from "@/lib/schema";
import { DEFAULT_SHEET_STYLE } from "@/lib/sheet-style";
import type { TemplateKey } from "@/lib/templates";

/**
 * Downloads a blank PDF of the given template directly from the gallery —
 * POSTs an empty resume to the same /api/pdf renderer the editor uses. On
 * failure (e.g. the render service is unavailable) it points the user to the
 * editor, where the same export lives with a client-side fallback.
 */
export function BlankPdfButton({
  editorKey,
  label = "Download blank PDF",
}: {
  editorKey: TemplateKey;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (busy) return;
    setBusy(true);
    try {
      await downloadServerPdf({
        resume: emptyResume(),
        template: editorKey,
        style: DEFAULT_SHEET_STYLE,
        filename: `rirekisho-${editorKey}-blank.pdf`,
        blank: true,
      });
    } catch (e) {
      console.error(e);
      toast.error("Could not generate the blank PDF — open it in the editor to download.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-60"
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Printer className="h-3.5 w-3.5" />
      )}
      {busy ? "Preparing…" : label}
    </button>
  );
}
