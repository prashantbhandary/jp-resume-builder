/**
 * Free resume helper tools. Metadata only (no components) so the /tools hub,
 * the sitemap, and navigation can all read one source. Each tool has its own
 * page with the interactive widget plus explanatory content.
 */
export interface ToolMeta {
  slug: string;
  name: string;
  jp: string;
  blurb: string;
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "era-converter",
    name: "Japanese Era Converter",
    jp: "和暦・西暦 変換",
    blurb: "Convert between 令和 / 平成 / 昭和 and Western years instantly.",
  },
  {
    slug: "age-calculator",
    name: "Age (満年齢) Calculator",
    jp: "満年齢 計算",
    blurb: "Work out your age as of any date — the way a rirekisho needs it.",
  },
  {
    slug: "rirekisho-photo",
    name: "Rirekisho Photo Cropper",
    jp: "履歴書 写真 30×40",
    blurb: "Crop any photo to the 30×40 mm resume size, right in your browser.",
  },
  {
    slug: "self-pr-counter",
    name: "Self-PR Character Counter",
    jp: "自己PR 文字数カウント",
    blurb: "Count characters for 自己PR and 志望動機 against a target length.",
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
