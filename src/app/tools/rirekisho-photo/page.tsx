import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { PhotoCropper } from "@/components/tools/PhotoCropper";

const SITE_URL = "https://www.resumejp.com";
const PAGE_URL = `${SITE_URL}/tools/rirekisho-photo`;

export const metadata: Metadata = {
  title: "Rirekisho Photo Cropper — 30×40 mm Resume Photo Maker",
  description:
    "Free in-browser tool to crop any photo to the 30×40 mm Japanese resume (履歴書) size. Drag, zoom, and download a print-ready 354×472 px photo. Nothing is uploaded — it all stays in your browser.",
  keywords: [
    "履歴書 写真 サイズ",
    "rirekisho photo size",
    "30x40 photo maker",
    "Japanese resume photo crop",
    "証明写真 サイズ 変換",
    "resume photo 30x40 mm",
  ],
  alternates: { canonical: "/tools/rirekisho-photo" },
};

function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "Photo Cropper", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Rirekisho Photo Cropper (30×40 mm)",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        publisher: { "@id": `${SITE_URL}/#org` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}

const H2 = "mt-10 text-xl sm:text-2xl font-semibold tracking-tight";
const P = "mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed";

export default function PhotoCropperPage() {
  return (
    <MarketingShell>
      <JsonLd />
      <article>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
          Rirekisho Photo Cropper
          <span className="block mt-1 text-lg sm:text-2xl text-muted-foreground font-normal">
            履歴書 写真 — crop to 30×40 mm in your browser
          </span>
        </h1>
        <p className={P}>
          Upload a photo, drag and zoom to position your face, and download it at the exact 30×40 mm
          size the Japanese resume photo cell needs. Your image never leaves your device.
        </p>

        <div className="mt-6">
          <PhotoCropper />
        </div>

        <h2 className={H2}>The rirekisho photo rules</h2>
        <ul className="mt-3 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed list-disc pl-5">
          <li>Size: 30 mm wide × 40 mm tall (this tool exports 354×472 px at 300 dpi).</li>
          <li>Plain, light background — white, pale blue, or grey.</li>
          <li>Front-facing, business attire, neutral expression, taken within 3 months.</li>
          <li>Face centred, with a little space above your head.</li>
        </ul>
        <p className={P}>
          For the full checklist and tips on taking a good photo with your phone, see{" "}
          <Link href="/blog/rirekisho-photo-rules" className="underline hover:text-primary">
            rirekisho photo rules
          </Link>
          .
        </p>

        <h2 className={H2}>How to use it</h2>
        <ol className="mt-3 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed list-decimal pl-5">
          <li>Choose a clear, front-facing photo.</li>
          <li>Drag the image and use the zoom slider until your head and shoulders sit in the frame.</li>
          <li>Keep &ldquo;white background&rdquo; on for a clean fill behind transparent edges.</li>
          <li>Download the PNG and add it to your resume or print it.</li>
        </ol>

        <h2 className={H2}>Add it to your resume</h2>
        <p className={P}>
          You can drop the cropped photo straight into the{" "}
          <Link href="/editor" className="underline hover:text-primary">
            free editor
          </Link>
          , which places it in the correct cell for every template, then export a print-ready PDF.
          Browse more{" "}
          <Link href="/tools" className="underline hover:text-primary">
            resume tools
          </Link>{" "}
          too.
        </p>
      </article>
    </MarketingShell>
  );
}
