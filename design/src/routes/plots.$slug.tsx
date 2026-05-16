import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronRight,
  MapPin,
  Ruler,
  Tag,
  CheckCircle2,
  Phone,
  MessageCircle,
  Home,
  Zap,
  Droplets,
  Shield,
  Trees,
  GraduationCap,
  Route as RouteIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FAQ } from "@/components/site/FAQ";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PlotCard } from "@/components/site/PlotCard";
import { ALL_PLOTS, getPlotBySlug } from "@/components/site/plotsData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/plots/$slug")({
  loader: ({ params }) => {
    const plot = getPlotBySlug(params.slug);
    if (!plot) throw notFound();
    return { plot };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.plot.title} — PlotsGurgaon.in` },
          {
            name: "description",
            content: `${loaderData.plot.title} at ${loaderData.plot.priceLabel}. RERA registered. Direct from owner — book a free site visit with Rohit Singh.`,
          },
          { property: "og:title", content: `${loaderData.plot.title} — PlotsGurgaon.in` },
          {
            property: "og:description",
            content: `${loaderData.plot.priceLabel} · ${loaderData.plot.areaLabel} · ${loaderData.plot.location}. RERA registered, direct from owner.`,
          },
        ]
      : [],
  }),
  component: PlotDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="font-display text-4xl font-bold text-foreground">Plot not found</h1>
        <p className="mt-2 text-muted-foreground">This listing may have been sold or removed.</p>
        <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link to="/plots">Browse all plots</Link>
        </Button>
      </div>
    </div>
  ),
});

const AMENITIES = [
  { icon: RouteIcon, label: "Road Access" },
  { icon: Zap, label: "Electricity" },
  { icon: Droplets, label: "Water Supply" },
  { icon: Shield, label: "Boundary Wall" },
  { icon: Trees, label: "Park Nearby" },
  { icon: GraduationCap, label: "School Nearby" },
];

function GalleryImage({ index }: { index: number }) {
  const palettes = [
    "linear-gradient(135deg, #1B4332 0%, #2d6a4f 50%, #52b788 100%)",
    "linear-gradient(135deg, #2d6a4f 0%, #40916C 50%, #95d5b2 100%)",
    "linear-gradient(160deg, #40916C 0%, #74c69d 60%, #b7e4c7 100%)",
    "linear-gradient(135deg, #1B4332 0%, #40916C 100%)",
    "linear-gradient(150deg, #52b788 0%, #95d5b2 100%)",
  ];
  return (
    <div className="relative h-full w-full" style={{ background: palettes[index % palettes.length] }} aria-hidden>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <Home className="absolute bottom-5 right-5 size-12 text-white/40" />
    </div>
  );
}

function PlotDetailPage() {
  const { plot } = Route.useLoaderData();
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: `I'm interested in this plot: ${plot.title}`,
  });

  const pricePerYd = useMemo(
    () => `₹${Math.round(plot.price / plot.area).toLocaleString("en-IN")}/sq yd`,
    [plot.price, plot.area],
  );

  const similar = useMemo(
    () => ALL_PLOTS.filter((p) => p.id !== plot.id && p.location === plot.location).slice(0, 3),
    [plot.id, plot.location],
  );
  const similarFinal = similar.length === 3 ? similar : ALL_PLOTS.filter((p) => p.id !== plot.id).slice(0, 3);

  const breadcrumbCity = plot.location.split(",")[0]?.trim() || plot.location;
  const breadcrumbArea = plot.location.includes(",") ? plot.location.split(",")[0].trim() : plot.location;

  const waUrl = `https://wa.me/919311122787?text=${encodeURIComponent(`Hi Rohit, I'm interested in ${plot.title}`)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    toast.success("Site visit request sent!", {
      description: "Rohit will call you within 30 minutes.",
    });
    setForm({ ...form, name: "", phone: "" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-28 lg:pb-0">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-4 text-xs text-muted-foreground md:px-6 md:text-sm"
          >
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link to="/plots" className="hover:text-primary">Plots</Link>
            <ChevronRight className="size-3.5" />
            <span className="hover:text-primary">{breadcrumbCity}</span>
            {plot.location.includes("Sector") && (
              <>
                <ChevronRight className="size-3.5" />
                <span className="hover:text-primary">{breadcrumbArea}</span>
              </>
            )}
            <ChevronRight className="size-3.5" />
            <span className="truncate font-medium text-foreground">{plot.title}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* LEFT: Content */}
            <div className="lg:col-span-3">
              {/* Gallery */}
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <GalleryImage index={activeImage} />
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
                  {plot.tag && (
                    <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {plot.tag}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2 p-2">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      className={
                        "relative aspect-[4/3] overflow-hidden rounded-lg transition-all " +
                        (activeImage === i
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                          : "opacity-80 hover:opacity-100")
                      }
                    >
                      <GalleryImage index={i} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Price */}
              <div className="mt-8">
                <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  {plot.title}
                </h1>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-secondary" />
                  {plot.location}
                </div>
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="font-display text-4xl font-bold text-primary sm:text-5xl">
                    {plot.priceLabel}
                  </span>
                  <span className="text-sm text-muted-foreground">{pricePerYd}</span>
                </div>
              </div>

              {/* Key Details Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Ruler, label: "Plot Area", value: plot.areaLabel },
                  { icon: Tag, label: "Plot Type", value: plot.tag ?? "Residential" },
                  { icon: MapPin, label: "Location", value: breadcrumbArea },
                  { icon: CheckCircle2, label: "Status", value: plot.status },
                ].map((d) => (
                  <div key={d.label} className="rounded-xl border border-border bg-card p-4">
                    <d.icon className="size-5 text-secondary" />
                    <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                      {d.label}
                    </p>
                    <p className="mt-0.5 font-semibold text-foreground">{d.value}</p>
                  </div>
                ))}
              </div>

              {/* RERA */}
              <div className="mt-6 rounded-xl border border-border bg-muted/60 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  RERA Registration
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-foreground">{plot.rera}</p>
              </div>

              {/* Description */}
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-foreground">Description</h2>
                <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    A premium {plot.areaLabel.toLowerCase()} residential plot in {plot.location},
                    one of Gurgaon's fastest-developing micro-markets. Located in a fully developed
                    licensed colony with wide internal roads, sewerage and underground electricity.
                  </p>
                  <p>
                    Ideal for end-users planning to build a custom home or investors looking for
                    capital appreciation. Direct from owner — no broker fees, complete RERA-approved
                    paperwork and clean title.
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-foreground">Amenities</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {AMENITIES.map((a) => (
                    <div
                      key={a.label}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
                    >
                      <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                        <a.icon className="size-5" />
                      </span>
                      <span className="text-sm font-medium text-foreground">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-foreground">Location</h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <div className="relative aspect-[16/9] w-full bg-muted">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(27,67,50,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(27,67,50,.08) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-xl bg-card/90 px-5 py-4 text-center shadow-md backdrop-blur">
                        <MapPin className="mx-auto size-8 text-primary" />
                        <p className="mt-2 font-display text-lg font-semibold text-foreground">
                          {plot.location}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Map embed coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Sticky Lead Form */}
            <aside className="lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-primary/10">
                  <div className="bg-primary px-6 py-5">
                    <h2 className="font-display text-xl font-bold text-primary-foreground">
                      Interested in This Plot?
                    </h2>
                    <p className="mt-1 text-sm text-primary-foreground/80">
                      Speak with the property consultant directly.
                    </p>
                  </div>

                  <div className="p-6">
                    {/* Agent */}
                    <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                      <div className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold">
                        RS
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Rohit Singh</p>
                        <p className="text-xs text-muted-foreground">Property Consultant</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="lead-name">Name *</Label>
                        <Input
                          id="lead-name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lead-phone">Phone *</Label>
                        <Input
                          id="lead-phone"
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="10-digit mobile"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lead-msg">Message</Label>
                        <Textarea
                          id="lead-msg"
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        Book Free Site Visit
                      </Button>
                    </form>

                    <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                      <span className="h-px flex-1 bg-border" />
                      OR
                      <span className="h-px flex-1 bg-border" />
                    </div>

                    <div className="space-y-2.5">
                      <Button
                        asChild
                        className="h-12 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      >
                        <a href={waUrl} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="size-5" />
                          Chat on WhatsApp
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="h-12 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <a href="tel:+919311122787">
                          <Phone className="size-5" />
                          Call Now: 9311122787
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Similar Plots */}
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Similar Plots
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Other listings you might like
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {similarFinal.map((p) => (
                <PlotCard key={p.id} plot={p} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to="/plots">View All Plots</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <FAQ />

      {/* Mobile floating CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card p-3 shadow-2xl shadow-black/20 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <Button
            onClick={() =>
              document.getElementById("lead-name")?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className="h-12 flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Enquire Now
          </Button>
          <Button
            asChild
            className="h-12 flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>

      <Footer />
      <div className="hidden lg:block">
        <WhatsAppFab />
      </div>
      <Toaster />
    </div>
  );
}
