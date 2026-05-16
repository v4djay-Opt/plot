"use client";

import { MapPin, Ruler, MessageCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Plot {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  area: number;
  areaLabel: string;
  location: string;
  rera: string;
  status: 'Available' | 'Sold Out';
  tag?: string;
}

function PlotImage() {
  return (
    <div
      className="relative h-48 w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2d6a4f 0%, #40916C 50%, #74c69d 100%)',
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <Home className="absolute bottom-3 right-3 size-9 text-white/40" />
    </div>
  );
}

export default function PropertyCard({ plot }: { plot: Plot }) {
  const router = useRouter();
  const sold = plot.status === 'Sold Out';
  const detailHref = `/plots/${plot.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  return (
    <article
      onClick={() => router.push(detailHref)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative">
        <PlotImage />
        <span
          className={
            'absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-semibold ' +
            (sold
              ? 'bg-gray-500/90 text-white'
              : 'bg-[#4a8a6a] text-white')
          }
        >
          {plot.status}
        </span>
        {plot.tag && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
            {plot.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.25rem] font-serif text-lg font-semibold leading-snug text-foreground">
          {plot.title}
        </h3>
        <p className="mt-2 font-serif text-2xl font-bold text-primary">
          {plot.priceLabel}
        </p>
        <div className="mt-3 flex min-h-[2.75rem] flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0 text-secondary" />
            {plot.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="size-4 shrink-0 text-secondary" />
            {plot.areaLabel}
          </span>
        </div>
        <p className="mt-3 line-clamp-1 text-xs text-muted-foreground">{plot.rera}</p>
        <div className="mt-auto flex gap-3 pt-5">
          <span className="flex flex-1 items-center justify-center rounded-full border border-primary/80 bg-[#f6f5f0] px-4 py-2.5 text-sm font-semibold text-primary">
            View Details
          </span>
          <a
            href={`https://wa.me/919311122787?text=${encodeURIComponent(`Hi Rohit, I'm interested in: ${plot.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
