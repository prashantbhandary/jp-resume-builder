import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Shokumukeirekisho (Japanese work-history sheet) templates and guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    variant: "brand",
    eyebrow: "Work history",
    title: "Shokumukeirekisho templates & guide",
    subtitle: "The three formats, what to write by profession, build it free",
  });
}
