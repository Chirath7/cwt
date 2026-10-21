# CWT Landing Page — Full Code Review

**Date:** 2026-10-19  
**Reviewer:** Claude Code (automated audit, read-only)

---

## 1. PROJECT MAP

### Folder Tree (excluding node_modules, .git, dist)

```
.
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── originals/               ← source PNGs/JPGs (not deployed, but in repo)
│   ├── 01_ARMS_Fri16Oct2026.png
│   ├── 02_CDNS_NextGen_Fri16Oct2026.png
│   ├── 03_DAT_Fri16Oct2026.png
│   ├── 04_Customs_Edge_Fri16Oct2026.png
│   ├── 05_Risk_management_Fri16Oct2026.png
│   ├── 06_Agentic_AI_Fri16Oct2026.png
│   ├── 06_SL Customs Agentic AI Solutions x.png
│   ├── 07_OGA_AD_License upgrade.png
│   ├── 08_Opertional_Roster_Engine_Fri16Oct2026.png
│   ├── CWT 2.0.png
│   ├── CWT CREW 1 Oct 2026.jpg
│   ├── CWT Customers and  sucess stories.png
│   ├── L_CWT_Prof_Training_ Agentic training.png
│   ├── M_CWT_Prof_Training_PowerBI Basic.png
│   ├── N_CWT_Prof_Training_PowerBI Advanced.png
│   ├── SLC Power BI intermidiat training.png
│   └── WhatsApp Image 2026-10-18 at 12.25.03.jpeg
├── public/
│   ├── infographics/        ← 16 static image files served by Vite
│   └── logo/
│       └── sl-customs.png
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── Lightbox.tsx
    │   ├── Navbar.tsx
    │   ├── Section.tsx
    │   ├── WindowCard.tsx
    │   └── Wordmark.tsx
    └── data/
        └── sections.ts
```

### Stack

| Item | Value |
|------|-------|
| Framework | React 19.3.1 |
| Build tool | Vite 8.3.4 |
| Package manager | npm (package-lock.json present) |
| Language | TypeScript 7.0.2 (strict mode) |
| Styling | Tailwind CSS 4.3.3 (via @tailwindcss/vite plugin) |
| Animation | motion/react 14.3.0 (Framer Motion) |

### Infographic Inventory

All 16 files are in `/public/infographics/` and are referenced in `src/data/sections.ts`.

| File | Format | Dimensions | Size | Used In |
|------|--------|-----------|------|---------|
| cwt-2-0.png | PNG | 1536 × 1024 | 1.8 MB | CWT 2.0 section |
| crew.jpg | JPG | 1400 × 1286 | 1.6 MB | CWT Crew section |
| customs-01-arms.png | PNG | **1312 × 1199** | 2.1 MB | Customs section (1/8) |
| customs-02-cdns.png | PNG | 1536 × 1024 | 2.1 MB | Customs section (2/8) |
| customs-03-dat.png | PNG | 1536 × 1024 | 2.0 MB | Customs section (3/8) |
| customs-04-edge.png | PNG | 1536 × 1024 | 2.1 MB | Customs section (4/8) |
| customs-05-risk.png | PNG | **1312 × 1199** | 2.2 MB | Customs section (5/8) |
| customs-06-agentic-ai.png | PNG | 1536 × 1024 | 2.0 MB | Customs section (6/8) |
| customs-07-oga.png | PNG | 1536 × 1024 | 2.0 MB | Customs section (7/8) |
| customs-08-roster.png | PNG | 1536 × 1024 | 2.0 MB | Customs section (8/8) |
| customers.png | PNG | 1536 × 1024 | 2.1 MB | Customers section |
| products.jpg | JPG | 1536 × 1024 | 572 KB | Products section |
| training-powerbi-basic.png | PNG | 1536 × 1024 | 1.9 MB | Training section (1/4) |
| training-powerbi-intermediate.png | PNG | 1536 × 1024 | 1.8 MB | Training section (2/4) |
| training-powerbi-advanced.png | PNG | 1536 × 1024 | 2.0 MB | Training section (3/4) |
| training-agentic.png | PNG | 1536 × 1024 | 1.9 MB | Training section (4/4) |

**Total infographic weight: ~28 MB uncompressed**

