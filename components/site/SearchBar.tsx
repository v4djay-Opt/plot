'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [budget, setBudget] = useState('');

  function handleSearch() {
    const params = new URLSearchParams();

    if (location) {
      params.set('location', location);
    }

    if (size) {
      const [minArea, maxArea] =
        size === '500+' ? ['500', ''] : size.split('-');
      if (minArea) params.set('minArea', minArea);
      if (maxArea) params.set('maxArea', maxArea);
    }

    if (budget) {
      const [minPrice, maxPrice] =
        budget === 'under-20'
          ? ['0', '2000000']
          : budget === '20-50'
            ? ['2000000', '5000000']
            : budget === '50+'
              ? ['5000000', '']
              : ['', ''];
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
    }

    const queryString = params.toString();
    router.push('/plots' + (queryString ? `?${queryString}` : ''));
  }

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 md:px-6">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-xl shadow-primary/10 md:p-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">All locations</option>
              <option value="gurgaon">Gurgaon</option>
              <option value="sohna">Sohna</option>
              <option value="jhajjar">Jhajjar</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Plot Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="h-12 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Any size</option>
              <option value="100-200">100 – 200 sq yd</option>
              <option value="200-500">200 – 500 sq yd</option>
              <option value="500+">500+ sq yd</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="h-12 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Any budget</option>
              <option value="under-20">Under ₹20L</option>
              <option value="20-50">₹20L – ₹50L</option>
              <option value="50+">₹50L+</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
            >
              <Search className="size-4" />
              Search Plots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
