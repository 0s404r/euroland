# AGENTS.md — AquaPro·ES Landing Page

## Project Overview

High-conversion Spanish e-commerce landing page for the **Hidrolavadora Portátil Inalámbrica 48V de Alta Presión** by AquaPro·ES. Built with TanStack Start and Tailwind CSS v4, deployed on Netlify.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript 5.9 |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx      # HTML shell: lang="es", page title, Google Fonts
    index.tsx       # Entire landing page — all sections as React components
  styles.css        # Tailwind import + custom CSS animations
public/
  favicon.ico
netlify.toml        # Netlify build config
```

## Component Structure (all in `src/routes/index.tsx`)

| Component | Purpose |
|---|---|
| `MarqueeBar` | Infinitely scrolling top banner with inline SVG icons |
| `Header` | Sticky header with scroll-triggered shadow, brand logo, live status dot |
| `OfferBar` | Sticky orange bar with live 15-minute countdown timer (auto-resets) |
| `Hero` | Two-column hero: product image + info, price, stock urgency, CTA |
| `FeaturesSection` | 3×2 feature card grid with hover icon color flip |
| `UseCasesSection` | 4 image-overlay cards for use cases |
| `HowItWorks` | 3-step visual process section |
| `Testimonials` | 4 customer review cards with star ratings |
| `OrderForm` | Pack selection + delivery form + live total + success state |
| `FAQ` | CSS accordion with 6 Q&A entries |
| `Footer` | 3-column footer + GDPR compliance text + legal links |

## Key Coding Conventions

- All sections are self-contained functional components; no cross-section state
- SVG icons are fully inline (no icon library)
- Primary color `#FF5A1F` used as Tailwind JIT arbitrary values
- Display font: `Barlow Condensed` (bold/black weights), body: `Inter` — both from Google Fonts
- Animations defined in `styles.css` as `@keyframes` + named CSS classes
- Form validation is client-side only; no backend integration

## Non-Obvious Decisions

- **Countdown resets** to 15:00 on reaching 0 — it's an evergreen offer, not a real expiry
- **Pack 2 pre-selected** by default as the "MÁS VENDIDO" option to maximize AOV
- **OfferBar sticky offset** is `top-[57px]` — matches the header height; adjust if header changes
- **Unsplash images** used for use-case cards; replace with self-hosted images for production
- Product image loaded from external Shopify CDN

## Development Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
```
