import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { BLOG_POSTS, formatDate } from '@/components/site/blogData';
import { getSanityBlogBySlug, getAllSanityBlogSlugs } from '@/lib/sanity-blogs';

export async function generateStaticParams() {
  const hardcoded = BLOG_POSTS.map((post) => ({ slug: post.slug }));
  const sanitySlugs = await getAllSanityBlogSlugs();
  const sanityParams = sanitySlugs
    .filter((s) => !BLOG_POSTS.some((p) => p.slug === s))
    .map((s) => ({ slug: s }));
  return [...hardcoded, ...sanityParams];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sanityResult = await getSanityBlogBySlug(params.slug);
  const post = sanityResult?.post ?? BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | PlotsGurgaon Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://plotsgurgaon.in/blog/${post.slug}` },
    openGraph: {
      url: `https://plotsgurgaon.in/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const sanityResult = await getSanityBlogBySlug(params.slug);
  const post = sanityResult?.post ?? BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const hardcodedPost = BLOG_POSTS.find((p) => p.slug === params.slug);
  const portableContent = sanityResult?.portableContent;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="mx-auto max-w-3xl">
            <span className="mb-3 inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white">
              {post.category}
            </span>
            <h1 className="font-serif text-2xl font-bold text-white md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-white/80">
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime}</span>
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-12 prose prose-stone prose-lg">
        {portableContent && portableContent.length > 0 ? (
          <PortableText value={portableContent as Parameters<typeof PortableText>[0]['value']} />
        ) : hardcodedPost ? (
          hardcodedPost.content.map((paragraph, i) => (
            <p key={i} className="mb-6 text-lg leading-relaxed text-stone-700">
              {paragraph}
            </p>
          ))
        ) : null}
      </article>
    </div>
  );
}
