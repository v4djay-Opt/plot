import type { Metadata } from 'next';
import Hero from '@/components/site/Hero';
import SearchBar from '@/components/site/SearchBar';
import FeaturedPlots from '@/components/site/FeaturedPlots';
import Locations from '@/components/site/Locations';
import WhyChooseUs from '@/components/site/WhyChooseUs';
import BlogSection from '@/components/site/BlogSection';
import FAQ from '@/components/site/FAQ';
import LeadCapture from '@/components/site/LeadCapture';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Residential Plots in Gurgaon & Jajjar',
  description:
    'Verified residential plots in Gurgaon (₹1Cr+) & Jajjar (under ₹50L). Investors & homebuyers welcome. DTCP/RERA options. Call 09311122787 — plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in',
    title: 'Residential Plots in Gurgaon & Jajjar | plotsgurgaon.in',
    description:
      'Verified residential plots in Gurgaon (₹1Cr+) & Jajjar (under ₹50L). Investors & homebuyers welcome. DTCP/RERA options. Call 09311122787 — plotsgurgaon.in',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Verified residential plots in Gurgaon and Jajjar',
      },
    ],
  },
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateAgent',
      name: 'Plots Gurgaon',
      url: 'https://plotsgurgaon.in',
      telephone: '+91-9311122787',
      priceRange: '₹50L - ₹1Cr+',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      areaServed: ['Gurugram', 'Jhajjar', 'Sohna', 'Ayodhya', 'Lucknow', 'Mathura', 'Gorakhpur'],
      description:
        'Verified residential plots in Gurgaon (₹1Cr+) and Jajjar (under ₹50L) for investors and homebuyers.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the price of residential plots in Gurgaon?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Residential plots in Gurgaon start from ₹1 Crore for 200 sq yd depending on sector.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are plots in Jajjar under 50 lakh a good investment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Jajjar plots under ₹50L are high-potential investments near KMP Expressway and Reliance MET City.',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <SchemaMarkup schema={homeSchema} />
      <Hero />
      <SearchBar />
      <FeaturedPlots />
      <Locations />
      <WhyChooseUs />
      <BlogSection />
      <FAQ />
      <LeadCapture />
    </>
  );
}
