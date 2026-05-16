import createImageUrlBuilder, { SanityImageSource } from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
});

export const urlFor = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};
