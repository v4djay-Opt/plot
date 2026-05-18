import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { fetchCities } from '@/lib/sanity-cities';

export const metadata: Metadata = {
  title: 'All Plot Locations | Haryana & UP Residential Plots',
  description:
    'Find verified residential plots across Gurgaon, Jhajjar, Sohna, Ayodhya, Mathura, Lucknow, Gorakhpur. All price ranges. Call 09311122787 — plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/locations',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/locations',
    title: 'All Plot Locations | Haryana & UP Residential Plots | plotsgurgaon.in',
    description:
      'Find verified residential plots across Gurgaon, Jhajjar, Sohna, Ayodhya, Mathura, Lucknow, Gorakhpur. All price ranges. Call 09311122787 — plotsgurgaon.in',
    images: [
      {
        url: '/images/hero-plot.jpg',
        width: 1200,
        height: 630,
        alt: 'All plot locations in Haryana and Uttar Pradesh',
      },
    ],
  },
};

export default async function LocationsPage() {
  const cities = await fetchCities();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Plot Locations',
    itemListElement: cities.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Plots in ${c.label}`,
      url: `https://plotsgurgaon.in${c.href}`,
    })),
  };

  return (
    <>
      <SchemaMarkup schema={itemListSchema} />
      <section className="relative overflow-hidden border-b border-border">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-white md:px-6 md:py-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            All Locations
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Choose Your Location
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Verified residential plots across Haryana & Uttar Pradesh — from affordable
            investments to premium city plots.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={city.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Plots in {city.label}
                </h3>
                <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{city.desc || ''}</p>
              <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-secondary" />
                {city.region || 'India'}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
