"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ArrowRight, Check, Mail, Spark } from "./Icons";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("loading");
    // Front-end demo submit — wire to your ESP / API route when ready.
    setTimeout(() => setStatus("done"), 900);
  };

  return (
    <section id="subscribe" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-hairline bg-panel/60 px-6 py-14 text-center sm:px-16 sm:py-20">
          {/* glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-electric/25 blur-[110px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(199,210,227,0.5) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
            }}
          />

          <div className="relative">
            <span className="eyebrow justify-center">
              <Spark className="h-3.5 w-3.5" /> Subscribe
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-chrome sm:text-4xl lg:text-5xl">
              Let&apos;s build your{" "}
              <span className="text-gradient">marketing strategy</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate">
              Subscribe for insights, or reach out to agree a budget and get
              priority account status. We&apos;ll be in touch within one business
              day.
            </p>

            <div className="mx-auto mt-9 max-w-md">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-3 rounded-xl border border-glow/40 bg-glow/10 px-6 py-4 text-offwhite"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-glow to-electric text-white">
                      <Check className="h-5 w-5" />
                    </span>
                    <span className="font-medium">
                      You&apos;re on the list — talk soon.
                    </span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-hairline bg-navy/70 py-3.5 pl-12 pr-4 text-offwhite placeholder:text-slate/60 outline-none transition-colors focus:border-glow/60 focus:ring-2 focus:ring-glow/20"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary shine justify-center disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <motion.span
                          className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                        />
                      ) : (
                        <>
                          Get started
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              <p className="mt-4 text-xs text-slate/70">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
