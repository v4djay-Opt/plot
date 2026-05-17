import type { Metadata } from 'next';
import CityLandingPage from '@/components/site/CityLandingPage';

export const metadata: Metadata = {
  title: 'Residential Plots in Sohna | Near Gurgaon Under ₹80L',
  description:
    'Verified residential plots in Sohna, Haryana. 20 min from Gurgaon via Sohna Road. DTCP approved. Investors & end-users. Call 09311122787 "” plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots-in-sohna',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots-in-sohna',
    title: 'Residential Plots in Sohna | Near Gurgaon Under ₹80L "” plotsgurgaon.in',
    description:
      'Verified residential plots in Sohna, Haryana. 20 min from Gurgaon via Sohna Road. DTCP approved. Investors & end-users. Call 09311122787 "” plotsgurgaon.in',
    images: [
      {
        url: '/images/loc-sohna.jpg',
        width: 1200,
        height: 630,
        alt: 'Residential plots in Sohna near Gurgaon',
      },
    ],
  },
};

export default function SohnaPage() {
  return <CityLandingPage citySlug="sohna" />;
}
