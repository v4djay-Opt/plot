'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PropertyCard, { Plot } from '@/components/property/PropertyCard';
import FAQ from '@/components/site/FAQ';
import LeadCapture from '@/components/site/LeadCapture';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import {
  ArrowRight, ChevronRight, CheckCircle, Home, MapPinned, Phone, ShieldCheck, TrendingUp,
} from 'lucide-react';

export type CitySlug = 'gurgaon' | 'sohna' | 'jajjar' | 'mathura' | 'gorakhpur' | 'ayodhya' | 'lucknow';

type Nearby = { label: string; href: string; detail: string };
type Bullet = { title: string; desc: string; icon: 'shield' | 'trend' | 'pin' };

const ICONS = { shield: ShieldCheck, trend: TrendingUp, pin: MapPinned };

type PriceRow = { sector: string; size: string; priceRange: string; approval: string };

export const CITY_CONFIGS: Record<CitySlug, {
  name: string;
  h1Title: string;
  matches: (loc: string) => boolean;
  sectors: string[];
  intro: string;
  body: string;
  bullets: Bullet[];
  nearby: Nearby[];
  faqs: { q: string; a: string }[];
  seoPriceRange: { low: number; high: number };
  priceTable: PriceRow[];
  investorPoints: string[];
  homebuyerPoints: string[];
  siteVisitSteps: string[];
}> = {
  gurgaon: {
    name: 'Gurgaon',
    h1Title: 'Residential Plots in Gurgaon — Premium Verified Options From ₹1 Crore',
    matches: (loc) => /gurgaon|sector|dwarka expressway/i.test(loc),
    seoPriceRange: { low: 10000000, high: 40000000 },
    sectors: ['Sector 102', 'Sector 65', 'Sector 84', 'Dwarka Expressway', 'Sohna Road'],
    intro: 'Explore 10+ verified residential plots in Gurgaon. RERA registered. Free site visit available.',
    body: 'Gurgaon has emerged as North India\'s most dynamic real estate market. With world-class infrastructure, the upcoming Dwarka Expressway, proximity to IGI Airport, and a thriving corporate ecosystem along Cyber City and Golf Course Road, residential plots here offer both lifestyle and long-term capital appreciation. Whether you\'re planning a custom home or a future-ready investment, Gurgaon\'s emerging sectors deliver clear titles, planned development, and strong rental demand.',
    bullets: [
      { title: 'RERA Registered', desc: 'Every listed plot has a verified HRERA number and clean title.', icon: 'shield' },
      { title: 'High Appreciation', desc: 'Sectors along Dwarka Expressway have grown 18–22% YoY.', icon: 'trend' },
      { title: 'Prime Connectivity', desc: 'Minutes from NH-48, Metro, IGI Airport and Cyber Hub.', icon: 'pin' },
    ],
    nearby: [
      { label: 'Plots in Sohna', href: '/plots-in-sohna', detail: 'Affordable growth corridor' },
      { label: 'Plots in Jajjar', href: '/plots-in-jajjar', detail: 'Large-format residential plots' },
      { label: 'Plots in Sector 102', href: '/plots', detail: 'Browse all current listings' },
    ],
    faqs: [
      { q: 'Which sectors in Gurgaon are best for plot investment?', a: 'Sector 102, Sector 65, Sector 84 and the Dwarka Expressway belt currently offer the strongest mix of infrastructure, RERA-approved projects and 18–22% YoY appreciation.' },
      { q: 'Are these plots RERA registered?', a: 'Yes. Every Gurgaon plot we list carries a verified HRERA registration number with clean title and approved layout.' },
      { q: 'What is the price range for plots in Gurgaon?', a: 'Plots typically range from ₹40 lakh in emerging sectors to ₹3+ crore in premium micro-markets along Golf Course Extension and Dwarka Expressway.' },
      { q: 'Can I get a home construction loan after buying the plot?', a: 'Yes. We assist with composite plot + construction loans from HDFC, SBI, ICICI and Axis Bank — usually up to 75% of plot value.' },
      { q: 'How far are these plots from IGI Airport and Cyber City?', a: 'Most listed Gurgaon plots are within 25–40 minutes of IGI Airport and 15–25 minutes from Cyber City via NH-48 and the Dwarka Expressway.' },
    ],
    priceTable: [
      { sector: 'Sector 102', size: '200–300 Sq Yd', priceRange: '₹45 Lakh – ₹65 Lakh', approval: 'HRERA' },
      { sector: 'Sector 65', size: '200–400 Sq Yd', priceRange: '₹1.2 Cr – ₹2.5 Cr', approval: 'HRERA' },
      { sector: 'Dwarka Expressway', size: '300–500 Sq Yd', priceRange: '₹2.5 Cr – ₹4 Cr+', approval: 'HRERA' },
      { sector: 'Sector 84', size: '200–350 Sq Yd', priceRange: '₹80 Lakh – ₹1.5 Cr', approval: 'HRERA' },
      { sector: 'Sohna Road', size: '150–250 Sq Yd', priceRange: '₹35 Lakh – ₹60 Lakh', approval: 'HRERA' },
    ],
    investorPoints: [
      'Sectors 65 & 84 have delivered 18–22% YoY appreciation since 2021.',
      'Dwarka Expressway is the next Golf Course Road — infrastructure + metro expansion.',
      'Rental demand from Cyber City & DLF corporate hubs ensures exit liquidity.',
      'Composite loans available (plot + construction) up to 75% of value.',
    ],
    homebuyerPoints: [
      'Sector 102 & Sohna Road offer gated communities with parks, schools & hospitals.',
      'Ready-to-move plots with possession — start construction within 90 days of registry.',
      'Dwarka Expressway delivers IGI Airport in 20 minutes and Delhi in 30.',
      'All plots have clear titles, HRERA registration and approved building plans.',
    ],
    siteVisitSteps: [
      'Call 09311122787 or fill the form below to schedule a visit.',
      'Our advisor confirms the date, picks you up and shows 3–5 verified plots.',
      'Shortlist your favourite, review documents and get registry assistance.',
    ],
  },
  sohna: {
    name: 'Sohna',
    h1Title: 'Residential Plots in Sohna — Affordable Near Gurgaon',
    matches: (loc) => /sohna/i.test(loc),
    seoPriceRange: { low: 950000, high: 5000000 },
    sectors: ['Sohna Road', 'Sohna Town', 'Sector 2 Sohna', 'Sector 5 Sohna'],
    intro: 'Affordable residential plots in Sohna with rapid appreciation potential. RERA approved.',
    body: 'Sohna, the southern extension of Gurgaon, is one of NCR\'s fastest-growing investment destinations. With the Sohna Elevated Corridor cutting commute times in half and major developers active in the region, residential plots offer entry-level pricing with Gurgaon-grade infrastructure on the horizon.',
    bullets: [
      { title: 'Entry-Level Pricing', desc: 'Plots starting from ₹9.5 Lakh — ideal for first-time investors.', icon: 'trend' },
      { title: 'RERA Backed', desc: 'All projects carry valid HRERA registration.', icon: 'shield' },
      { title: 'Elevated Corridor', desc: '30-minute drive to Cyber City via the new flyover.', icon: 'pin' },
    ],
    nearby: [
      { label: 'Plots in Gurgaon', href: '/plots-in-gurgaon', detail: 'Premium urban micro-markets' },
      { label: 'Plots in Jajjar', href: '/plots-in-jajjar', detail: 'Lower entry prices, larger parcels' },
      { label: 'All Plots', href: '/plots', detail: 'Compare every active listing' },
    ],
    faqs: [
      { q: 'Why is Sohna a good investment destination?', a: 'The Sohna Elevated Corridor has cut commute to Cyber City to under 30 minutes. With Gurgaon-grade infrastructure rolling in and entry prices still low, Sohna offers strong appreciation potential.' },
      { q: 'What is the starting price of plots in Sohna?', a: 'Plots in Sohna start from around ₹9.5 lakh in emerging sectors, going up to ₹50 lakh in premium pockets along Sohna Road.' },
      { q: 'Are Sohna plots RERA approved?', a: 'Yes. All plots we list in Sohna carry valid HRERA registration along with approved layouts and clear titles.' },
      { q: 'How long does it take to commute from Sohna to Gurgaon?', a: 'With the new elevated corridor, the drive from Sohna to Cyber City and Golf Course Road takes roughly 30–35 minutes.' },
      { q: 'Can I build a house immediately on the plot?', a: 'Yes. All listed plots have approved layouts and ready possession, so you can begin construction right after registry.' },
    ],
    priceTable: [
      { sector: 'Sohna Road', size: '150–250 Sq Yd', priceRange: '₹25 Lakh – ₹35 Lakh', approval: 'HRERA' },
      { sector: 'Sohna Town', size: '200–400 Sq Yd', priceRange: '₹18 Lakh – ₹40 Lakh', approval: 'DTCP' },
      { sector: 'Sector 2 Sohna', size: '200–300 Sq Yd', priceRange: '₹20 Lakh – ₹32 Lakh', approval: 'HRERA' },
      { sector: 'Sector 5 Sohna', size: '150–250 Sq Yd', priceRange: '₹15 Lakh – ₹28 Lakh', approval: 'DTCP' },
    ],
    investorPoints: [
      'Sohna is the next big corridor after Dwarka Expressway — entry prices still 60% below Gurgaon.',
      'Elevated corridor & metro extension will cut commute to Cyber City to 20 minutes.',
      'Major developers (DLF, Sobha, Godrej) already launching — land values rising fast.',
      'Ideal for 3–5 year horizon: buy plot now, sell or build as prices appreciate.',
    ],
    homebuyerPoints: [
      'Sohna Road offers gated societies with schools, hospitals and daily markets.',
      'Larger plot sizes (300–500 sq yd) at a fraction of Gurgaon cost.',
      'Ready registry plots with HRERA/DTCP approval and bank loan eligibility.',
      'Clean environment, less congestion — ideal for families seeking space.',
    ],
    siteVisitSteps: [
      'Call 09311122787 or fill the form to book a free Sohna site visit.',
      'Visit 3–5 approved plots with our advisor, compare locations & prices.',
      'Get document verification, loan guidance and registry support.',
    ],
  },
  jajjar: {
    name: 'Jajjar',
    h1Title: 'Residential Plots in Jajjar Under ₹50 Lakh — Verified & DTCP Approved',
    matches: (loc) => /jajjar/i.test(loc),
    seoPriceRange: { low: 1500000, high: 5000000 },
    sectors: ['Jajjar Highway', 'Jajjar Town', 'Bahadurgarh Road'],
    intro: 'Large residential plots in Jajjar at unbeatable per-sq-yd rates. RERA verified.',
    body: 'Jajjar offers the largest plot sizes in the NCR belt at the most competitive rates. With the KMP Expressway, AIIMS Jajjar, and upcoming industrial corridors driving growth, the district is rapidly transforming into a high-potential residential and investment market.',
    bullets: [
      { title: 'Large Plot Sizes', desc: '500–600 sq yd plots widely available.', icon: 'pin' },
      { title: 'Best Per-Yard Price', desc: 'Lowest entry rates in the Gurgaon-influence zone.', icon: 'trend' },
      { title: 'Verified Titles', desc: 'RERA registered with clean documentation.', icon: 'shield' },
    ],
    nearby: [
      { label: 'Plots in Gurgaon', href: '/plots-in-gurgaon', detail: 'High-demand premium sectors' },
      { label: 'Plots in Sohna', href: '/plots-in-sohna', detail: 'Fast-growing southern belt' },
      { label: 'All Plots', href: '/plots', detail: 'Browse every available listing' },
    ],
    faqs: [
      { q: 'Why invest in Jajjar plots?', a: 'Jajjar offers the largest plot sizes in the NCR belt at the lowest per-yard rates, with the KMP Expressway, AIIMS Jajjar and upcoming industrial corridors driving long-term growth.' },
      { q: 'What plot sizes are available in Jajjar?', a: 'Jajjar plots range from 200 sq yd to large 500–600 sq yd parcels, ideal for villas, farmhouses or future resale.' },
      { q: 'Are Jajjar plots RERA approved?', a: 'Yes. We only list Jajjar plots that carry verified HRERA registration and clean ownership documents.' },
      { q: 'How is connectivity from Jajjar to Gurgaon and Delhi?', a: 'Jajjar is well connected via the KMP Expressway and Bahadurgarh Road, with travel time to Gurgaon around 60–75 minutes.' },
      { q: 'Is Jajjar a good location for long-term investment?', a: 'Yes. With AIIMS Jajjar operational and major industrial belts coming up nearby, the district is on a strong long-term growth trajectory.' },
    ],
    priceTable: [
      { sector: 'Jajjar Highway', size: '300–600 Sq Yd', priceRange: '₹18 Lakh – ₹35 Lakh', approval: 'DTCP' },
      { sector: 'Jajjar Town', size: '200–400 Sq Yd', priceRange: '₹12 Lakh – ₹25 Lakh', approval: 'DDJAY' },
      { sector: 'Bahadurgarh Road', size: '500–1000 Sq Yd', priceRange: '₹35 Lakh – ₹60 Lakh', approval: 'DTCP' },
    ],
    investorPoints: [
      'Lowest per-sq-yd price in the entire Gurgaon influence zone — high upside.',
      'KMP Expressway + Reliance MET City = industrial & logistics boom in 3–5 years.',
      'AIIMS Jajjar operational since 2023 — healthcare corridor driving residential demand.',
      'Large plots (500–1000 sq yd) ideal for farmhouse, villa or future subdivision.',
    ],
    homebuyerPoints: [
      'DDJAY plots under ₹50 lakh with registry-ready possession.',
      'Wide roads, sewer, water & electricity already laid in approved sectors.',
      '60–75 minutes to Gurgaon via KMP — manageable commute for remote workers.',
      'Bank loans (SBI, HDFC, PNB) available on approved DTCP/DDJAY layouts.',
    ],
    siteVisitSteps: [
      'Call 09311122787 to schedule a free Jajjar site visit.',
      'Our advisor shows 3–5 DTCP/DDJAY approved plots with title verification.',
      'Compare layouts, check amenities and get end-to-end registry assistance.',
    ],
  },
  mathura: {
    name: 'Mathura',
    h1Title: 'Residential Plots in Mathura | Land Near Vrindavan',
    matches: (loc) => /mathura/i.test(loc),
    seoPriceRange: { low: 800000, high: 4000000 },
    sectors: ['Vrindavan Road', 'Chaumuhan', 'Goverdhan Road', 'Refinery Area'],
    intro: 'Residential plots in Mathura and Vrindavan belt. Spiritual city with strong infrastructure growth and RERA-approved developments.',
    body: 'Mathura, the birthplace of Lord Krishna and part of the Braj region, is witnessing rapid real estate development along the Yamuna Expressway and Delhi–Mumbai Industrial Corridor. With improved connectivity to Agra, Delhi and Jaipur, residential plots in the Vrindavan and Chaumuhan belt offer a unique blend of spiritual living and modern infrastructure at highly affordable prices.',
    bullets: [
      { title: 'Yamuna Expressway', desc: 'Direct 2-hour connectivity to Delhi NCR.', icon: 'pin' },
      { title: 'Affordable Entry', desc: 'Plots starting from ₹8 Lakh — lowest in the NCR belt.', icon: 'trend' },
      { title: 'RERA Verified', desc: 'All listings carry UP RERA registration.', icon: 'shield' },
    ],
    nearby: [
      { label: 'Plots in Ayodhya', href: '/plots-in-ayodhya', detail: 'Emerging temple-town investment' },
      { label: 'Plots in Lucknow', href: '/plots-in-lucknow', detail: 'Capital city premium plots' },
      { label: 'All Plots', href: '/plots', detail: 'Browse every available listing' },
    ],
    faqs: [
      { q: 'Why buy a plot in Mathura?', a: 'Mathura offers affordable residential plots with strong infrastructure growth along the Yamuna Expressway, plus the unique spiritual and tourism appeal of the Braj region.' },
      { q: 'What is the price range of plots in Mathura?', a: 'Plots in Mathura and the Vrindavan belt start from around ₹8 lakh and go up to ₹40 lakh in premium gated communities.' },
      { q: 'Are Mathura plots RERA registered?', a: 'Yes. All plots we list in Mathura carry valid UP RERA registration with approved layouts and clean titles.' },
      { q: 'How is connectivity from Mathura to Delhi and Agra?', a: 'Mathura is on the Delhi–Agra Yamuna Expressway, with Delhi roughly 160 km (2 hours) and Agra roughly 55 km (1 hour) away.' },
      { q: 'Is Mathura good for investment or only end-use?', a: 'Both. End-users value the spiritual lifestyle, while investors benefit from Yamuna Expressway industrial growth and tourism-driven appreciation.' },
    ],
    priceTable: [
      { sector: 'Vrindavan Road', size: '200–400 Sq Yd', priceRange: '₹10 Lakh – ₹25 Lakh', approval: 'UP RERA' },
      { sector: 'Chaumuhan', size: '300–500 Sq Yd', priceRange: '₹15 Lakh – ₹30 Lakh', approval: 'UP RERA' },
      { sector: 'Goverdhan Road', size: '200–300 Sq Yd', priceRange: '₹8 Lakh – ₹18 Lakh', approval: 'DTCP' },
      { sector: 'Refinery Area', size: '300–600 Sq Yd', priceRange: '₹20 Lakh – ₹40 Lakh', approval: 'UP RERA' },
    ],
    investorPoints: [
      'Yamuna Expressway + DMIC = industrial corridor appreciation 12–16% YoY.',
      'Tourism economy (Braj, Vrindavan) drives rental demand for homestays & guesthouses.',
      'Entry price under ₹10 lakh — lowest in NCR belt with highest upside.',
      'Jewar Airport (Noida International) will cut Delhi commute to 90 minutes.',
    ],
    homebuyerPoints: [
      'Vrindavan Road offers spiritual living with modern gated communities.',
      'UP RERA approved plots with ready possession and clear titles.',
      'Schools, hospitals and daily markets within 2–3 km of all listed sectors.',
      'Bank loans available on approved layouts — construction can start within 60 days.',
    ],
    siteVisitSteps: [
      'Call 09311122787 to book a free Mathura/Vrindavan site visit.',
      'Visit 3–5 UP RERA approved plots with our local advisor.',
      'Review documents, compare prices and get registry + loan support.',
    ],
  },
  gorakhpur: {
    name: 'Gorakhpur',
    h1Title: 'Residential Plots in Gorakhpur | Affordable Land UP',
    matches: (loc) => /gorakhpur/i.test(loc),
    seoPriceRange: { low: 1000000, high: 5000000 },
    sectors: ['Gida Sector 1', 'Gida Sector 2', 'Medical College Road', 'Airport Corridor'],
    intro: 'Fast-developing residential plots in Gorakhpur. Industrial corridor advantage with RERA-backed projects.',
    body: 'Gorakhpur, Eastern UP\'s emerging industrial hub, is transforming with the Gorakhpur Link Expressway, AIIMS and new airport connectivity. Residential plots around GIDA (Gorakhpur Industrial Development Authority) sectors offer strong appreciation potential as manufacturing and logistics hubs expand in the region.',
    bullets: [
      { title: 'Industrial Growth', desc: 'GIDA sectors driving employment and demand.', icon: 'trend' },
      { title: 'Expressway Linked', desc: 'Gorakhpur Link Expressway under active development.', icon: 'pin' },
      { title: 'RERA Approved', desc: 'UP RERA registered plots with verified documentation.', icon: 'shield' },
    ],
    nearby: [
      { label: 'Plots in Lucknow', href: '/plots-in-lucknow', detail: 'Capital city high-growth belt' },
      { label: 'Plots in Ayodhya', href: '/plots-in-ayodhya', detail: 'Religious tourism corridor' },
      { label: 'All Plots', href: '/plots', detail: 'Compare every active listing' },
    ],
    faqs: [
      { q: 'Why invest in Gorakhpur plots?', a: 'Gorakhpur is Eastern UP\'s fastest-growing industrial hub with GIDA, AIIMS, airport and expressway projects driving both employment and real estate demand.' },
      { q: 'What is the starting price of plots in Gorakhpur?', a: 'Plots around GIDA sectors start from approximately ₹10 lakh, with larger parcels up to ₹50 lakh near the airport corridor.' },
      { q: 'Are Gorakhpur plots RERA registered?', a: 'Yes. We only list Gorakhpur plots that carry valid UP RERA registration and clean title documents.' },
      { q: 'How far is Gorakhpur from Lucknow and Varanasi?', a: 'Gorakhpur is roughly 270 km from Lucknow (4.5 hours) and 220 km from Varanasi (4 hours) via NH-27.' },
      { q: 'Is Gorakhpur suitable for long-term investment?', a: 'Yes. With the industrial corridor, expressway and airport projects all progressing, Gorakhpur offers strong long-term appreciation potential.' },
    ],
    priceTable: [
      { sector: 'GIDA Sector 1', size: '200–400 Sq Yd', priceRange: '₹12 Lakh – ₹25 Lakh', approval: 'UP RERA' },
      { sector: 'GIDA Sector 2', size: '200–300 Sq Yd', priceRange: '₹15 Lakh – ₹28 Lakh', approval: 'UP RERA' },
      { sector: 'Medical College Road', size: '150–250 Sq Yd', priceRange: '₹10 Lakh – ₹20 Lakh', approval: 'DTCP' },
      { sector: 'Airport Corridor', size: '300–500 Sq Yd', priceRange: '₹25 Lakh – ₹45 Lakh', approval: 'UP RERA' },
    ],
    investorPoints: [
      'GIDA industrial belt = employment-driven residential demand for next decade.',
      'Gorakhpur Link Expressway under construction — connectivity premium incoming.',
      'Airport expansion will unlock tourism + business travel demand.',
      'Entry price ₹10–15 lakh — among the lowest in Eastern UP with strongest upside.',
    ],
    homebuyerPoints: [
      'GIDA sectors have planned roads, drainage, water & electricity already laid.',
      'UP RERA registered plots with verified layouts and clean titles.',
      'Schools, hospitals and markets within GIDA master plan.',
      'Bank loans available from SBI, PNB, HDFC on approved projects.',
    ],
    siteVisitSteps: [
      'Call 09311122787 to schedule a Gorakhpur site visit.',
      'Our advisor shows 3–5 GIDA & airport corridor plots with document checks.',
      'Compare locations, verify approvals and get end-to-end purchase support.',
    ],
  },
  ayodhya: {
    name: 'Ayodhya',
    h1Title: 'Residential Plots in Ayodhya — High Growth Investment Zone 2026',
    matches: (loc) => /ayodhya/i.test(loc),
    seoPriceRange: { low: 1200000, high: 8000000 },
    sectors: ['Ram Janmabhoomi Road', 'Faizabad Road', 'Sarayu Riverfront', 'Deokali'],
    intro: 'Premium residential plots in Ayodhya. World-class infrastructure driven by the Ram Mandir and tourism corridor.',
    body: 'Ayodhya is undergoing a once-in-a-generation transformation following the Ram Mandir inauguration. With a new international airport, expanded railway station, widened roads and a booming tourism economy, residential plots here offer both spiritual lifestyle and extraordinary capital appreciation potential.',
    bullets: [
      { title: 'Tourism Boom', desc: '50+ million annual visitors driving demand.', icon: 'trend' },
      { title: 'International Airport', desc: 'Direct flights from Delhi, Mumbai and Bengaluru.', icon: 'pin' },
      { title: 'RERA Verified', desc: 'UP RERA approved with government-backed development.', icon: 'shield' },
    ],
    nearby: [
      { label: 'Plots in Lucknow', href: '/plots-in-lucknow', detail: 'Capital city premium belt' },
      { label: 'Plots in Gorakhpur', href: '/plots-in-gorakhpur', detail: 'Eastern UP industrial hub' },
      { label: 'All Plots', href: '/plots', detail: 'Browse every available listing' },
    ],
    faqs: [
      { q: 'Why buy a plot in Ayodhya now?', a: 'Ayodhya is experiencing unprecedented infrastructure investment — international airport, expressway, railway expansion and tourism growth — making it one of India\'s highest-potential micro-markets.' },
      { q: 'What is the price range for plots in Ayodhya?', a: 'Ayodhya plots range from ₹12 lakh in emerging pockets to ₹80+ lakh in premium riverfront and temple-proximity locations.' },
      { q: 'Are Ayodhya plots RERA registered?', a: 'Yes. All Ayodhya listings carry UP RERA registration with verified layout approvals and clean titles.' },
      { q: 'How far is Ayodhya from Lucknow?', a: 'Ayodhya is approximately 135 km from Lucknow, reachable in under 2.5 hours via the Purvanchal Expressway.' },
      { q: 'Is Ayodhya good for rental income?', a: 'Yes. With 50+ million annual pilgrims and tourists, homestays and guesthouses near the temple complex generate strong rental yields.' },
    ],
    priceTable: [
      { sector: 'Ram Janmabhoomi Road', size: '200–400 Sq Yd', priceRange: '₹15 Lakh – ₹35 Lakh', approval: 'UP RERA' },
      { sector: 'Faizabad Road', size: '300–500 Sq Yd', priceRange: '₹25 Lakh – ₹50 Lakh', approval: 'UP RERA' },
      { sector: 'Sarayu Riverfront', size: '200–350 Sq Yd', priceRange: '₹30 Lakh – ₹60 Lakh', approval: 'UP RERA' },
      { sector: 'Deokali', size: '150–300 Sq Yd', priceRange: '₹12 Lakh – ₹28 Lakh', approval: 'DTCP' },
    ],
    investorPoints: [
      '50+ million annual visitors = unmatched hospitality rental demand.',
      'International airport, ring road & expressway = infrastructure-led appreciation.',
      'Riverfront & temple-proximity plots already appreciating 20%+ annually.',
      'Government-backed development with UP RERA — lowest risk, highest reward.',
    ],
    homebuyerPoints: [
      'Build a spiritual home near Ram Mandir with world-class road connectivity.',
      'UP RERA approved plots with possession-ready status.',
      'New hospitals, schools and commercial hubs within 5 km of all sectors.',
      'Direct flights from Delhi, Mumbai, Bengaluru — easy access for family visits.',
    ],
    siteVisitSteps: [
      'Call 09311122787 to book a free Ayodhya site visit.',
      'Our advisor shows temple-proximity, riverfront & ring road plots.',
      'Verify UP RERA docs, compare prices and get registry assistance.',
    ],
  },
  lucknow: {
    name: 'Lucknow',
    h1Title: 'Residential Plots in Lucknow Under ₹50 Lakh — LDA Approved',
    matches: (loc) => /lucknow/i.test(loc),
    seoPriceRange: { low: 2500000, high: 20000000 },
    sectors: ['Gomti Nagar', 'Sushant Golf City', 'Amar Shaheed Path', 'Sultanpur Road'],
    intro: 'Premium residential plots in Lucknow. Capital city infrastructure with metro, expressway and RERA-approved townships.',
    body: 'Lucknow, Uttar Pradesh\'s capital, combines Nawabi heritage with modern infrastructure — metro rail, Agra-Lucknow Expressway, IT parks and world-class hospitals. Residential plots in Gomti Nagar, Sushant Golf City and along Amar Shaheed Path offer the perfect balance of capital safety and appreciation in a rapidly expanding Tier-1 city.',
    bullets: [
      { title: 'Metro Connected', desc: 'Rapid transit covering major residential zones.', icon: 'pin' },
      { title: 'Capital Appreciation', desc: 'Consistent 12–16% YoY growth in premium sectors.', icon: 'trend' },
      { title: 'RERA Approved', desc: 'UP RERA registered with clear documentation.', icon: 'shield' },
    ],
    nearby: [
      { label: 'Plots in Ayodhya', href: '/plots-in-ayodhya', detail: 'Temple-town tourism corridor' },
      { label: 'Plots in Mathura', href: '/plots-in-mathura', detail: 'Yamuna Expressway belt' },
      { label: 'All Plots', href: '/plots', detail: 'Compare every active listing' },
    ],
    faqs: [
      { q: 'Which areas in Lucknow are best for plot investment?', a: 'Gomti Nagar, Sushant Golf City, Amar Shaheed Path and Sultanpur Road currently offer the strongest mix of metro connectivity, planned development and 12–16% YoY appreciation.' },
      { q: 'Are Lucknow plots RERA registered?', a: 'Yes. Every Lucknow plot we list carries a verified UP RERA registration number with clean title and approved layout.' },
      { q: 'What is the price range for plots in Lucknow?', a: 'Lucknow plots range from ₹25 lakh in emerging sectors to ₹2+ crore in premium Gomti Nagar and golf-facing locations.' },
      { q: 'How is Lucknow connected to Delhi and Agra?', a: 'Lucknow is connected via the Agra-Lucknow Expressway (Delhi ~500 km, Agra ~330 km) and frequent flights from Chaudhary Charan Singh International Airport.' },
      { q: 'Can I get a home loan for a Lucknow plot?', a: 'Yes. We assist with plot + construction loans from SBI, HDFC, ICICI, Axis and PNB — usually up to 75% of plot value for approved projects.' },
    ],
    priceTable: [
      { sector: 'Gomti Nagar', size: '200–400 Sq Yd', priceRange: '₹50 Lakh – ₹1.2 Cr', approval: 'UP RERA' },
      { sector: 'Sushant Golf City', size: '200–350 Sq Yd', priceRange: '₹40 Lakh – ₹90 Lakh', approval: 'UP RERA' },
      { sector: 'Amar Shaheed Path', size: '150–300 Sq Yd', priceRange: '₹30 Lakh – ₹70 Lakh', approval: 'UP RERA' },
      { sector: 'Sultanpur Road', size: '200–400 Sq Yd', priceRange: '₹25 Lakh – ₹60 Lakh', approval: 'DTCP' },
    ],
    investorPoints: [
      'Gomti Nagar & Golf City have delivered consistent 12–16% YoY appreciation.',
      'Metro expansion + Agra-Lucknow Expressway = Tier-1 city premium.',
      'IT parks, hospitals and malls driving rental demand in premium sectors.',
      'Capital city status = safest land investment in Uttar Pradesh.',
    ],
    homebuyerPoints: [
      'Gomti Nagar offers gated communities with schools, parks and hospitals.',
      'Metro-connected sectors reduce commute to Hazratganj & Charbagh.',
      'UP RERA registered plots with ready possession — start building in 60 days.',
      'Bank loans up to 75% available on all listed approved layouts.',
    ],
    siteVisitSteps: [
      'Call 09311122787 to schedule a free Lucknow site visit.',
      'Our advisor shows Gomti Nagar, Golf City & Sultanpur Road plots.',
      'Compare layouts, verify UP RERA docs and get loan + registry support.',
    ],
  },
};

