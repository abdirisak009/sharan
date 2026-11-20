import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Only the site's own photos and admin uploads can be optimised.
    localPatterns: [
      { pathname: "/_next/static/media/**", search: "" },
      { pathname: "/media/**", search: "" },
    ],
  },
  experimental: {
    // Room for photo uploads from the admin (photos are limited to 8 MB).
    serverActions: { bodySizeLimit: "9mb" },
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
