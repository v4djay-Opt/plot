import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/components/site/blogData';
import { allPlots, slugify } from '@/lib/plots';
import { sanityClient } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://plotsgurgaon.in';

  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/plots`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/plots-in-gurgaon`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/plots-in-jhajjar`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/plots-in-sohna`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/plots-in-ayodhya`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/plots-in-mathura`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/plots-in-lucknow`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/plots-in-gorakhpur`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/locations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const plotRoutes: MetadataRoute.Sitemap = allPlots.map((plot) => ({
    url: `${baseUrl}/plots/${slugify(plot.title)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  let sanityPlotRoutes: MetadataRoute.Sitemap = [];
  try {
    const sanitySlugs = await sanityClient.fetch<Array<{ slug: string }>>(
      `*[_type == "property"]{ "slug": slug.current }`
    );
    sanityPlotRoutes = sanitySlugs.map((s) => ({
      url: `${baseUrl}/plots/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // ignore Sanity fetch errors during build
  }

  return [...routes, ...blogRoutes, ...plotRoutes, ...sanityPlotRoutes];
}
