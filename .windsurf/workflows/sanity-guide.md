---
description: Sanity Studio Setup & Usage Guide
---

# Sanity Studio Guide

## What is Sanity Studio?

Sanity Studio is your CMS dashboard where you can create and edit content (Properties, Blog Posts, Landing Pages) without touching code. It connects to your live Sanity dataset, so changes appear on your live site after a rebuild.

## Two Ways to Use the Studio

### Option 1 — Deploy to Sanity's Cloud (Recommended for Live Use)

Deploy the studio to Sanity's CDN so you can access it from any browser, anywhere.

```bash
npx sanity deploy
```

It will ask for a hostname. Just press Enter to use the default:
**`https://76tdcxev.sanity.studio/`**

Bookmark that URL. Open it, log in with your Sanity account, and edit content. This is your permanent live CMS URL.

**Why this is best:** No need to run anything on your computer. The studio is hosted by Sanity and always available.

---

### Option 2 — Run Locally on Your Computer

Use this when you want to make quick edits from your laptop.

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/plotnext/plotsgurgaon
npx sanity dev --port 3333
```

Then open: **http://localhost:3333**

Log in with your Sanity account. The studio edits the **live production dataset** even though it runs on your machine.

---

## What You Can Edit

Open the studio sidebar. You'll see:

- **Landing Pages** — edit city pages (e.g., plots-in-jhajjar)
- **Properties** — add/edit plot listings
- **Blog Posts** — write articles with rich text
- **Cities** — city metadata
- **Micro Locations** — area names
- **Redirects** — URL redirects
- **Site Settings** — global config

## Editing a Landing Page (e.g., plots-in-jhajjar)

1. Click **Landing Pages** in the sidebar
2. Click **Create new Landing Page**
3. Fill in these key fields:

| Field | Example Value |
|-------|---------------|
| Title | Jhajjar Landing Page |
| URL Slug | `plots-in-jhajjar` |
| City Name | Jhajjar |
| Hero H1 Heading | Residential Plots in Jhajjar Under ₹50 Lakh |
| Hero Intro Text | Verified residential plots in Jhajjar under ₹50 lakh. |
| Body Description | Longer description paragraph. |
| State / Region | Haryana |
| Sectors | Jhajjar Highway, Jhajjar Town, Bahadurgarh Road |
| Key Bullets | Title + Description + Icon |
| Nearby Links | Label + URL + Detail |
| FAQs | Question + Answer |
| Price Table | Sector + Size + Price + Approval |
| Investor Points | Bullet text lines |
| Homebuyer Points | Bullet text lines |
| Site Visit Steps | Step text lines |
| Location Match Pattern | `jhajjar` (regex to match plots) |
| SEO Title | Page title for Google |
| SEO Description | Meta description |
| Active | ✅ Keep checked |

4. Click **Publish** at the bottom (not just Save)
5. Changes are live in the CMS immediately

**Important:** Only fill fields you want to override. Leave a field blank and the site falls back to the hardcoded config.

## Editing a Property

1. Click **Properties** → **Create new Property**
2. Fill: Title, Slug, Status, Price, Area, Location, Images, Description, Amenities, RERA Number
3. **Publish**
4. The new property appears on `/plots` automatically

## Editing a Blog Post

1. Click **Blog Posts** → **Create new Blog Post**
2. Fill: Title, Slug, Excerpt, Cover Image, Content (rich text), Category, Author, Read Time, Featured toggle, Published At
3. **Publish**
4. The post appears on `/blog`

## After Content Changes — Rebuild Your Site

Sanity content changes are **instant in the CMS**, but Next.js caches static pages. To see changes on your live Hostinger site:

**Option A — Push an empty commit (triggers Hostinger rebuild):**
```bash
git commit --allow-empty -m "chore: rebuild after CMS update"
git push origin main
```

**Option B — Redeploy from Hostinger hPanel:**
Go to hPanel → Your Next.js app → Click "Deploy" or "Rebuild"

**Option C — Wait for auto-deploy (if Git integration is set):**
If Hostinger auto-deploys on push, Option A is enough.

## Environment Variables

Sanity needs these env vars. Your `.env` file already has them:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=76tdcxev
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01
SANITY_API_TOKEN=sk... (secret token)
```

**For Hostinger production builds:** Add these in **hPanel → Advanced → Environment Variables**.

## Quick Checklist

- [ ] Deployed studio with `npx sanity deploy` (or running locally)
- [ ] Created a Landing Page with slug matching URL path (e.g., `plots-in-jhajjar`)
- [ ] Clicked **Publish** (not just Save)
- [ ] Rebuilt website to see changes
- [ ] Env vars set in Hostinger for production builds
