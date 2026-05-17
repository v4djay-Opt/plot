import type { Metadata } from 'next';
import CityLandingPage from '@/components/site/CityLandingPage';

export const metadata: Metadata = {
  title: 'Residential Plots in Ayodhya | Buy Land Near Ram Mandir',
  description:
    'Verified residential plots in Ayodhya, UP. High appreciation zone near Ram Mandir & Ring Road. Ideal for investors & devotees. Call 09311122787 â€” plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/plots-in-ayodhya',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/plots-in-ayodhya',
    title: 'Residential Plots in Ayodhya | Buy Land Near Ram Mandir â€” plotsgurgaon.in',
    description:
      'Verified residential plots in Ayodhya, UP. High appreciation zone near Ram Mandir & Ring Road. Ideal for investors & devotees. Call 09311122787 â€” plotsgurgaon.in',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Residential plots in Ayodhya near Ram Mandir',
      },
    ],
  },
};

export default function AyodhyaPage() {
  return <CityLandingPage citySlug="ayodhya" />;
}
