import type { NextConfig } from "next";

// Sent with every response. HSTS is added by Caddy, which terminates HTTPS
// (see deploy/Caddyfile).
const securityHeaders = [
  // Nobody may show the site (including the admin) inside a frame: stops clickjacking.
  { key: "X-Frame-Options", value: "DENY" },
  // No plugins (Flash/Java) and no <base> tag tricks; forms may only post here or open email.
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:; object-src 'none'",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Pages opened from this site cannot reach back into it through window.opener.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// The admin is never indexed by search engines (covers non-HTML responses too).
const adminHeaders = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin", headers: adminHeaders },
      { source: "/admin/:path*", headers: adminHeaders },
    ];
  },
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
  // Pin the project root to this folder so Next.js never picks up a
  // lockfile from a parent folder, and the standalone output keeps server.js
  // at its top level (the Dockerfile relies on that).
  outputFileTracingRoot: import.meta.dirname,
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