> **Note:** Two originals files use the same `06_` prefix (`06_Agentic_AI_Fri16Oct2026.png` and `06_SL Customs Agentic AI Solutions x.png`). The deployed version is `customs-06-agentic-ai.png`. Confirm that the correct one was used.

---

## 2. SECTION ORDER AUDIT

Order is data-driven from `src/data/sections.ts` — the array position is the render position.

| # | Section ID | Title | Infographics | Defined In |
|---|-----------|-------|-------------|-----------|
| Hero | `#top` | (hero animation) | — | `src/components/Hero.tsx` |
| 1 | `#cwt-2-0` | CWT 2.0 | cwt-2-0.png | `src/data/sections.ts` → `Section.tsx` |
| 2 | `#crew` | CWT Crew | crew.jpg | `src/data/sections.ts` → `Section.tsx` |
| 3 | `#customs` | CWT Customs | customs-01 … customs-08 (8 images) | `src/data/sections.ts` → `Section.tsx` |
| 4 | `#customers` | CWT Customers | customers.png | `src/data/sections.ts` → `Section.tsx` |
| 5 | `#products` | CWT Products | products.jpg | `src/data/sections.ts` → `Section.tsx` |
| 6 | `#training` | CWT Training | training-powerbi-basic/intermediate/advanced, training-agentic (4 images) | `src/data/sections.ts` → `Section.tsx` |

**Findings:**

- No section is duplicated.
- No section is missing an infographic.
- Changing the order only requires reordering the array in `sections.ts` — no markup changes needed.
- The Navbar auto-generates links from the same `sections` array, so it will always stay in sync.
- **Flag:** The user specified "Sections must follow a specific order." This report cannot independently verify the intended order against a reference. Please confirm the above sequence matches requirements.

---

## 3. LAYOUT & ALIGNMENT AUDIT

### Inconsistent Image Dimensions

Two Customs infographics (`customs-01-arms.png`, `customs-05-risk.png`) are **1312 × 1199** (≈ 1.09:1 aspect ratio — almost square) while the rest are **1536 × 1024** (3:2 — landscape).

In the 2-column Customs grid (`md:grid-cols-2`), rows pair these with landscape images:
- Row 1: arms (1312×1199 — tall) vs cdns (1536×1024 — shorter)
- Row 3: risk (1312×1199 — tall) vs agentic-ai (1536×1024 — shorter)

Because `Section.tsx` uses `h-auto w-full`, each image fills its column but the row height is dictated by the tallest item, leaving whitespace below the landscape image. This misalignment is visible and may look unpolished.

`crew.jpg` is also 1400×1286 (≈ 1.09:1), but it renders alone (`max-w-5xl`) so the aspect ratio mismatch has no visual impact there.

### Responsive Checks

| Breakpoint | Layout | Issues |
|-----------|--------|--------|
| 375 px | 1 column, padding `px-4` | ✅ Single-column stacks fine. Navbar collapses to logo only — **no hamburger menu visible at all**. Users on mobile have zero navigation. |
| 768 px | 1 column (`md:` classes not triggered until md = 768 px) | ✅ Generally fine; 2-col grid kicks in exactly at md. |
| 1280 px | 2-column grid for multi-image sections | ⚠️ Aspect-ratio mismatch rows visible (see above). |
| 1920 px | `max-w-7xl` container centres content | ✅ No overflow. Significant empty side margins — acceptable for this design. |

### Alternating Row Background

`Section.tsx` line 14 alternates background on odd-indexed sections (`index % 2 ? "bg-white/60" : ""`):
- Index 0 (CWT 2.0): canvas background (default)
- Index 1 (CWT Crew): white/60 tint
- Index 2 (CWT Customs): canvas background
- Index 3 (CWT Customers): white/60 tint
- Index 4 (CWT Products): canvas background
- Index 5 (CWT Training): white/60 tint

This is cosmetically fine but if sections are reordered the alternation will shift automatically, which is correct behaviour.

---

## 4. MULTI-INFOGRAPHIC PRODUCTS

### Products with More than One Infographic

