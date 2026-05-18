'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/property/PropertyCard';
import FAQ from '@/components/site/FAQ';
import type { Plot } from '@/lib/plots';
import {
  MapPin, Ruler, Phone, MessageCircle, ShieldCheck, CheckCircle2,
  Home, Zap, Droplets, TreePine, GraduationCap, Route as RouteIcon,
  ChevronRight, Tag
} from 'lucide-react';

const AMENITIES = [
  { icon: RouteIcon, label: 'Road Access' },
  { icon: Zap, label: 'Electricity' },
  { icon: Droplets, label: 'Water Supply' },
  { icon: ShieldCheck, label: 'Boundary Wall' },
  { icon: TreePine, label: 'Park Nearby' },
  { icon: GraduationCap, label: 'School Nearby' },
];

const PALETTES = [
  'linear-gradient(135deg, #1B4332 0%, #2d6a4f 50%, #52b788 100%)',
  'linear-gradient(135deg, #2d6a4f 0%, #40916C 50%, #95d5b2 100%)',
  'linear-gradient(160deg, #40916C 0%, #74c69d 60%, #b7e4c7 100%)',
  'linear-gradient(135deg, #1B4332 0%, #40916C 100%)',
];

function GalleryImage({ index }: { index: number }) {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
      style={{
        background: PALETTES[index % PALETTES.length],
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
      <Home className="absolute bottom-4 right-4 size-10 text-white/40" />
    </div>
  );
}

export default function PlotDetailClient({ plot, related = [] }: { plot: Plot; related?: Plot[] }) {
  const [copied, setCopied] = useState(false);

  const idHash = plot.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const gradient = PALETTES[idHash % PALETTES.length];

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="relative h-[320px] md:h-[420px]" style={{ background: gradient }}>
        <div className="absolute inset-0 bg-black/30" aria-hidden />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10 text-white md:px-8">
          <nav className="absolute left-6 top-6 text-sm text-white/80 md:left-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="mx-1 inline size-3.5" />
            <Link href="/plots" className="hover:text-white">Plots</Link>
            <ChevronRight className="mx-1 inline size-3.5" />
            <span className="text-white">{plot.title}</span>
          </nav>
          <div className="flex items-start gap-3">
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
              {plot.status === 'Available' ? (
                <><CheckCircle2 className="size-3.5" /> Available</>
              ) : (
                <><Tag className="size-3.5" /> Sold Out</>
              )}
            </span>
            {plot.tag && (
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent/80 px-3 py-1 text-xs text-accent-foreground">
                {plot.tag}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold md:text-5xl">{plot.title}</h1>
          <p className="mt-2 text-xl font-bold md:text-2xl">{plot.priceLabel}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <GalleryImage key={i} index={i} />
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="font-serif text-xl font-semibold">Overview</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{plot.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ruler className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Area</p>
                    <p className="text-sm font-medium">{plot.areaLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">RERA</p>
                    <p className="text-sm font-medium">{plot.rera}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h2 className="font-serif text-xl font-semibold">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AMENITIES.map((a) => (
                  <div key={a.label} className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
                    <a.icon className="size-5 text-primary" />
                    <span className="text-sm font-medium">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-semibold">Related Plots</h2>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {related.map((p) => (
                    <PropertyCard key={p.id} plot={p} />
                  ))}
                </div>
              </div>
            )}

            <FAQ />
          </div>

          <aside className="space-y-6">
            <div className="sticky top-6 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold">Contact for this Plot</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Get instant details on WhatsApp or call our advisor directly.
              </p>

              <a
                href={`https://wa.me/919311122787?text=${encodeURIComponent(`Hi Rohit, I'm interested in: ${plot.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <MessageCircle className="size-4" />
                WhatsApp Now
              </a>

              <a
                href="tel:+919311122787"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-primary/80 bg-[#f6f5f0] px-4 py-3 text-sm font-semibold text-primary transition hover:bg-[#ece9e1]"
              >
                <Phone className="size-4" />
                Call 09311122787
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground"
              >
                {copied ? 'Link copied!' : 'Copy page link'}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
