import type { Metadata } from 'next';
import { Suspense } from 'react';
import PlotsClient from './PlotsClient';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'All Residential Plots "” Gurgaon, Sohna, Jhajjar & More',
  description:
    'Browse verified residential plots across Gurgaon, Sohna, Jhajjar and beyond. Filter by location, price, size and status. Call 09311122787 "” plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots',
    title: 'All Residential Plots "” Gurgaon, Sohna, Jhajjar & More | plotsgurgaon.in',
    description:
      'Browse verified residential plots across Gurgaon, Sohna, Jhajjar and beyond. Filter by location, price, size and status. Call 09311122787 "” plotsgurgaon.in',
    images: [
      {
        url: '/images/hero-plot.jpg',
        width: 1200,
        height: 630,
        alt: 'Browse all verified residential plots',
      },
    ],
  },
};

const plotsSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'All Residential Plots "” plotsgurgaon.in',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Plots in Gurgaon',
        url: 'https://plotsgurgaon.in/plots-in-gurgaon',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plots in Sohna',
        url: 'https://plotsgurgaon.in/plots-in-sohna',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Plots in Jhajjar',
        url: 'https://plotsgurgaon.in/plots-in-jhajjar',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Plots in Ayodhya',
        url: 'https://plotsgurgaon.in/plots-in-ayodhya',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Plots in Mathura',
        url: 'https://plotsgurgaon.in/plots-in-mathura',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Plots in Lucknow',
        url: 'https://plotsgurgaon.in/plots-in-lucknow',
      },
      {
        '@type': 'ListItem',
        position: 7,
        name: 'Plots in Gorakhpur',
        url: 'https://plotsgurgaon.in/plots-in-gorakhpur',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://plotsgurgaon.in' },
      { '@type': 'ListItem', position: 2, name: 'All Plots', item: 'https://plotsgurgaon.in/plots' },
    ],
  },
];

export default function PlotsPage() {
  return (
    <>
      <SchemaMarkup schema={plotsSchema} />
      <Suspense fallback={null}>
        <PlotsClient />
      </Suspense>
    </>
  );
}