| Section | Count | Current Display |
|---------|-------|----------------|
| CWT Customs | 8 infographics | 2-column masonry-style grid; **all 8 cards are always visible** on page load |
| CWT Training | 4 infographics | 2-column grid; **all 4 cards are always visible** on page load |

### Missing Summary + Reveal Pattern

The user requirement specifies "a single summary view with the rest revealed on click." **This does not exist.** Currently:
- All infographics in Customs (8) and Training (4) are rendered as separate `WindowCard` elements in a grid.
- Clicking any card opens the lightbox, which allows navigation between all cards in that section via arrows.
- There is no "summary" or "cover" card per sub-product that hides the rest.

**Recommendation:** See Section 8 for a proposed data-driven structure that handles this.

---

## 5. LOGO CHECK

### File

| Property | Value |
|----------|-------|
| File path | `/public/logo/sl-customs.png` |
| Dimensions | 291 × 344 px |
| File size | 56 KB |

### Usage Locations

**1. Customs section header (`src/components/Section.tsx`, line 23):**
```tsx
{section.badge && (
  <img src={section.badge} alt="Sri Lanka Customs emblem" className="h-24 w-auto" />
)}
```
- Rendered at `h-24` (96 px tall), auto width ≈ 81 px
- Positioned above the section number and title
- The `badge` value is set in `sections.ts` as `badge: "/logo/sl-customs.png"` — only the Customs section has a badge

**2. Footer (`src/components/Footer.tsx`, line 12):**
```tsx
<img src="/logo/sl-customs.png" alt="Sri Lanka Customs" className="h-16 w-auto rounded-lg bg-white p-1.5" />
```
- Rendered at `h-16` (64 px tall), auto width ≈ 54 px
- White background with padding and rounded corners applied via Tailwind
- Path is **hardcoded** here rather than read from `sections.ts`

### Issues

- **Alt text mismatch:** Section uses "Sri Lanka Customs emblem"; Footer uses "Sri Lanka Customs". These should be consistent.
- **Path duplication:** The logo path `/logo/sl-customs.png` appears in both `sections.ts` (as badge data) and hardcoded in `Footer.tsx`. A shared constant would prevent drift.
- **No reference check possible:** The user specified the logo "must appear as in the reference image." Without the reference image being machine-readable, visual accuracy cannot be automatically confirmed. The WhatsApp image at `originals/WhatsApp Image 2026-10-18 at 12.25.03.jpeg` may be the reference — please verify manually that the size and placement match.

---

## 6. CODE QUALITY

### Duplicated / Hardcoded Code

| Location | Issue |
|----------|-------|
| `Footer.tsx:12` | Logo path `/logo/sl-customs.png` hardcoded; already exists in `sections.ts` as `badge` |
| `WindowCard.tsx:21–23` | macOS window dot colours `#ff5f57`, `#febc2e`, `#28c840` hardcoded as inline hex values — should be Tailwind config or CSS variables |
| `Lightbox.tsx:73` | Inline style `{ width: "min(220vw, 2400px)" }` cannot be purged or themed |
| `Lightbox.tsx:23–24` | Index wrap arithmetic `(index! + 1) % items.length` duplicated in keyboard handler and button `onClick` |
| `WindowCard.tsx:37` | `<figcaption>` renders `item.file` (the raw filename, e.g. `customs-01-arms.png`) as visible text to users — this is likely unintentional |

### Dead / Unnecessary Code

- `Infographic.file` is only used for the figcaption. If the intent is to show a human-readable sub-title, the `title` field already exists and is more appropriate.
- The `change` callback in `App.tsx` is overly complex:
  ```ts
  const change = useCallback((i: number | null) => setOpen((o) => (o && i !== null ? { ...o, index: i } : null)), []);
  ```
  It silently does nothing when called with a number while the lightbox is closed. This is safe but confusing.

### Accessibility

