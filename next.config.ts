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
    const headers = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    if (process.env.NODE_ENV === "production") {
      headers.push({
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self' https://plausible.io",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      });
    }

    return [{ source: "/(.*)", headers }];
  },
};

export default nextConfig;
