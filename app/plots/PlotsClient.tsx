'use client';

import { useMemo, useState } from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import LeadCapture from '@/components/site/LeadCapture';
import { SlidersHorizontal } from 'lucide-react';

const allPlots = [
  { id: '1', title: '200 Sq Yd Residential Plot in Sector 102, Gurgaon', price: 4500000, priceLabel: '₹45,00,000', area: 200, areaLabel: '200 Sq Yd', location: 'Sector 102, Gurgaon', rera: 'RERA: HR/420/152/2023', status: 'Available' as const, tag: 'Corner Plot' },
  { id: '2', title: '150 Sq Yd Residential Plot in Sohna Road', price: 2800000, priceLabel: '₹28,00,000', area: 150, areaLabel: '150 Sq Yd', location: 'Sohna', rera: 'RERA: HR/418/150/2023', status: 'Available' as const, tag: 'Park Facing' },
  { id: '3', title: '300 Sq Yd Residential Plot in Sector 65, Gurgaon', price: 7200000, priceLabel: '₹72,00,000', area: 300, areaLabel: '300 Sq Yd', location: 'Sector 65', rera: 'RERA: HR/421/161/2023', status: 'Available' as const, tag: 'Main Road Facing' },
  { id: '4', title: '500 Sq Yd Residential Plot in Jajjar Highway', price: 8500000, priceLabel: '₹85,00,000', area: 500, areaLabel: '500 Sq Yd', location: 'Jajjar', rera: 'RERA: HR/422/172/2023', status: 'Sold Out' as const },
  { id: '5', title: '120 Sq Yd Residential Plot in Sohna Town', price: 1800000, priceLabel: '₹18,00,000', area: 120, areaLabel: '120 Sq Yd', location: 'Sohna', rera: 'RERA: HR/417/148/2023', status: 'Available' as const },
  { id: '6', title: '250 Sq Yd Residential Plot in Sector 102, Gurgaon', price: 6200000, priceLabel: '₹62,00,000', area: 250, areaLabel: '250 Sq Yd', location: 'Sector 102, Gurgaon', rera: 'RERA: HR/423/180/2023', status: 'Available' as const, tag: 'Corner Plot' },
  { id: '7', title: '180 Sq Yd Residential Plot on Dwarka Expressway', price: 5500000, priceLabel: '₹55,00,000', area: 180, areaLabel: '180 Sq Yd', location: 'Dwarka Expressway', rera: 'RERA: HR/424/190/2023', status: 'Available' as const, tag: 'Park Facing' },
  { id: '8', title: '90 Sq Yd Residential Plot in Sohna', price: 1200000, priceLabel: '₹12,00,000', area: 90, areaLabel: '90 Sq Yd', location: 'Sohna', rera: 'RERA: HR/425/195/2023', status: 'Available' as const },
  { id: '9', title: '400 Sq Yd Corner Plot in Sector 65, Gurgaon', price: 9800000, priceLabel: '₹98,00,000', area: 400, areaLabel: '400 Sq Yd', location: 'Sector 65', rera: 'RERA: HR/426/200/2023', status: 'Available' as const, tag: 'Corner Plot' },
  { id: '10', title: '220 Sq Yd Residential Plot on Dwarka Expressway', price: 6800000, priceLabel: '₹68,00,000', area: 220, areaLabel: '220 Sq Yd', location: 'Dwarka Expressway', rera: 'RERA: HR/427/205/2023', status: 'Available' as const, tag: 'Main Road Facing' },
  { id: '11', title: '160 Sq Yd Residential Plot in Gurgaon', price: 3800000, priceLabel: '₹38,00,000', area: 160, areaLabel: '160 Sq Yd', location: 'Gurgaon', rera: 'RERA: HR/428/210/2023', status: 'Available' as const },
  { id: '12', title: '600 Sq Yd Residential Plot in Jajjar', price: 11000000, priceLabel: '₹1.10 Cr', area: 600, areaLabel: '600 Sq Yd', location: 'Jajjar', rera: 'RERA: HR/429/215/2023', status: 'Available' as const, tag: 'Park Facing' },
];