| Issue | Severity | Detail |
|-------|----------|--------|
| **No focus trap in Lightbox** | 🔴 HIGH | When the lightbox opens, `Tab` cycles through background page content. WCAG 2.1 SC 2.1.2 (No Keyboard Trap) requires focus to remain inside a modal dialog. The `dialog` role and `aria-modal` are set, but browser support for implied focus trap is inconsistent; an explicit trap (via `focus-trap-react` or manual `tabIndex` management) is required. |
| **Focus not moved on open** | 🔴 HIGH | When the lightbox opens, focus remains on the card that was clicked. Screen reader users will not know the dialog appeared. Focus must be moved to the dialog or its close button on open. |
| **No mobile navigation** | 🔴 HIGH | The `<nav>` is `hidden md:flex` with no hamburger fallback. Users on phones have no navigation UI. |
| **Figcaption shows raw filename** | 🟠 MEDIUM | `customs-01-arms.png` is visible below every card. This is meaningless to end users and looks broken. |
| **`<nav>` missing aria-label** | 🟠 MEDIUM | `Navbar.tsx:29` — the `<nav>` element has no `aria-label` or `aria-labelledby`, so screen readers cannot distinguish it from other navigations on the page. |
| **Lightbox zoom button missing aria-label** | 🟠 MEDIUM | The "Zoom"/"Fit" toggle button (`Lightbox.tsx:54`) has no `aria-label` attribute; its text label changes state but doesn't describe the action. |
| **Colour contrast — slate-400 on canvas** | 🟠 MEDIUM | `#94a3b8` on `#f7f7f8` = **2.39:1**. Fails WCAG AA for all text sizes (min 4.5:1 normal, 3:1 large). Used for figcaptions and secondary labels. |
| **Colour contrast — brand on canvas (small text)** | 🟡 LOW | `#1f6feb` on `#f7f7f8` = **4.33:1**. Fails WCAG AA for normal/small text (4.5:1 required). Used for the eyebrow labels ("Data · Cloud · AI") and section numbers. Passes for large/bold text (3:1). |
| IntersectionObserver silently skips missing IDs | 🟡 LOW | `Navbar.tsx:17` — `if (el) io.observe(el)` silently no-ops if an element is not found. No development warning. |

### Performance

| Issue | Severity | Detail |
|-------|----------|--------|
| **Images not optimised** | 🔴 HIGH | 14 PNG infographics at ~2 MB each = ~28 MB total page weight. No WebP or AVIF alternatives. On a 10 Mbps connection this takes ~22 seconds to load fully. Each image should be converted to WebP (typically 60–70% smaller) or AVIF. |
| **No image optimisation pipeline** | 🔴 HIGH | No Vite plugin (`vite-imagetools`, `vite-plugin-image-optimizer`, or similar) is configured. Images are served byte-for-byte as committed. |
| **Google Fonts blocking** | 🟠 MEDIUM | `index.html:8-9` — The font `<link>` is render-blocking. The `<link rel="preconnect">` is present for `fonts.googleapis.com` but **missing the required second preconnect** for `fonts.gstatic.com crossorigin`, where the actual font files are hosted. This slows the first render. |
| **Large JS bundle** | 🟡 LOW | `dist/assets/index-*.js` is 377 KB uncompressed / 121 KB gzip. The entire Framer Motion (`motion/react`) library is bundled. This is large for a pure landing page. Consider using the slim `motion/react` subset or `@motionone/dom` for scroll effects only. |
| **No `<link rel="preload">` for LCP image** | 🟡 LOW | The first visible image (`cwt-2-0.png`) is the likely LCP element. A `<link rel="preload" as="image">` in `index.html` would improve LCP score. |
| **CLS risk is LOW** | ✅ OK | `width` and `height` attributes are passed to all `<img>` elements, allowing the browser to reserve correct space before images load. No significant CLS expected. |
| **Lazy loading is applied correctly** | ✅ OK | All non-first-section images use `loading="lazy"`. First section uses `loading="eager"`. |

### SEO

| Item | Status | Detail |
|------|--------|--------|
| `<title>` | ✅ | "Creative Web Technologies" |
| `<meta name="description">` | ✅ | Present and descriptive |
| `<html lang="en">` | ✅ | Set correctly |
| **Favicon** | 🔴 MISSING | No `<link rel="icon">` in `index.html`, no `favicon.ico` or `favicon.png` in `/public/`. Browser tab shows a blank/default icon. |
| **Open Graph tags** | 🔴 MISSING | No `og:title`, `og:description`, `og:image`, `og:url`. Social media link previews will be blank. |
| **Twitter Card tags** | 🟠 MISSING | No `twitter:card`, `twitter:title`, `twitter:image`. |
| **Canonical URL** | 🟡 MISSING | No `<link rel="canonical">`. |
| **robots.txt** | 🟡 MISSING | No `/public/robots.txt`. |
| **sitemap.xml** | 🟡 MISSING | No sitemap. |
| **Structured data** | 🟡 MISSING | No JSON-LD `Organization` or `WebSite` schema. |

