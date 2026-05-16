import type { Metadata } from 'next';
import CityLandingPage from '@/components/site/CityLandingPage';

export const metadata: Metadata = {
  title: 'Residential Plots in Mathura | Land Near Vrindavan',
  description:
    'Verified residential plots in Mathura, UP. Near Yamuna Expressway. Great for investors & religious destination buyers. Call 09311122787 — plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots-in-mathura',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots-in-mathura',
    title: 'Residential Plots in Mathura | Land Near Vrindavan — plotsgurgaon.in',
    description:
      'Verified residential plots in Mathura, UP. Near Yamuna Expressway. Great for investors & religious destination buyers. Call 09311122787 — plotsgurgaon.in',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Residential plots in Mathura near Vrindavan',
      },
    ],
  },
};

export default function MathuraPage() {
  return <CityLandingPage citySlug="mathura" />;
}
