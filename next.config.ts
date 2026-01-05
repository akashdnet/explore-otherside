import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "example.com" },
      { hostname: "images.unsplash.com" },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
