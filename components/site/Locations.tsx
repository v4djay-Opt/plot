import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const locations = [
  { name: 'Plots in Gurgaon', count: '8 plots available', image: '/images/loc-gurgaon.jpg', href: '/plots-in-gurgaon' },
  { name: 'Plots in Sohna', count: '5 plots available', image: '/images/loc-sohna.jpg', href: '/plots-in-sohna' },
  { name: 'Plots in Jajjar', count: '3 plots available', image: '/images/loc-jajjar.jpg', href: '/plots-in-jajjar' },
  { name: 'Plots in Mathura', count: '2 plots available', image: '/images/hero-bg.jpg', href: '/plots-in-mathura' },
  { name: 'Plots in Ayodhya', count: '2 plots available', image: '/images/hero-bg.jpg', href: '/plots-in-ayodhya' },
  { name: 'Plots in Lucknow', count: '2 plots available', image: '/images/hero-bg.jpg', href: '/plots-in-lucknow' },
];

export default function Locations() {
  return (
    <section id="locations" className="bg-[#f8f7f4] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Explore Areas</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">Browse by Location</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map(({ name, count, image, href }) => (
            <Link
              key={name}
              href={href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img src={image} alt={name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{count}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary transition-colors group-hover:text-secondary">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
