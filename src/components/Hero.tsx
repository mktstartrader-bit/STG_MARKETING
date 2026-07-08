"use client";

import Image from "next/image";
import Logo from "./Logo";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { MouseEvent } from "react";
import { ArrowRight, Spark } from "./Icons";

const words = "Marketing strategy, engineered to perform.".split(" ");

export function Hero() {
  const reduce = useReducedMotion();

  // Mouse-tilt for the logo platform
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col items-center justify-center px-5 pt-28 pb-16 text-center sm:px-8"
    >
      {/* Banner backdrop — looping video (static poster for reduced motion) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {reduce ? (
          <Image
            src="/brand/hero-poster.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/brand/hero-poster.jpg"
          >
            <source src="/brand/hero-banner.mp4" type="video/mp4" />
          </motion.video>
        )}
        {/* brand + readability overlays */}
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-electric/15 mix-blend-color" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-navy via-navy/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-navy via-navy/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_44%,rgba(6,9,18,0.78),transparent_72%)]" />
      </div>

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-7 inline-flex items-center gap-2 rounded-full border border-hairline bg-panel/60 px-4 py-1.5 text-xs font-medium tracking-widest text-slate backdrop-blur"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
        </span>
        STG MARKETING LLC — STRATEGY · GROWTH · CONTROL
      </motion.div>

      {/* Headline with word-by-word reveal */}
      <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.25 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`mr-[0.28em] inline-block ${
              w === "engineered" || w === "to" || w === "perform."
                ? "text-gradient"
                : "text-chrome"
            }`}
          >
            {w}
          </motion.span>
        ))}
      </h1>

      {/* Subcopy */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-slate sm:text-lg"
      >
        We assist our clients as they build and implement their marketing
        strategies — with measurement methods, organizational alternatives and
        market-opportunity identification that achieve coordinated activities and
        control.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.05 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <a href="#subscribe" className="btn-primary shine">
          Start your strategy
          <ArrowRight className="h-4 w-4" />
        </a>
        <a href="#services" className="btn-ghost">
          Explore our services
        </a>
      </motion.div>

      {/* Logo platform visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ perspective: 1200 }}
        className="relative mt-16 w-full max-w-3xl"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* glow platform */}
          <div className="absolute -bottom-4 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[50%] bg-glow/30 blur-2xl" />

          <motion.div
            animate={reduce ? {} : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
            style={{ transform: "translateZ(60px)" }}
          >
            <Logo
              variant="light"
              className="mx-auto w-64 sm:w-72 drop-shadow-[0_20px_60px_rgba(29,78,216,0.5)]"
            />
          </motion.div>

          {/* accent sparks around logo */}
          <Spark className="absolute -right-2 top-2 h-6 w-6 text-glow" style={{ animation: "twinkle 3.2s ease-in-out infinite" }} />
          <Spark className="absolute -left-3 bottom-8 h-4 w-4 text-chrome" style={{ animation: "twinkle 4s ease-in-out infinite", animationDelay: "1s" }} />
        </motion.div>
      </motion.div>

      {/* Stat chips */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-16 grid w-full max-w-3xl grid-cols-3 divide-x divide-hairline rounded-2xl border border-hairline bg-panel/40 backdrop-blur"
      >
        {[
          { k: "20+", v: "Years C-Level experience" },
          { k: "3", v: "Global regions served" },
          { k: "4", v: "Core service pillars" },
        ].map((s) => (
          <div key={s.v} className="px-3 py-5 sm:px-6">
            <div className="text-2xl font-extrabold text-chrome sm:text-3xl">
              {s.k}
            </div>
            <div className="mt-1 text-xs leading-snug text-slate sm:text-sm">
              {s.v}
            </div>
          </div>
        ))}
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-14 flex flex-col items-center gap-2 text-slate"
      >
        <span className="text-[0.65rem] font-medium tracking-[0.3em]">SCROLL</span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-hairline p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-glow"
          />
        </div>
      </motion.div>
    </section>
  );
}
