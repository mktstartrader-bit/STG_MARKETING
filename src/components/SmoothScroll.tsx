"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Gap (px) left above an anchored section so it clears the fixed navbar.
const NAV_GAP = 96;

export function SmoothScroll() {
  useEffect(() => {
    // Respect users who prefer reduced motion — keep native scrolling.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.09, // smoothing factor — lower = smoother/heavier
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Route in-page anchor links through Lenis for eased scrolling.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const id = hash.slice(1);
      const el = document.getElementById(id);
      e.preventDefault();

      if (id === "top" || !el) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        // Absolute target so the section lands exactly NAV_GAP below the top,
        // regardless of Lenis offset/scroll-padding interactions.
        const y = el.getBoundingClientRect().top + window.scrollY - NAV_GAP;
        lenis.scrollTo(Math.max(0, y), { duration: 1.2 });
      }
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
