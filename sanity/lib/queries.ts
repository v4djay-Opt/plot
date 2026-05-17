import { groq } from 'next-sanity';

// Property queries
export const getAllProperties = groq`
  *[_type == "property"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    status,
    plotType,
    price,
    pricePerSqYd,
    area,
    location->{
      _id,
      name,
      slug,
      parentCity->{
        _id,
        name,
        slug
      }
    },
    images[]{
      asset->{
        _ref,
        url
      },
      alt
    },
    "descriptionText": pt::text(description),
    amenities,
    reraNumber,
    isFeatured,
    seoTitle,
    seoDescription,
    seoImage
  }
`;

export const getFeaturedProperties = groq`
  *[_type == "property" && isFeatured == true && status == "available"] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    status,
    plotType,
    price,
    pricePerSqYd,
    area,
    location->{
      _id,
      name,
      slug,
      parentCity->{
        _id,
        name,
        slug
      }
    },
    images[]{
      asset->{
        _ref,
        url
      },
      alt
    },
    "descriptionText": pt::text(description),
    amenities,
    reraNumber,
    isFeatured
  }
`;

export const getPropertyBySlug = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    plotType,
    price,
    pricePerSqYd,
    area,
    location->{
      _id,
      name,
      slug,
      parentCity->{
        _id,
        name,
        slug
      }
    },
    images[]{
      asset->{
        _ref,
        url
      },
      alt
    },
    description,
    "descriptionText": pt::text(description),
    amenities,
    reraNumber,
    isFeatured,
    seoTitle,
    seoDescription,
    seoImage
  }
`;

export const getPropertiesByCity = groq`
  *[_type == "property" && location->parentCity->slug.current == $citySlug] | order(_createdAt desc) {
    _id,
    title,
    slug,
    status,
    plotType,
    price,
    pricePerSqYd,
    area,
    location->{
      _id,
      name,
      slug,
      parentCity->{
        _id,
        name,
        slug
      }
    },
    images[]{
      asset->{
        _ref,
        url
      },
      alt
    },
    "descriptionText": pt::text(description),
    amenities,
    reraNumber,
    isFeatured
  }
`;

export const getPropertiesByMicroLocation = groq`
  *[_type == "property" && location->slug.current == $microLocationSlug && location->parentCity->slug.current == $citySlug] | order(_createdAt desc) {
    _id,
    title,
    slug,
    status,
    plotType,
    price,
    pricePerSqYd,
    area,
    location->{
      _id,
      name,
      slug,
      parentCity->{
        _id,
        name,
        slug
      }
    },
    images[]{
      asset->{
        _ref,
        url
      },
      alt
    },
    "descriptionText": pt::text(description),
    amenities,
    reraNumber,
    isFeatured
  }
`;

// City queries
export const getAllCities = groq`
  *[_type == "city" && isActive == true] | order(name asc) {
    _id,
    name,
    slug,
    description,
    heroImage,
    seoTitle,
    seoDescription,
    isActive,
    "propertyCount": count(*[_type == "property" && location->parentCity->_id == ^._id])
  }
`;

export const getCityBySlug = groq`
  *[_type == "city" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    heroImage,
    seoTitle,
    seoDescription,
    isActive
  }
`;

// Micro-location queries
export const getMicroLocationsByCity = groq`
  *[_type == "microLocation" && parentCity->slug.current == $citySlug] | order(name asc) {
    _id,
    name,
    slug,
    description,
    seoTitle,
    seoDescription,
    parentCity->{
      _id,
      name,
      slug
    }
  }
`;

export const getMicroLocationBySlug = groq`
  *[_type == "microLocation" && slug.current == $slug && parentCity->slug.current == $citySlug][0] {
    _id,
    name,
    slug,
    description,
    seoTitle,
    seoDescription,
    parentCity->{
      _id,
      name,
      slug
    }
  }
`;

// Redirect queries
export const getAllRedirects = groq`
  *[_type == "redirect" && isActive == true] {
    _id,
    from,
    to,
    statusCode,
    isActive
  }
`;

// Site settings
export const getSiteSettings = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    phone,
    whatsapp,
    email,
    agentName,
    agentTitle,
    agentPhoto,
    address,
    googleAnalyticsId
  }
`;

// Slugs for static params
export const getAllPropertySlugs = groq`
  *[_type == "property"] {
    "slug": slug.current,
    status
  }
`;

export const getAllCitySlugs = groq`
  *[_type == "city" && isActive == true] {
    "slug": slug.current
  }
`;

export const getAllMicroLocationSlugs = groq`
  *[_type == "microLocation"] {
    "slug": slug.current,
    "citySlug": parentCity->slug.current
  }
`;

// Blog post queries
export const getAllBlogPosts = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage {
      asset->{_ref, url},
      alt
    },
    category,
    author,
    readTime,
    isFeatured,
    publishedAt,
    "contentText": pt::text(content),
    seoTitle,
    seoDescription
  }
`;

export const getFeaturedBlogPosts = groq`
  *[_type == "blogPost" && isFeatured == true] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    excerpt,
    coverImage {
      asset->{_ref, url},
      alt
    },
    category,
    author,
    readTime,
    publishedAt
  }
`;

export const getBlogPostBySlug = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage {
      asset->{_ref, url},
      alt
    },
    content,
    "contentText": pt::text(content),
    category,
    author,
    readTime,
    isFeatured,
    publishedAt,
    seoTitle,
    seoDescription
  }
`;

export const getAllBlogSlugs = groq`
  *[_type == "blogPost"] {
    "slug": slug.current
  }
`;
