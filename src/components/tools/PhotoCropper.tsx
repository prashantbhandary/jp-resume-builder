"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * In-browser rirekisho photo cropper. Loads a photo, lets the user drag and
 * zoom it inside a fixed 3:4 frame, and exports a 30×40 mm PNG at 300 dpi
 * (354×472 px). Everything happens on the client — the image never leaves the
 * browser, keeping the privacy promise.
 */
const FW = 240; // frame display width (px)
const FH = 320; // frame display height (3:4)
const OW = 354; // output width  (30 mm @ 300 dpi)
const OH = 472; // output height (40 mm @ 300 dpi)

export function PhotoCropper() {
  const imgRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  const [src, setSrc] = useState<string | null>(null);
  const [nat, setNat] = useState({ w: 0, h: 0 });
  const [base, setBase] = useState(1);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [whiteBg, setWhiteBg] = useState(true);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const cover = Math.max(FW / img.naturalWidth, FH / img.naturalHeight);
        setNat({ w: img.naturalWidth, h: img.naturalHeight });
        setBase(cover);
        setScale(cover);
        setPos({
          left: (FW - img.naturalWidth * cover) / 2,
          top: (FH - img.naturalHeight * cover) / 2,
        });
        setSrc(reader.result as string);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function onZoom(e: React.ChangeEvent<HTMLInputElement>) {
    const z = parseFloat(e.target.value);
    const next = base * z;
    // Keep the frame centre fixed while zooming.
    setPos((p) => ({
      left: FW / 2 - (FW / 2 - p.left) * (next / scale),
      top: FH / 2 - (FH / 2 - p.top) * (next / scale),
    }));
    setScale(next);
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, left: pos.left, top: pos.top };
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = dragRef.current;
    if (!d) return;
    setPos({ left: d.left + (e.clientX - d.x), top: d.top + (e.clientY - d.y) });
  }
  function onPointerUp() {
    dragRef.current = null;
  }

  function download() {
    const img = imgRef.current;
    if (!img) return;
    const canvas = document.createElement("canvas");
    canvas.width = OW;
    canvas.height = OH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (whiteBg) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, OW, OH);
    }
    const R = OW / FW;
    ctx.drawImage(img, pos.left * R, pos.top * R, nat.w * scale * R, nat.h * scale * R);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rirekisho-photo-30x40.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <div className="rounded-2xl border bg-white p-5 sm:p-6">
      {!src ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 text-center hover:bg-secondary">
          <span className="text-sm font-semibold">Choose a photo</span>
          <span className="mt-1 text-xs text-muted-foreground">
            JPG or PNG · stays in your browser
          </span>
          <input type="file" accept="image/*" onChange={onFile} className="hidden" />
        </label>
      ) : (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <div
              className="relative touch-none overflow-hidden rounded-lg border bg-secondary"
              style={{ width: FW, height: FH }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={src}
                alt="Your upload"
                draggable={false}
                className="absolute max-w-none select-none"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: nat.w * scale,
                  height: nat.h * scale,
                }}
              />
              {/* Cell guide overlay */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Drag to position · 30×40 mm frame
            </p>
          </div>

          <div className="w-full flex-1 space-y-4">
            <div>
              <label className="text-sm font-semibold">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                defaultValue={1}
                onChange={onZoom}
                className="mt-2 w-full"
                aria-label="Zoom"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={whiteBg}
                onChange={(e) => setWhiteBg(e.target.checked)}
              />
              White background
            </label>
            <div className="flex flex-wrap gap-2">
              <Button onClick={download}>Download 30×40 PNG</Button>
              <Button variant="outline" onClick={() => setSrc(null)}>
                Choose another
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Position your face centred with the top of your head near the top edge. The export is
              354×472 px — the correct size for the rirekisho photo cell at print quality.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
