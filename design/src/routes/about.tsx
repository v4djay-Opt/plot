import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Users, MapPin, Award, MessageCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FAQ } from "@/components/site/FAQ";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — PlotsGurgaon.in" },
      {
        name: "description",
        content:
          "Learn about PlotsGurgaon.in — a trusted team helping buyers find verified residential plots across Gurgaon, Sohna, and Jajjar with the best pricing.",
      },
      { property: "og:title", content: "About Us — PlotsGurgaon.in" },
      {
        property: "og:description",
        content:
          "Trusted plot consultants in Gurgaon, Sohna, and Jajjar — verified titles, best pricing, and free site visits.",
      },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { label: "Verified Plots", value: "500+", icon: ShieldCheck },
  { label: "Happy Buyers", value: "1,200+", icon: Users },
  { label: "Cities Covered", value: "3", icon: MapPin },
  { label: "Years Experience", value: "12+", icon: Award },
];

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1B4332 0%, #2d6a4f 60%, #40916C 100%)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 text-primary-foreground md:px-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              About Us
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Helping you find land you can trust.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
              PlotsGurgaon.in is a specialised land advisory connecting serious
              buyers with hand-picked, verified residential plots across
              Gurgaon, Sohna, and Jajjar — at the best market pricing.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <s.icon className="mx-auto size-7 text-secondary" />
                <p className="mt-3 font-display text-3xl font-bold text-primary">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/30">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
                Our Story
              </h2>
              <p className="mt-4 text-muted-foreground">
                Founded by Rohit Singh, PlotsGurgaon.in was built to remove the
                guesswork from buying land in NCR. After years of seeing buyers
                struggle with unclear titles, inflated brokerage, and unverified
                listings, we set out to do things differently.
              </p>
              <p className="mt-3 text-muted-foreground">
                Today, we work directly with land owners and trusted developers
                to bring you a curated catalogue — every plot title-checked,
                location-verified, and competitively priced.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
                What We Promise
              </h2>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-secondary" /> Verified titles and RERA-registered listings wherever applicable.</li>
                <li className="flex gap-3"><Award className="mt-0.5 size-5 shrink-0 text-secondary" /> Best-pricing guarantee with transparent, owner-direct deals.</li>
                <li className="flex gap-3"><Users className="mt-0.5 size-5 shrink-0 text-secondary" /> Free site visits with personal guidance from our consultants.</li>
                <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-secondary" /> Deep on-ground expertise across Gurgaon, Sohna, and Jajjar.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="rounded-2xl bg-primary p-10 text-center text-primary-foreground">
            <h3 className="font-display text-2xl font-bold md:text-3xl">
              Ready to explore your next plot?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-primary-foreground/80">
              Talk to Rohit Singh — typical reply within 2 hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/919311122787"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
              >
                <MessageCircle className="size-4" /> WhatsApp Now
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-2.5 text-sm font-semibold hover:bg-primary-foreground/10"
              >
                <Phone className="size-4" /> Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FAQ />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}