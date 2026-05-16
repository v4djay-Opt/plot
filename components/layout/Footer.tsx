import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Plots', href: '/plots' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const cityLinks = [
  { label: 'Plots in Gurgaon', href: '/plots-in-gurgaon' },
  { label: 'Plots in Sohna', href: '/plots-in-sohna' },
  { label: 'Plots in Jajjar', href: '/plots-in-jajjar' },
  { label: 'Plots in Mathura', href: '/plots-in-mathura' },
  { label: 'Plots in Gorakhpur', href: '/plots-in-gorakhpur' },
  { label: 'Plots in Ayodhya', href: '/plots-in-ayodhya' },
  { label: 'Plots in Lucknow', href: '/plots-in-lucknow' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* CTA strip */}
      <div className="border-b border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-10 md:flex-row md:items-center md:px-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              Ready to find your perfect plot?
            </h3>
            <p className="mt-1.5 text-sm text-primary-foreground/70">
              Speak with Rohit Singh — typical reply within 2 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919311122787"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition hover:bg-secondary/90"
            >
              <MessageCircle className="size-4" /> WhatsApp Now
            </a>
            <a
              href="tel:+919311122787"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              <Phone className="size-4" /> +91 93111 22787
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-md bg-secondary font-serif text-lg font-bold text-secondary-foreground">
                P
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight">
                PlotsGurgaon<span className="text-secondary">.in</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Hand-picked residential plots across Gurgaon, Sohna and Jajjar — at the
              best prices, with verified titles and free site visits.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/80">
              <ShieldCheck className="size-3.5 text-secondary" /> RERA Registered Listings
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Explore
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/75">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex items-center gap-1.5 transition hover:text-secondary">
                    <ArrowRight className="size-3 opacity-0 transition group-hover:opacity-100" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Locations
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/75">
              {cityLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:text-secondary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Get in touch
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
              <li>
                <a href="tel:+919311122787" className="inline-flex items-start gap-2.5 transition hover:text-secondary">
                  <Phone className="mt-0.5 size-4 text-secondary" />
                  <span>+91 93111 22787<br /><span className="text-xs text-primary-foreground/55">Rohit Singh · Sr. Consultant</span></span>
                </a>
              </li>
              <li>
                <a href="mailto:info@plotsgurgaon.in" className="inline-flex items-center gap-2.5 transition hover:text-secondary">
                  <Mail className="size-4 text-secondary" />
                  <span>info@plotsgurgaon.in</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 text-secondary" /> Gurgaon, Haryana
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 md:flex-row md:px-6">
          <p>© 2025 PlotsGurgaon.in — All rights reserved.</p>
          <p>
            Design and developed by{" "}
            <a
              href="https://optimaxstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-secondary transition hover:underline"
            >
              Optimax Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
