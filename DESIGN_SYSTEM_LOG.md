# DESIGN_SYSTEM_LOG_v1.0

> **Structural memory for the CravingGo codebase.**
> Any future prompt or model extension should read this file to understand the design architecture without breaking existing structures.

**Last Updated:** `2026-07-10T00:00:00Z`

---

## Brand

| Field | Value |
|-------|-------|
| Name | `CravingGo` |
| Tagline | "From Our Kitchen to Your Door" |
| Mission | Fresh, chef-made meals delivered daily. Tailored to your goals. |

---

## Color Palette

### Primary Accent (Both Modes)
| Token | Hex | Usage |
|-------|-----|-------|
| `accentPrimary` | `#E8622A` | CTA buttons, links, highlights, active states |
| `accentPrimaryHover` | `#D4551F` | Button hover state |
| `accentPrimaryLight` | `#F4A261` | Gradient endpoints, subtle accents |

### Secondary Accent
| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| `accentSecondary` | `#2D6A2F` | `#3B8256` |

### Background
| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| `background` | `#0a0a0a` | `#F9F9F7` |
| `surface` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.03)` |

### Text
| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| `text` | `#FFFFFF` | `#1A1A1A` |
| `mutedText` | `#A0A0A0` | `#6B7280` |

### Texture Overlay
- **Dark:** `rgba(255,255,255,0.025)` grid lines, 48px spacing
- **Light:** `rgba(0,0,0,0.025)` grid lines, 48px spacing

---

## Typography

| Property | Value |
|----------|-------|
| Primary Font | `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| Serif Font | `'Playfair Display', Georgia, 'Times New Roman', serif` |
| Heading Weight | `700` (bold) |
| Body Weight | `400` (regular) |
| Medium Weight | `500` |
| Semi-Bold Weight | `600` |

---

## Layouts

| Layout | Used In |
|--------|---------|
| `fullscreen-viewport` | Hero, SecondHero, Delivery |
| `horizontal-carousel` | Lifestyle cards, Ingredients orbit, CTA testimonials |
| `grid-4col` | Menu product cards |
| `accordion-stack` | Goals section (3 expandable cards) |
| `floating-badges` | SecondHero orbit, Ingredients badges |

---

## State Machines

| State | Type | Location | Persistence |
|-------|------|----------|-------------|
| `theme` | `'light' \| 'dark'` | `ThemeContext.jsx` | `localStorage` key `"cravinggo-theme"` |
| `accordionIndex` | `number \| null` | `Goals.jsx` | Session only (default: `3` = "Lose Weight") |
| `carouselPosition` | `number` | `Lifestyle.jsx` | Session only (default: `1` = "Family") |
| `menuFilter` | `string` | `Menu.jsx` | Session only (default: `"All"`) |
| `menuSearch` | `string` | `Menu.jsx` | Session only (default: `""`) |
| `ingredientPlate` | `number` | `Ingredients.jsx` | Session only (default: `0`) |

---

## Scroll Sections

| # | Section ID | Nav Label | Component |
|---|------------|-----------|-----------|
| 1 | `home` | Fresh | `Hero.jsx` |
| 2 | `about` | Source | `SecondHero.jsx` |
| 3 | `goals` | Goals | `Goals.jsx` |
| 4 | `lifestyle` | Lifestyle | `Lifestyle.jsx` |
| 5 | `ingredients` | Ingredients | `Ingredients.jsx` |
| 6 | `menu` | Menu | `Menu.jsx` |
| 7 | `contact` | Our Family | `CTA.jsx` |
| 8 | `delivery` | Table | `Delivery.jsx` |

---

## Animations

| Animation | Implementation | Trigger |
|-----------|---------------|---------|
| Scroll Entrance | `useScrollReveal` hook + `framer-motion` fade + translateY(40px → 0) | Intersection Observer (threshold 0.1) |
| Floating Debris | CSS `@keyframes float-drift-1/2/3` with random sine offsets | Infinite loop, staggered delays |
| Accordion Expand | `framer-motion` `AnimatePresence` + height/opacity layout | Click toggle |
| Carousel Snap | `framer-motion` spring physics (stiffness: 300, damping: 30) | Drag end / click |
| Theme Toggle | `framer-motion` `AnimatePresence` sun/moon icon morph | Button click |
| Delivery Bag Drop | `framer-motion` spring (stiffness: 100, damping: 15) + bounce loop | `useInView` (amount: 0.25) |
| Orbit Badges | `framer-motion` rotate animation (18-24s duration) | Always running |
| Card Hover Lift | Tailwind `hover:-translate-y-1.5` + `hover:shadow-xl` | Mouse hover |

---

## Components

| Component | File | Description |
|-----------|------|-------------|
| `Navbar` | `src/components/Navbar.jsx` | Fixed sticky navbar, glassmorphism on scroll (>50px), theme toggle, mobile menu |
| `DotNavigation` | `src/components/DotNavigation.jsx` | Right-side vertical dot nav with scroll spy, visible on `lg:` screens |
| `ScrollReveal` | `src/components/ScrollReveal.jsx` | Reusable Intersection Observer wrapper for fade-in animations |
| `Hero` | `src/components/Hero.jsx` | Full-screen hero with 3D perspective grid, floating city blocks, CTA buttons |
| `SecondHero` | `src/components/SecondHero.jsx` | "EAT Local, EAT Healthy" with orbiting ingredient badges around bowl |
| `Goals` | `src/components/Goals.jsx` | 3 accordion cards with circular progress, kcal metrics, meal grid |
| `Lifestyle` | `src/components/Lifestyle.jsx` | Drag/swipeable 3-card carousel with scale + blur transform |
| `Ingredients` | `src/components/Ingredients.jsx` | Plate showcase with orbiting badges, left/right navigation |
| `CTA` | `src/components/CTA.jsx` | "Are You Ready?" CTA with draggable testimonial cards |
| `Menu` | `src/components/Menu.jsx` | Search bar + category filters + 4-column product grid with macro pills |
| `Delivery` | `src/components/Delivery.jsx` | Delivery bag SVG with spring bounce, stats grid, footer |

---

## Key Files

```
src/
├── App.jsx                    # Root app, ThemeProvider wrapper
├── main.jsx                   # Entry point
├── index.css                  # Tailwind config + global styles + animations
├── context/
│   └── ThemeContext.jsx        # Dark/light mode state + localStorage
├── hooks/
│   ├── useScrollReveal.js      # Intersection Observer for scroll animations
│   └── useScrollSpy.js         # Active section tracking for dot nav
└── components/
    ├── Navbar.jsx
    ├── DotNavigation.jsx
    ├── ScrollReveal.jsx
    ├── Hero.jsx
    ├── SecondHero.jsx
    ├── Goals.jsx
    ├── Lifestyle.jsx
    ├── Ingredients.jsx
    ├── CTA.jsx
    ├── Menu.jsx
    └── Delivery.jsx
