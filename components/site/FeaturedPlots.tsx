import Link from 'next/link';
import PropertyCard, { Plot } from '@/components/property/PropertyCard';

const plots: Plot[] = [
  { id: 'f1', title: '200 Sq Yd Residential Plot in Sector 102, Gurgaon', price: 4800000, priceLabel: '₹48,00,000', area: 200, areaLabel: '200 Sq Yd', location: 'Sector 102, Gurgaon', rera: 'RERA: HR/420/152/2023', status: 'Available', tag: 'Corner Plot' },
  { id: 'f2', title: '150 Sq Yd Residential Plot in Sohna Road', price: 2800000, priceLabel: '₹28,00,000', area: 150, areaLabel: '150 Sq Yd', location: 'Sohna Road', rera: 'RERA: HR/418/150/2023', status: 'Available', tag: 'Park Facing' },
  { id: 'f3', title: '300 Sq Yd Residential Plot in Sector 95, Gurgaon', price: 7200000, priceLabel: '₹72,00,000', area: 300, areaLabel: '300 Sq Yd', location: 'Sector 95, Gurgaon', rera: 'RERA: HR/421/161/2023', status: 'Available', tag: 'Main Road Facing' },
  { id: 'f4', title: '500 Sq Yd Residential Plot in Jajjar Highway', price: 8500000, priceLabel: '₹85,00,000', area: 500, areaLabel: '500 Sq Yd', location: 'Jajjar Highway', rera: 'RERA: HR/422/172/2023', status: 'Sold Out' },
  { id: 'f5', title: '120 Sq Yd Residential Plot in Sohna Town', price: 1800000, priceLabel: '₹18,00,000', area: 120, areaLabel: '120 Sq Yd', location: 'Sohna Town', rera: 'RERA: HR/417/148/2023', status: 'Available' },
  { id: 'f6', title: '250 Sq Yd Residential Plot in Sector 110, Gurgaon', price: 6200000, priceLabel: '₹62,00,000', area: 250, areaLabel: '250 Sq Yd', location: 'Sector 110, Gurgaon', rera: 'RERA: HR/423/180/2023', status: 'Available', tag: 'Corner Plot' },
];

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
