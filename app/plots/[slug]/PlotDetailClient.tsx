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
    <div className="relative h-full w-full" style={{ background: PALETTES[index % PALETTES.length] }} aria-hidden>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <Home className="absolute bottom-5 right-5 size-12 text-white/40" />
    </div>
  );
}

export default function PlotDetailClient({ plot, allPlots }: { plot: Plot; allPlots: readonly Plot[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', message: `I'm interested in this plot: ${plot.title}` });

  const pricePerYd = `\u20B9${Math.round(plot.price / plot.area).toLocaleString('en-IN')}/sq yd`;

  const related = allPlots.filter((p) => p.location === plot.location && p.id !== plot.id).slice(0, 3);
  const similarFinal = related.length === 3 ? related : allPlots.filter((p) => p.id !== plot.id).slice(0, 3);

  const breadcrumbArea = plot.location.includes(',') ? plot.location.split(',')[0].trim() : plot.location;
  const waUrl = `https://wa.me/919311122787?text=${encodeURIComponent(`Hi Rohit, I'm interested in ${plot.title}`)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    alert('Site visit request sent! Rohit will call you within 30 minutes.');
    setForm({ ...form, name: '', phone: '' });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-4 text-xs text-muted-foreground md:px-6 md:text-sm">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/plots" className="hover:text-primary">Plots</Link>
          <ChevronRight className="size-3.5" />
          <span className="hover:text-primary">{breadcrumbArea}</span>
          <ChevronRight className="size-3.5" />
          <span className="truncate font-medium text-foreground">{plot.title}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* LEFT: Content */}
          <div className="lg:col-span-3">
            {/* Gallery */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <GalleryImage index={activeImage} />
                <span
                  className={
                    'absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ' +
                    (plot.status === 'Available'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted-foreground/80 text-white')
                  }
                >
                  {plot.status}
                </span>
                {plot.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {plot.tag}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2 p-2">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={
                      'relative aspect-[4/3] overflow-hidden rounded-lg transition-all ' +
                      (activeImage === i
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-card'
                        : 'opacity-80 hover:opacity-100')
                    }
                  >
                    <GalleryImage index={i} />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Price */}
            <div className="mt-8">
              <h1 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {plot.title}
              </h1>
              <div className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-secondary" />
                {plot.location}
              </div>
              <div className="mt-5 flex items-baseline gap-4">
                <span className="font-serif text-4xl font-bold text-primary sm:text-5xl">
                  {plot.priceLabel}
                </span>
                <span className="text-sm text-muted-foreground">{pricePerYd}</span>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Ruler, label: 'Plot Area', value: plot.areaLabel },
                { icon: Tag, label: 'Plot Type', value: plot.tag ?? 'Residential' },
                { icon: MapPin, label: 'Location', value: breadcrumbArea },
                { icon: CheckCircle2, label: 'Status', value: plot.status },
              ].map((d) => (
                <div key={d.label} className="rounded-xl border border-border bg-card p-4">
                  <d.icon className="size-5 text-secondary" />
                  <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">{d.label}</p>
                  <p className="mt-0.5 font-semibold text-foreground">{d.value}</p>
                </div>
              ))}
            </div>

            {/* RERA */}
            <div className="mt-6 rounded-xl border border-border bg-muted/60 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">RERA Registration</p>
              <p className="mt-1 font-mono text-sm font-semibold text-foreground">{plot.rera}</p>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-foreground">Description</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-foreground/80">
                <p>
                  A premium {plot.areaLabel.toLowerCase()} residential plot in {plot.location}, one of Gurgaon&apos;s fastest-developing micro-markets. Located in a fully developed licensed colony with wide internal roads, sewerage and underground electricity.
                </p>
                <p>
                  Ideal for end-users planning to build a custom home or investors looking for capital appreciation. Direct from owner — no broker fees, complete RERA-approved paperwork and clean title.
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-foreground">Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AMENITIES.map((a) => (
                  <div key={a.label} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                      <a.icon className="size-5" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl font-bold text-foreground">Location</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[16/9] w-full bg-muted">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(27,67,50,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(27,67,50,.08) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-xl bg-card/90 px-5 py-4 text-center shadow-md backdrop-blur">
                      <MapPin className="mx-auto size-8 text-primary" />
                      <p className="mt-2 font-serif text-lg font-semibold text-foreground">{plot.location}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Map embed coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky Lead Form */}
          <aside className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary/10">
                <div className="bg-primary px-6 py-5">
                  <h2 className="font-serif text-xl font-bold text-primary-foreground">Interested in This Plot?</h2>
                  <p className="mt-1 text-sm text-primary-foreground/80">Speak with the property consultant directly.</p>
                </div>

                <div className="p-6">
                  {/* Agent */}
                  <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                    <div className="grid size-12 place-items-center rounded-full bg-primary font-serif text-lg font-bold text-primary-foreground">
                      RS
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Rohit Singh</p>
                      <p className="text-xs text-muted-foreground">Property Consultant</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="lead-name" className="text-sm font-medium">Name *</label>
                      <input
                        id="lead-name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="lead-phone" className="text-sm font-medium">Phone *</label>
                      <input
                        id="lead-phone"
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="10-digit mobile"
                        className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="lead-msg" className="text-sm font-medium">Message</label>
                      <textarea
                        id="lead-msg"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-12 w-full rounded-md bg-accent text-base font-semibold text-accent-foreground transition hover:bg-accent/90"
                    >
                      Book Free Site Visit
                    </button>
                  </form>

                  <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    OR
                    <span className="h-px flex-1 bg-border" />
                  </div>

                  <div className="space-y-2.5">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-secondary text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
                    >
                      <MessageCircle className="size-5" />
                      Chat on WhatsApp
                    </a>
                    <a
                      href="tel:+919311122787"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-primary text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                    >
                      <Phone className="size-5" />
                      Call Now: 9311122787
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Plots */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">Similar Plots</h2>
          <p className="mt-2 text-sm text-muted-foreground">Other listings you might like</p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {similarFinal.map((p) => (
              <PropertyCard key={p.id} plot={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/plots"
              className="inline-flex h-12 items-center justify-center rounded-md border border-primary px-6 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              View All Plots
            </Link>
          </div>
        </section>
      </div>

      <FAQ />

      {/* Mobile floating CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card p-3 shadow-2xl shadow-black/20 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <a
            href="#lead-name"
            className="flex h-12 flex-1 items-center justify-center rounded-md bg-accent text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
          >
            Enquire Now
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-secondary text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
          >
            <MessageCircle className="size-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
