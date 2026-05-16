import type { Metadata } from 'next';
import CityLandingPage from '@/components/site/CityLandingPage';

export const metadata: Metadata = {
  title: 'Residential Plots in Gorakhpur | Affordable Land UP',
  description:
    'Affordable residential plots in Gorakhpur, UP. GDA approved zones. Ideal for end-users & investors. Call 09311122787 — plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots-in-gorakhpur',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots-in-gorakhpur',
    title: 'Residential Plots in Gorakhpur | Affordable Land UP — plotsgurgaon.in',
    description:
      'Affordable residential plots in Gorakhpur, UP. GDA approved zones. Ideal for end-users & investors. Call 09311122787 — plotsgurgaon.in',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Residential plots in Gorakhpur UP',
      },
    ],
  },
};

export default function GorakhpurPage() {
  return <CityLandingPage citySlug="gorakhpur" />;
}
