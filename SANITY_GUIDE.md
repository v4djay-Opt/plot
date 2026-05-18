# Sanity Studio — Content Guide

Studio URL: **http://localhost:3333**

---

## The Correct Order to Add a New City

Always follow this order — each step depends on the previous one.

```
1. Site Settings   (one-time setup)
2. Cities          (add the city)
3. Micro Locations (add sectors/areas inside the city)
4. Properties      (add plots, linked to a micro location)
5. Landing Pages   (add the full city page content)
6. Blog Posts      (optional, add articles)
7. Redirects       (optional, for URL changes)
```

---

## 1. Site Settings

**What it is:** Global settings for the entire website. Fill this once.

**Where it appears:** Phone numbers, agent name, contact details across all pages.

| Field | What to put |
|---|---|
| Site Name | `PlotsGurgaon.in` |
| Site Description | Short tagline for SEO |
| Phone Number | `09311122787` |
| WhatsApp Number | `919311122787` (with country code, no +) |
| Email | `info@plotsgurgaon.in` |
| Agent Name | `Rohit Singh` |
| Agent Title | `Property Consultant` |
| Agent Photo | Upload agent photo |
| Office Address | Full office address |
| Google Analytics ID | `G-XXXXXXXXXX` |

**Example:**
```
Site Name:    PlotsGurgaon.in
Phone:        09311122787
WhatsApp:     919311122787
Agent Name:   Rohit Singh
Agent Title:  Senior Property Consultant
Address:      Office 12, DLF Cyber City, Gurgaon - 122002
```

---

## 2. Cities

**What it is:** Each city you operate in (Gurgaon, Noida, Faridabad, etc.).

**Where it appears:**
- Header dropdown "Locations" menu
- Footer locations column
- `/locations` page city grid
- Enables the city landing page at `/plots-in-[slug]`

**⚠️ Important:** The **Slug** you set here becomes the URL.
- Slug `noida` → URL `/plots-in-noida`
- Slug `faridabad` → URL `/plots-in-faridabad`

| Field | What to put |
|---|---|
| City Name | `Noida` |
| Slug | Click **Generate** — auto-fills from name |
| Description | 1–2 sentences about the city for SEO |
| Hero Image | Aerial or landmark photo of the city |
| SEO Title | `Residential Plots in Noida \| plotsgurgaon.in` |
| SEO Description | Max 160 chars, describe what's available |
| Active | ON = shows in header/footer, OFF = hidden |

**Example:**
```
City Name:       Noida
Slug:            noida   ← click Generate
Description:     Noida offers excellent residential plot investment opportunities
                 with RERA-registered plots near Expressway and metro stations.
SEO Title:       Residential Plots in Noida | plotsgurgaon.in
SEO Description: Verified residential plots in Noida. RERA registered. Near
                 Expressway and metro. Call 09311122787 for free site visit.
Active:          ✅ ON
```

---

## 3. Micro Locations

**What it is:** Sectors, roads, or sub-areas within a city. Every property must belong to one.

**Where it appears:**
- Property listing cards (location label)
- Sector filter chips on city landing pages
- Search/filter on the plots page

**⚠️ Important:** Always link to the correct **Parent City** — this is how properties get shown on the right city page.

| Field | What to put |
|---|---|
| Location Name | `Sector 62` or `Expressway Zone` |
| Slug | Click **Generate** |
| Parent City | Select the city from the dropdown |
| Description | Optional — 1–2 lines about this area |
| SEO Title | Optional — for micro-location pages |
| SEO Description | Optional — max 160 chars |

**Example for Noida:**
```
Location Name:  Sector 62
Slug:           sector-62   ← click Generate
Parent City:    Noida       ← select from dropdown
Description:    Sector 62 is a prime residential zone in Noida with metro
                connectivity and established infrastructure.
```

**Example for Gurgaon:**
```
Location Name:  Sector 92
Slug:           sector-92
Parent City:    Gurgaon
Description:    Sector 92 offers DDJAY-approved plots with direct NH-48 access.
```

---

## 4. Properties

**What it is:** Individual plot listings. Each plot is shown as a card on city pages and the /plots page.

**Where it appears:**
- `/plots` listing page
- City landing pages (in the plots grid)
- Individual plot detail page at `/plots/[slug]`

**⚠️ Important:** The **Location** field links to a Micro Location — that Micro Location links to a City. This chain is how plots appear on the right city page.

```
Property → Micro Location (Sector 62) → City (Noida)
```

