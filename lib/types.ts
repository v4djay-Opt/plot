export interface Property {
  _id: string;
  title: string;
  slug: { current: string };
  status: 'available' | 'sold';
  plotType: 'corner' | 'park-facing' | 'main-road' | 'regular';
  price: number;
  pricePerSqYd?: number;
  area: number;
  location: MicroLocation;
  images: SanityImage[];
  description?: Array<Record<string, unknown>>;
  amenities?: string[];
  reraNumber: string;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImage;
}

export interface City {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  heroImage?: SanityImage;
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
}

export interface MicroLocation {
  _id: string;
  name: string;
  slug: { current: string };
  parentCity: City;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteDescription?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  agentName?: string;
  agentTitle?: string;
  agentPhoto?: SanityImage;
  address?: string;
  googleAnalyticsId?: string;
}

export interface Redirect {
  _id: string;
  from: string;
  to: string;
  statusCode: number;
  isActive: boolean;
  note?: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}
