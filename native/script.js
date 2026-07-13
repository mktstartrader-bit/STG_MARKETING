/* ============================================================
   STG MARKETING LLC — native interactions
   Vanilla JS port of the React/Framer Motion behaviours.
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ----------------------------------------------------------
     1. Momentum smooth scroll (lightweight Lenis-style)
        - lerps window scroll toward a wheel-driven target
        - respects reduced-motion (falls back to native)
        - stays out of the way of touch / keyboard / scrollbar
     ---------------------------------------------------------- */
  const NAV_GAP = 96; // clearance below the fixed navbar for anchors

  const smooth = (function createSmoothScroll() {
    if (prefersReduced) return null;

    // Skip momentum on coarse/touch pointers — native scrolling feels better.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return null;

    let target = window.scrollY;
    let current = target;
    let mode = "idle"; // "idle" | "wheel" | "tween"
    let maxScroll = 0;
    let tweenStart = 0;
    let tweenFrom = 0;
    let tweenTo = 0;
    let tweenDur = 1200;

    const measure = () => {
      maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };
    const clamp = (v) => Math.max(0, Math.min(v, maxScroll));
    const easeInOut = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const onWheel = (e) => {
      if (e.ctrlKey) return; // let pinch-zoom through
      e.preventDefault();
      if (mode !== "wheel") {
        target = window.scrollY;
        current = window.scrollY;
      }
      mode = "wheel";
      target = clamp(target + e.deltaY);
    };

    const raf = (now) => {
      if (mode === "wheel") {
        current += (target - current) * 0.09; // lerp — matches Lenis feel
        if (Math.abs(target - current) < 0.4) {
          current = target;
          mode = "idle";
        }
        window.scrollTo(0, current);
      } else if (mode === "tween") {
        const p = tweenDur > 0 ? Math.min(1, (now - tweenStart) / tweenDur) : 1;
        current = tweenFrom + (tweenTo - tweenFrom) * easeInOut(p);
        window.scrollTo(0, current);
        if (p >= 1) {
          target = current;
          mode = "idle";
        }
      } else {
        // idle — follow whatever moved the page (keyboard, scrollbar, etc.)
        current = target = window.scrollY;
      }
      requestAnimationFrame(raf);
    };

    measure();
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("load", measure);
    window.addEventListener("wheel", onWheel, { passive: false });
    requestAnimationFrame(raf);

    return {
      scrollTo(y, duration) {
        measure();
        tweenFrom = window.scrollY;
        tweenTo = clamp(y);
        tweenDur = duration == null ? 1200 : duration;
        tweenStart = performance.now();
        mode = "tween";
      },
    };
  })();

  // Eased anchor-link navigation for when momentum scroll is off (touch, etc.)
  const tweenScrollTo = (y) => {
    const startY = window.scrollY;
    const dist = y - startY;
    const duration = 1200; // ms
    let startTime = null;
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic

    const step = (now) => {
      if (startTime === null) startTime = now;
      const p = Math.min(1, (now - startTime) / duration);
      window.scrollTo(0, startY + dist * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  document.addEventListener("click", (e) => {
    const link = e.target.closest && e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const id = hash.slice(1);
    const el = document.getElementById(id);
    e.preventDefault();

    let y = 0;
    if (id !== "top" && el) {
      y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_GAP);
    }

    if (smooth) smooth.scrollTo(y, 1200);
    else if (prefersReduced) window.scrollTo(0, y);
    else tweenScrollTo(y);

    history.replaceState(null, "", hash);

    // Close the mobile menu if a link inside it was tapped.
    closeMobileMenu();
  });

  /* ----------------------------------------------------------
     2. Navbar — entrance, scrolled state, scroll progress
     ---------------------------------------------------------- */
  const nav = $("#nav");
  const navBar = $("#navBar");
  const navProgress = $("#navProgress");

  requestAnimationFrame(() => nav && nav.classList.add("nav--in"));

  const onScroll = () => {
    if (navBar) navBar.classList.toggle("is-scrolled", window.scrollY > 24);
    if (navProgress) {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      navProgress.style.transform = "scaleX(" + p + ")";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     3. Mobile menu
     ---------------------------------------------------------- */
  const navToggle = $("#navToggle");
  const mobileMenu = $("#mobileMenu");

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.hidden = false;
    // force reflow so the transition runs from the hidden state
    void mobileMenu.offsetWidth;
    mobileMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  }
  function closeMobileMenu() {
    if (!mobileMenu || mobileMenu.hidden) return;
    mobileMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    const done = () => {
      mobileMenu.hidden = true;
      mobileMenu.removeEventListener("transitionend", done);
    };
    mobileMenu.addEventListener("transitionend", done);
    // fallback in case transitionend doesn't fire (reduced motion)
    setTimeout(() => {
      if (!mobileMenu.classList.contains("is-open")) mobileMenu.hidden = true;
    }, 400);
  }
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      if (mobileMenu.hidden) openMobileMenu();
      else closeMobileMenu();
    });
  }

  /* ----------------------------------------------------------
     4. Background floating sparks (deterministic layout)
     ---------------------------------------------------------- */
  const SPARK_PATH =
    "M12 0.5 C12.7 6.6 17.4 11.3 23.5 12 C17.4 12.7 12.7 17.4 12 23.5 C11.3 17.4 6.6 12.7 0.5 12 C6.6 11.3 11.3 6.6 12 0.5 Z";
  const bgSparks = $("#bgSparks");
  if (bgSparks) {
    const NS = "http://www.w3.org/2000/svg";
    let markup = "";
    for (let i = 0; i < 22; i++) {
      const seed = (i * 9301 + 49297) % 233280;
      const r = seed / 233280;
      const r2 = ((i * 4099 + 3323) % 233280) / 233280;
      const r3 = ((i * 6151 + 1471) % 233280) / 233280;
      const left = (r * 100).toFixed(2) + "%";
      const top = (r2 * 100).toFixed(2) + "%";
      const size = 4 + Math.round(r3 * 12);
      const delay = (r * 5).toFixed(2) + "s";
      const duration = (3 + r2 * 4).toFixed(2) + "s";
      const opacity = 0.15 + r3 * 0.4;
      markup +=
        '<svg class="icon spark" viewBox="0 0 24 24" style="position:absolute;' +
        "left:" + left + ";top:" + top + ";width:" + size + "px;height:" + size +
        "px;opacity:" + opacity.toFixed(3) + ";animation:twinkle " + duration +
        " ease-in-out infinite;animation-delay:" + delay + ';">' +
        '<path d="' + SPARK_PATH + '" fill="currentColor" /></svg>';
    }
    bgSparks.innerHTML = markup;
  }

  /* ----------------------------------------------------------
     5. Marquee items
     ---------------------------------------------------------- */
  const marqueeTrack = $("#marqueeTrack");
  if (marqueeTrack) {
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
    const row = items.concat(items); // doubled for a seamless -50% loop
    marqueeTrack.innerHTML = row
      .map(
        (t) =>
          '<div class="marquee__item"><span class="marquee__text">' +
          t +
          '</span><svg class="icon spark" viewBox="0 0 24 24"><path d="' +
          SPARK_PATH +
          '" fill="currentColor" /></svg></div>'
      )
      .join("");
  }

  /* ----------------------------------------------------------
     6. Hero — video fade-in, on-load anims, word reveal, tilt
     ---------------------------------------------------------- */
  const heroVideo = $("#heroVideo");
  if (heroVideo && !prefersReduced) {
    const showVideo = () => heroVideo.classList.add("is-ready");
    if (heroVideo.readyState >= 2) showVideo();
    else heroVideo.addEventListener("loadeddata", showVideo, { once: true });
    // Best-effort autoplay (some browsers need an explicit call)
    const p = heroVideo.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }

  // On-load hero element animations (.anim with data-anim-delay)
  $$(".anim").forEach((el) => {
    const delay = parseFloat(el.getAttribute("data-anim-delay") || "0");
    setTimeout(() => el.classList.add("is-in"), delay * 1000);
  });

  // Word-by-word headline reveal
  const heroTitle = $("#heroTitle");
  if (heroTitle) {
    const words = $$(".word", heroTitle);
    words.forEach((w, i) => {
      w.style.transitionDelay = 0.25 + i * 0.09 + "s";
    });
    requestAnimationFrame(() => heroTitle.classList.add("is-in"));
  }

  // 3D mouse-tilt on the logo platform
  const heroPlatform = $("#heroPlatform");
  const heroTilt = $("#heroTilt");
  if (heroPlatform && heroTilt && !prefersReduced) {
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const apply = () => {
      heroTilt.style.transform =
        "rotateX(" + ty + "deg) rotateY(" + tx + "deg)";
      raf = 0;
    };
    heroPlatform.addEventListener("mousemove", (e) => {
      const r = heroPlatform.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = px * 20; // rotateY range ≈ [-10, 10]
      ty = py * -16; // rotateX range ≈ [8, -8]
      if (!raf) raf = requestAnimationFrame(apply);
    });
    heroPlatform.addEventListener("mouseleave", () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  }

  /* ----------------------------------------------------------
     7. Services — cursor spotlight
     ---------------------------------------------------------- */
  $$(".svc-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  /* ----------------------------------------------------------
     8. Scroll reveal (IntersectionObserver)
     ---------------------------------------------------------- */
  const revealEls = $$("[data-reveal]");
  const revealNow = (el) => {
    let delay = parseFloat(el.getAttribute("data-reveal-delay") || "0");
    const stagger = el.getAttribute("data-stagger");
    if (stagger !== null) delay = parseInt(stagger, 10) * 0.12 + 0.05;
    el.style.transitionDelay = delay + "s";
    el.classList.add("is-visible");
  };

  if (!("IntersectionObserver" in window) || prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.05 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------
     9. Count-up (fires when the medallion scrolls into view)
     ---------------------------------------------------------- */
  const countEls = $$("[data-countup]");
  const runCount = (el) => {
    const to = parseInt(el.getAttribute("data-countup"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) {
      el.textContent = to + suffix;
      return;
    }
    const duration = 1600;
    let startTime = null;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      if (startTime === null) startTime = now;
      const p = Math.min(1, (now - startTime) / duration);
      el.textContent = Math.round(to * ease(p)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (countEls.length) {
    if (!("IntersectionObserver" in window)) {
      countEls.forEach(runCount);
    } else {
      const cio = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCount(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -60px 0px", threshold: 0.4 }
      );
      countEls.forEach((el) => cio.observe(el));
    }
  }

  /* ----------------------------------------------------------
     10. Subscribe form (front-end demo submit)
     ---------------------------------------------------------- */
  const form = $("#subscribeForm");
  const emailInput = $("#subscribeEmail");
  const submitBtn = $("#subscribeSubmit");
  const submitLabel = $(".subscribe__submit-label");
  const spinner = $(".subscribe__spinner");
  const doneEl = $("#subscribeDone");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!emailInput.value || !emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }
      submitBtn.disabled = true;
      if (submitLabel) submitLabel.hidden = true;
      if (spinner) spinner.hidden = false;

      // Wire this to your ESP / API route when ready.
      setTimeout(() => {
        form.hidden = true;
        if (doneEl) doneEl.hidden = false;
      }, 900);
    });
  }

  /* ----------------------------------------------------------
     11. Footer year
     ---------------------------------------------------------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
