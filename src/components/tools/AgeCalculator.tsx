"use client";

import { useState } from "react";

/**
 * 満年齢 (completed-years age) calculator. Computes age as of a chosen "as of"
 * date — the date convention a rirekisho uses (現在 / as of submission), which
 * is where applicants commonly make an off-by-one error.
 */
const FIELD =
  "w-full rounded-lg border bg-white px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring";

function calcAge(birth: string, asOf: string): number | null {
  if (!birth || !asOf) return null;
  const b = new Date(birth);
  const a = new Date(asOf);
  if (Number.isNaN(b.getTime()) || Number.isNaN(a.getTime()) || a < b) return null;
  let age = a.getFullYear() - b.getFullYear();
  const beforeBirthday =
    a.getMonth() < b.getMonth() ||
    (a.getMonth() === b.getMonth() && a.getDate() < b.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export function AgeCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [birth, setBirth] = useState("");
  const [asOf, setAsOf] = useState(today);

  const age = calcAge(birth, asOf);

  return (
    <div className="rounded-2xl border bg-white p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">生年月日 (Date of birth)</label>
          <input
            type="date"
            value={birth}
            max={asOf}
            onChange={(e) => setBirth(e.target.value)}
            className={`${FIELD} mt-2`}
            aria-label="Date of birth"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">現在の日付 (As of)</label>
          <input
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            className={`${FIELD} mt-2`}
            aria-label="As-of date"
          />
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-secondary px-4 py-4 text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">満年齢 · Age</p>
        <p className="mt-1 text-3xl font-bold tabular-nums">
          {age === null ? "—" : `${age} 歳`}
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        On a rirekisho, write your age as of the date you submit it — set the &ldquo;as of&rdquo; date
        to your interview or submission date to get it exactly right.
      </p>
    </div>
  );
}