export const ALL_PLOTS: Plot[] = [
  { id: '1', title: '200 Sq Yd Residential Plot in Sector 102, Gurgaon', price: 4500000, priceLabel: '₹45,00,000', area: 200, areaLabel: '200 Sq Yd', location: 'Sector 102, Gurgaon', rera: 'RERA: HR/420/152/2023', status: 'Available', tag: 'Corner Plot' },
  { id: '2', title: '150 Sq Yd Residential Plot in Sohna Road', price: 2800000, priceLabel: '₹28,00,000', area: 150, areaLabel: '150 Sq Yd', location: 'Sohna', rera: 'RERA: HR/418/150/2023', status: 'Available', tag: 'Park Facing' },
  { id: '3', title: '300 Sq Yd Residential Plot in Sector 65, Gurgaon', price: 7200000, priceLabel: '₹72,00,000', area: 300, areaLabel: '300 Sq Yd', location: 'Sector 65', rera: 'RERA: HR/421/161/2023', status: 'Available', tag: 'Main Road Facing' },
  { id: '4', title: '500 Sq Yd Residential Plot in Jajjar Highway', price: 8500000, priceLabel: '₹85,00,000', area: 500, areaLabel: '500 Sq Yd', location: 'Jajjar', rera: 'RERA: HR/422/172/2023', status: 'Sold Out' },
  { id: '5', title: '120 Sq Yd Residential Plot in Sohna Town', price: 1800000, priceLabel: '₹18,00,000', area: 120, areaLabel: '120 Sq Yd', location: 'Sohna', rera: 'RERA: HR/417/148/2023', status: 'Available' },
  { id: '6', title: '250 Sq Yd Residential Plot in Sector 102, Gurgaon', price: 6200000, priceLabel: '₹62,00,000', area: 250, areaLabel: '250 Sq Yd', location: 'Sector 102, Gurgaon', rera: 'RERA: HR/423/180/2023', status: 'Available', tag: 'Corner Plot' },
  { id: '7', title: '180 Sq Yd Residential Plot on Dwarka Expressway', price: 5500000, priceLabel: '₹55,00,000', area: 180, areaLabel: '180 Sq Yd', location: 'Dwarka Expressway', rera: 'RERA: HR/424/190/2023', status: 'Available', tag: 'Park Facing' },
  { id: '8', title: '90 Sq Yd Residential Plot in Sohna', price: 1200000, priceLabel: '₹12,00,000', area: 90, areaLabel: '90 Sq Yd', location: 'Sohna', rera: 'RERA: HR/425/195/2023', status: 'Available' },
  { id: '9', title: '400 Sq Yd Corner Plot in Sector 65, Gurgaon', price: 9800000, priceLabel: '₹98,00,000', area: 400, areaLabel: '400 Sq Yd', location: 'Sector 65', rera: 'RERA: HR/426/200/2023', status: 'Available', tag: 'Corner Plot' },
  { id: '10', title: '220 Sq Yd Residential Plot on Dwarka Expressway', price: 6800000, priceLabel: '₹68,00,000', area: 220, areaLabel: '220 Sq Yd', location: 'Dwarka Expressway', rera: 'RERA: HR/427/205/2023', status: 'Available', tag: 'Main Road Facing' },
  { id: '11', title: '160 Sq Yd Residential Plot in Gurgaon', price: 3800000, priceLabel: '₹38,00,000', area: 160, areaLabel: '160 Sq Yd', location: 'Gurgaon', rera: 'RERA: HR/428/210/2023', status: 'Available' },
  { id: '12', title: '600 Sq Yd Residential Plot in Jajjar', price: 11000000, priceLabel: '₹1.10 Cr', area: 600, areaLabel: '600 Sq Yd', location: 'Jajjar', rera: 'RERA: HR/429/215/2023', status: 'Available', tag: 'Park Facing' },
  { id: '13', title: '150 Sq Yd Residential Plot in Vrindavan, Mathura', price: 2200000, priceLabel: '₹22,00,000', area: 150, areaLabel: '150 Sq Yd', location: 'Mathura', rera: 'RERA: UP/410/105/2024', status: 'Available', tag: 'Park Facing' },
  { id: '14', title: '250 Sq Yd Residential Plot on GIDA Sector 1, Gorakhpur', price: 3200000, priceLabel: '₹32,00,000', area: 250, areaLabel: '250 Sq Yd', location: 'Gorakhpur', rera: 'RERA: UP/411/110/2024', status: 'Available', tag: 'Corner Plot' },
  { id: '15', title: '180 Sq Yd Residential Plot in Ayodhya Near Sarayu', price: 4800000, priceLabel: '₹48,00,000', area: 180, areaLabel: '180 Sq Yd', location: 'Ayodhya', rera: 'RERA: UP/412/115/2024', status: 'Available', tag: 'Main Road Facing' },
  { id: '16', title: '300 Sq Yd Residential Plot in Gomti Nagar, Lucknow', price: 8500000, priceLabel: '₹85,00,000', area: 300, areaLabel: '300 Sq Yd', location: 'Lucknow', rera: 'RERA: UP/413/120/2024', status: 'Available', tag: 'Park Facing' },
  { id: '17', title: '200 Sq Yd Residential Plot in Chaumuhan, Mathura', price: 2800000, priceLabel: '₹28,00,000', area: 200, areaLabel: '200 Sq Yd', location: 'Mathura', rera: 'RERA: UP/414/125/2024', status: 'Available' },
  { id: '18', title: '120 Sq Yd Residential Plot near Gorakhpur Airport', price: 1800000, priceLabel: '₹18,00,000', area: 120, areaLabel: '120 Sq Yd', location: 'Gorakhpur', rera: 'RERA: UP/415/130/2024', status: 'Available', tag: 'Corner Plot' },
  { id: '19', title: '400 Sq Yd Residential Plot on Faizabad Road, Ayodhya', price: 12000000, priceLabel: '₹1.20 Cr', area: 400, areaLabel: '400 Sq Yd', location: 'Ayodhya', rera: 'RERA: UP/416/135/2024', status: 'Available' },
  { id: '20', title: '250 Sq Yd Residential Plot in Sushant Golf City, Lucknow', price: 7200000, priceLabel: '₹72,00,000', area: 250, areaLabel: '250 Sq Yd', location: 'Lucknow', rera: 'RERA: UP/417/140/2024', status: 'Available', tag: 'Corner Plot' },
];

