import type { Metadata } from 'next';
import CityLandingPage from '@/components/site/CityLandingPage';

export const metadata: Metadata = {
  title: 'Residential Plots in Jhajjar Under â‚¹50 Lakh',
  description:
    'Verified residential plots in Jhajjar under \u20B950 lakh. DDJAY & DTCP approved. Near KMP Expressway & Reliance MET City. Call 09311122787 for free site visit.',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots-in-jhajjar',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots-in-jhajjar',
    title: 'Residential Plots in Jhajjar Under â‚¹50 Lakh | plotsgurgaon.in',
    description:
      'Verified residential plots in Jhajjar under \u20B950 lakh. DDJAY & DTCP approved. Near KMP Expressway & Reliance MET City. Call 09311122787 for free site visit.',
    images: [
      {
        url: '/images/loc-jhajjar.jpg',
        width: 1200,
        height: 630,
        alt: 'Residential plots in Jhajjar under 50 lakh',
      },
    ],
  },
};

export default function JhajjarPage() {
  return <CityLandingPage citySlug="jhajjar" />;
}
