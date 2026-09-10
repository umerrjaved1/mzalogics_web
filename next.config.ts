import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/solutions/enterprise-platforms", destination: "/solutions/web-platforms", permanent: true },
      { source: "/solutions/ai", destination: "/solutions/ai-development", permanent: true },
      { source: "/ai", destination: "/solutions/ai-development", permanent: true },
      { source: "/plans", destination: "/pricing", permanent: true },
      { source: "/about/team", destination: "/team", permanent: true },
    ];
  },
};

export default nextConfig;
