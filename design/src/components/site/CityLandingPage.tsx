import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  MapPinned,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { FAQ } from "@/components/site/FAQ";
import { LeadCapture } from "@/components/site/LeadCapture";
import { Navbar } from "@/components/site/Navbar";
import { PlotCard } from "@/components/site/PlotCard";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { ALL_PLOTS } from "@/components/site/plotsData";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

type IconKey = "shield" | "trend" | "pin";
type NearbyPath = "/plots" | "/plots-in-gurgaon" | "/plots-in-sohna" | "/plots-in-jajjar";

export type CitySlug = "gurgaon" | "sohna" | "jajjar";

type CityConfig = {
  path: Exclude<NearbyPath, "/plots">;
  name: string;
  matches: (loc: string) => boolean;
  sectors: string[];
  intro: string;
  body: string;
  bullets: { title: string; desc: string; icon: IconKey }[];
  nearby: { label: string; to: NearbyPath; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const CITY_CONFIGS: Record<CitySlug, CityConfig> = {
  gurgaon: {
    path: "/plots-in-gurgaon",
    name: "Gurgaon",
    matches: (loc) => /gurgaon|sector|dwarka expressway/i.test(loc),
    sectors: ["Sector 102", "Sector 65", "Sector 84", "Dwarka Expressway", "Sohna Road"],
    intro:
      "Explore 10+ verified residential plots in Gurgaon. RERA registered. Free site visit available.",
    body:
      "Gurgaon has emerged as North India's most dynamic real estate market. With world-class infrastructure, the upcoming Dwarka Expressway, proximity to IGI Airport, and a thriving corporate ecosystem along Cyber City and Golf Course Road, residential plots here offer both lifestyle and long-term capital appreciation. Whether you're planning a custom home or a future-ready investment, Gurgaon's emerging sectors deliver clear titles, planned development, and strong rental demand.",
    bullets: [
      {
        title: "RERA Registered",
        desc: "Every listed plot has a verified HRERA number and clean title.",
        icon: "shield",
      },
      {
        title: "High Appreciation",
        desc: "Sectors along Dwarka Expressway have grown 18–22% YoY.",
        icon: "trend",
      },
      {
        title: "Prime Connectivity",
        desc: "Minutes from NH-48, Metro, IGI Airport and Cyber Hub.",
        icon: "pin",
      },
    ],
    nearby: [
      { label: "Plots in Sohna", to: "/plots-in-sohna", detail: "Affordable growth corridor" },
      { label: "Plots in Jajjar", to: "/plots-in-jajjar", detail: "Large-format residential plots" },
      { label: "Plots in Sector 102", to: "/plots", detail: "Browse all current listings" },
    ],
    faqs: [
      { q: "Which sectors in Gurgaon are best for plot investment?", a: "Sector 102, Sector 65, Sector 84 and the Dwarka Expressway belt currently offer the strongest mix of infrastructure, RERA-approved projects and 18–22% YoY appreciation." },
      { q: "Are these plots RERA registered?", a: "Yes. Every Gurgaon plot we list carries a verified HRERA registration number with clean title and approved layout." },
      { q: "What is the price range for plots in Gurgaon?", a: "Plots typically range from ₹40 lakh in emerging sectors to ₹3+ crore in premium micro-markets along Golf Course Extension and Dwarka Expressway." },
      { q: "Can I get a home construction loan after buying the plot?", a: "Yes. We assist with composite plot + construction loans from HDFC, SBI, ICICI and Axis Bank — usually up to 75% of plot value." },
      { q: "How far are these plots from IGI Airport and Cyber City?", a: "Most listed Gurgaon plots are within 25–40 minutes of IGI Airport and 15–25 minutes from Cyber City via NH-48 and the Dwarka Expressway." },
    ],
  },
  sohna: {
    path: "/plots-in-sohna",
    name: "Sohna",
    matches: (loc) => /sohna/i.test(loc),
    sectors: ["Sohna Road", "Sohna Town", "Sector 2 Sohna", "Sector 5 Sohna"],
    intro:
      "Affordable residential plots in Sohna with rapid appreciation potential. RERA approved.",
    body:
      "Sohna, the southern extension of Gurgaon, is one of NCR's fastest-growing investment destinations. With the Sohna Elevated Corridor cutting commute times in half and major developers active in the region, residential plots offer entry-level pricing with Gurgaon-grade infrastructure on the horizon.",
    bullets: [
      {
        title: "Entry-Level Pricing",
        desc: "Plots starting from ₹9.5 Lakh — ideal for first-time investors.",
        icon: "trend",
      },
      {
        title: "RERA Backed",
        desc: "All projects carry valid HRERA registration.",
        icon: "shield",
      },
      {
        title: "Elevated Corridor",
        desc: "30-minute drive to Cyber City via the new flyover.",
        icon: "pin",
      },
    ],
    nearby: [
      { label: "Plots in Gurgaon", to: "/plots-in-gurgaon", detail: "Premium urban micro-markets" },
      { label: "Plots in Jajjar", to: "/plots-in-jajjar", detail: "Lower entry prices, larger parcels" },
      { label: "All Plots", to: "/plots", detail: "Compare every active listing" },
    ],
    faqs: [
      { q: "Why is Sohna a good investment destination?", a: "The Sohna Elevated Corridor has cut commute to Cyber City to under 30 minutes. With Gurgaon-grade infrastructure rolling in and entry prices still low, Sohna offers strong appreciation potential." },
      { q: "What is the starting price of plots in Sohna?", a: "Plots in Sohna start from around ₹9.5 lakh in emerging sectors, going up to ₹50 lakh in premium pockets along Sohna Road." },
      { q: "Are Sohna plots RERA approved?", a: "Yes. All plots we list in Sohna carry valid HRERA registration along with approved layouts and clear titles." },
      { q: "How long does it take to commute from Sohna to Gurgaon?", a: "With the new elevated corridor, the drive from Sohna to Cyber City and Golf Course Road takes roughly 30–35 minutes." },
      { q: "Can I build a house immediately on the plot?", a: "Yes. All listed plots have approved layouts and ready possession, so you can begin construction right after registry." },
    ],
  },
  jajjar: {
    path: "/plots-in-jajjar",
    name: "Jajjar",
    matches: (loc) => /jajjar/i.test(loc),
    sectors: ["Jajjar Highway", "Jajjar Town", "Bahadurgarh Road"],
    intro:
      "Large residential plots in Jajjar at unbeatable per-sq-yd rates. RERA verified.",
    body:
      "Jajjar offers the largest plot sizes in the NCR belt at the most competitive rates. With the KMP Expressway, AIIMS Jajjar, and upcoming industrial corridors driving growth, the district is rapidly transforming into a high-potential residential and investment market.",
    bullets: [
      {
        title: "Large Plot Sizes",
        desc: "500–600 sq yd plots widely available.",
        icon: "pin",
      },
      {
        title: "Best Per-Yard Price",
        desc: "Lowest entry rates in the Gurgaon-influence zone.",
        icon: "trend",
      },
      {
        title: "Verified Titles",
        desc: "RERA registered with clean documentation.",
        icon: "shield",
      },
    ],
    nearby: [
      { label: "Plots in Gurgaon", to: "/plots-in-gurgaon", detail: "High-demand premium sectors" },
      { label: "Plots in Sohna", to: "/plots-in-sohna", detail: "Fast-growing southern belt" },
      { label: "All Plots", to: "/plots", detail: "Browse every available listing" },
    ],
    faqs: [
      { q: "Why invest in Jajjar plots?", a: "Jajjar offers the largest plot sizes in the NCR belt at the lowest per-yard rates, with the KMP Expressway, AIIMS Jajjar and upcoming industrial corridors driving long-term growth." },
      { q: "What plot sizes are available in Jajjar?", a: "Jajjar plots range from 200 sq yd to large 500–600 sq yd parcels, ideal for villas, farmhouses or future resale." },
      { q: "Are Jajjar plots RERA approved?", a: "Yes. We only list Jajjar plots that carry verified HRERA registration and clean ownership documents." },
      { q: "How is connectivity from Jajjar to Gurgaon and Delhi?", a: "Jajjar is well connected via the KMP Expressway and Bahadurgarh Road, with travel time to Gurgaon around 60–75 minutes." },
      { q: "Is Jajjar a good location for long-term investment?", a: "Yes. With AIIMS Jajjar operational and major industrial belts coming up nearby, the district is on a strong long-term growth trajectory." },
    ],
  },
};

const ICONS = {
  shield: ShieldCheck,
  trend: TrendingUp,
  pin: MapPinned,
};

export function getCityHead(citySlug: CitySlug) {
  const city = CITY_CONFIGS[citySlug];
  const title = `Residential Plots in ${city.name} — RERA Verified | PlotsGurgaon.in`;
  const description = `${city.intro} Direct from owner with verified documents and free site visit support.`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: city.path },
    ],
    links: [{ rel: "canonical", href: city.path }],
  };
}

