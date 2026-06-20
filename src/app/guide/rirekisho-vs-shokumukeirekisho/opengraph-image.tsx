import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Rirekisho vs Shokumukeirekisho — Japan's two job documents explained";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    variant: "brand",
    eyebrow: "Guide",
    title: "Rirekisho vs Shokumukeirekisho",
    subtitle: "Japan's two job documents — and when you need each",
  });
}
