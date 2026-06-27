import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "自己PR and 志望動機 examples for a Japanese resume";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    variant: "brand",
    eyebrow: "Examples",
    title: "Self-PR & motivation examples",
    subtitle: "Editable samples by situation & profession, with translations",
  });
}
