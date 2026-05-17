import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { allPlots, getPlotBySlug, slugify } from '@/lib/plots';
import PlotDetailClient from './PlotDetailClient';

export async function generateStaticParams() {
  return allPlots.map((plot) => ({
    slug: slugify(plot.title),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const plot = getPlotBySlug(params.slug);
  if (!plot) return {};

  const url = `https://plotsgurgaon.in/plots/${params.slug}`;
  const title = plot.title;
  const description = `${plot.title} — ${plot.priceLabel}. ${plot.status} for sale in ${plot.location}. RERA-approved residential plot. Call Rohit Singh: +91 93111 22787.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: 'https://plotsgurgaon.in/images/hero-plot.jpg',
          width: 1200,
          height: 630,
          alt: plot.title,
        },
      ],
    },
  };
}

export default function PlotDetailPage({ params }: { params: { slug: string } }) {
  const plot = getPlotBySlug(params.slug);
  if (!plot) notFound();

  const pageUrl = `https://plotsgurgaon.in/plots/${params.slug}`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: plot.title,
      description: `${plot.title} — ${plot.priceLabel}. ${plot.status} for sale in ${plot.location}.`,
      url: pageUrl,
      image: 'https://plotsgurgaon.in/images/hero-plot.jpg',
      price: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        price: plot.price,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: plot.location.includes(',') ? plot.location.split(',')[0].trim() : plot.location,
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      availability: plot.status === 'Available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://plotsgurgaon.in' },
        { '@type': 'ListItem', position: 2, name: 'Plots', item: 'https://plotsgurgaon.in/plots' },
        { '@type': 'ListItem', position: 3, name: plot.title, item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup schema={schema} />
      <PlotDetailClient plot={plot} allPlots={allPlots} />
    </>
  );
}
