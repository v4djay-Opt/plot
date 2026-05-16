import { defineLive } from "next-sanity/live";
import { sanityClient as client } from './client';

export const { sanityFetch, SanityLive } = defineLive({
  client,
});
