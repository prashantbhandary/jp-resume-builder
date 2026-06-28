"use client";

import { Check } from "lucide-react";
import { TEMPLATES, type TemplateKey } from "@/lib/templates";
import { CATALOG, TEMPLATE_CATEGORIES } from "@/lib/templateCatalog";
import { TemplateThumb } from "@/components/templates/TemplateThumb";
import { useEditorI18n } from "@/lib/i18n";
import { FormSection } from "./forms/Field";

interface Props {
  /** Currently selected catalog preset (for highlighting). */
  selectedSlug: string | null;
  /** The underlying base layout the editor renders. */
  baseTemplate: TemplateKey;
  onSelect: (slug: string) => void;
}

/**
 * Template step. Shows the full catalog of layouts (the same set as the public
 * /templates gallery), grouped by situation. Each preset maps to one of the
 * editor's base forms; that base is shown on every card so it is clear which
 * underlying layout will render.
 */
export function TemplatePicker({ selectedSlug, baseTemplate, onSelect }: Props) {
  const { lang, copy } = useEditorI18n();

  // When arriving without an explicit preset (e.g. a stored base template),
  // highlight the first catalog entry that uses that base layout.
  const highlightedSlug =
    selectedSlug ?? CATALOG.find((t) => t.editorKey === baseTemplate)?.slug ?? null;

  return (
    <FormSection title={copy.template.title} description={copy.template.description}>
      <div className="space-y-6">
        {TEMPLATE_CATEGORIES.map((cat) => {
          const items = CATALOG.filter((t) => t.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {cat}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {items.map((t) => {
                  const active = t.slug === highlightedSlug;
                  return (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => onSelect(t.slug)}
                      className={`group relative flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                        active
                          ? "border-zinc-900 ring-1 ring-zinc-900 bg-zinc-50"
                          : "border-zinc-200 hover:border-zinc-400 bg-white"
                      }`}
                    >
                      <div className="w-12 shrink-0">
                        <TemplateThumb
                          orientation={t.orientation}
                          hue={t.hue}
                          paper={t.paper}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">
                          {lang === "jp" ? t.jp : t.name}
                        </div>
                        <div className="mt-0.5 truncate font-jp text-xs text-muted-foreground">
                          {lang === "jp" ? t.name : t.jp}
                        </div>
                        <div className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {TEMPLATES[t.editorKey].name} · {t.paper}
                        </div>
                      </div>
                      {active && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </FormSection>
  );
}
