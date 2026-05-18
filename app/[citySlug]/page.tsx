import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@/sanity/lib/client';
import { getCityBySlug } from '@/sanity/lib/queries';
import { fetchCities } from '@/lib/sanity-cities';
import { getPageBySlug } from '@/lib/sanity-pages';
import CityLandingPage from '@/components/site/CityLandingPage';
import type { Plot } from '@/lib/plots';

const KNOWN = ['gurgaon', 'sohna', 'jhajjar', 'mathura', 'gorakhpur', 'ayodhya', 'lucknow'];

interface SanityProperty {
  _id: string;
  title?: string;
  price?: number;
  area?: string;
  status?: string;
  plotType?: string;
  reraNumber?: string;
  slug?: { current?: string };
  location?: { name?: string };
}

function mapToPlot(p: SanityProperty): Plot {
  const price = p.price || 0;
  const priceLabel =
    price >= 10000000
      ? `\u20B9${(price / 10000000).toFixed(2).replace(/\.?0+$/, '')} Cr`
      : price >= 100000
      ? `\u20B9${Math.round(price / 100000)} L`
      : `\u20B9${price.toLocaleString('en-IN')}`;
  return {
    id: p._id,
    title: p.title || 'Untitled Plot',
    price,
    priceLabel,
    area: parseFloat(p.area || '0') || 0,
    areaLabel: p.area || '',
    location: p.location?.name || '',
    rera: p.reraNumber || '',
    status: p.status === 'available' ? 'Available' : 'Sold Out',
    tag: p.plotType || undefined,
  };
}

interface Props {
  params: Promise<{ citySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params;
  if (!citySlug.startsWith('plots-in-')) return { title: 'Not Found' };

  const slug = citySlug.replace('plots-in-', '');
  const [cmsPage, cityDoc] = await Promise.all([
    getPageBySlug(citySlug),
    sanityClient.fetch<{ name: string; seoTitle?: string; seoDescription?: string } | null>(getCityBySlug, { slug }),
  ]);

  const cityName = cmsPage?.cityName || cityDoc?.name || slug;
  const title = cmsPage?.seoTitle || cityDoc?.seoTitle || `Residential Plots in ${cityName} | plotsgurgaon.in`;
  const description = cmsPage?.seoDescription || cityDoc?.seoDescription || `Verified residential plots in ${cityName}. Call 09311122787 for free site visit.`;

  return {
    title,
    description,
    alternates: { canonical: `https://plotsgurgaon.in/${citySlug}` },
    openGraph: { url: `https://plotsgurgaon.in/${citySlug}`, title, description },
  };
}

export async function generateStaticParams() {
  const cities = await fetchCities();
  return cities
    .filter((c) => !KNOWN.includes(c.slug))
    .map((c) => ({ citySlug: `plots-in-${c.slug}` }));
}

export default async function DynamicCityPage({ params }: Props) {
  const { citySlug } = await params;

  if (!citySlug.startsWith('plots-in-')) notFound();

  const slug = citySlug.replace('plots-in-', '');

  const [cmsPage, cityDoc, rawProperties] = await Promise.all([
    getPageBySlug(citySlug),
    sanityClient.fetch<{ name: string; isActive?: boolean } | null>(getCityBySlug, { slug }),
    sanityClient.fetch<SanityProperty[]>(
      `*[_type == "property" && location->parentCity->slug.current == $citySlug] | order(_createdAt desc) [0...20] {
        _id, title, price, area, status, plotType, reraNumber, slug,
        location->{ name }
      }`,
      { citySlug: slug }
    ),
  ]);

  if (!cityDoc || cityDoc.isActive === false) notFound();

  const extraPlots: Plot[] = (rawProperties || []).map(mapToPlot);

  const effectiveCmsData = cmsPage || {
    title: `Plots in ${cityDoc.name}`,
    slug: citySlug,
    cityName: cityDoc.name,
    h1Title: `Residential Plots in ${cityDoc.name}`,
    intro: '',
    body: '',
    region: 'India',
    sectors: [],
    bullets: [],
    nearby: [],
    faqs: [],
    priceTable: [],
    investorPoints: [],
    homebuyerPoints: [],
    siteVisitSteps: [],
    seoPriceRange: { low: 500000, high: 10000000 },
    locationMatchPattern: '',
  };

  return (
    <CityLandingPage
      citySlug={slug}
      cmsData={effectiveCmsData}
      extraPlots={extraPlots}
    />
  );
}
