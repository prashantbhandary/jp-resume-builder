"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Edit3,
  Eraser,
  FileDown,
  FileText,
  Home,
  Loader2,
  MoreVertical,
  ShieldCheck,
  Type,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalResume } from "@/lib/storage";
import { TEMPLATES, type TemplateKey } from "@/lib/templates";
import { getCatalogTemplate } from "@/lib/templateCatalog";
import { useTemplate } from "@/lib/templates-hook";
import {
  useSheetStyle,
  FONT_OPTIONS,
  WEIGHT_OPTIONS,
  type SheetStyle,
} from "@/lib/sheet-style";
import {
  useLang,
  EDITOR_COPY,
  EditorI18nProvider,
  useEditorI18n,
  type Lang,
} from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";
import { emptyResume } from "@/lib/schema";
import { downloadSheetPdf, downloadServerPdf } from "@/lib/pdf";
import { extractResumeFromPdfBytes, parseResumeJson } from "@/lib/resume-pdf-data";
import { Sheet } from "@/components/rirekisho/Sheet";
import { PersonalForm } from "./forms/PersonalForm";
import { EducationForm } from "./forms/EducationForm";
import { WorkForm } from "./forms/WorkForm";
import { LicensesForm } from "./forms/LicensesForm";
import { ExtrasForm } from "./forms/ExtrasForm";
import { TemplatePicker } from "./TemplatePicker";
import { Preview } from "./Preview";
import { translateResume } from "@/lib/translate-client";
import { sampleResume } from "@/lib/sample";
import { toast } from "sonner";
import "@/components/rirekisho/sheet.css";

type StepKey =
  | "template"
  | "personal"
  | "education"
  | "work"
  | "licenses"
  | "extras"
  | "preview";

interface Step {
  key: StepKey;
  label: string;
  jp: string;
}

const STEPS: Step[] = [
  { key: "template", label: "Template", jp: "テンプレート" },
  { key: "personal", label: "Personal", jp: "基本情報" },
  { key: "education", label: "Education", jp: "学歴" },
  { key: "work", label: "Work", jp: "職歴" },
  { key: "licenses", label: "Licenses", jp: "免許・資格" },
  { key: "extras", label: "Self PR · Prefs", jp: "自己PR・希望" },
  { key: "preview", label: "Preview", jp: "確認" },
];

