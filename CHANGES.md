# CWT — Implementation Change Log

Generated: 2026-10-19  
All 4 phases produced a clean `npm run build` with zero TypeScript or Vite errors.

---

## Phase 1 — Data model (`src/data/sections.ts`, `App.tsx`, `Footer.tsx`, `Section.tsx`, `WindowCard.tsx`)

| What changed | Detail |
|---|---|
| New `SL_CUSTOMS_LOGO` constant | Single source of truth: `/logo/sl-customs.png`. Used in `sections.ts` (badge) and `Footer.tsx` (import). The duplicate hardcoded path in Footer is gone. |
| Schema: `cover` + `extras` replaces `items` | Every section has a required `cover: Infographic` and optional `extras?: Infographic[]`. Sections with one infographic just have `cover`. |
| Schema: explicit `order` field | Section number no longer depends on array index; reordering the array won't silently break heading numbers. |
| Schema: `caption` on `Infographic` | Human-readable subtitle (e.g. "Automated Risk Management System") replaces the raw filename that was previously shown as the figcaption. |
| All 16 infographics given product names | ARMS, CDNS NextGen, DAT, Customs Edge, Risk Management, Agentic AI, OGA / AD Licence Upgrade, Operational Roster Engine, Power BI Basic / Intermediate / Advanced, Agentic AI Training. |
| `allItems()` helper in `App.tsx` | Computes `[cover, ...extras]` for lightbox and `onOpen` index lookup. |
| Raw filename figcaption removed | `WindowCard` now renders `item.caption` (if set) at `text-slate-600` — contrast 6.7:1. |

---

## Phase 2 — Uniform alignment (`WindowCard.tsx`, `Section.tsx`)

| What changed | Detail |
|---|---|
| Fixed 3:2 aspect-ratio frame | `<div class="aspect-[3/2] bg-neutral-50">` wraps every image. `object-contain` ensures the 1312×1199 images (ARMS, Risk Management, Crew) sit in the same frame as the 1536×1024 landscape images — no cropping, consistent card height. |
| Grid: 1 → 2 → 3 columns | Collections use `grid md:grid-cols-2 xl:grid-cols-3`. Single-item sections remain `max-w-5xl` centred. |
| Stagger delay capped | Animation stagger is `Math.min(n * 0.07, 0.35)` so long grids don't wait seconds before showing. |

---

## Phase 3 — Summary + expand for collections (`Section.tsx`, new `CollectionSummary.tsx`)

| What changed | Detail |
|---|---|
| `CollectionSummary` component | Stacked-deck visual: two offset/rotated layers behind the cover card, a count badge (`8 solutions` / `4 courses`), and a "View all N →" button. The deck is pointer-clickable (`role="presentation"`) while the button is the primary keyboard/a11y control. |
| Expand / collapse in `Section` | Collections (`extras.length > 0`) start collapsed. Clicking "View all" enters expanded state (full grid + "Show less" button). Collapse scrolls stable via double-rAF correction so the section header stays at the same viewport position. |
| `aria-expanded` + `aria-controls` | Expand button: `aria-expanded={false}`, `aria-controls="${id}-grid"`. Show-less button: `aria-expanded={true}`. Collapsed items are not in the DOM so they cannot receive focus. |
| `useReducedMotion` | All transition durations collapse to `0` and all `y`/`scale` initial values are neutralised when `prefers-reduced-motion: reduce` is set. |
| `AnimatePresence mode="wait"` | Summary and grid transition cleanly — summary exits before grid enters. |
| Lightbox scope | Clicking any card in the expanded grid opens the lightbox scoped to that collection (`allItems(section)` = cover + extras). Arrow navigation works within the collection. |
| Sri Lanka Customs emblem | Still rendered above the Customs section heading exactly as before (via `section.badge`). |

---

## Phase 4 — Fixes

### H2: Mobile navigation (`Navbar.tsx`)
- Hamburger button visible on `< md`, hidden on desktop.
- Animated icon morphs hamburger → ✕ via CSS transforms (no SVG swap).
- Full-screen slide-in drawer (`role="dialog" aria-modal="true"`).
- Closes on: link tap, `Escape` key, hamburger re-tap.
- Focus returns to the hamburger button on close.
- Body scroll locked while drawer is open.
- Section order numbers shown in the drawer links.

