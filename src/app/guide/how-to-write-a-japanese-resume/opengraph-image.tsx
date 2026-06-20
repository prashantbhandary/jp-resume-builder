import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "How to write a Japanese resume (rirekisho) — step-by-step guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    variant: "brand",
    eyebrow: "Guide",
    title: "How to write a Japanese resume",
    subtitle: "Step-by-step rirekisho guide — photo, dates, history & self-PR",
  });
}
