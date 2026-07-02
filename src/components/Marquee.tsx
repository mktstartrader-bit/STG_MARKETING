"use client";

import { Spark } from "./Icons";

const items = [
  "MARKETING STRATEGY",
  "CUSTOMER SERVICES",
  "BUSINESS REFERRAL",
  "CLIENT RELATIONSHIP MANAGEMENT",
  "ASIA PACIFIC",
  "MIDDLE EAST",
  "AFRICA",
  "REGULATED INDUSTRIES",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-hairline bg-panel/30 py-5">
      <div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animation: "var(--animate-marquee)" }}
      >
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-sm font-semibold tracking-[0.25em] text-slate/70 transition-colors hover:text-offwhite">
              {t}
            </span>
            <Spark className="h-3.5 w-3.5 shrink-0 text-glow/60" />
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent" />
    </div>
  );
}
