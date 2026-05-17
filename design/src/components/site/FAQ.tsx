import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FAQItem = { q: string; a: string };

export const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "Are all listed plots RERA registered?",
    a: "Yes. Every plot we list carries a verified HRERA registration number along with clean title documents. We share the RERA ID before any site visit.",
  },
  {
    q: "Do you charge any brokerage or hidden fees?",
    a: "No. All plots are direct from the owner or developer. You pay only the registered sale price plus government charges â€” there is zero brokerage from our side.",
  },
  {
    q: "Can I book a free site visit?",
    a: "Absolutely. Site visits are completely free. Pick-up and drop from a convenient point in Gurgaon can also be arranged on request.",
  },
  {
    q: "Is home loan assistance available?",
    a: "Yes. We are empanelled with leading banks including HDFC, SBI, ICICI and Axis Bank, and can help you with end-to-end home loan paperwork.",
  },
  {
    q: "Which areas do you cover?",
    a: "We currently cover residential plots across Gurgaon, Sohna, Jhajjar, Dwarka Expressway, Sector 102, Sector 65 and adjoining micro-markets.",
  },
  {
    q: "How do I know the plot title is clear?",
    a: "We share the full chain of documents â€” sale deed, mutation, RERA approval and encumbrance certificate â€” for your independent legal review before booking.",
  },
];

export function FAQ({
  items = DEFAULT_FAQS,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know before buying a residential plot.",
}: {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
        </div>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground sm:text-lg">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}