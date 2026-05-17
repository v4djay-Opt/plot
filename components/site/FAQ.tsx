'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FAQItem = { q: string; a: string };

export const DEFAULT_FAQS: FAQItem[] = [
  { q: 'Are all listed plots RERA registered?', a: 'Yes. Every plot we list carries a verified HRERA registration number along with clean title documents. We share the RERA ID before any site visit.' },
  { q: 'Do you charge any brokerage or hidden fees?', a: 'No. All plots are direct from the owner or developer. You pay only the registered sale price plus government charges â€” there is zero brokerage.' },
  { q: 'Which areas do you cover?', a: 'We currently cover residential plots across Gurgaon, Sohna, Jhajjar, Dwarka Expressway, Sector 102, Sector 65 and adjoining micro-markets.' },
  { q: 'How do I know the plot title is clear?', a: 'We share the full chain of documents â€” sale deed, mutation, RERA approval and encumbrance certificate â€” for your independent legal review before booking.' },
];

export default function FAQ({
  items = DEFAULT_FAQS,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know before buying a residential plot.',
}: {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">FAQ</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
        </div>
        <div className="mt-10 w-full divide-y divide-border">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between text-left font-serif text-base font-semibold text-foreground sm:text-lg"
                >
                  {item.q}
                  <ChevronDown className={`ml-3 size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
