"use client";

import { useState } from "react";

/**
 * Two-way Japanese era ⇄ Western year converter (和暦 ⇄ 西暦). Pure client-side
 * arithmetic — no network. Transition years resolve to the newer era, which is
 * the convention used on most resumes.
 */
const ERAS = [
  { name: "令和", romaji: "Reiwa", start: 2019 },
  { name: "平成", romaji: "Heisei", start: 1989 },
  { name: "昭和", romaji: "Showa", start: 1926 },
  { name: "大正", romaji: "Taisho", start: 1912 },
  { name: "明治", romaji: "Meiji", start: 1868 },
];

const FIELD =
  "w-full rounded-lg border bg-white px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring";
const CARD = "rounded-2xl border bg-white p-5 sm:p-6";

function westernToJapanese(year: number): string {
  if (!Number.isFinite(year) || year < 1868) return "—";
  const era = ERAS.find((e) => year >= e.start)!;
  const y = year - era.start + 1;
  return `${era.name}${y === 1 ? "元" : y}年  ·  ${era.romaji} ${y}`;
}

export function EraConverter() {
  const thisYear = new Date().getFullYear();
  const [western, setWestern] = useState(String(thisYear));
  const [eraName, setEraName] = useState(ERAS[0].name);
  const [eraYear, setEraYear] = useState("1");

  const wNum = parseInt(western, 10);
  const era = ERAS.find((e) => e.name === eraName)!;
  const eNum = parseInt(eraYear, 10);
  const westernFromEra =
    Number.isFinite(eNum) && eNum >= 1 ? era.start + eNum - 1 : null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className={CARD}>
        <label className="text-sm font-semibold">西暦 → 和暦 (Western → Japanese)</label>
        <input
          type="number"
          inputMode="numeric"
          value={western}
          onChange={(e) => setWestern(e.target.value)}
          className={`${FIELD} mt-3`}
          placeholder="e.g. 2026"
          aria-label="Western year"
        />
        <div className="mt-4 rounded-lg bg-secondary px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Result</p>
          <p className="mt-1 font-jp text-lg font-semibold">{westernToJapanese(wNum)}</p>
        </div>
      </div>

      <div className={CARD}>
        <label className="text-sm font-semibold">和暦 → 西暦 (Japanese → Western)</label>
        <div className="mt-3 flex gap-2">
          <select
            value={eraName}
            onChange={(e) => setEraName(e.target.value)}
            className={`${FIELD} max-w-[7rem] font-jp`}
            aria-label="Japanese era"
          >
            {ERAS.map((e) => (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={eraYear}
            onChange={(e) => setEraYear(e.target.value)}
            className={FIELD}
            placeholder="year"
            aria-label="Era year"
          />
        </div>
        <div className="mt-4 rounded-lg bg-secondary px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Result</p>
          <p className="mt-1 text-lg font-semibold">
            {westernFromEra ? `${westernFromEra} 年 (Western)` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
