import { ShieldCheck, CalendarCheck, Handshake, BadgeIndianRupee } from "lucide-react";

const items = [
  { title: "RERA Registered", desc: "Every plot is government verified.", Icon: ShieldCheck },
  { title: "Free Site Visit", desc: "We arrange visits at no charge.", Icon: CalendarCheck },
  { title: "Direct Owner Deal", desc: "No middlemen, no hidden margins.", Icon: Handshake },
  { title: "Best Price Guarantee", desc: "Transparent pricing, always.", Icon: BadgeIndianRupee },
];

export function WhyChooseUs() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Why PlotsGurgaon.in
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Trusted by Plot Buyers Across NCR
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map(({ title, desc, Icon }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-brand-green-soft text-primary">
                <Icon className="size-7" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}