/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/plot/:slug',
        destination: '/plots/:slug',
        permanent: true,
      },
      {
        source: '/property/:slug',
        destination: '/plots/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
