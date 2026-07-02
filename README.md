# STG Marketing LLC — Marketing Website

A modern, animated marketing website for **STG Marketing LLC**, built to the
official brand guidelines (v1.1, June 2026). Dark, glass/chrome aesthetic with
scroll reveals, microinteractions, and motion throughout.

## Tech stack

- **Next.js 16** (App Router, static export-ready)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — brand tokens defined in `src/app/globals.css`
- **Framer Motion** — scroll reveals, entrance animations, counters, tilt

## Brand system

Encoded from `STG_Marketing_Brand_Guidelines_A4.pdf`:

| Token | Hex | Use |
|-------|-----|-----|
| `navy` | `#060912` | Primary background |
| `panel` | `#0D1320` | Cards / containers |
| `electric` | `#1D4ED8` | Primary accent, CTAs |
| `glow` | `#4A90FF` | Highlights, glow, links |
| `chrome` | `#C7D2E3` | Secondary mark, borders |
| `offwhite` | `#E8ECF5` | Primary text on dark |
| `slate` | `#8C98B8` | Secondary / body text |
| `hairline` | `#1A2236` | Dividers, borders |

- **Type:** Inter (400 / 500 / 600 / 800), wide-tracked uppercase for wordmarks.
- **Logo:** the official STG glass/chrome mark, background chroma-keyed to
  transparent (`public/brand/*-t.png`) so its glow blends onto the dark canvas.

## Content

All copy is sourced from strglobalmarketing.com — About, four Services
(Marketing, Customer Services, Business Referral, Client Relationship
Management), Experienced (20+ years C-Level), Clients (Asia Pacific, Middle
East, Africa) and a Subscribe CTA.

## Sections & animation

- **Navbar** — scroll-reactive blur/border, animated scroll-progress bar, mobile menu
- **Hero** — word-by-word headline reveal, mouse-tilt 3D logo platform, orbit rings, animated stat chips
- **Marquee** — infinite region/service ticker
- **About** — sticky heading + scroll-reveal pillar cards
- **Services** — cursor-following spotlight cards, hover microinteractions
- **Experience** — animated count-up medallion + staggered checklist
- **Clients** — decorative globe rings + region cards with pulsing pins
- **Subscribe** — animated form with loading + success states
- **Footer** — brand lockup, nav, services

Fully responsive, and honours `prefers-reduced-motion`.

## Getting started

```bash
npm install        # if node_modules is missing
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Deploy

Zero-config on Vercel:

```bash
npx vercel          # preview
npx vercel --prod   # production
```

## Wiring the form

`src/components/Subscribe.tsx` currently simulates submission on the client.
Point `onSubmit` at an API route or your email provider when ready.

## Notes

- Logo variations in the source PDF are marked *"Concept"* and should get a clean
  vector redraw for production; the raster marks are used here as supplied.
