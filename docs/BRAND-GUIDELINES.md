# AstraLumen — Brand Guidelines

Official brand standards for AstraLumen, the digital science museum and space observatory at [astralumen.science](https://astralumen.science).

---

## Brand Identity

| Element | Value |
|---------|-------|
| **Name** | AstraLumen |
| **Tagline** | Illuminate the Universe of Science |
| **Secondary tagline** | Science & Discovery |
| **Mission** | Make world-class science accessible through immersive, expert-reviewed educational content |
| **Voice** | Authoritative yet approachable — a knowledgeable guide, not a textbook |

### Name usage

- Always capitalize: **AstraLumen** (not Astra Lumen, astralumen, or ASTRALUMEN)
- In possessive: AstraLumen's
- Do not abbreviate to AL in public-facing copy

---

## Color Palette

### Primary brand colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Void** | `#050510` | 5, 5, 16 | Primary background |
| **Deep Space** | `#0a0a1a` | 10, 10, 26 | Secondary background, cards |
| **Nebula** | `#1a1040` | 26, 16, 64 | Card backgrounds, gradients |
| **Cosmic** | `#2d1b69` | 45, 27, 105 | Gradient endpoints |
| **Stellar** | `#7c3aed` | 124, 58, 237 | Primary accent, links, CTAs |
| **Stellar Light** | `#a78bfa` | 167, 139, 250 | Hover states, highlights |
| **Aurora** | `#06b6d4` | 6, 182, 212 | Secondary accent, taglines |
| **Aurora Light** | `#22d3ee` | 34, 211, 238 | Glows, gradients |
| **Gold** | `#fbbf24` | 251, 191, 36 | Stars, emphasis, badges |
| **Gold Light** | `#fcd34d` | 252, 211, 77 | Highlights |

### Text colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Starlight** | `#e2e8f0` | Primary text on dark backgrounds |
| **Moon** | `#94a3b8` | Secondary text, nav links |
| **Mist** | `#64748b` | Muted text, captions |

### Science accent colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Mars** | `#ef4444` | Alerts, Mars-related content |
| **Earth** | `#3b82f6` | Earth science, water |
| **Jupiter** | `#d97706` | Warm highlights |
| **Saturn** | `#f59e0b` | Planetary accents |

### CSS variables

```css
--void: #050510;
--deep-space: #0a0a1a;
--nebula: #1a1040;
--cosmic: #2d1b69;
--stellar: #7c3aed;
--stellar-light: #a78bfa;
--aurora: #06b6d4;
--aurora-light: #22d3ee;
--gold: #fbbf24;
--starlight: #e2e8f0;
--moon: #94a3b8;
--mist: #64748b;
```

### Color rules

- **Backgrounds:** Always dark (Void or Deep Space). Never use white backgrounds.
- **Gradients:** Stellar → Aurora → Gold for brand moments (logo, hero, OG image).
- **Contrast:** Starlight text on Void meets WCAG AA. Use Starlight for body, Moon for secondary.
- **Accents:** Stellar for primary actions; Aurora for secondary; Gold sparingly for emphasis.

---

## Typography

### Font families

| Role | Font | Fallback | CSS variable |
|------|------|----------|--------------|
| **Display** | Orbitron | Segoe UI, sans-serif | `--font-display` |
| **Body** | Inter | Segoe UI, system-ui, sans-serif | `--font-body` |
| **Mono** | JetBrains Mono | Consolas, monospace | `--font-mono` |

### Google Fonts import

```
https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@400;500;600;700;800&display=swap
```

### Type scale

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| H1 (hero) | Orbitron | 2.5–3.5rem | 700–800 | Letter-spacing 0.02em |
| H2 (section) | Orbitron | 1.75–2.25rem | 600–700 | |
| H3 (card) | Orbitron | 1.25–1.5rem | 600 | |
| Body | Inter | 1rem | 400 | Line-height 1.7 |
| Small / caption | Inter | 0.75–0.875rem | 400–500 | Moon color |
| Tagline | Inter | 0.625rem | 500 | Uppercase, Aurora, letter-spacing 0.15em |
| Code | JetBrains Mono | 0.875rem | 400 | |

### Typography rules

- **Orbitron** for headings, logo, navigation labels, and CTAs only.
- **Inter** for all body copy, descriptions, and UI text.
- **JetBrains Mono** for code snippets, data values, and technical notation.
- Never use serif fonts in the UI.
- Minimum body size: 16px (1rem).

---

## Logo

### Files

| Asset | Path | Usage |
|-------|------|-------|
| Favicon | `/favicon.svg` | Browser tab, bookmarks |
| Logo | `/images/logo.svg` | Header, schema.org, emails |
| OG image | `/images/og-default.svg` | Social sharing default |

### Logo mark

The AstraLumen mark combines:
- An orbital ring (exploration, cycles)
- A central stellar core (knowledge, illumination)
- A gold satellite dot (discovery)
- A downward light beam (lumen — light)

### Clear space

Maintain padding equal to the height of the central core (4px in 48px icon) on all sides.

### Don'ts

- Do not rotate the logo
- Do not change gradient colors
- Do not place on busy or low-contrast backgrounds
- Do not stretch or distort proportions
- Do not add drop shadows not in the source SVG

---

## Author Avatars

Circular initials avatars with category-aligned gradients:

| Author | Initials | Color |
|--------|----------|-------|
| Dr. Elena Vasquez | EV | Stellar purple (`#7c3aed`) |
| Dr. Marcus Chen | MC | Earth blue (`#3b82f6`) |
| Dr. Sarah Okonkwo | SO | Biology green (`#10b981`) |
| Dr. James Whitfield | JW | Aurora cyan (`#06b6d4`) |
| Dr. Amira Hassan | AH | Gold (`#fbbf24`) |

---

## Voice & Tone

### Principles

1. **Accurate** — Every claim is evidence-based and expert-reviewed.
2. **Clear** — Explain complex science without dumbing it down.
3. **Curious** — Frame discoveries as ongoing journeys, not finished facts.
4. **Inclusive** — Accessible to learners aged 12+ without jargon gates.
5. **Inspiring** — Connect science to wonder and real-world impact.

### Writing style

| Do | Don't |
|----|-------|
| Use active voice | Use passive, academic tone |
| Define technical terms on first use | Assume expert-level knowledge |
| Cite authoritative sources (NASA, Nature) | Make unsourced claims |
| Use "we" sparingly for the editorial team | Overuse "I" or brand self-reference |
| Write scannable content (headings, lists) | Publish wall-of-text paragraphs |

### Example tone

> **Too formal:** "The photospheric temperature of Sol approximates 5,778 kelvin."  
> **AstraLumen:** "The Sun's surface blazes at about 5,800 kelvin — hot enough to melt every element on Earth."

---

## UI Components

### Buttons

- **Primary:** Stellar gradient background, Starlight text, rounded (`--radius-md`)
- **Secondary:** Transparent with Stellar border
- **Ghost:** Text only, Aurora on hover

### Cards

- Background: `rgba(26, 16, 64, 0.6)` with `--border` stroke
- Border-radius: `--radius-md` (12px)
- Hover: subtle Stellar glow (`--glow-stellar`)

### Spacing

Use the 4px-based scale: `--space-xs` (4px) through `--space-4xl` (96px).

---

## Imagery

- **Featured images:** NASA public-domain photography with attribution
- **Illustrations:** Dark cosmic backgrounds with Stellar/Aurora accents
- **Never:** Stock photos with white backgrounds, clip art, or meme imagery
- **Attribution:** Always credit `imageAttribution` and `imageSource` in articles

---

## Social Media

| Platform | Handle |
|----------|--------|
| Twitter/X | @AstraLumen |
| Site | https://astralumen.science |

### Share copy template

```
[Article title] — Expert-reviewed science from AstraLumen 🔭
https://astralumen.science/articles/[slug]
```

---

## File Reference

Brand tokens are defined in:
- `src/styles/global.css` — CSS variables
- `src/config/site.ts` — `BRAND` object
- `public/images/logo.svg` — Logo asset
- `public/favicon.svg` — Favicon asset
