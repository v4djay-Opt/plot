import { MapPin, Ruler, MessageCircle, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { slugify } from "./plotsData";

export type PlotTag = "Corner Plot" | "Park Facing" | "Main Road Facing";

export type Plot = {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  area: number;
  areaLabel: string;
  location: string;
  rera: string;
  status: "Available" | "Sold Out";
  tag?: PlotTag;
};

export function PlotCard({ plot }: { plot: Plot }) {
  const sold = plot.status === "Sold Out";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div
        className="relative h-48 w-full overflow-hidden"
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
            backgroundSize: "26px 26px",
          }}
        />
        <Home className="absolute bottom-3 right-3 size-9 text-white/40" />
        <span
          className={
            "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold " +
            (sold
              ? "bg-muted-foreground/80 text-white"
              : "bg-secondary text-secondary-foreground")
          }
        >
          {plot.status}
        </span>
        {plot.tag && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {plot.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.25rem] font-display text-lg font-semibold leading-snug text-foreground">
          {plot.title}
        </h3>
        <p className="mt-2 font-display text-2xl font-bold text-primary">
          {plot.priceLabel}
        </p>
        <div className="mt-3 flex min-h-[2.75rem] flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0 text-secondary" />
            {plot.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="size-4 shrink-0 text-secondary" />
            {plot.areaLabel}
          </span>
        </div>
        <p className="mt-3 line-clamp-1 text-xs text-muted-foreground">{plot.rera}</p>
        <div className="mt-auto flex gap-2 pt-5">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to="/plots/$slug" params={{ slug: slugify(plot.title) }}>
              View Details
            </Link>
          </Button>
          <Button
            asChild
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <a
              href={`https://wa.me/919311122787?text=${encodeURIComponent(
                `Hi Rohit, I'm interested in: ${plot.title}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}