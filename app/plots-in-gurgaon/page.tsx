import type { Metadata } from 'next';
import CityLandingPage from '@/components/site/CityLandingPage';

export const metadata: Metadata = {
  title: 'Residential Plots in Gurgaon From â‚¹1 Crore',
  description:
    'Premium residential plots in Gurgaon starting â‚¹1 Crore. RERA verified options across top sectors. For end-users & investors. Call 09311122787 â€” plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots-in-gurgaon',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots-in-gurgaon',
    title: 'Residential Plots in Gurgaon From â‚¹1 Crore | plotsgurgaon.in',
    description:
      'Premium residential plots in Gurgaon starting â‚¹1 Crore. RERA verified options across top sectors. For end-users & investors. Call 09311122787 â€” plotsgurgaon.in',
    images: [
      {
        url: '/images/loc-gurgaon.jpg',
        width: 1200,
        height: 630,
        alt: 'Residential plots in Gurgaon',
      },
    ],
  },
};

export default function GurgaonPage() {
  return <CityLandingPage citySlug="gurgaon" />;
}
