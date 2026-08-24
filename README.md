# Saran R — Cinematic Developer Portfolio

A scroll-driven, single-scene portfolio built with React, Vite, and GSAP ScrollTrigger.
The workspace photo is treated as one large environment; scrolling drives a virtual
camera (scale + translate) that moves between the notebook, laptop, coffee, headphones,
and books, with content panels appearing beside each.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  assets/            workspace.webp — the master scene image
  components/
    PortfolioScene.jsx   cinematic scroll experience (GSAP + Lenis)
    StaticFallback.jsx   non-animated fallback for prefers-reduced-motion
    ContentPanel.jsx     shared translucent panel
    DotNav.jsx           section dot navigation
    sections/            Hero, About, Skills, TechStack, Projects, Experience, Contact
  data/
    portfolioData.js  all resume content (edit this to update copy)
    sceneConfig.js     per-scene focal point, zoom, content side, anchors, focus radius
  hooks/
    useCameraRig.js    camera math (focal point → CSS transform, with
                        coverage clamping so the image never shows a void)
  styles/
    globals.css        design tokens, fonts, resets
    portfolio.css       layout, panels, depth-of-field, responsive rules
public/
  resume.pdf          downloadable resume (linked from the Contact section)
```

## Tuning the camera

Each scene in `src/data/sceneConfig.js` defines:

- `focus: { x, y }` — the focal point as a fraction (0–1) of the 1536×1024 master image
- `zoom` / `zoomMobile` — moderate cinematic zoom (kept low so the surrounding room
  stays visible) for desktop / narrow viewports
- `contentSide` — `"left" | "right" | "full"`, which side the text panel sits on
  (the image/focal object sits on the opposite side)
- `anchorX` / `anchorXMobile` / `anchorYMobile` — optional overrides for where the
  focal point should land on screen; useful when an object sits close to the edge
  of the source photo and the default anchor would require cropping it
- `focusRadius` — radius (in image-space px) of the sharp "in focus" zone used by
  the depth-of-field overlay, roughly matched to the object's own size

`useCameraRig.js` always clamps the resulting transform so the image fully covers
the viewport — it will get as close as possible to the requested anchor without
ever revealing empty space at an edge.

## Depth of field

Each scene layers a second, blurred/darkened copy of the master image on top of
the sharp base, masked with a radial gradient centered on the scene's focal
point (`--mx`/`--my`/`--mr` CSS custom properties, animated by GSAP alongside the
camera). The focused object stays sharp; the surrounding room is subtly blurred
and dimmed. On Hero and Contact the overlay fades out entirely, showing the full
sharp workspace.

## Content

All resume-derived content lives in `src/data/portfolioData.js`. Nothing there was
invented — GitHub/LinkedIn links weren't listed on the source resume, so the
Contact section currently only links Email, Call, and the Resume PDF. The
Experience section shows work experience only; education data still lives in
`portfolioData.js` (unused) if you want to add it back as its own section later.

## Accessibility

Visitors with `prefers-reduced-motion: reduce` get `StaticFallback.jsx` instead —
the same content, laid out as normal stacked sections with a subtly cropped
background per section, no pinning, no depth-of-field, and no scroll-scrubbed
animation.
