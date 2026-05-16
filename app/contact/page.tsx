import type { Metadata } from 'next';
import LeadCapture from '@/components/site/LeadCapture';
import { Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Rohit Singh for verified residential plots in Gurgaon, Jajjar & beyond. Free site visits. Call 09311122787 — plotsgurgaon.in',
  alternates: {
    canonical: 'https://plotsgurgaon.in/contact',
  },
  openGraph: {
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact PlotsGurgaon for free site visit',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src="/images/hero-bg.jpg"
          alt="Contact PlotsGurgaon for verified residential plots"
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
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-white md:px-6 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</span>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 max-w-xl text-white/85">Have questions about a plot? Need a free site visit? Rohit Singh is here to help.</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 inline-flex rounded-full bg-secondary/10 p-3 text-secondary">
                <Phone className="size-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">Phone</h3>
              <a href="tel:+919311122787" className="mt-2 inline-block text-muted-foreground hover:text-primary">+91 93111 22787</a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 inline-flex rounded-full bg-secondary/10 p-3 text-secondary">
                <Mail className="size-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">Email</h3>
              <a href="mailto:info@plotsgurgaon.in" className="mt-2 inline-block text-muted-foreground hover:text-primary">info@plotsgurgaon.in</a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 inline-flex rounded-full bg-secondary/10 p-3 text-secondary">
                <Clock className="size-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">Business Hours</h3>
              <p className="mt-2 text-muted-foreground">Mon – Sat: 9 AM – 7 PM</p>
            </div>
          </div>
        </div>
      </section>

      <LeadCapture />
    </>
  );
}
