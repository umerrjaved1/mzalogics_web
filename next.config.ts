import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/solutions/enterprise-platforms", destination: "/solutions/web-platforms", permanent: true },
      { source: "/solutions/ai", destination: "/solutions/ai-development", permanent: true },
      { source: "/ai", destination: "/solutions/ai-development", permanent: true },
      { source: "/plans", destination: "/pricing", permanent: true },
      { source: "/about/team", destination: "/team", permanent: true },
    ];
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
