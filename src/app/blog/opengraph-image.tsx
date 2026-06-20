import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "ResumeJP Blog — Japanese resume & part-time job guides";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Blog",
    title: "Japanese resume & part-time job guides",
    subtitle: "Honest, foreigner-aware advice for the Japanese job hunt",
  });
}
