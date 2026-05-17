import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FAQ } from "@/components/site/FAQ";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { BLOG_POSTS } from "@/components/site/blogData";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog â€” Plot Buying Tips, Market Insights & RERA Guides" },
      {
        name: "description",
        content:
          "Practical guides on buying residential plots in Gurgaon, Sohna and Jhajjar â€” RERA checks, finance, and market trends.",
      },
      { property: "og:title", content: "Blog â€” PlotsGurgaon" },
      {
        property: "og:description",
        content:
          "Plot buying guides, RERA checklists and market insights from Rohit Singh.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 py-16 text-white md:px-6 md:py-20">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Insights & Guides
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              The PlotsGurgaon Blog
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
              Honest, practical advice for plot buyers â€” from RERA checks to
              market trends across Gurgaon, Sohna and Jhajjar.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          {/* Featured post */}
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-xl md:grid-cols-2"
          >
            <div className="relative h-64 overflow-hidden md:h-full">
              <img
                src={featured.cover}
                alt={featured.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                {featured.category}
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground md:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{featured.date}</span>
                <span>Â·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" /> {featured.readTime}
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-secondary">
                Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
                    <span>{p.date}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" /> {p.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <FAQ />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
