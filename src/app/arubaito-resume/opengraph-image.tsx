import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Part-Time (Arubaito) Resume Maker — free Japanese rirekisho";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Part-time",
    title: "Part-time (arubaito) resume maker",
    subtitle: "Shift grid, residence status & motivation examples — free PDF",
  });
}
