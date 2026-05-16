import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { SearchBar } from "@/components/site/SearchBar";
import { FeaturedPlots } from "@/components/site/FeaturedPlots";
import { Locations } from "@/components/site/Locations";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { BlogSection } from "@/components/site/BlogSection";
import { FAQ } from "@/components/site/FAQ";
import { LeadCapture } from "@/components/site/LeadCapture";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen scroll-smooth bg-background">
      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <FeaturedPlots />
        <Locations />
        <WhyChooseUs />
        <BlogSection />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
      <WhatsAppFab />
      <Toaster richColors position="top-center" />
    </div>
  );
}
