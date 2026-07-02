"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Reveal, staggerContainer, staggerItem } from "./Reveal";
import { Check } from "./Icons";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const benefits = [
  {
    title: "Agree a budget",
    body: "We start by setting a clear, realistic budget — the foundation for everything that follows.",
  },
  {
    title: "Clarity and alignment on long-term marketing goals",
    body: "Everyone rows in the same direction, with goals defined for the long term, not just the next quarter.",
  },
  {
    title: "Consistent marketing plan",
    body: "A steady, repeatable plan replaces ad-hoc activity — coordinated and always on-brand.",
  },
  {
    title: "Priority account status",
    body: "You get priority attention and a dedicated relationship, not a ticket in a queue.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        {/* Left: the claim + counter visual */}
        <div>
          <Reveal>
            <span className="eyebrow">Experienced</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-chrome sm:text-4xl lg:text-5xl">
              A board built on{" "}
              <span className="text-gradient">two decades</span> at the top.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
              Our board of directors has over 20 years of CEO and C-Level
              experience in regulated companies — the kind of judgment that only
              comes from having sat in the chair.
            </p>
          </Reveal>

          {/* Counter medallion */}
          <Reveal delay={0.18} direction="none">
            <div className="relative mt-12 flex items-center gap-8">
              <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full border border-glow/25"
                  style={{ animation: "var(--animate-spin-slow)" }}
                />
                <div
                  className="absolute inset-3 rounded-full border border-dashed border-chrome/15"
                  style={{
                    animation: "var(--animate-spin-slow)",
                    animationDirection: "reverse",
                  }}
                />
                <div className="absolute inset-6 rounded-full bg-glow/10 blur-md" />
                <div className="relative text-center">
                  <div className="text-5xl font-extrabold text-chrome">
                    <CountUp to={20} suffix="+" />
                  </div>
                  <div className="text-[0.65rem] font-semibold tracking-[0.2em] text-slate">
                    YEARS
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { k: "CEO", v: "& C-Level leadership" },
                  { k: "Regulated", v: "industry expertise" },
                ].map((x) => (
                  <div key={x.k}>
                    <div className="text-lg font-semibold text-offwhite">
                      {x.k}
                    </div>
                    <div className="text-sm text-slate">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: benefits checklist */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4"
        >
          {benefits.map((b, i) => (
            <motion.li
              key={b.title}
              variants={staggerItem}
              className="glass lift group flex gap-4 p-5 sm:p-6"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-glow to-electric text-white shadow-[0_6px_18px_-6px_rgba(74,144,255,0.9)]">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-offwhite">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">
                  {b.body}
                </p>
              </div>
              <span className="ml-auto self-center text-sm font-semibold text-hairline transition-colors group-hover:text-glow">
                0{i + 1}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
