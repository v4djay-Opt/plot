import { sanityClient } from '@/sanity/lib/client';

export interface PageBullet {
  title: string;
  desc: string;
  icon: 'shield' | 'trend' | 'pin';
}

export interface PageNearby {
  label: string;
  href: string;
  detail: string;
}

export interface PageFAQ {
  q: string;
  a: string;
}

export interface PagePriceRow {
  sector: string;
  size: string;
  priceRange: string;
  approval: string;
}

export interface PageData {
  title: string;
  slug: string;
  cityName: string;
  h1Title: string;
  intro: string;
  body: string;
  region: string;
  sectors: string[];
  bullets: PageBullet[];
  nearby: PageNearby[];
  faqs: PageFAQ[];
  priceTable: PagePriceRow[];
  investorPoints: string[];
  homebuyerPoints: string[];
  siteVisitSteps: string[];
  seoPriceRange: { low: number; high: number };
  locationMatchPattern: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: { asset?: { url?: string }; alt?: string };
}

function mapDoc(doc: Record<string, unknown>): PageData | undefined {
  if (!doc || typeof doc !== 'object') return undefined;
  const slug = (doc.slug as { current?: string })?.current ?? '';
  if (!slug) return undefined;

  return {
    title: String(doc.title ?? ''),
    slug,
    cityName: String(doc.cityName ?? ''),
    h1Title: String(doc.h1Title ?? ''),
    intro: String(doc.intro ?? ''),
    body: String(doc.body ?? ''),
    region: String(doc.region ?? ''),
    sectors: (doc.sectors as string[]) ?? [],
    bullets: (doc.bullets as PageBullet[]) ?? [],
    nearby: (doc.nearby as PageNearby[]) ?? [],
    faqs: (doc.faqs as PageFAQ[]) ?? [],
    priceTable: (doc.priceTable as PagePriceRow[]) ?? [],
    investorPoints: (doc.investorPoints as string[]) ?? [],
    homebuyerPoints: (doc.homebuyerPoints as string[]) ?? [],
    siteVisitSteps: (doc.siteVisitSteps as string[]) ?? [],
    seoPriceRange: {
      low: Number((doc.seoPriceRange as Record<string, unknown>)?.low ?? 0),
      high: Number((doc.seoPriceRange as Record<string, unknown>)?.high ?? 0),
    },
    locationMatchPattern: String(doc.locationMatchPattern ?? ''),
    seoTitle: doc.seoTitle ? String(doc.seoTitle) : undefined,
    seoDescription: doc.seoDescription ? String(doc.seoDescription) : undefined,
    ogImage: doc.ogImage as PageData['ogImage'],
  };
}

export async function getPageBySlug(slug: string): Promise<PageData | undefined> {
  try {
    const doc = await sanityClient.fetch<Record<string, unknown>>(
      `*[_type == "page" && slug.current == $slug && isActive != false][0] {
        title, slug, cityName, h1Title, intro, body, region,
        sectors, bullets, nearby, faqs, priceTable,
        investorPoints, homebuyerPoints, siteVisitSteps,
        seoPriceRange, locationMatchPattern,
        seoTitle, seoDescription,
        ogImage { asset->{url}, alt }
      }`,
      { slug }
    );
    return mapDoc(doc);
  } catch {
    return undefined;
  }
}

export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const results = await sanityClient.fetch<Array<{ slug: string }>>(
      `*[_type == "page" && isActive != false] { "slug": slug.current }`
    );
    return results.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}