```

---

## CSS Utilities

| Class | Description |
|-------|-------------|
| `.btn-primary` | Orange pill button with hover shadow + active scale |
| `.btn-secondary` | Outlined pill button, inherits theme border |
| `.glass-dark` | `rgba(10,10,10,0.8)` + `blur(20px)` + white/8 border |
| `.glass-light` | `rgba(249,249,247,0.9)` + `blur(20px)` + black/5 border |
| `.orange-glow` | Orange box-shadow glow on hover |
| `.grid-texture-dark` | Subtle white grid lines on dark background |
| `.grid-texture-light` | Subtle black grid lines on light background |
| `.snap-section` | `scroll-snap-align: start` + `min-height: 100vh` |
| `.text-balance` | `text-wrap: balance` for better heading wrapping |

---

## Responsive Breakpoints

| Breakpoint | Prefix | Usage |
|------------|--------|-------|
| Default | (none) | Mobile-first base |
| `640px` | `sm:` | Small tablets, large phones |
| `768px` | `md:` | Tablets, small desktops |
| `1024px` | `lg:` | Desktops, dot navigation visible |
| `1280px` | `xl:` | Large screens |

---

## Unsplash Image Sources

| Section | Image URL |
|---------|-----------|
| Hero Grid | CSS perspective grid (no image) |
| SecondHero Bowl | Emoji `🥗` |
| Lifestyle Cards | `photo-1521791136064-7986c2920216`, `photo-1609220136736-443140cffec6`, `photo-1517836357463-d25dfeac3438` |
| Ingredients Plates | `photo-1532550907401`, `photo-1467003909585`, `photo-1544025162-d76694265947` |
| Menu Items | 8 various food photos from Unsplash |
| Delivery BG | `photo-1556909114-f6e7ad7d3136` (grayscale, blurred) |
| Goal Meals | 9 various food photos from Unsplash |

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-07-10 | v1.0 | Initial build: All 8 sections, theme system, animations, responsive design |
