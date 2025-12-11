import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "cdn.pixabay.com", "example.com"], // allow Cloudinary images
  },
};

export default nextConfig;
