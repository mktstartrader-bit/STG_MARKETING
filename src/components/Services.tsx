"use client";

import { motion } from "framer-motion";
import type { MouseEvent } from "react";
import { useState } from "react";
import { Reveal, staggerContainer, staggerItem } from "./Reveal";
import { Megaphone, Headset, Handshake, Users } from "./Icons";
import type { ComponentType, SVGProps } from "react";

type Service = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  points: string[];
};

const services: Service[] = [
  {
    icon: Megaphone,
    title: "Marketing",
    body: "End-to-end marketing strategy and execution — from positioning and campaigns to the reporting that keeps them accountable.",
    points: ["Strategy & positioning", "Campaign execution", "Performance reporting"],
  },
  {
    icon: Headset,
    title: "Customer Services",
    body: "Responsive, structured client support that turns first contact into long-term, coordinated relationships.",
    points: ["Dedicated support", "Response frameworks", "Satisfaction tracking"],
  },
  {
    icon: Handshake,
    title: "Business Referral",
    body: "A trusted referral network that connects clients with the right partners and qualified opportunities.",
    points: ["Qualified introductions", "Partner network", "Warm handovers"],
  },
  {
    icon: Users,
    title: "Client Relationship Management",
    body: "Priority account management that keeps goals aligned and every client on a consistent, considered plan.",
    points: ["Priority accounts", "Aligned goals", "Consistent planning"],
  },
];

function Card({ s, index }: { s: Service; index: number }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <motion.div variants={staggerItem}>
      <div
        onMouseMove={onMove}
        className="group relative h-full overflow-hidden rounded-2xl border border-hairline bg-panel/60 p-7 transition-colors duration-300 hover:border-glow/40"
      >
        {/* cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at ${pos.x}% ${pos.y}%, rgba(74,144,255,0.14), transparent 65%)`,
          }}
        />
        {/* top rule that grows on hover */}
        <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-glow to-electric transition-transform duration-500 group-hover:scale-x-100" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-hairline bg-navy/70 text-glow transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
              <s.icon className="h-6 w-6" />
            </div>
            <span className="text-5xl font-extrabold leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-white/[0.08]">
              0{index + 1}
            </span>
          </div>

          <h3 className="mt-6 text-xl font-semibold text-offwhite">
            {s.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate">{s.body}</p>

          <ul className="mt-5 space-y-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-chrome/80">
                <span className="h-1.5 w-1.5 rounded-full bg-glow" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span className="eyebrow">Our services</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-chrome sm:text-4xl lg:text-5xl">
            Four pillars, one{" "}
            <span className="text-gradient">coordinated</span> engine.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-slate">
            Every engagement draws on the same integrated toolkit — so strategy,
            service, referral and relationship reinforce one another.
          </p>
        </Reveal>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((s, i) => (
          <Card key={s.title} s={s} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
