import type { NextConfig } from "next";

/**
 * The booking calendar is embedded in an iframe on /contact. CSP resolves
 * frame-src via child-src down to default-src ('self'), so without this the
 * scheduler is silently blocked in production. Only the configured scheduler's
 * origin is allowed — not framing in general.
 */
function calendarFrameOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_CALENDAR_URL;
  if (!raw) return "";
  try {
    return new URL(raw).origin;
  } catch {
    console.warn("[next.config] NEXT_PUBLIC_CALENDAR_URL is not a valid URL; no frame-src allowance added");
    return "";
  }
}

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
  poweredByHeader: false,
  async headers() {
    const headers = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    if (process.env.NODE_ENV === "production") {
      const frameOrigin = calendarFrameOrigin();
      headers.push({
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self' https://plausible.io",
          `frame-src 'self'${frameOrigin ? ` ${frameOrigin}` : ""}`,
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
