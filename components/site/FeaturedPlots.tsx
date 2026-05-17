import Link from 'next/link';
import PropertyCard from '@/components/property/PropertyCard';
import { allPlots } from '@/lib/plots';

const plots = allPlots.slice(0, 6);

export default function FeaturedPlots() {
  return (
    <section id="plots" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Handpicked Listings
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Featured Residential Plots
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            RERA-approved plots from verified owners across Gurgaon, Sohna and Jajjar.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plots.map((plot) => (
            <PropertyCard key={plot.id} plot={plot} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/plots"
            className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
          >
            View All Plots →
          </Link>
        </div>
      </div>
    </section>
  );
}
