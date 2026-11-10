import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingSocial } from "@/components/layout/FloatingSocial";
import { LeadDock } from "@/components/conversion/LeadDock";
import { MotionProvider } from "@/components/MotionProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Analytics } from "@/components/Analytics";
import { site } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Apps, Web Platforms & AI — Built in Weeks`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "MZA Logics Engineering Team", url: site.url }],
  creator: "MZA Logics",
  publisher: "MZA Logics",
  category: "technology",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  keywords: [
    "custom software development",
    "mobile app development Lahore",
    "AI software engineering",
    "Next.js development studio",
  ],
  openGraph: {
    title: `${site.name} | Apps, Web Platforms & AI — Built in Weeks`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — mobile apps, web platforms, and AI features`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Apps, Web Platforms & AI — Built in Weeks`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#09061a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="site-grid min-h-full flex flex-col font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1 pt-[88px]" data-nav-surface="light">
            {children}
          </main>
          <Footer />
          <FloatingSocial />
          <LeadDock />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
