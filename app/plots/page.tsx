import type { Metadata } from 'next';
import PlotsClient from './PlotsClient';

export const metadata: Metadata = {
  title: 'All Residential Plots — Gurgaon, Sohna, Jajjar & More',
  description:
    'Browse verified residential plots across Gurgaon, Sohna, Jajjar and beyond. Filter by location, price, size and status. Call 09311122787 — plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots',
    title: 'All Residential Plots — Gurgaon, Sohna, Jajjar & More | plotsgurgaon.in',
    description:
      'Browse verified residential plots across Gurgaon, Sohna, Jajjar and beyond. Filter by location, price, size and status. Call 09311122787 — plotsgurgaon.in',
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

export default function PlotsPage() {
  return <PlotsClient />;
}