export default function CityLandingPage({ citySlug }: { citySlug: CitySlug }) {
  const city = CITY_CONFIGS[citySlug];
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const cityPlots = useMemo(() => ALL_PLOTS.filter((p) => city.matches(p.location)), [city]);

  const visiblePlots = useMemo(() => {
    if (!activeSector) return cityPlots;
    return cityPlots.filter((p) => p.location.toLowerCase().includes(activeSector.toLowerCase()));
  }, [activeSector, cityPlots]);

  const region = ['gurgaon', 'sohna', 'jajjar'].includes(citySlug) ? 'Haryana' : 'Uttar Pradesh';
  const pageUrl = `https://plotsgurgaon.in/plots-in-${citySlug}`;

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: city.h1Title,
      description: city.intro,
      url: pageUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: city.name,
        addressRegion: region,
        addressCountry: 'IN',
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: city.seoPriceRange.low.toString(),
        highPrice: city.seoPriceRange.high.toString(),
        offerCount: `${cityPlots.length}+`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: city.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://plotsgurgaon.in/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Plots',
          item: 'https://plotsgurgaon.in/plots',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `Plots in ${city.name}`,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      {/* Hero */}
      <section className="relative flex items-center" style={{ minHeight: '50vh' }}>
        <img
          src="/images/hero-bg.jpg"
          alt={`Residential plots for sale in ${city.name}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-15"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-white md:px-6 md:py-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Verified Listings</span>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {city.h1Title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            {city.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#plots"
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-accent-foreground transition hover:bg-accent/90"
            >
              View Plots
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Book Site Visit
            </a>
          </div>
          <nav aria-label="Breadcrumb" className="mt-10 text-sm text-white/75">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li><ChevronRight className="size-3.5" /></li>
              <li><Link href="/plots" className="hover:text-accent">Plots</Link></li>
              <li><ChevronRight className="size-3.5" /></li>
              <li className="font-medium text-accent">Plots in {city.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Sector chips */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">Browse by Sector</h2>
          <p className="mt-2 text-sm text-muted-foreground">Click a sector to filter plots in that micro-location.</p>
          <div className="-mx-4 mt-6 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
            <div className="flex w-max gap-2.5">
              <button
                onClick={() => setActiveSector(null)}
                className={
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                  (activeSector === null
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary hover:text-primary')
                }
              >
                All Sectors
              </button>
              {city.sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className={
                    'rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                    (activeSector === sector
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary hover:text-primary')
                  }
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plots grid */}
      <section id="plots" className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
            {visiblePlots.length} Plot{visiblePlots.length === 1 ? '' : 's'} {activeSector ? `in ${activeSector}` : `in ${city.name}`}
          </h2>
          <Link href="/plots" className="hidden items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 sm:inline-flex">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        {visiblePlots.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <p className="font-serif text-xl font-semibold text-foreground">No plots in this sector yet</p>
            <button
              onClick={() => setActiveSector(null)}
              className="mt-6 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Show all {city.name} plots
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePlots.map((plot) => (
              <PropertyCard key={plot.id} plot={plot} />
            ))}
          </div>
        )}
      </section>

      {/* Price Table */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Price Guide</span>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {city.name} Plot Price Range by Sector
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Estimated per-sector pricing based on current market data, approval type and plot size. Call 09311122787 for the latest rates.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 pr-6 font-semibold text-foreground">Sector / Road</th>
                  <th className="pb-3 pr-6 font-semibold text-foreground">Plot Size</th>
                  <th className="pb-3 pr-6 font-semibold text-foreground">Price Range</th>
                  <th className="pb-3 font-semibold text-foreground">Approval</th>
                </tr>
              </thead>
              <tbody>
                {city.priceTable.map((row) => (
                  <tr key={row.sector} className="border-b border-border/60">
                    <td className="py-3 pr-6 font-medium text-foreground">{row.sector}</td>
                    <td className="py-3 pr-6 text-muted-foreground">{row.size}</td>
                    <td className="py-3 pr-6 font-semibold text-primary">{row.priceRange}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {row.approval}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Location Insight</span>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Why Invest in {city.name} Plots?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/80">
              {city.body}
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {city.bullets.map((bullet) => {
              const Icon = ICONS[bullet.icon];
              return (
                <li key={bullet.title} className="flex gap-4 rounded-2xl border border-border bg-background p-6">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">{bullet.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{bullet.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Persona CTAs */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Buyer Type</span>
        <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          Investor or Home Buyer — Which Plot is Right for You?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <TrendingUp className="size-4" />
              For Investors
            </div>
            <ul className="flex-1 space-y-3 text-sm text-foreground/80">
              {city.investorPoints.map((pt, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Request Investor Brochure
            </a>
          </div>
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
              <Home className="size-4" />
              For Home Buyers
            </div>
            <ul className="flex-1 space-y-3 text-sm text-foreground/80">
              {city.homebuyerPoints.map((pt, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-secondary" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-secondary px-5 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
            >
              Book Free Site Visit
            </a>
          </div>
        </div>
      </section>

      {/* Site Visit */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">How It Works</span>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            How to Book a Free Site Visit in {city.name}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {city.siteVisitSteps.map((step, i) => (
              <div key={i} className="relative flex gap-4 rounded-2xl border border-border bg-background p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919311122787"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 text-base font-semibold text-accent-foreground transition hover:bg-accent/90"
            >
              <Phone className="size-5" />
              Call 09311122787
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-background px-6 text-base font-semibold text-foreground transition hover:bg-muted"
            >
              Fill Contact Form
            </a>
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">Nearby Locations</h2>
        <p className="mt-2 text-sm text-muted-foreground">Browse plots in neighboring high-growth areas.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {city.nearby.map((location) => (
            <Link
              key={location.label}
              href={location.href}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{location.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{location.detail}</p>
              </div>
              <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <div id="contact"><LeadCapture /></div>

      <FAQ items={city.faqs} title={`FAQs about Plots in ${city.name}`} subtitle={`Common questions buyers ask before investing in ${city.name}.`} />
    </>
  );
}
