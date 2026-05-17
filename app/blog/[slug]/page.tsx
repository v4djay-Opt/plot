import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import FAQ from '@/components/site/FAQ';
import { BLOG_POSTS, getPost } from '@/components/site/blogData';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: `${post.title} — PlotsGurgaon Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://plotsgurgaon.in/blog/${post.slug}`,
    },
    openGraph: {
      url: `https://plotsgurgaon.in/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.cover,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-10 text-white md:px-6 md:pb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              {post.category}
            </span>
            <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-secondary"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>
          <div className="prose prose-lg mt-8 max-w-none text-foreground">
            <p className="text-lg font-medium leading-relaxed text-foreground/90">
              {post.excerpt}
            </p>
            {post.content.map((para: string, i: number) => (
              <p
                key={i}
                className="mt-5 text-base leading-relaxed text-foreground/85"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>

      <section className="border-t border-border bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Keep reading
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-serif text-base font-semibold leading-snug text-foreground">
                    {p.title}
                  </h3>
                  <span className="mt-auto pt-4 text-xs text-muted-foreground">
                    {p.date} · {p.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
