import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BLOG_POSTS } from "./blogData";

export function BlogSection() {
  return (
    <section id="blog" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              From the Blog
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Insights & Buying Guides
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Practical advice, market trends and RERA checks — written by
              Rohit Singh.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-secondary"
          >
            View all articles <ArrowRight className="size-4" />
          </Link>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {BLOG_POSTS.map((p) => (
              <CarouselItem
                key={p.slug}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex items-center justify-center gap-3">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
