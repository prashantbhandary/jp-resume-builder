"use client";

import { useState } from "react";

/**
 * Character counter for the free-form rirekisho fields (自己PR / 志望動機).
 * Japanese is counted by character, so a target presented in characters is far
 * more useful than a word count. Counts with Array.from to handle surrogate
 * pairs (some kanji and emoji) correctly.
 */
const TARGETS = [
  { id: "jiko", label: "自己PR (Self-PR)", min: 200, max: 400 },
  { id: "shibo", label: "志望動機 (Motivation)", min: 150, max: 300 },
  { id: "free", label: "No target", min: 0, max: 0 },
];

export function CharacterCounter() {
  const [text, setText] = useState("");
  const [targetId, setTargetId] = useState("jiko");

  const chars = Array.from(text).length;
  const noSpace = Array.from(text.replace(/\s/g, "")).length;
  const lines = text === "" ? 0 : text.split(/\n/).length;
  const target = TARGETS.find((t) => t.id === targetId)!;
  const hasTarget = target.max > 0;
  const within = chars >= target.min && chars <= target.max;

  return (
    <div className="rounded-2xl border bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        {TARGETS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTargetId(t.id)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              targetId === t.id
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-white hover:bg-secondary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={7}
        placeholder="ここに文章を入力 / Paste or type your text here…"
        className="mt-4 w-full resize-y rounded-lg border bg-white px-3 py-2 text-base leading-relaxed outline-none focus:ring-2 focus:ring-ring font-jp"
        aria-label="Text to count"
      />

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <Stat value={chars} label="文字 (chars)" />
        <Stat value={noSpace} label="空白除く (no spaces)" />
        <Stat value={lines} label="行 (lines)" />
      </div>

      {hasTarget && (
        <p
          className={`mt-4 rounded-lg px-4 py-2 text-sm ${
            within ? "bg-secondary text-foreground" : "bg-amber-50 text-amber-800"
          }`}
        >
          Target for {target.label}: {target.min}–{target.max} characters.{" "}
          {chars === 0
            ? "Start typing to check the length."
            : within
              ? "Good length ✓"
              : chars < target.min
                ? `Add about ${target.min - chars} more.`
                : `Trim about ${chars - target.max}.`}
        </p>
      )}
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg bg-secondary px-2 py-3">
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="mt-0.5 text-[0.7rem] text-muted-foreground">{label}</p>
    </div>
  );
}
