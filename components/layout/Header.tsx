'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, MessageCircle, Phone, X, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const mainLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const cityLinks = [
  { label: 'Gurgaon', href: '/plots-in-gurgaon' },
  { label: 'Sohna', href: '/plots-in-sohna' },
  { label: 'Jajjar', href: '/plots-in-jajjar' },
  { label: 'Mathura', href: '/plots-in-mathura' },
  { label: 'Gorakhpur', href: '/plots-in-gorakhpur' },
  { label: 'Ayodhya', href: '/plots-in-ayodhya' },
  { label: 'Lucknow', href: '/plots-in-lucknow' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openDropdown = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    timerRef.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50">
        {/* Top utility bar */}
        <div
          className={cn(
            'hidden overflow-hidden bg-primary text-primary-foreground transition-all duration-300 md:block',
            scrolled ? 'max-h-0 opacity-0' : 'max-h-9 opacity-100'
          )}
        >
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-[11px] tracking-wide">
            <p className="opacity-90">
              RERA Registered · Best Price Guaranteed · Free Site Visits
            </p>
            <div className="flex items-center gap-5">
              <a href="tel:+919311122787" className="inline-flex items-center gap-1.5 opacity-90 transition hover:opacity-100">
                <Phone className="size-3" /> +91 93111 22787
              </a>
              <span className="opacity-60">Mon–Sat · 9 AM – 7 PM</span>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            'w-full border-b backdrop-blur-xl transition-all duration-300',
            scrolled
              ? 'border-border/60 bg-white/90 shadow-[0_4px_30px_rgba(0,0,0,0.06)]'
              : 'border-transparent bg-white/70'
          )}
        >
          <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:px-6">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-primary font-serif text-base font-bold text-primary-foreground shadow-sm transition group-hover:shadow-md">
                P
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold tracking-tight text-primary">
                  PlotsGurgaon<span className="text-secondary">.in</span>
                </span>
                <span className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  Premium Land · Trusted Deals
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-0.5 lg:flex">
              <Link
                href="/"
                className={cn(
                  'group relative px-3.5 py-2 text-[13px] font-bold transition-colors',
                  isActive('/') ? 'text-primary' : 'text-foreground/65 hover:text-primary'
                )}
              >
                Home
                <span
                  className={cn(
                    'absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary transition-all duration-300',
                    isActive('/') ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  )}
                />
              </Link>

              {/* Locations Dropdown */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className={cn(
                    'group relative inline-flex items-center gap-1 px-3.5 py-2 text-[13px] font-bold outline-none transition-colors',
                    dropdownOpen || pathname.startsWith('/plots-in-') ? 'text-primary' : 'text-foreground/65 hover:text-primary'
                  )}
                >
                  Locations
                  <ChevronDown
                    className={cn(
                      'size-3.5 transition-transform duration-200',
                      dropdownOpen && 'rotate-180'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary transition-all duration-300',
                      pathname.startsWith('/plots-in-')
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    )}
                  />
                </button>

                {/* Dropdown menu */}
                <div
                  className={cn(
                    'absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-2xl border border-border bg-white/95 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-200',
                    dropdownOpen
                      ? 'translate-y-0 scale-100 opacity-100'
                      : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                  )}
                >
                  {/* Arrow */}
                  <div className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-l border-t border-border bg-white/95" />
                  <div className="relative max-h-[320px] overflow-y-auto">
                    {cityLinks.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setDropdownOpen(false)}
                        className={cn(
                          'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] transition',
                          pathname === c.href
                            ? 'bg-primary/5 font-semibold text-primary'
                            : 'text-foreground/80 hover:bg-muted/60 hover:text-primary'
                        )}
                      >
                        <MapPin className="size-3.5 text-secondary/80" />
                        <span>{c.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {mainLinks.slice(1).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'group relative px-3.5 py-2 text-[13px] font-bold transition-colors',
                    isActive(l.href) ? 'text-primary' : 'text-foreground/65 hover:text-primary'
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary transition-all duration-300',
                      isActive(l.href) ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919311122787"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full bg-secondary px-5 py-2 text-[13px] font-semibold text-secondary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:inline-flex"
              >
                <MessageCircle className="size-3.5" />
                Chat Now
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="inline-flex items-center justify-center rounded-xl p-2.5 text-foreground/70 transition hover:bg-muted lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay + drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={cn(
            'absolute right-0 top-0 h-full w-[min(320px,85vw)] transform border-l border-border bg-card shadow-2xl transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-serif text-lg font-bold text-primary">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-foreground/70 transition hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="px-5 pb-8">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center rounded-xl px-4 py-3 text-[15px] font-semibold transition',
                  isActive('/')
                    ? 'bg-primary/5 text-primary'
                    : 'text-foreground/70 hover:bg-muted hover:text-primary'
                )}
              >
                Home
              </Link>

              {/* Mobile Locations expandable */}
              <div className="space-y-1">
                <p className="flex items-center rounded-xl px-4 py-3 text-[15px] font-semibold text-primary">
                  <MapPin className="mr-2.5 size-4 text-secondary" />
                  Locations
                </p>
                <div className="ml-3 space-y-1 border-l-2 border-border/50 pl-4">
                  {cityLinks.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center rounded-xl px-4 py-2.5 text-[14px] transition',
                        pathname === c.href
                          ? 'bg-primary/5 font-semibold text-primary'
                          : 'text-foreground/70 hover:bg-muted hover:text-primary'
                      )}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>

              {mainLinks.slice(1).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center rounded-xl px-4 py-3 text-[15px] font-semibold transition',
                    isActive(l.href)
                      ? 'bg-primary/5 text-primary'
                      : 'text-foreground/70 hover:bg-muted hover:text-primary'
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <a
                href="https://wa.me/919311122787"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition hover:bg-secondary/90"
              >
                <MessageCircle className="size-4" />
                WhatsApp Chat
              </a>
              <a
                href="tel:+919311122787"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
              >
                <Phone className="size-4" /> +91 93111 22787
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[68px] md:h-[104px]" />
    </>
  );
}
