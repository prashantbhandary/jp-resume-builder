import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Free Japanese resume templates — JIS, MHLW, part-time & English CV";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    variant: "brand",
    eyebrow: "Templates",
    title: "Free Japanese resume templates",
    subtitle: "JIS, MHLW, new-grad, mid-career, part-time & English CV",
  });
}
