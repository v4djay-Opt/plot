import { sanityClient } from '@/sanity/lib/client';
import type { BlogPost } from '@/components/site/blogData';

const CATEGORY_MAP: Record<string, string> = {
  'buying-guide': 'Buying Guide',
  'investment': 'Investment',
  'market-trends': 'Market Trends',
  'legal-rera': 'Legal & RERA',
  'location-guide': 'Location Guide',
};

interface SanityBlogDoc {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset?: { url?: string }; alt?: string };
  category?: string;
  author?: string;
  readTime?: string;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
}

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80';

function mapDoc(doc: SanityBlogDoc): BlogPost {
  return {
    slug: doc.slug.current,
    title: doc.title,
    excerpt: doc.excerpt ?? '',
    cover: doc.coverImage?.asset?.url ?? FALLBACK_COVER,
    category: CATEGORY_MAP[doc.category ?? ''] ?? doc.category ?? 'General',
    date: doc.publishedAt ? doc.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
    readTime: doc.readTime ?? '5 min read',
    author: doc.author ?? 'PlotsGurgaon Team',
    content: [],
  };
}

export async function getAllSanityBlogPosts(): Promise<BlogPost[]> {
  try {
    const docs = await sanityClient.fetch<SanityBlogDoc[]>(
      `*[_type == "blogPost"] | order(publishedAt desc) {
        _id, title, slug, excerpt,
        coverImage { asset->{ url }, alt },
        category, author, readTime, publishedAt, seoTitle, seoDescription
      }`
    );
    return docs.map(mapDoc);
  } catch {
    return [];
  }
}

export async function getSanityBlogBySlug(
  slug: string
): Promise<{ post: BlogPost; portableContent: unknown[] } | undefined> {
  try {
    const doc = await sanityClient.fetch<SanityBlogDoc & { rawContent?: unknown[] }>(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        _id, title, slug, excerpt,
        coverImage { asset->{ url }, alt },
        "rawContent": content,
        category, author, readTime, publishedAt, seoTitle, seoDescription
      }`,
      { slug }
    );
    if (!doc) return undefined;
    return { post: mapDoc(doc), portableContent: doc.rawContent ?? [] };
  } catch {
    return undefined;
  }
}

export async function getAllSanityBlogSlugs(): Promise<string[]> {
  try {
    const results = await sanityClient.fetch<Array<{ slug: string }>>(
      `*[_type == "blogPost"] { "slug": slug.current }`
    );
    return results.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}
