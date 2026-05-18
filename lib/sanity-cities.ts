import { sanityClient } from '@/sanity/lib/client';
import { getAllCities } from '@/sanity/lib/queries';

export interface CityLink {
  label: string;
  href: string;
  slug: string;
  region?: string;
  desc?: string;
}

const FALLBACK_CITIES: CityLink[] = [
  { label: 'Gurgaon', href: '/plots-in-gurgaon', slug: 'gurgaon', region: 'Haryana', desc: 'Premium residential plots from ₹1 Crore. RERA verified across top sectors.' },
  { label: 'Sohna', href: '/plots-in-sohna', slug: 'sohna', region: 'Haryana', desc: 'Growth corridor 20 min from Gurgaon. Entry-level pricing with strong appreciation.' },
  { label: 'Jhajjar', href: '/plots-in-jhajjar', slug: 'jhajjar', region: 'Haryana', desc: 'Affordable plots under ₹50 Lakh. DTCP & DDJAY approved near KMP Expressway.' },
  { label: 'Mathura', href: '/plots-in-mathura', slug: 'mathura', region: 'Uttar Pradesh', desc: 'Spiritual city plots near Yamuna Expressway. Starting from ₹8 Lakh.' },
  { label: 'Gorakhpur', href: '/plots-in-gorakhpur', slug: 'gorakhpur', region: 'Uttar Pradesh', desc: 'Fast-developing plots near GIDA sectors. Industrial corridor advantage.' },
  { label: 'Ayodhya', href: '/plots-in-ayodhya', slug: 'ayodhya', region: 'Uttar Pradesh', desc: 'High-growth investment zone near Ram Mandir & Ring Road. UP RERA approved.' },
  { label: 'Lucknow', href: '/plots-in-lucknow', slug: 'lucknow', region: 'Uttar Pradesh', desc: 'Capital city plots under ₹50 Lakh. LDA approved in prime sectors.' },
];

export async function fetchCities(): Promise<CityLink[]> {
  try {
    const cities = await sanityClient.fetch<{ name: string; slug?: { current?: string }; description?: string; isActive?: boolean }[]>(getAllCities);
    if (!cities || cities.length === 0) return FALLBACK_CITIES;

    const mapped = cities
      .filter((c) => c.isActive !== false)
      .map((c) => {
        const slug = c.slug?.current || c.name.toLowerCase().replace(/\s+/g, '-');
        return {
          label: c.name,
          href: `/plots-in-${slug}`,
          slug,
          region: 'Haryana',
          desc: c.description || '',
        };
      });

    return mapped.length > 0 ? mapped : FALLBACK_CITIES;
  } catch {
    return FALLBACK_CITIES;
  }
}
