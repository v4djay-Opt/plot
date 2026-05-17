'use client';

import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';

export default function LeadCapture() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          location: data.get('location'),
          source: 'Homepage Lead Form',
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch {
      setError('Failed to send. Please WhatsApp us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Get In Touch</span>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Interested in a Plot? Get a Free Callback.
          </h2>
          <p className="mt-4 max-w-md text-primary-foreground/80">
            Tell us where you want to invest. Rohit Singh will personally call you within business hours with shortlisted options.
          </p>
          <a
            href="https://wa.me/919311122787"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
          >
            <MessageCircle className="size-5 text-accent" />
            Or WhatsApp us directly
          </a>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl bg-card p-6 text-foreground shadow-2xl shadow-black/20 md:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-3 rounded-full bg-green-100 p-3 text-green-600">
                <MessageCircle className="size-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Thanks!</h3>
              <p className="mt-1 text-sm text-muted-foreground">Rohit will call you back shortly.</p>
              <button type="button" onClick={() => setSubmitted(false)} className="mt-4 text-sm font-medium text-primary hover:underline">
                Send another request
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</p>
              )}
              <div>
                <label className="text-sm font-medium" htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Your full name" required className="mt-1.5 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" placeholder="10-digit mobile number" pattern="[0-9]{10}" required className="mt-1.5 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="location">Location Interest</label>
                <select id="location" name="location" className="mt-1.5 h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Select a location</option>
                  <option value="gurgaon">Gurgaon</option>
                  <option value="sohna">Sohna</option>
                  <option value="jhajjar">Jhajjar</option>
                  <option value="any">Open to suggestions</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-md bg-accent text-base font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-60"
              >
                {submitting ? 'Sendingâ€¦' : 'Request Callback'}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