### H3: Lightbox focus trap (`Lightbox.tsx`)
- `prevFocusRef` captures `document.activeElement` before the dialog opens.
- Focus moves to the Close button on open (via `requestAnimationFrame`).
- Focus restores to the opener element on close.
- Manual Tab/Shift+Tab trap cycles within all focusable elements inside `dialogRef`.
- All buttons now have descriptive `aria-label` and `focus-visible` ring styles.

### H1: Image optimisation (`scripts/optimize-images.mjs` + `sections.ts`)
- `sharp` installed as a devDependency.
- `scripts/optimize-images.mjs` converts every PNG/JPG in `public/infographics/` to WebP at quality 82, max-width 1800 px.
- **Result: 30,932 KB → 4,488 KB (−85.5%)** — all 16 files are ≤310 KB.
- `sections.ts` updated to reference `.webp` paths. All 16 filenames verified case-exact against disk.
- Original PNG/JPG files remain in `public/infographics/` as fallback sources; the script does not delete them.

### H4: Favicon (`public/favicon.svg`, `index.html`)
- SVG favicon: navy (#0b2a6f) rounded square with italic "CWT" text.
- `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` added.
- `<link rel="apple-touch-icon" href="/logo/sl-customs.png">` added (note: replace with a 180×180 CWT PNG when available).

### M1: Open Graph + Twitter Card (`index.html`)
- `og:type`, `og:title`, `og:description`, `og:image` tags added.
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` tags added.
- **TODO:** Replace `og:image` and `twitter:image` with absolute production URLs once the domain is confirmed (relative paths are not valid for OG).

### M4: gstatic preconnect (`index.html`)
- Added `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` directly after the googleapis preconnect.

### M7: `originals/` in `.gitignore`
- Added `originals` to `.gitignore`. The ~25 MB source folder will no longer be tracked.

### L2: `aria-label` on `<nav>` (`Navbar.tsx`)
- Desktop nav: `aria-label="Main navigation"`.
- Mobile nav: `aria-label="Mobile navigation"` (inside the drawer dialog).

### L3: Zoom button `aria-label` (`Lightbox.tsx`)
- `aria-label={zoom ? "Fit image to screen" : "Zoom in to image"}`.

### M6: Logo path deduplication (`sections.ts`, `Footer.tsx`)
- `SL_CUSTOMS_LOGO` exported from `sections.ts`, imported in `Footer.tsx`.

### robots.txt (`public/robots.txt`)
- `User-agent: * / Allow: /` — allows all crawlers.

---

## What could not be verified (Chrome extension not connected)

| Check | Status |
|---|---|
| Visual layout at 375 / 768 / 1280 / 1920 px | **Not verified** — Chrome extension unavailable. Run `npm run preview` and check manually. |
| Stacked deck visual appearance | Not verified visually. |
| Mobile drawer animation | Not verified visually. |
| Lightbox focus trap in browser | Not verified in a real browser. |
| Expand / collapse scroll stability | Not verified in a real browser. |
| `og:image` social card preview | Not verified (also needs absolute URL). |
| Apple touch icon appearance | Not verified (uses sl-customs.png as placeholder). |

## Remaining items from REVIEW.md not implemented

| Item | Reason deferred |
|---|---|
| L1: brand colour on small text (4.33:1) | Requires design decision on brand colour — not changed without sign-off. |
| L6: Lazy-import `Lightbox` via `React.lazy` | Useful but low risk; left for a separate PR. |
| L7: `<link rel="preload">` for LCP image | Deferred until WebP OG/LCP image path is confirmed. |
| L8: Window dot colours to CSS variables | Cosmetic only; left as-is. |
| Dedicated 180×180 apple-touch-icon PNG | No branded PNG asset available; sl-customs.png used as placeholder. |
| Absolute URL for og:image | Needs production domain — add before go-live. |
