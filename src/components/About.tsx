"use client";

import { Reveal } from "./Reveal";
import { Target, Compass, Gauge } from "./Icons";

const pillars = [
  {
    icon: Target,
    title: "Measurement methods",
    body: "Clear metrics and reporting frameworks so every marketing decision is grounded in evidence, not guesswork.",
  },
  {
    icon: Compass,
    title: "Organizational alternatives",
    body: "We map the structures and routes to market that fit your business, then help you choose with confidence.",
  },
  {
    icon: Gauge,
    title: "Market-opportunity identification",
    body: "We surface where demand lives — turning coordinated activity into measurable control over growth.",
  },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.15fr]">
        {/* Left: heading */}
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <span className="eyebrow">About us</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-chrome sm:text-4xl lg:text-5xl">
              We help clients{" "}
              <span className="text-gradient">build and implement</span> their
              marketing strategies.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
              Our purpose is simple: to assist our clients as they build and
              implement their marketing strategies. We provide the measurement
              methods, organizational alternatives and market-opportunity
              identification that help them achieve coordinated activities and
              control.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              href="#services"
              className="btn-ghost mt-8 group"
            >
              See how we work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        {/* Right: pillar cards */}
        <div className="space-y-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} direction="left" delay={i * 0.1}>
              <div className="glass lift group flex gap-5 p-6 sm:p-7">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-hairline bg-navy/70">
                  <div className="absolute inset-0 rounded-xl bg-glow/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                  <p.icon className="relative h-6 w-6 text-glow" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-offwhite">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {p.body}
                  </p>
                </div>
                <span className="ml-auto self-start text-xs font-semibold text-hairline transition-colors group-hover:text-glow">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
