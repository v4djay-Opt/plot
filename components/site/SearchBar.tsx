'use client';

import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 md:px-6">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-xl shadow-primary/10 md:p-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Location</label>
            <select className="h-12 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option value="">All locations</option>
              <option value="gurgaon">Gurgaon</option>
              <option value="sohna">Sohna</option>
              <option value="jajjar">Jajjar</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Plot Size</label>
            <select className="h-12 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option value="">Any size</option>
              <option value="100-200">100 – 200 sq yd</option>
              <option value="200-500">200 – 500 sq yd</option>
              <option value="500+">500+ sq yd</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Budget</label>
            <select className="h-12 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary">
              <option value="">Any budget</option>
              <option value="under-20">Under ₹20L</option>
              <option value="20-50">₹20L – ₹50L</option>
              <option value="50+">₹50L+</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent text-sm font-semibold text-accent-foreground transition hover:bg-accent/90">
              <Search className="size-4" />
              Search Plots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
