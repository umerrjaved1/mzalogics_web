import { ImageResponse } from "next/og";
import { brand, markDataUri } from "@/lib/brand";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: brand.navy,
          backgroundImage: `radial-gradient(circle at 78% 18%, ${brand.teal}22, transparent 55%)`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri({ size: 76, radius: 22 })} width={76} height={76} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>MZA</span>
            <span style={{ fontSize: 16, letterSpacing: 7, opacity: 0.6 }}>LOGICS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, maxWidth: 900 }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: 26, opacity: 0.65, maxWidth: 820 }}>
            AI-driven and hand-crafted software delivery — mobile, web, cloud, and design.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, opacity: 0.55 }}>
          <span>mzalogics.com</span>
          <span style={{ color: brand.teal }}>•</span>
          <span>Lahore, Pakistan</span>
        </div>
      </div>
    ),
    size,
  );
}
