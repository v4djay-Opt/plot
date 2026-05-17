import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FAQ } from "@/components/site/FAQ";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { PlotCard } from "@/components/site/PlotCard";
import { ALL_PLOTS, SIZE_BUCKETS } from "@/components/site/plotsData";
import {
  PlotsFilters,
  DEFAULT_FILTERS,
  type Filters,
} from "@/components/site/PlotsFilters";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/plots/")({
  head: () => ({
    meta: [
      { title: "All Residential Plots in Gurgaon, Sohna & Jhajjar â€” PlotsGurgaon.in" },
      {
        name: "description",
        content:
          "Browse RERA registered residential plots across Gurgaon, Sohna, Jhajjar, Sector 102, Sector 65 and Dwarka Expressway. Filter by location, size and budget.",
      },
      { property: "og:title", content: "All Residential Plots â€” PlotsGurgaon.in" },
      {
        property: "og:description",
        content: "Filter residential plots by location, size, budget and type. Direct from owner.",
      },
    ],
  }),
  component: PlotsPage,
});

type SortKey = "latest" | "price-asc" | "price-desc" | "area";

function PlotsPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>("latest");
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = ALL_PLOTS.filter((p) => {
      if (filters.locations.length && !filters.locations.includes(p.location)) return false;
      if (filters.statuses.length && !filters.statuses.includes(p.status)) return false;
      if (filters.tags.length && (!p.tag || !filters.tags.includes(p.tag))) return false;
      if (p.price < filters.budget[0] || (filters.budget[1] < 12000000 && p.price > filters.budget[1])) return false;
      if (filters.sizes.length) {
        const ok = filters.sizes.some((id) => {
          const b = SIZE_BUCKETS.find((s) => s.id === id);
          return b && p.area >= b.min && p.area <= b.max;
        });
        if (!ok) return false;
      }
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "area") sorted.sort((a, b) => b.area - a.area);
    return sorted;
  }, [filters, sort]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section
          className="relative overflow-hidden border-b border-border"
        >
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 opacity-15"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <h1 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
              All Residential Plots
            </h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/85">
              RERA registered plots across Gurgaon, Sohna and Jhajjar. Direct from
              owner â€” no broker fees.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <div className="flex gap-8">
            <aside className="hidden w-[300px] shrink-0 lg:block">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <PlotsFilters filters={filters} setFilters={setFilters} />
              </div>
            </aside>

            <div className="min-w-0 flex-1">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="size-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto sm:max-w-sm">
                      <SheetHeader>
                        <SheetTitle className="font-display text-xl">Filter Plots</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <PlotsFilters
                          filters={filters}
                          setFilters={setFilters}
                          onApply={() => setSheetOpen(false)}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{filtered.length}</span> plot{filtered.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm text-muted-foreground sm:inline">Sort by:</span>
                  <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                    <SelectTrigger className="h-10 w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="area">Area (Largest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                  <p className="font-display text-xl font-semibold text-foreground">
                    No plots match these filters
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try resetting filters or widening your budget.
                  </p>
                  <Button
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p) => (
                    <PlotCard key={p.id} plot={p} />
                  ))}
                </div>
              )}
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