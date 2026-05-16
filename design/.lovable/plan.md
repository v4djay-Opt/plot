# PlotsGurgaon.in — Homepage Build Plan

A single-page premium real estate homepage with sticky nav, hero, search, listings, locations, value props, lead form, footer, and a floating WhatsApp button.

## Design tokens (src/styles.css)
Add brand tokens in oklch (mapped from hex):
- `--primary` Forest Green `#1B4332`
- `--secondary` Green `#40916C`
- `--accent` Amber `#D4A853`
- `--background` Warm White `#F8F4EF`
- `--foreground` near-black on warm white
- Matching `*-foreground` tokens for contrast
- Fonts: load Playfair Display + DM Sans via `<link>` in `__root.tsx` head; add `--font-display` and `--font-sans` tokens; apply DM Sans to body, Playfair to headings via a `.font-display` utility.

## Route & file structure
- `src/routes/index.tsx` — replace placeholder; compose page from section components.
- `src/routes/__root.tsx` — add Google Fonts preconnect + stylesheet links and updated SEO meta (title, description, og tags).
- `src/components/site/` (new):
  - `Navbar.tsx` (sticky, mobile hamburger via Sheet)
  - `Hero.tsx`
  - `SearchBar.tsx` (shadcn Select + Button)
  - `FeaturedPlots.tsx` + `PlotCard.tsx` (6 mock plots in array)
  - `Locations.tsx` (4 cards)
  - `WhyChooseUs.tsx` (4 lucide icons)
  - `LeadCapture.tsx` (form, client-only state, toast on submit — no backend)
  - `Footer.tsx`
  - `WhatsAppFab.tsx` (fixed bottom-right)

All built with existing shadcn primitives (Button, Input, Select, Card, Sheet, Sonner) and lucide-react icons (MapPin, Ruler, IndianRupee, ShieldCheck, Phone, MessageCircle, Menu, ArrowRight, etc.).

## Section specs (matches brief)
1. **Navbar** — white bg, subtle shadow on scroll, logo "PlotsGurgaon.in" in Playfair forest-green, nav links (Home/Plots/Locations/Contact as in-page anchors), green rounded "Chat Now" WhatsApp button → `https://wa.me/919311122787`. Mobile: hamburger Sheet.
2. **Hero** — min-h-[90vh], dark overlay over a forest-green earthy CSS gradient placeholder, H1 Playfair, subtext, two CTAs (Amber primary + outlined white secondary), 3 trust badges row.
3. **Search bar** — white card with shadow, overlapping hero bottom; 3 Selects (Location, Plot Size, Budget) + Amber Search button. Non-functional (UI only).
4. **Featured Plots** — heading + 3-col responsive grid of 6 PlotCards with green-tinted placeholder image (CSS), Available/Sold Out badge, title, details row, RERA no., full-width "View Details" forest-green button. "View All Plots" link below.
5. **Locations** — 4 cards (Gurgaon, Sohna, Jajjar, Sector 102) with icon, name, count, arrow; hover → forest-green bg with white text.
6. **Why Choose Us** — 4 icon+label items in a row on warm-white background.
7. **Lead Capture** — full-width forest-green section, white heading, form (Name, Phone, Location Select, Amber Submit). Toast confirmation on submit. WhatsApp link below.
8. **Footer** — logo+tagline, quick links, contact, copyright on forest-green or dark warm tone.

**Floating WhatsApp FAB** — fixed bottom-right green circle, lucide MessageCircle icon, links to wa.me URL, subtle pulse animation.

## Interaction & polish
- Alternating section backgrounds: warm white ↔ subtle muted, no gradients (per brief).
- Hover: card lift (translate-y + shadow), button color shift.
- Fully responsive: grids collapse to 1 col on mobile, hero text scales, hamburger nav.
- Smooth scroll on anchor links.

## SEO
- Title: "PlotsGurgaon.in — Residential Plots in Gurgaon, Sohna & Jajjar"
- Meta description under 160 chars referencing RERA + direct owner.
- Single H1 in hero. Semantic `<section>`, alt text on imagery, `<main>` wrapper.

## Out of scope
- No backend/DB (Lovable Cloud not enabled). Lead form shows a success toast only.
- No real plot images — green-tinted CSS placeholders as specified.
- No additional routes (single homepage).