export function CityLandingPage({ citySlug }: { citySlug: CitySlug }) {
  const city = CITY_CONFIGS[citySlug];
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const cityPlots = useMemo(
    () => ALL_PLOTS.filter((plot) => city.matches(plot.location)),
    [city],
  );

  const visiblePlots = useMemo(() => {
    if (!activeSector) return cityPlots;

    return cityPlots.filter((plot) =>
      plot.location.toLowerCase().includes(activeSector.toLowerCase()),
    );
  }, [activeSector, cityPlots]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section
          className="relative flex items-center"
          style={{
            minHeight: "50vh",
          }}
        >
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-4 py-16 text-primary-foreground md:px-6 md:py-20">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Verified Listings
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Residential Plots in {city.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
              {city.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-12 rounded-md bg-accent px-6 text-base font-semibold text-accent-foreground hover:bg-accent/90"
              >
                <a href="#plots">View Plots</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-md border-white/40 bg-white/10 px-6 text-base font-semibold text-primary-foreground backdrop-blur hover:bg-white/20 hover:text-primary-foreground"
              >
                <a href="#contact">Book Site Visit</a>
              </Button>
            </div>
            <nav aria-label="Breadcrumb" className="mt-10 text-sm text-primary-foreground/75">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link to="/" className="hover:text-accent">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="size-3.5" />
                </li>
                <li>
                  <Link to="/plots" className="hover:text-accent">
                    Plots
                  </Link>
                </li>
                <li>
                  <ChevronRight className="size-3.5" />
                </li>
                <li className="font-medium text-accent">Plots in {city.name}</li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Browse by Sector
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Click a sector to filter plots in that micro-location.
            </p>
            <div className="-mx-4 mt-6 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
              <div className="flex w-max gap-2.5">
                <button
                  onClick={() => setActiveSector(null)}
                  className={
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                    (activeSector === null
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary hover:text-primary")
                  }
                >
                  All Sectors
                </button>
                {city.sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setActiveSector(sector)}
                    className={
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                      (activeSector === sector
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary hover:text-primary")
                    }
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="plots" className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              {visiblePlots.length} Plot{visiblePlots.length === 1 ? "" : "s"}{" "}
              {activeSector ? `in ${activeSector}` : `in ${city.name}`}
            </h2>
            <Link
              to="/plots"
              className="hidden text-sm font-medium text-primary hover:text-primary/80 sm:inline-flex sm:items-center sm:gap-1"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>

          {visiblePlots.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <p className="font-display text-xl font-semibold text-foreground">
                No plots in this sector yet
              </p>
              <Button
                onClick={() => setActiveSector(null)}
                className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Show all {city.name} plots
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visiblePlots.map((plot) => (
                <PlotCard key={plot.id} plot={plot} />
              ))}
            </div>
          )}
        </section>

        <section className="bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Location Insight
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                Why Invest in {city.name} Plots?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/80">
                {city.body}
              </p>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {city.bullets.map((bullet) => {
                const Icon = ICONS[bullet.icon];

                return (
                  <li
                    key={bullet.title}
                    className="flex gap-4 rounded-2xl border border-border bg-background p-6"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {bullet.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{bullet.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Nearby Locations
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse plots in neighboring high-growth areas.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {city.nearby.map((location) => (
              <Link
                key={location.label}
                to={location.to}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {location.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{location.detail}</p>
                </div>
                <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>

        <LeadCapture />
      </main>
      <FAQ
        items={city.faqs}
        title={`FAQs about Plots in ${city.name}`}
        subtitle={`Common questions buyers ask before investing in ${city.name}.`}
      />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}