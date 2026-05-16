import type { Metadata } from 'next';
import CityLandingPage from '@/components/site/CityLandingPage';

export const metadata: Metadata = {
  title: 'Residential Plots in Jajjar Under ₹50 Lakh',
  description:
    'Verified residential plots in Jajjar (Jhajjar) under ₹50 lakh. DDJAY & DTCP approved. Near KMP Expressway & Reliance MET City. Call 09311122787 for free site visit.',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots-in-jajjar',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots-in-jajjar',
    title: 'Residential Plots in Jajjar Under ₹50 Lakh | plotsgurgaon.in',
    description:
      'Verified residential plots in Jajjar (Jhajjar) under ₹50 lakh. DDJAY & DTCP approved. Near KMP Expressway & Reliance MET City. Call 09311122787 for free site visit.',
    images: [
      {
        url: '/images/loc-jajjar.jpg',
        width: 1200,
        height: 630,
        alt: 'Residential plots in Jajjar under 50 lakh',
      },
    ],
  },
};

export default function JajjarPage() {
  return <CityLandingPage citySlug="jajjar" />;
}