| Field | What to put |
|---|---|
| Title | `200 Sq Yd Residential Plot in Sector 62, Noida` |
| Slug | Click **Generate** |
| Status | Available / Sold |
| Plot Type | Corner Plot / Park Facing / Main Road / Regular |
| Price (in Rupees) | `3500000` (= ₹35 Lakh, no commas) |
| Price per Sq Yd | `17500` (optional) |
| Plot Area (Sq Yd) | `200` |
| Location | Select a Micro Location from dropdown |
| Images | Upload 1–10 photos of the plot |
| Description | Rich text description of the plot |
| Amenities | Tick: Road Access, Electricity, Water Supply, etc. |
| RERA Number | `UP/GBU/OTHERS/2023/0012345` |
| Featured | ON = shown on homepage |
| SEO Title | Auto-generated or custom |
| SEO Description | Max 160 chars |

**Example:**
```
Title:          200 Sq Yd Residential Plot in Sector 62, Noida
Slug:           200-sq-yd-residential-plot-in-sector-62-noida
Status:         Available
Plot Type:      Corner Plot
Price:          3500000
Price/Sq Yd:    17500
Area:           200
Location:       Sector 62  ← select from dropdown (must exist in Micro Locations)
Amenities:      Road Access, Electricity, Water Supply, Park Nearby
RERA Number:    UP/GBU/OTHERS/2023/0012345
Featured:       ✅ ON (if you want it on homepage)
SEO Description: 200 Sq Yd corner plot in Sector 62 Noida. RERA registered.
                 Park facing. Price ₹35 Lakh. Call 09311122787.
```

---

## 5. Landing Pages

**What it is:** The full content for a city page — all sections, text, FAQs, price table, etc.

**Where it appears:** The city URL `/plots-in-[slug]` — all 10 sections of the page.

**⚠️ Important:** The **URL Slug** MUST match `plots-in-` + the city slug.
- City slug = `noida` → Landing Page slug = `plots-in-noida`
- City slug = `faridabad` → Landing Page slug = `plots-in-faridabad`

| Field | Section on page |
|---|---|
| Page Title | Browser tab title (internal) |
| URL Slug | Must be `plots-in-[city]` e.g. `plots-in-noida` |
| City Name | Display name e.g. `Noida` |
| Hero H1 Heading | Big headline in the hero banner |
| Hero Intro Text | Short paragraph under H1 |
| Body Description | "Why Invest" paragraph |
| State / Region | Haryana or Uttar Pradesh |
| Sectors / Micro-locations | Names for the filter chips |
| Key Bullets | 3 cards in "Why Invest" section |
| Price Table Rows | Price range table |
| Investor Bullet Points | Left column of "Investor or Home Buyer" |
| Homebuyer Bullet Points | Right column of "Investor or Home Buyer" |
| Site Visit Steps | 3 steps in "How to Book" section |
| Nearby Links | "Nearby Locations" cards |
| FAQs | FAQ accordion at bottom |
| SEO Title | Custom meta title (overrides city SEO title) |
| SEO Description | Custom meta description |
| Active | ON = page is live |

**Full Example for Noida:**

```
Page Title:     Residential Plots in Noida | plotsgurgaon.in
URL Slug:       plots-in-noida   ← MUST start with "plots-in-"
City Name:      Noida
Hero H1:        Residential Plots in Noida — Verified Options Near Expressway
Hero Intro:     Explore RERA-registered residential plots in Noida starting
                from ₹25 Lakh. Park facing, corner and main road options.
                Free site visit. Call 09311122787.
Body:           Noida is one of NCR's fastest-growing real estate markets.
                With excellent metro connectivity, upcoming IT hubs, and
                RERA-registered plots available in multiple sectors, it
                offers strong appreciation for both investors and home buyers.
Region:         Uttar Pradesh
Active:         ✅ ON
```

**Sectors (filter chips):**
```
Sector 62
Sector 137
Expressway Zone
Greater Noida West
```

**Key Bullets (Why Invest section):**
```
Bullet 1:
  Title: RERA Registered
  Desc:  All plots are UP RERA registered with clean titles.
  Icon:  Shield / Trust

Bullet 2:
  Title: Metro Connectivity
  Desc:  Direct metro access from multiple sectors in Noida.
  Icon:  Pin / Location

Bullet 3:
  Title: High Appreciation
  Desc:  Noida property values have grown 18% YoY in 2024.
  Icon:  Trend / Growth
```

