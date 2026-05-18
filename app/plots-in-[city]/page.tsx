import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Phone, MapPin, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import LeadCapture from '@/components/site/LeadCapture';
import { sanityClient } from '@/sanity/lib/client';
import { getCityBySlug } from '@/sanity/lib/queries';
import { fetchCities } from '@/lib/sanity-cities';
import type { CitySlug } from '@/components/site/CityLandingPage';
import CityLandingPage from '@/components/site/CityLandingPage';
import { getPageBySlug } from '@/lib/sanity-pages';

const KNOWN_CITY_SLUGS: CitySlug[] = [
  'gurgaon', 'sohna', 'jhajjar', 'mathura', 'gorakhpur', 'ayodhya', 'lucknow',
];

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityDoc = await sanityClient.fetch<{ name: string; seoTitle?: string; seoDescription?: string } | null>(
    getCityBySlug,
    { slug: city }
  );

  if (!cityDoc) return { title: 'Not Found' };

  const title = cityDoc.seoTitle || `Residential Plots in ${cityDoc.name} | plotsgurgaon.in`;
  const description = cityDoc.seoDescription || `Verified residential plots in ${cityDoc.name}. Call 09311122787 for free site visit.`;

  return {
    title,
    description,
    alternates: { canonical: `https://plotsgurgaon.in/plots-in-${city}` },
    openGraph: {
      url: `https://plotsgurgaon.in/plots-in-${city}`,
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  const cities = await fetchCities();
  return cities
    .filter((c) => !KNOWN_CITY_SLUGS.includes(c.slug as CitySlug))
    .map((c) => ({ city: c.slug }));
}

export default async function DynamicCityPage({ params }: Props) {
  const { city } = await params;

  if (KNOWN_CITY_SLUGS.includes(city as CitySlug)) {
    const cmsData = await getPageBySlug(`plots-in-${city}`);
    return <CityLandingPage citySlug={city as CitySlug} cmsData={cmsData} />;
  }

  const cityDoc = await sanityClient.fetch<{
    name: string;
    description?: string;
    heroImage?: { asset?: { url?: string } };
    isActive?: boolean;
  } | null>(getCityBySlug, { slug: city });

  if (!cityDoc || cityDoc.isActive === false) {
    notFound();
  }

  const properties = await sanityClient.fetch<{ _id: string; title?: string; price?: number; area?: string; status?: string; slug?: { current?: string } }[]>(
    `*[_type == "property" && location->parentCity->slug.current == $citySlug] | order(_createdAt desc) [0...12] {
      _id, title, price, area, status, slug
    }`,
    { citySlug: city }
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Residential Plots
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            Plots in {cityDoc.name}
          </h1>
          {cityDoc.description && (
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
              {cityDoc.description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:+919311122787"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
            >
              <Phone className="size-4" /> Call for Free Site Visit
            </a>
            <a
              href="https://wa.me/919311122787"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        {properties.length > 0 ? (
          <>
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Available Plots in {cityDoc.name}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {properties.length} listing{properties.length !== 1 ? 's' : ''} found
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <Link
                  key={p._id}
                  href={p.slug?.current ? `/plots/${p.slug.current}` : '/plots'}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-base font-semibold text-foreground leading-snug">
                      {p.title || 'Untitled Plot'}
                    </h3>
                    {p.status === 'available' && (
                      <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                        Available
                      </span>
                    )}
                  </div>
                  {p.area && (
                    <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-secondary" /> {p.area}
                    </p>
                  )}
                  {p.price && (
                    <p className="mt-2 font-semibold text-primary">
                      ₹{(p.price / 100000).toFixed(p.price % 100000 === 0 ? 0 : 1)} Lakh
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-muted/40 p-12 text-center">
            <ShieldCheck className="mx-auto mb-4 size-10 text-secondary" />
            <h2 className="font-serif text-xl font-bold text-foreground">
              Listings coming soon for {cityDoc.name}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              We are curating verified plots in this location. Call us to get early access.
            </p>
            <a
              href="tel:+919311122787"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <Phone className="size-4" /> 09311122787
            </a>
          </div>
        )}
      </section>

      <div id="contact">
        <LeadCapture />
      </div>
    </>
  );
}
