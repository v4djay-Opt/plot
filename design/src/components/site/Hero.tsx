import { Link } from "@tanstack/react-router";
import { ShieldCheck, MapPinned, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
    >
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest backdrop-blur">
          Premium Residential Plots
        </span>
        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your Perfect Plot in Gurgaon
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
          Residential plots in Gurgaon, Sohna &amp; Jajjar. Direct from owner. RERA registered.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-lg shadow-black/20 hover:bg-accent/90"
          >
            <Link to="/plots">View All Plots</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-white/70 bg-transparent px-8 text-base font-semibold text-white hover:bg-white hover:text-primary"
          >
            <a href="#contact">Book Free Site Visit</a>
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/90">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-accent" />
            <span>RERA Registered</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinned className="size-5 text-accent" />
            <span>15+ Plots Available</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="size-5 text-accent" />
            <span>Free Site Visit</span>
          </div>
        </div>
      </div>
    </section>
  );
}