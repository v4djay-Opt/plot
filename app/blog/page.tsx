import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import FAQ from '@/components/site/FAQ';
import { BLOG_POSTS } from '@/components/site/blogData';
import SchemaMarkup from '@/components/seo/SchemaMarkup';

export const metadata = {
  title: 'Blog — Plot Buying Tips, Market Insights & RERA Guides',
  description: 'Practical guides on buying residential plots in Gurgaon, Sohna and Jajjar — RERA checks, finance, and market trends.',
  alternates: {
    canonical: 'https://plotsgurgaon.in/blog',
  },
  openGraph: {
    url: 'https://plotsgurgaon.in/blog',
    title: 'Blog — Plot Buying Tips, Market Insights & RERA Guides | plotsgurgaon.in',
    description: 'Practical guides on buying residential plots in Gurgaon, Sohna and Jajjar — RERA checks, finance, and market trends.',
    images: [
      {
        url: '/images/hero-plot.jpg',
        width: 1200,
        height: 630,
        alt: 'Plot buying tips and market insights blog',
      },
    ],
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'PlotsGurgaon Blog',
  url: 'https://plotsgurgaon.in/blog',
  description: 'Practical guides on buying residential plots in Gurgaon, Sohna and Jajjar.',
  blogPost: BLOG_POSTS.map((post, i) => ({
    '@type': 'BlogPosting',
    position: i + 1,
    headline: post.title,
    description: post.excerpt,
    url: `https://plotsgurgaon.in/blog/${post.slug}`,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    image: post.cover,
  })),
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <SchemaMarkup schema={blogSchema} />
      <section className="relative overflow-hidden border-b border-border">
        <img
          src="/images/hero-bg.jpg"
          alt="Residential plots blog - buying tips and market insights"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-white md:px-6 md:py-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Insights & Guides
          </span>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">
            The PlotsGurgaon Blog
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Honest, practical advice for plot buyers — from RERA checks to
            market trends across Gurgaon, Sohna and Jajjar.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
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
            <h2 className="mt-3 font-serif text-2xl font-bold text-foreground md:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{featured.date}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" /> {featured.readTime}
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:text-secondary">
              Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
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
      </section>

      <FAQ />
    </>
  );
}
