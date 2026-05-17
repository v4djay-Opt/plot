import { MapPin, Ruler, IndianRupee, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

type Plot = {
  title: string;
  area: string;
  price: string;
  location: string;
  rera: string;
  status: "Available" | "Sold Out";
};

const plots: Plot[] = [
  { title: "200 Sq Yd Plot in Sector 102, Gurgaon", area: "200 sq yd", price: "â‚¹48 L", location: "Sector 102, Gurgaon", rera: "RERA: GGM/420/152/2023", status: "Available" },
  { title: "150 Sq Yd Plot in Sohna Road", area: "150 sq yd", price: "â‚¹28 L", location: "Sohna Road", rera: "RERA: GGM/418/150/2023", status: "Available" },
  { title: "300 Sq Yd Plot in Sector 95, Gurgaon", area: "300 sq yd", price: "â‚¹72 L", location: "Sector 95, Gurgaon", rera: "RERA: GGM/421/161/2023", status: "Available" },
  { title: "500 Sq Yd Plot in Jhajjar Highway", area: "500 sq yd", price: "â‚¹85 L", location: "Jhajjar", rera: "RERA: GGM/422/172/2023", status: "Sold Out" },
  { title: "120 Sq Yd Plot in Sohna Town", area: "120 sq yd", price: "â‚¹18 L", location: "Sohna", rera: "RERA: GGM/417/148/2023", status: "Available" },
  { title: "250 Sq Yd Plot in Sector 110, Gurgaon", area: "250 sq yd", price: "â‚¹62 L", location: "Sector 110, Gurgaon", rera: "RERA: GGM/423/180/2023", status: "Available" },
];

function PlotImage() {
  return (
    <div
      className="relative h-52 w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2d6a4f 0%, #40916C 50%, #74c69d 100%)",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <Home className="absolute bottom-4 right-4 size-10 text-white/40" />
    </div>
  );
}

export function FeaturedPlots() {
  return (
    <section id="plots" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Handpicked Listings
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Featured Residential Plots
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            RERA-approved plots from verified owners across Gurgaon, Sohna and Jhajjar.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plots.map((plot) => (
            <article
              key={plot.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative">
                <PlotImage />
                <span
                  className={
                    "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold " +
                    (plot.status === "Available"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted-foreground/80 text-white")
                  }
                >
                  {plot.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {plot.title}
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Ruler className="size-4 text-secondary" />
                    {plot.area}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                    <IndianRupee className="size-4" />
                    {plot.price}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-secondary" />
                    {plot.location}
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{plot.rera}</p>
                <Button
                  asChild
                  className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={plot.status === "Sold Out"}
                >
                  <a href="#contact">View Details</a>
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
          >
            View All Plots â†’
          </a>
        </div>
      </div>
    </section>
  );
}