import { sanityClient } from '@/sanity/lib/client';
import { type Plot } from './plots';

interface SanityProperty {
  _id: string;
  title: string;
  slug: { current: string };
  status: 'available' | 'sold';
  plotType?: 'corner' | 'park-facing' | 'main-road' | 'regular';
  price: number;
  area: number;
  location?: {
    name?: string;
    parentCity?: {
      name?: string;
    };
  };
  reraNumber: string;
  images?: Array<{
    asset?: { _ref: string; url: string };
    alt?: string;
  }>;
}

const PLOT_TYPE_LABELS: Record<string, string> = {
  corner: 'Corner Plot',
  'park-facing': 'Park Facing',
  'main-road': 'Main Road Facing',
  regular: 'Regular',
};

function formatPriceLabel(price: number): string {
  if (price >= 10000000) {
    return `\u20B9${(price / 10000000).toFixed(2)} Cr`;
  }
  return `\u20B9${price.toLocaleString('en-IN')}`;
}

export function mapSanityProperty(doc: SanityProperty): Plot {
  const cityName = doc.location?.parentCity?.name || '';
  const microName = doc.location?.name || '';
  const location = microName && cityName
    ? `${microName}, ${cityName}`
    : microName || cityName || 'Unknown Location';

  const status: Plot['status'] = doc.status === 'sold' ? 'Sold Out' : 'Available';
  const tag = doc.plotType ? PLOT_TYPE_LABELS[doc.plotType] : undefined;

  return {
    id: `sanity-${doc._id}`,
    title: doc.title,
    price: doc.price,
    priceLabel: formatPriceLabel(doc.price),
    area: doc.area,
    areaLabel: `${doc.area} Sq Yd`,
    location,
    rera: doc.reraNumber,
    status,
    tag,
  };
}

const getAllPropertiesQuery = `*[_type == "property"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  status,
  plotType,
  price,
  area,
  location->{
    name,
    parentCity->{ name }
  },
  reraNumber
}`;

export async function getAllSanityPlots(): Promise<Plot[]> {
  try {
    const docs = await sanityClient.fetch<SanityProperty[]>(getAllPropertiesQuery);
    return docs.map(mapSanityProperty);
  } catch (e) {
    console.error('Failed to fetch Sanity properties:', e);
    return [];
  }
}

const getPropertyBySlugQuery = `*[_type == "property" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  status,
  plotType,
  price,
  area,
  location->{
    name,
    parentCity->{ name }
  },
  reraNumber
}`;

export async function getSanityPlotBySlug(slug: string): Promise<Plot | undefined> {
  try {
    const doc = await sanityClient.fetch<SanityProperty | null>(getPropertyBySlugQuery, { slug });
    return doc ? mapSanityProperty(doc) : undefined;
  } catch (e) {
    console.error('Failed to fetch Sanity property by slug:', e);
    return undefined;
  }
}
