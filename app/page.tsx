import Hero from '@/components/site/Hero';
import SearchBar from '@/components/site/SearchBar';
import FeaturedPlots from '@/components/site/FeaturedPlots';
import Locations from '@/components/site/Locations';
import WhyChooseUs from '@/components/site/WhyChooseUs';
import BlogSection from '@/components/site/BlogSection';
import FAQ from '@/components/site/FAQ';
import LeadCapture from '@/components/site/LeadCapture';

export default function Home() {
  return (
    <>
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
