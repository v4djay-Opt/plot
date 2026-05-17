# SEO Implementation â€” Pending Tasks

Generated from `seo-implementation-plan-7369ea.md`

> **Latest audit:** See `final.md` (17 May 2026) â€” comprehensive SEO/health audit with scores, issues, and fix verification.

---

## Phase 1: Foundation (Must-Do First)

| # | Task | Status | Files |
|---|------|--------|-------|
| 1.1 | **Schema Markup â€” JSON-LD Components** | **Done** | All pages now have schema: Homepage (`RealEstateAgent` + `FAQPage`), 7 city pages (`RealEstateListing` + `FAQPage` + `BreadcrumbList`), Locations (`ItemList`), Plots (`ItemList` + `BreadcrumbList`), Blog (`Blog`), Blog posts (`BlogPosting` + `BreadcrumbList`), Contact (`ContactPage` + `RealEstateAgent`). |
| 1.2 | **Per-Page Metadata Overrides** | **Done** | Metadata + canonical added to all pages: `/`, all `/plots-in-*` (7), `/locations`, `/blog`, `/contact`, `/plots` |
| 1.3 | **H1 Alignment with Strategy** | **Done** | Updated `CITY_CONFIGS` H1s for mathura, gorakhpur, lucknow to match strategy |

## Phase 2: Content & Structure

| # | Task | Status | Files |
|---|------|--------|-------|
| 2.1 | **Create `/locations` Hub Page** | **Done** | `app/locations/page.tsx` exists with `ItemList` schema |
| 2.2 | **Expand City Page Content (H2 sections)** | **Done** | `CityLandingPage.tsx` already has insights, bullets, site visit steps |
| 2.3 | **Price Tables on City Pages** | **Done** | Responsive price table already rendered per city |
| 2.4 | **Persona-Specific CTAs** | **Done** | Investor + Homebuyer dual CTA blocks already exist |
| 2.5 | **Sticky Mobile Call Bar** | **Done** | `components/layout/MobileCallBar.tsx` already mounted in `layout.tsx` |
| 2.6 | **`tel:` Links** | **Done** | `tel:` links present in Footer, CityLandingPage, MobileCallBar, Contact |

## Phase 3: Technical SEO

| # | Task | Status | Files |
|---|------|--------|-------|
| 3.1 | **Sitemap & Robots** | **Done** | `app/sitemap.ts` and `app/robots.ts` already exist |
| 3.2 | **Image ALT Tags Audit** | **Done** | Fixed hero alt texts on city pages, blog, contact, plots. PropertyCard uses gradient (no img). |
| 3.3 | **Open Graph Images** | **Done** | `openGraph.images` added to all pages using existing images: `/images/hero-bg.jpg`, `/images/hero-plot.jpg`, `/images/loc-gurgaon.jpg`, `/images/loc-jhajjar.jpg`, `/images/loc-sohna.jpg` |
| 3.4 | **Google Analytics Wiring** | **Done** | GA4 script wired in `app/layout.tsx` via `NEXT_PUBLIC_GA_ID` |

## Phase 4: Off-Page & Local SEO (Non-Code)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | **Directory Listings (NAP Consistency)** | Pending | JustDial, IndiaMart, 99acres, MagicBricks, Housing.com, Sulekha, PropTiger |
| 4.2 | **Blog Content Pipeline (5 articles)** | Pending | Titles defined in strategy doc |

---

## Remaining Items

| # | Task | Priority | Notes |
|---|------|----------|-------|
| 1 | **OG Images** | Low | Create 1200Ã—630 branded images for homepage, city pages, blog posts. Current images exist but are generic. |
| 2 | **Directory Listings** | High | Manual task â€” ensure exact same NAP across all directories |
| 3 | **Blog Content (5 articles)** | High | Write and publish from the strategy's 15 ideas |
| 4 | **Schema markup** | **Done** | All 14 pages now have JSON-LD schema (including plot detail `RealEstateListing`) |
| 5 | **Plots page metadata** | **Done** | Refactored `plots/page.tsx` to server component with metadata; extracted `PlotsClient.tsx` |
| 6 | **Plot detail metadata** | **Done** | Refactored `/plots/[slug]` to server component with `generateMetadata` + `generateStaticParams` + schema |
| 7 | **Sitemap expansion** | **Done** | Sitemap now has 30 URLs including blog posts + 12 plot detail pages |
| 8 | **Lead form backend** | **Done** | `/api/lead` implemented with Resend email delivery; `LeadCapture.tsx` now POSTs for real |
| 9 | **Blog dates ISO 8601** | **Done** | All 6 blog posts use ISO dates; `formatDate` helper for display |
| 10 | **Plot data deduplication** | **Done** | Centralized `lib/plots.ts` eliminates data drift across 3 files |

---

## Success Metrics

- [ ] Google Search Console: All pages indexed, no crawl errors
- [ ] Rich Results Test: FAQ schema detected on Jhajjar + Gurgaon pages
- [ ] Schema.org Validator: RealEstateAgent + BreadcrumbList valid on homepage
- [ ] PageSpeed Insights: LCP < 2.5s, mobile score > 90