export function EditorClient() {
  const [data, setData, hydrated] = useLocalResume();
  const [template, setTemplate, tHydrated] = useTemplate();
  const [style, setStyle, sHydrated] = useSheetStyle();
  const [showClearModal, setShowClearModal] = useState(false);
  const [lang, setLang, lHydrated] = useLang();
  const [stepKey, setStepKey] = useState<StepKey>("template");
  const [busy, setBusy] = useState<null | "translate" | "pdf" | "tex">(null);
  const [downloaded, setDownloaded] = useState(false);
  // Which catalog preset is selected (the editor renders its base layout).
  const [catalogSlug, setCatalogSlug] = useState<string | null>(null);
  const t = EDITOR_COPY[lang];

  function selectCatalog(slug: string) {
    const c = getCatalogTemplate(slug);
    if (!c) return;
    setCatalogSlug(slug);
    setTemplate(c.editorKey);
  }

  // Deep-link support: /editor?template=<slug|key> pre-selects a layout (used by
  // the templates gallery). Runs once on mount; the URL wins over any prior choice.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("template");
    if (!param) return;
    const c = getCatalogTemplate(param);
    if (c) {
      setCatalogSlug(c.slug);
      setTemplate(c.editorKey);
    } else if (param in TEMPLATES) {
      setTemplate(param as TemplateKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hydrated || !tHydrated || !sHydrated || !lHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const stepIndex = STEPS.findIndex((s) => s.key === stepKey);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;
  const isPreview = stepKey === "preview";

  function go(delta: number) {
    const next = Math.max(0, Math.min(STEPS.length - 1, stepIndex + delta));
    setStepKey(STEPS[next].key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function jumpTo(key: StepKey) {
    setStepKey(key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function downloadPdf() {
    setBusy("pdf");
    try {
      // Pixel-perfect server render (real Chromium) — in-page download.
      await downloadServerPdf({ resume: data, template, style, filename: "rirekisho.pdf" });
      setDownloaded(true);
      toast.success(t.toasts.pdfDownloaded);
    } catch (serverErr) {
      console.error("server pdf failed, falling back to capture", serverErr);
      try {
        const el = document.querySelector<HTMLElement>("[data-sheet-capture]");
        if (!el) throw new Error(t.toasts.sheetNotFound);
        await downloadSheetPdf(el, TEMPLATES[template], "rirekisho.pdf", data);
        setDownloaded(true);
        toast.success(t.toasts.pdfDownloaded);
      } catch (e) {
        console.error(e);
        toast.error(e instanceof Error ? e.message : t.toasts.pdfFailed);
      }
    } finally {
      setBusy(null);
    }
  }

  async function downloadTemplate() {
    setBusy("pdf");
    try {
      await downloadServerPdf({
        resume: emptyResume(),
        template,
        style,
        filename: "rirekisho-blank-template.pdf",
        blank: true,
      });
      toast.success(t.toasts.templateDownloaded);
    } catch (serverErr) {
      console.error("server template failed, falling back to capture", serverErr);
      try {
        const el = document.querySelector<HTMLElement>("[data-sheet-template-capture]");
        if (!el) throw new Error(t.toasts.sheetNotFound);
        await downloadSheetPdf(el, TEMPLATES[template], "rirekisho-blank-template.pdf");
        toast.success(t.toasts.templateDownloaded);
      } catch (e) {
        console.error(e);
        toast.error(e instanceof Error ? e.message : t.toasts.templateFailed);
      }
    } finally {
      setBusy(null);
    }
  }

  function importFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf,application/json,.pdf,.json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const isPdf =
        file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      try {
        if (isPdf) {
          const restored = extractResumeFromPdfBytes(new Uint8Array(await file.arrayBuffer()));
          if (restored) {
            setData(restored);
            toast.success(t.toasts.imported);
          } else {
            toast.error(t.toasts.pdfNoData);
          }
        } else {
          const restored = parseResumeJson(await file.text());
          if (restored) {
            setData(restored);
            toast.success(t.toasts.imported);
          } else {
            toast.error(t.toasts.invalidJson);
          }
        }
      } catch {
        toast.error(t.toasts.invalidJson);
      }
    };
    input.click();
  }

  async function translateAll() {
    setBusy("translate");
    try {
      const translated = await translateResume(data);
      setData(translated);
      toast.success(t.toasts.translated);
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : t.toasts.translateFailed);
    } finally {
      setBusy(null);
    }
  }

  function loadSample() {
    setData(sampleResume());
    toast.success(t.toasts.sampleLoaded);
  }

  function clearData() {
    setShowClearModal(true);
  }

  function confirmClear() {
    setShowClearModal(false);
    setData(emptyResume());
    toast.success(t.toasts.cleared);
  }

  function returnHome() {
    // Returning home after a download starts a fresh resume.
    setData(emptyResume());
  }

  return (
    <EditorI18nProvider value={{ lang, copy: t }}>
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <AnimatePresence>{busy === "pdf" && <PdfLoadingOverlay />}</AnimatePresence>
      <AnimatePresence>
        {showClearModal && (
          <ClearConfirmModal
            copy={t}
            onConfirm={confirmClear}
            onCancel={() => setShowClearModal(false)}
          />
        )}
      </AnimatePresence>
      <Header
        onImport={importFile}
        onSample={loadSample}
        onClear={clearData}
        onTranslate={translateAll}
        busy={busy}
        lang={lang}
        onLangChange={setLang}
      />

      <Stepper currentIndex={stepIndex} onJump={jumpTo} />

      <main className={`flex-1 ${isPreview ? "" : "px-3 sm:px-4 lg:px-8 py-4 sm:py-8"}`}>
        {isPreview ? (
          <PreviewStep
            data={data}
            template={template}
            style={style}
            onStyleChange={setStyle}
            onBack={() => jumpTo("extras")}
            onEdit={() => jumpTo("personal")}
            onDownloadPdf={downloadPdf}
            onDownloadTemplate={downloadTemplate}
            onReturnHome={returnHome}
            busy={busy}
            downloaded={downloaded}
            onResetDownload={() => setDownloaded(false)}
          />
        ) : (
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {stepKey === "template" && (
                  <TemplatePicker
                    selectedSlug={catalogSlug}
                    baseTemplate={template}
                    onSelect={selectCatalog}
                  />
                )}
                {stepKey === "personal" && <PersonalForm data={data} setData={setData} />}
                {stepKey === "education" && <EducationForm data={data} setData={setData} />}
                {stepKey === "work" && <WorkForm data={data} setData={setData} />}
                {stepKey === "licenses" && <LicensesForm data={data} setData={setData} />}
                {stepKey === "extras" && <ExtrasForm data={data} setData={setData} />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 sm:mt-8 flex items-center justify-between gap-2">
              <Button
                variant="outline"
                onClick={() => go(-1)}
                disabled={isFirst}
                className="gap-2 h-11 px-4 sm:px-6 touch-manipulation"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.nav.back}
              </Button>

              <div className="text-xs text-muted-foreground">
                {t.nav.stepOf(stepIndex + 1, STEPS.length)}
              </div>

              <Button onClick={() => go(1)} disabled={isLast} className="gap-2 h-11 px-4 sm:px-6 touch-manipulation">
                {stepIndex === STEPS.length - 2 ? t.nav.review : t.nav.next}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
    </EditorI18nProvider>
  );
}

function Header({
  onImport,
  onSample,
  onClear,
  onTranslate,
  busy,
  lang,
  onLangChange,
}: {
  onImport: () => void;
  onSample: () => void;
  onClear: () => void;
  onTranslate: () => void;
  busy: null | "translate" | "pdf" | "tex";
  lang: Lang;
  onLangChange: (l: Lang) => void;
}) {
  const { copy } = useEditorI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-white px-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden xs:inline">{copy.header.home}</span>
        </Link>
        <span className="text-muted-foreground hidden sm:inline">·</span>
        <span className="font-medium tracking-tight text-sm hidden sm:inline truncate">
          <span className="font-jp mr-1.5">履歴書</span>Builder
        </span>
        <span className="ml-1 hidden lg:inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3 w-3" /> {copy.header.autosaved}
        </span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <LangToggle lang={lang} onChange={onLangChange} />
        <Button size="sm" variant="ghost" onClick={onSample} className="hidden sm:flex">
          {copy.header.loadSample}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClear}
          className="hidden sm:flex text-muted-foreground hover:text-destructive"
        >
          <Eraser className="h-3.5 w-3.5" />
          <span className="hidden md:inline">{copy.header.clear}</span>
        </Button>
        <Button size="sm" variant="outline" onClick={onImport} className="hidden sm:flex">
          <Upload className="h-3.5 w-3.5" />
          <span className="hidden md:inline">{copy.header.import}</span>
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={onTranslate}
          disabled={busy === "translate"}
        >
          {busy === "translate" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <span className="font-jp text-[11px]">あ→日</span>
          )}
          <span className="hidden sm:inline">{copy.header.translate}</span>
        </Button>

        {/* Mobile overflow menu for the secondary actions hidden above. */}
        <div className="relative sm:hidden">
          <Button
            size="icon"
            variant="ghost"
            aria-label="More actions"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-44 overflow-hidden rounded-lg border bg-white py-1 text-sm shadow-lg">
                <button
                  onClick={() => { setMenuOpen(false); onSample(); }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 hover:bg-zinc-50"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" /> {copy.header.loadSample}
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onImport(); }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 hover:bg-zinc-50"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" /> {copy.header.import}
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onClear(); }}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-destructive hover:bg-red-50"
                >
                  <Eraser className="h-4 w-4" /> {copy.header.clear}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Stepper({
  currentIndex,
  onJump,
}: {
  currentIndex: number;
  onJump: (key: StepKey) => void;
}) {
  const { lang } = useEditorI18n();
  const prevStep = currentIndex > 0 ? STEPS[currentIndex - 1] : null;
  const nextStep = currentIndex < STEPS.length - 1 ? STEPS[currentIndex + 1] : null;
  const progress = ((currentIndex + 1) / STEPS.length) * 100;

  return (
    <nav className="sticky top-14 z-20 bg-white border-b">
      {/* Progress bar */}
      <div className="h-1 w-full bg-zinc-100">
        <div
          className="h-full bg-zinc-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-2 sm:px-3 lg:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
        {/* Quick prev button */}
        <button
          onClick={() => prevStep && onJump(prevStep.key)}
          disabled={!prevStep}
          aria-label="Previous step"
          className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg border bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>

        {/* Steps — scrollable on mobile */}
        <div className="flex-1 overflow-x-auto scrollbar-none">
          <ol className="flex items-center gap-0.5 sm:gap-1 min-w-max">
            {STEPS.map((s, i) => {
              const isDone = i < currentIndex;
              const isActive = i === currentIndex;
              return (
                <li key={s.key} className="flex items-center">
                  <button
                    onClick={() => onJump(s.key)}
                    title={`${s.label} · ${s.jp}`}
                    className={`group flex items-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-all ${
                      isActive
                        ? "bg-zinc-900 text-white shadow-sm"
                        : isDone
                          ? "text-zinc-700 hover:bg-emerald-50 hover:text-emerald-900"
                          : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] sm:text-[11px] font-semibold ${
                        isActive
                          ? "bg-white text-zinc-900"
                          : isDone
                            ? "bg-emerald-500 text-white"
                            : "bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300"
                      }`}
                    >
                      {isDone ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <span
                      className={`font-medium whitespace-nowrap ${lang === "jp" ? "font-jp" : ""}`}
                    >
                      {lang === "jp" ? s.jp : s.label}
                    </span>
                    {lang === "en" && (
                      <span
                        className={`font-jp text-[10px] hidden xl:inline ${
                          isActive ? "opacity-80" : "opacity-60"
                        }`}
                      >
                        {s.jp}
                      </span>
                    )}
                  </button>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-300 mx-0 sm:mx-0.5 flex-shrink-0" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Quick next button */}
        <button
          onClick={() => nextStep && onJump(nextStep.key)}
          disabled={!nextStep}
          aria-label="Next step"
          className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg border bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </nav>
  );
}

function PreviewStep({
  data,
  template,
  style,
  onStyleChange,
  onBack,
  onEdit,
  onDownloadPdf,
  onDownloadTemplate,
  onReturnHome,
  busy,
  downloaded,
  onResetDownload,
}: {
  data: import("@/lib/schema").Resume;
  template: TemplateKey;
  style: SheetStyle;
  onStyleChange: (s: SheetStyle) => void;
  onBack: () => void;
  onEdit: () => void;
  onDownloadPdf: () => void;
  onDownloadTemplate: () => void;
  onReturnHome: () => void;
  busy: null | "translate" | "pdf" | "tex";
  downloaded: boolean;
  onResetDownload: () => void;
}) {
  const meta = TEMPLATES[template];
  const { lang, copy } = useEditorI18n();
  const c = copy.preview;
  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="border-b bg-white px-4 lg:px-8 py-4">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-semibold">{c.title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-medium">{lang === "jp" ? meta.jp : meta.name}</span>
              {lang === "en" && <span className="font-jp ml-1">({meta.jp})</span>} · {meta.paper}{" "}
              {meta.orientation}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" /> {c.back}
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit} className="gap-1.5">
              <Edit3 className="h-3.5 w-3.5" /> {c.edit}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDownloadTemplate}
              disabled={busy === "pdf"}
              className="gap-1.5"
              title={c.downloadTemplateTitle}
            >
              <FileDown className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{c.downloadTemplate}</span>
              <span className="sm:hidden">{copy.template.title}</span>
            </Button>
            <Button
              size="sm"
              onClick={onDownloadPdf}
              disabled={busy === "pdf"}
              className="gap-1.5"
            >
              {busy === "pdf" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {c.downloadPdf}
            </Button>
          </div>
        </div>
      </div>

      {/* Typography controls */}
      <StyleControls style={style} onChange={onStyleChange} />

      {/* Preview area */}
      <div className="flex-1 bg-zinc-200 py-6 px-3 sm:py-8 sm:px-4 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Preview data={data} template={template} style={style} />
        </div>
      </div>

      {/* Off-screen blank sheet captured by "Download template". Rendered at
          full natural size so the PDF matches the real form dimensions. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          top: 0,
          pointerEvents: "none",
        }}
      >
        <div data-sheet-template-capture>
          <Sheet template={template} data={emptyResume()} style={style} />
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="border-t bg-white px-4 lg:px-8 py-4">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {downloaded ? (
              <motion.div
                key="downloaded"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                  <Check className="h-4 w-4" strokeWidth={3} />
                  {c.downloadedOk}
                </div>
                <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => { onResetDownload(); onDownloadPdf(); }}
                    disabled={busy === "pdf"}
                    className="gap-2 flex-1 sm:flex-none"
                  >
                    {busy === "pdf" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {c.downloadAgain}
                  </Button>
                  <Button asChild className="gap-2 flex-1 sm:flex-none">
                    <Link href="/" onClick={onReturnHome}>
                      <Home className="h-4 w-4" />
                      {c.returnHome}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between gap-3"
              >
                <Button variant="outline" onClick={onBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{c.backToEditing}</span>
                  <span className="sm:hidden">{c.back}</span>
                </Button>
                <Button
                  onClick={onDownloadPdf}
                  disabled={busy === "pdf"}
                  className="gap-2"
                >
                  {busy === "pdf" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {c.downloadPdf}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact toolbar letting the user pick the sheet font (5 common Japanese
 * typefaces) and one of 3 boldness levels. Changes apply live to the preview
 * and therefore to the downloaded PDF.
 */
function StyleControls({
  style,
  onChange,
}: {
  style: SheetStyle;
  onChange: (s: SheetStyle) => void;
}) {
  const { copy } = useEditorI18n();
  const c = copy.preview;
  const weightName: Record<string, string> = {
    light: c.weightLight,
    normal: c.weightMedium,
    bold: c.weightBold,
  };
  return (
    <div className="border-b bg-white px-4 lg:px-8 py-3">
      <div className="mx-auto max-w-6xl flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
          <Type className="h-3.5 w-3.5" />
          <span>{c.typography}</span>
        </div>

        {/* Font picker */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-zinc-500 shrink-0">{c.font}</span>
          <div className="flex flex-wrap gap-1.5">
            {FONT_OPTIONS.map((f) => {
              const active = style.font === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => onChange({ ...style, font: f.key })}
                  title={`${f.name} · ${f.jp}`}
                  className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <span className="font-jp" style={{ fontFamily: f.stack }}>
                    {f.jp}
                  </span>
                  <span className="ml-1.5 hidden md:inline opacity-70">{f.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Boldness picker */}
        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="text-xs text-zinc-500 shrink-0">{c.boldness}</span>
          <div className="flex gap-1.5">
            {WEIGHT_OPTIONS.map((w) => {
              const active = style.weight === w.key;
              return (
                <button
                  key={w.key}
                  onClick={() => onChange({ ...style, weight: w.key })}
                  className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                    active
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }`}
                  style={{ fontWeight: w.weight }}
                >
                  {weightName[w.key] ?? w.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClearConfirmModal({
  copy,
  onConfirm,
  onCancel,
}: {
  copy: import("@/lib/i18n").EditorCopy;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      key="clear-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 8 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="w-full max-w-sm rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex flex-col items-center px-6 pt-7 pb-5 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <Eraser className="h-5 w-5 text-red-500" />
          </div>
          <h2 className="text-base font-semibold text-zinc-900">
            {copy.toasts.clearConfirm.split("?")[0]}?
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            {copy.toasts.clearConfirmDetail}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-5 pb-5">
          <Button
            variant="outline"
            className="flex-1 h-11 touch-manipulation"
            onClick={onCancel}
          >
            {copy.toasts.clearCancel}
          </Button>
          <Button
            className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white touch-manipulation border-0"
            onClick={onConfirm}
          >
            {copy.toasts.clearOk}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const PDF_MESSAGES = [
  "Rendering your resume…",
  "Loading Japanese fonts…",
  "Laying out your 履歴書…",
  "Generating PDF…",
  "Almost ready…",
];

function PdfLoadingOverlay() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setMsgIdx((i) => (i + 1) % PDF_MESSAGES.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-5 w-72"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="text-5xl select-none"
        >
          📄
        </motion.div>

        <div className="text-center space-y-1.5">
          <p className="font-semibold text-base">Generating PDF</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-muted-foreground min-h-[1.25rem]"
            >
              {PDF_MESSAGES[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-zinc-900 rounded-full"
            initial={{ width: "4%" }}
            animate={{ width: "88%" }}
            transition={{ duration: 14, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
