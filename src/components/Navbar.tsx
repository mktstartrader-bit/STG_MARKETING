"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "./Icons";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Clients", href: "#clients" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-hairline bg-navy/70 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
            {/* Logo */}
            <a href="#top" className="group flex items-center gap-3">
              <Image
                src="/brand/stg-mark-t.png"
                alt="STG Marketing LLC"
                width={112}
                height={48}
                priority
                className="h-9 w-auto drop-shadow-[0_0_18px_rgba(74,144,255,0.45)] transition-transform duration-500 group-hover:scale-105"
              />
              <span className="hidden text-sm font-semibold tracking-[0.22em] text-slate sm:block">
                MARKETING <span className="text-glow">LLC</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative rounded-lg px-4 py-2 text-sm font-medium text-slate transition-colors hover:text-offwhite"
                >
                  {l.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-glow to-electric transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a href="#subscribe" className="btn-primary shine hidden text-sm sm:inline-flex">
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </a>
              {/* Mobile toggle */}
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-panel/60 md:hidden"
              >
                <div className="relative h-4 w-5">
                  <span
                    className={`absolute left-0 h-0.5 w-5 bg-offwhite transition-all duration-300 ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-0.5 w-5 bg-offwhite transition-all duration-300 ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-0.5 w-5 bg-offwhite transition-all duration-300 ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-0.5 origin-left bg-gradient-to-r from-electric via-glow to-chrome"
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[4.6rem] z-40 mx-4 rounded-2xl border border-hairline bg-navy/95 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-slate hover:bg-white/5 hover:text-offwhite"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#subscribe"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full justify-center"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
