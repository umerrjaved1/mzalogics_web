import { ImageResponse } from "next/og";
import { brand, markDataUri } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.navy,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={markDataUri({ size: 132, tile: "transparent", radius: 0 })}
          width={132}
          height={132}
          alt=""
        />
      </div>
    ),
    size,
  );
}
