/**
 * Brand tokens and a standalone copy of the logo mark as raw SVG.
 *
 * The React version lives in `@/components/ui/Logo`. This copy exists because
 * `next/og` rasterizes images, not React SVG trees, so generated icons and OG
 * cards embed the mark as a data URI instead.
 */
export const brand = {
  navy: "#0E0926",
  navy2: "#1A1438",
  teal: "#5EEAD4",
  paper: "#F7F7F8",
} as const;

export function markSvg({
  size = 40,
  tile = brand.navy,
  stroke = "#FFFFFF",
  accent = brand.teal,
  radius = 12,
}: {
  size?: number;
  tile?: string;
  stroke?: string;
  accent?: string;
  radius?: number;
} = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 40 40">
  <rect x="0" y="0" width="40" height="40" rx="${radius}" fill="${tile}"/>
  <g fill="none" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 29V14.5l10 10" stroke="${stroke}"/>
    <path d="M20 24.5 30 14.5V29" stroke="${accent}"/>
  </g>
  <circle cx="20" cy="24.5" r="2.1" fill="${accent}"/>
</svg>`;
}

export function markDataUri(options?: Parameters<typeof markSvg>[0]) {
  return `data:image/svg+xml;base64,${Buffer.from(markSvg(options)).toString("base64")}`;
}
