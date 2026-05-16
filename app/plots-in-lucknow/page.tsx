import type { Metadata } from 'next';
import CityLandingPage from '@/components/site/CityLandingPage';

export const metadata: Metadata = {
  title: 'Residential Plots in Lucknow Under ₹50 Lakh',
  description:
    'Best residential plots in Lucknow under ₹50 lakh. LDA approved & verified listings in prime sectors. Call 09311122787 — plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots-in-lucknow',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots-in-lucknow',
    title: 'Residential Plots in Lucknow Under ₹50 Lakh | plotsgurgaon.in',
    description:
      'Best residential plots in Lucknow under ₹50 lakh. LDA approved & verified listings in prime sectors. Call 09311122787 — plotsgurgaon.in',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Residential plots in Lucknow under 50 lakh',
      },
    ],
  },
};

export default function LucknowPage() {
  return <CityLandingPage citySlug="lucknow" />;
}