**Price Table Rows:**
```
Row 1: Sector 62 | 100–200 Sq Yd | ₹25L–₹50L | UP RERA
Row 2: Sector 137 | 200–400 Sq Yd | ₹55L–₹1.2Cr | UP RERA
Row 3: Expressway Zone | 300–500 Sq Yd | ₹90L–₹2Cr | UP RERA
```

**Investor Bullet Points:**
```
Strong capital appreciation in Noida Expressway corridor
Upcoming commercial zones driving residential demand
Low stamp duty compared to Delhi
RERA protection on all investments
```

**Homebuyer Bullet Points:**
```
Peaceful residential sectors away from traffic
Good schools and hospitals nearby
Metro within 10 minutes from most sectors
Free registry and loan assistance provided
```

**Site Visit Steps:**
```
Step 1: Call 09311122787 or fill the form below to express interest.
Step 2: We confirm your visit date and share exact location pin.
Step 3: Our advisor shows you shortlisted plots and shares all RERA documents.
```

**Nearby Links:**
```
Link 1: Plots in Greater Noida | /plots-in-greater-noida | 20 min from Noida City Centre
Link 2: Plots in Gurgaon | /plots-in-gurgaon | Premium options from ₹1 Crore
Link 3: Plots in Ghaziabad | /plots-in-ghaziabad | Affordable options near NH-58
```

**FAQs:**
```
Q: Are plots in Noida RERA registered?
A: Yes. All plots on plotsgurgaon.in for Noida carry valid UP RERA registration.
   We share the RERA certificate before any token payment.

Q: What is the price range of plots in Noida?
A: Plots in Noida range from ₹25 Lakh for 100 Sq Yd in outer sectors to
   ₹2 Crore for 500 Sq Yd on the Expressway. Call 09311122787 for exact rates.

Q: How far are these plots from metro stations?
A: Most listed plots are within 2–5 km of the nearest metro station on the
   Blue or Aqua line.

Q: Can I get a home loan for a plot in Noida?
A: Yes. We assist with SBI, HDFC and ICICI plot loans. Registry and legal
   support included at no extra cost.
```

---

## 6. Blog Posts

**What it is:** Articles and guides for buyers. Helps with SEO and trust.

**Where it appears:** `/blog` listing page and individual posts at `/blog/[slug]`.

| Field | What to put |
|---|---|
| Title | Article headline |
| Slug | Click **Generate** |
| Excerpt | 1–2 sentence summary (max 300 chars) |
| Cover Image | Featured image for the article |
| Content | Full article (rich text with headings, lists, images) |
| Category | Buying Guide / Investment / Market Trends / Legal & RERA / Location Guide |
| Author | `PlotsGurgaon Team` or agent name |
| Read Time | `5 min read` |
| Featured | ON = shown prominently on blog page |
| Published At | Date of publication |
| SEO Title | Custom title for search engines |
| SEO Description | Max 160 chars |

**Example:**
```
Title:      Top 5 Sectors to Buy a Plot in Noida in 2025
Slug:       top-5-sectors-buy-plot-noida-2025
Excerpt:    Noida's residential plot market is booming. Here are the
            5 sectors offering the best value and appreciation in 2025.
Category:   Location Guide
Author:     Rohit Singh
Read Time:  4 min read
Featured:   ✅ ON
Published:  2025-05-18
```

---

## 7. Redirects

**What it is:** Sends visitors from an old URL to a new URL automatically.

**When to use:**
- You changed a city slug
- An old page URL changed
- You removed a page and want to point traffic elsewhere

| Field | What to put |
|---|---|
| From Path | Old URL e.g. `/plots-noida` |
| To Path | New URL e.g. `/plots-in-noida` |
| Status Code | **301** = permanent (use this for SEO) · **302** = temporary |
| Active | ON = redirect is live |
| Note | Internal note like "Changed slug in May 2025" |

**Example:**
```
From:    /noida-plots
To:      /plots-in-noida
Code:    301 Permanent
Active:  ✅ ON
Note:    Old URL used in Google Ads campaign — redirected May 2025
```

---

## Quick Summary

| Schema | Do this first? | Links to |
|---|---|---|
| **Site Settings** | ✅ Yes, fill once | Nothing |
| **Cities** | ✅ Yes, before anything | Nothing |
| **Micro Locations** | ✅ Yes, before properties | City |
| **Properties** | After micro locations | Micro Location → City |
| **Landing Pages** | After city exists | Nothing (slug must match city) |
| **Blog Posts** | Anytime | Nothing |
| **Redirects** | When needed | Nothing |
