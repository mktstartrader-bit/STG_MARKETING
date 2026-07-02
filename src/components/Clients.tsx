"use client";

import { motion } from "framer-motion";
import { Reveal, staggerContainer, staggerItem } from "./Reveal";
import { Spark } from "./Icons";

const regions = [
  {
    name: "Asia Pacific",
    tag: "APAC",
    body: "Fast-moving, digital-first markets where coordinated strategy turns momentum into measurable growth.",
  },
  {
    name: "Middle East",
    tag: "MEA",
    body: "Relationship-led markets where trust, discretion and priority service define long-term partnerships.",
  },
  {
    name: "Africa",
    tag: "AFR",
    body: "High-opportunity regions where market identification and structure unlock new demand.",
  },
];

export function Clients() {
  return (
    <section id="clients" className="relative overflow-hidden py-28">
      {/* decorative globe rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 opacity-40">
        <div className="absolute inset-0 rounded-full border border-hairline" style={{ animation: "var(--animate-spin-slow)" }} />
        <div className="absolute inset-[12%] rounded-full border border-hairline" />
        <div className="absolute inset-[24%] rounded-full border border-glow/15" style={{ animation: "var(--animate-spin-slow)", animationDirection: "reverse", animationDuration: "40s" }} />
        <div className="absolute inset-[36%] rounded-full border border-hairline" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">Clients</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-chrome sm:text-4xl lg:text-5xl">
              Serving the{" "}
              <span className="text-gradient">
                Asia Pacific, Middle Eastern and African
              </span>{" "}
              regions.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-slate">
              We partner with clients across three of the world&apos;s most
              dynamic growth regions — adapting strategy to each market while
              keeping activity coordinated and under control.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {regions.map((r) => (
            <motion.div
              key={r.name}
              variants={staggerItem}
              className="glass lift group relative overflow-hidden p-8 text-center"
            >
              {/* map-dot texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(199,210,227,0.6) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  maskImage:
                    "radial-gradient(circle at 50% 30%, black, transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-hairline bg-navy/70">
                  <span className="relative flex items-center justify-center">
                    <span className="absolute h-8 w-8 animate-ping rounded-full bg-glow/30" />
                    <Spark className="relative h-6 w-6 text-glow" />
                  </span>
                </div>
                <div className="mt-5 text-xs font-semibold tracking-[0.3em] text-glow">
                  {r.tag}
                </div>
                <h3 className="mt-2 text-2xl font-extrabold text-offwhite">
                  {r.name}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate">
                  {r.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
