'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import { BLOG_POSTS } from './blogData';

const ITEMS_PER_PAGE = 3;

export default function BlogSection() {
  const [page, setPage] = useState(0);
  const total = BLOG_POSTS.length;
  const maxPage = Math.ceil(total / ITEMS_PER_PAGE) - 1;

  const visible = BLOG_POSTS.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section id="blog" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              From the Blog
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Insights & Buying Guides
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Practical advice, market trends and RERA checks — written by
              Rohit Singh.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:border-primary hover:text-primary disabled:opacity-40"
              aria-label="Previous"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
              disabled={page === maxPage}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:border-primary hover:text-primary disabled:opacity-40"
              aria-label="Next"
            >
              <ArrowRight className="size-4" />
            </button>
            <Link
              href="/blog"
              className="ml-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-secondary"
            >
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
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
                <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-foreground">
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
      </div>
    </section>
  );
}
