# STG Marketing LLC — native landing page

A framework-free, build-free port of the Next.js/React site, written in plain
**HTML + CSS + JavaScript**. No bundler, no dependencies, no install step.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Full page markup (all sections + inline SVG icons) |
| `styles.css` | Brand design system + every section's styling, responsive + reduced-motion |
| `script.js` | All interactions (see below) — one self-contained IIFE |
| `brand/` | Logos, favicons, hero video + poster |

The only external request is the **Plus Jakarta Sans** webfont from Google Fonts
(via `<link>` in the head). Everything else is local.

## Run it

Open `index.html` directly, or serve the folder over HTTP (needed for the hero
video to autoplay reliably):

```bash
cd native
python3 -m http.server 8000
# → http://localhost:8000
```

## What the JS does

- **Momentum smooth scrolling** — a lightweight Lenis-style wheel lerp on
  pointer-fine devices; anchor links use a 1.2s eased tween and land each
  section 96px below the fixed navbar. Disabled under `prefers-reduced-motion`
  and on touch devices (native scrolling).
- **Navbar** — slide-in entrance, translucent/blurred state after 24px of
  scroll, and a scroll-progress bar.
- **Mobile menu** — animated hamburger → X, dropdown, auto-closes on nav.
- **Scroll reveals** — `IntersectionObserver` fades/blurs elements in
  (`data-reveal`, `data-reveal-dir`, `data-reveal-delay`, `data-stagger`).
- **Hero** — word-by-word headline reveal, 3D mouse-tilt on the logo lockup,
  video fade-in.
- **Services cards** — cursor-following spotlight via CSS custom properties.
- **Experience** — count-up to 20+ when the medallion scrolls into view.
- **Subscribe form** — client-side demo submit (wire to your ESP/API in
  `script.js` where the `setTimeout` is).
- **Marquee** and **background sparks** are generated in JS.

Accessibility: honours `prefers-reduced-motion` (static poster instead of video,
no entrance animations), and a `<noscript>` fallback keeps all content visible
if JavaScript is disabled.
