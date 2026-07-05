# Forra Energy — Web Platform

Marketing site and product shell for **Forra Energy**, Africa's intelligent energy platform.
Built with **Next.js 15 (App Router)**, **React 19** and **strict TypeScript**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run typecheck  # tsc only
```

## Project structure

```
src/
├── app/                    # Routes (App Router)
│   ├── layout.tsx          # Root layout: fonts, metadata, Navbar/Footer, OverlayProvider
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── shop/page.tsx       # Solar Store — packages, filters, Get a Quote
│   ├── portal/page.tsx     # Client Portal placeholder (topbar link) — replace when portal ships
│   └── not-found.tsx
├── components/
│   ├── ui/                 # Primitives: Btn, Eyebrow, CountUp, Spark, icons
│   ├── layout/             # Navbar (topbar + main nav), Footer
│   ├── home/               # One file per homepage section
│   ├── contact/            # Contact page content
│   ├── shop/               # Solar Store: packages.ts (catalog data), SystemArt, ShopContent
│   ├── about/              # About page content
│   └── overlays/           # ExpertPanel, GetStartedWizard, QuotePanel
├── context/
│   └── OverlayProvider.tsx # openExpert()/openStart() available app-wide via useOverlay()
├── lib/
│   ├── site.ts             # Single source of truth: phone, emails, addresses
│   ├── navigation.ts       # Menu structure + which items are live routes
│   ├── format.ts           # fmtN (₦ formatting)
│   └── hooks.ts            # useInView, useScrollLock, useEscapeKey
└── styles/                 # Layered global CSS design system (see below)
```

## Conventions

**Content colocation.** Each homepage section owns its copy/data (e.g. `PROJECTS` lives in
`Projects.tsx`). Shared facts (phone, addresses, nav) live in `lib/`. Swapping to a CMS later
means touching one file per section.

**Server by default, client when needed.** Sections without state are Server Components.
Anything using hooks, overlays or browser APIs is marked `"use client"`.

**Overlays, not routes.** "Get Started" and "Talk to an Expert" are conversion flows, not pages.
Trigger them from anywhere: `const { openStart, openExpert } = useOverlay();`

**CSS architecture.** Global, token-driven CSS imported in cascade order from `app/layout.tsx`:
`tokens → base → layout → home → pages → overlays → shop → responsive`. Design tokens are CSS custom
properties in `tokens.css` (colors, radii, type). Breakpoints: 1040 / 860 / 620.

**Icons.** Inline SVG components in `ui/icons.tsx`, drawn in Iconsax-linear style.
Production swap: `iconsax-react` (names match 1:1).

**Fonts.** Clash Display + Satoshi via Fontshare `<link>` in the root layout. Production
upgrade: self-host with `next/font/local`.

## Adding a page

1. `src/app/<route>/page.tsx` — Server Component exporting `metadata`, rendering a content component.
2. Content component in `src/components/<route>/` (client if interactive).
3. Register the route in `NAV_ROUTES` (`lib/navigation.ts`) so nav/footer links go live.

## Roadmap

- [ ] Energy Audit tool (`/audit`) — wizard already deep-links to `/#audit`; retarget when built
- [ ] Client Portal (`/portal`) — auth, financing dashboard, service tickets
- [ ] Form submissions → API routes / CRM (currently client-side success states)
- [ ] Product photography for Solar Store cards (replace `SystemArt` renders)
- [ ] Product & Solutions detail pages (`NAV_ROUTES` gates the links)
- [ ] Self-hosted fonts, analytics, real project photography