---

## 7. VERCEL READINESS

### Build Check

```
npm run build → tsc -b && vite build
✓ 435 modules transformed.
dist/index.html               0.76 kB │ gzip:  0.44 kB
dist/assets/index-*.css      23.03 kB │ gzip:  5.01 kB
dist/assets/index-*.js      377.12 kB │ gzip: 120.91 kB
✓ built in 454ms
```

**Build is clean — zero errors, zero warnings.**

### Deployment Checklist

| Check | Status | Detail |
|-------|--------|--------|
| Build command | ✅ | `npm run build` works cleanly |
| Output directory | ✅ | `dist/` — Vercel detects Vite automatically |
| `dist/` in .gitignore | ✅ | Correctly excluded |
| Static file paths | ✅ | All image paths are root-relative (`/infographics/…`, `/logo/…`); no absolute localhost URLs |
| Case sensitivity | ✅ | All filenames in `sections.ts` exactly match the files in `/public/infographics/` (verified manually). Vercel/Linux is case-sensitive — no issues found. |
| Environment variables | ✅ | None required |
| SPA routing | ✅ | No React Router — only hash anchors. No 404 fallback config needed. |
| **`originals/` in repo** | 🟠 WARN | The `originals/` directory contains ~25 MB of large image files tracked by git. These won't be deployed (they're outside `public/`), but they bloat the repository and slow clones. Consider adding `originals/` to `.gitignore`. |
| **No `vercel.json`** | 🟡 INFO | Acceptable for a pure SPA with no API routes. Add one only if custom headers (e.g. cache-control for images) or redirects are needed. |

---

## 8. RECOMMENDATIONS

### Priority: HIGH

| # | Issue | Fix |
|---|-------|-----|
| H1 | **~28 MB of unoptimised PNG images** | Convert all infographics to WebP (use `cwebp`, `sharp`, or `vite-plugin-image-optimizer`). Target <200 KB per image. This is the single biggest performance win. |
| H2 | **No mobile navigation** | Add a hamburger/drawer menu to `Navbar.tsx` that appears below `md`. The nav links are already data-driven from `sections` so the menu just needs a `useState(false)` toggle and a `<button>` to open it. |
| H3 | **Lightbox has no focus trap** | Install `focus-trap-react` (or implement a manual trap). On open, move focus to the Close button. On close, return focus to the card that opened it. This is required for WCAG SC 2.1.2 and 3.2.2. |
| H4 | **No favicon** | Create a 32×32 and 180×180 PNG from the CWT wordmark and add `<link rel="icon">` and `<link rel="apple-touch-icon">` to `index.html`. |
| H5 | **Figcaption shows raw filenames** | In `WindowCard.tsx:37`, replace `{item.file}` with `{item.title}` (or remove the figcaption entirely if no caption is desired). |

### Priority: MEDIUM

