"use client";

import { Spark } from "./Icons";

/* Deterministic pseudo-random so SSR and client match */
const sparks = Array.from({ length: 22 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  const r2 = ((i * 4099 + 3323) % 233280) / 233280;
  const r3 = ((i * 6151 + 1471) % 233280) / 233280;
  return {
    left: `${(r * 100).toFixed(2)}%`,
    top: `${(r2 * 100).toFixed(2)}%`,
    size: 4 + Math.round(r3 * 12),
    delay: `${(r * 5).toFixed(2)}s`,
    duration: `${(3 + r2 * 4).toFixed(2)}s`,
    opacity: 0.15 + r3 * 0.4,
  };
});

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#0e1a3a_0%,#070b18_45%,#050710_100%)]" />

      {/* aurora blobs */}
      <div
        className="absolute -top-40 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(29,78,216,0.55), transparent 65%)",
          animation: "var(--animate-aurora)",
        }}
      />
      <div
        className="absolute top-[40%] -left-40 h-[34rem] w-[34rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(74,144,255,0.32), transparent 65%)",
          animation: "var(--animate-aurora)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] h-[38rem] w-[38rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(29,78,216,0.28), transparent 65%)",
          animation: "var(--animate-aurora)",
          animationDelay: "-11s",
        }}
      />

      {/* grid */}
      <div className="grid-bg absolute inset-0" />

      {/* floating sparks */}
      {sparks.map((s, i) => (
        <Spark
          key={i}
          className="absolute text-glow"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${s.duration} ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* vignette + grain for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,5,12,0.75)_100%)]" />
    </div>
  );
}
