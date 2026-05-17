import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPlots, getPlotBySlug, slugify } from '@/lib/plots';
import PlotDetailClient from './PlotDetailClient';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

export async function generateStaticParams() {
  return allPlots.map((plot) => ({
    slug: slugify(plot.title),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const plot = getPlotBySlug(params.slug);
  if (!plot) return {};

  return {
    title: `${plot.title} | ₹${plot.price.toLocaleString('en-IN')} | plotsgurgaon.in`,
    description:
      `${plot.title} at ${plot.location}. ${plot.areaLabel}. ${plot.rera}. ${plot.status}. Call 09311122787 for site visit.`,
    alternates: {
      canonical: `https://plotsgurgaon.in/plots/${params.slug}`,
    },
    openGraph: {
      url: `https://plotsgurgaon.in/plots/${params.slug}`,
      title: `${plot.title} | ₹${plot.price.toLocaleString('en-IN')} | plotsgurgaon.in`,
      description: `${plot.title} at ${plot.location}. ${plot.areaLabel}. Call 09311122787.`,
    },
  };
}

export default function PlotDetailPage({ params }: { params: { slug: string } }) {
  const plot = getPlotBySlug(params.slug);
  if (!plot) notFound();

  const related = allPlots
    .filter((p) => p.id !== plot.id && p.location === plot.location)
    .slice(0, 2);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: plot.title,
    description: `${plot.title} at ${plot.location}. ${plot.areaLabel}. ${plot.rera}.`,
    url: `https://plotsgurgaon.in/plots/${params.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: plot.location,
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    price: {
      '@type': 'PriceSpecification',
      priceCurrency: 'INR',
      price: plot.price,
    },
    availability: plot.status === 'Available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://plotsgurgaon.in/' },
      { '@type': 'ListItem', position: 2, name: 'Plots', item: 'https://plotsgurgaon.in/plots' },
      { '@type': 'ListItem', position: 3, name: plot.title, item: `https://plotsgurgaon.in/plots/${params.slug}` },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      <PlotDetailClient plot={plot} related={related} />
    </>
  );
}