| # | Issue | Fix |
|---|-------|-----|
| M1 | **No Open Graph / Twitter Card tags** | Add `og:title`, `og:description`, `og:image`, `og:url`, and `twitter:card` to `index.html`. Use a static OG image (e.g. a screenshot of the hero). |
| M2 | **No summary + reveal for multi-infographic sections** | See data model proposal below. Add a `cover` field per section; cards beyond the cover are hidden behind a "See all X →" expander. |
| M3 | **Inconsistent image aspect ratios in Customs grid** | Either re-export `customs-01-arms.png` and `customs-05-risk.png` at 1536 × 1024, or use `aspect-[3/2]` + `object-cover` in `WindowCard` to force a uniform frame (with letterboxing). |
| M4 | **Google Fonts missing gstatic preconnect** | Add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` to `index.html` directly after the googleapis preconnect. |
| M5 | **slate-400 figcaption contrast (2.39:1)** | Raise to `text-slate-500` (#64748b, contrast ≈ 4.6:1) or remove the figcaption if it is decorative. |
| M6 | **Logo path duplicated** | Export a constant `SL_CUSTOMS_LOGO = "/logo/sl-customs.png"` from `sections.ts` (or a new `constants.ts`) and import it in `Footer.tsx`. |
| M7 | **`originals/` tracked by git** | Add `originals/` to `.gitignore`. Keep the originals in cloud storage (Google Drive, Dropbox). |

### Priority: LOW

| # | Issue | Fix |
|---|-------|-----|
| L1 | **brand colour contrast on small text (4.33:1)** | Darken to `#1a5cc8` (≈5.1:1) or accept the current value for large/bold text only. |
| L2 | **`<nav>` missing aria-label** | Add `aria-label="Main navigation"` to the `<nav>` in `Navbar.tsx`. |
| L3 | **Lightbox zoom button missing aria-label** | Add `aria-label={zoom ? "Fit image to screen" : "Zoom in to image"}` to the zoom toggle. |
| L4 | **No `<link rel="canonical">`** | Add canonical URL once the production domain is confirmed. |
| L5 | **No robots.txt** | Add `/public/robots.txt` allowing all crawlers once the site is ready to be indexed. |
| L6 | **Large JS bundle** | Investigate lazy-importing `Lightbox` via `React.lazy()`; it's only needed when a card is clicked. Saves ~30-40 KB on initial parse. |
| L7 | **`<link rel="preload">` for LCP image** | Add `<link rel="preload" as="image" href="/infographics/cwt-2-0.png">` (or the WebP equivalent after conversion). |
| L8 | **Window dot colours hardcoded** | Move `#ff5f57`, `#febc2e`, `#28c840` to CSS variables or a Tailwind config under `--color-dot-*` names. |

---

## 9. PROPOSED DATA-DRIVEN STRUCTURE

The current `sections.ts` is already clean. The main missing concept is distinguishing a **cover** infographic from **additional** ones, and adding a human-readable sub-caption. Proposed schema extension (no breaking changes):

```typescript
// src/data/sections.ts (proposed additions — do NOT change yet)

export interface Infographic {
  src: string;
  title: string;       // used in lightbox header and alt text
  caption?: string;    // optional human-readable card caption (replaces raw filename)
  w: number;
  h: number;
}

export interface SectionData {
  id: string;
  order: number;       // explicit order number, immune to array re-ordering bugs
  title: string;
  blurb: string;
  badge?: string;
  cover: Infographic;          // always shown as the section's summary card
  extras?: Infographic[];      // hidden behind "See all →" until expanded
}
```

Usage in Section.tsx:

```tsx
// Always render cover card
<WindowCard item={section.cover} onOpen={() => onOpen(section.cover)} />

// Render extras only when expanded
{section.extras && section.extras.length > 0 && (
  expanded
    ? section.extras.map(item => <WindowCard ... />)
    : <button onClick={() => setExpanded(true)}>See all {section.extras.length + 1} →</button>
)}
```

This model means:
- CWT Customs shows 1 cover card (e.g. `customs-01-arms.png`), with "See all 8 →" below it
- CWT Training shows 1 cover card (e.g. `training-powerbi-basic.png`), with "See all 4 →" below it
- All other sections are unchanged (no extras)
- Section order is controlled by the `order` field, immune to accidental array reorder

---

## Top 5 Issues (Summary)

1. **🔴 ~28 MB images** — 14 unoptimised PNGs at ~2 MB each. No WebP conversion, no Vite optimisation plugin. This is the single biggest quality-of-life and performance issue.
2. **🔴 No mobile navigation** — The `<nav>` is `hidden md:flex` with no hamburger fallback. Users on phones (and ~55% of web traffic is mobile) see only the logo and cannot navigate.
3. **🔴 Lightbox has no focus trap** — Focus is not moved into the dialog on open, and Tab cycles through background content. WCAG 2.1 Level A failure.
4. **🔴 No favicon** — Browser tab shows a blank icon. Every production site needs one.
5. **🟠 All infographics always visible** — Multi-product sections (Customs: 8 cards, Training: 4 cards) show everything simultaneously. A summary + "See all" reveal was specified as a requirement but is not implemented.