const LOCATIONS = ['Sector 102, Gurgaon', 'Sohna', 'Sector 65', 'Jajjar', 'Dwarka Expressway', 'Gurgaon'];
const TAGS = ['Corner Plot', 'Park Facing', 'Main Road Facing'];
const STATUSES = ['Available', 'Sold Out'];

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {children}
    </div>
  );
}

type SortKey = 'latest' | 'price-asc' | 'price-desc' | 'area';

export default function PlotsClient() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('latest');

  const filtered = useMemo(() => {
    const list = allPlots.filter((p) => {
      if (selectedLocations.length && !selectedLocations.includes(p.location)) return false;
      if (selectedStatuses.length && !selectedStatuses.includes(p.status)) return false;
      if (selectedTags.length && (!p.tag || !selectedTags.includes(p.tag))) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (sort === 'area') sorted.sort((a, b) => b.area - a.area);
    return sorted;
  }, [selectedLocations, selectedStatuses, selectedTags, sort]);

  function toggleItem<T>(arr: T[], item: T, set: (v: T[]) => void) {
    set(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  }

  function resetFilters() {
    setSelectedLocations([]);
    setSelectedStatuses([]);
    setSelectedTags([]);
    setSort('latest');
  }

  const hasFilters = selectedLocations.length > 0 || selectedStatuses.length > 0 || selectedTags.length > 0;

  const FilterContent = (
    <div className="space-y-6">
      {hasFilters && (
        <button
          onClick={resetFilters}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Reset Filters
        </button>
      )}
      <FilterSection title="Location">
        <div className="space-y-2">
          {LOCATIONS.map((loc) => (
            <label key={loc} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={selectedLocations.includes(loc)}
                onChange={() => toggleItem(selectedLocations, loc, setSelectedLocations)}
                className="size-4 rounded border-border text-primary accent-primary"
              />
              {loc}
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Status">
        <div className="space-y-2">
          {STATUSES.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(s)}
                onChange={() => toggleItem(selectedStatuses, s, setSelectedStatuses)}
                className="size-4 rounded border-border text-primary accent-primary"
              />
              {s}
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Plot Type">
        <div className="space-y-2">
          {TAGS.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={selectedTags.includes(t)}
                onChange={() => toggleItem(selectedTags, t, setSelectedTags)}
                className="size-4 rounded border-border text-primary accent-primary"
              />
              {t}
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src="/images/hero-bg.jpg"
          alt="Browse all verified residential plots for sale"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-15"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">All Listings</span>
          <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Residential Plots
          </h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Browse our complete inventory of verified residential plots across Gurgaon, Sohna, Jajjar and surrounding areas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-foreground">Filter Plots</h2>
              <div className="mt-5">{FilterContent}</div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-foreground transition hover:bg-muted lg:hidden"
                >
                  <SlidersHorizontal className="size-4" />
                  Filters
                </button>
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filtered.length}</span> plot{filtered.length === 1 ? '' : 's'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-muted-foreground sm:inline">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="latest">Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="area">Area (Largest)</option>
                </select>
              </div>
            </div>

            {/* Mobile filter drawer */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <div className="absolute left-0 top-0 h-full w-[88vw] max-w-sm overflow-y-auto border-r border-border bg-card p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold text-foreground">Filter Plots</h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="rounded-md p-1 text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-6">{FilterContent}</div>
                </div>
              </div>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <p className="font-serif text-xl font-semibold text-foreground">No plots match these filters</p>
                <p className="mt-2 text-sm text-muted-foreground">Try resetting filters or widening your search.</p>
                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filtered.map((plot) => (
                  <PropertyCard key={plot.id} plot={plot} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <LeadCapture />
    </>
  );
}
