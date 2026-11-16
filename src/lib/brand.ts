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
  /** The mark's gradient, top to bottom. */
  markTop: "#2FE3C3",
  markBottom: "#1A9EF0",
} as const;

/**
 * The two ribbons of the "M", in a 100 × 84 box, drawn as 14-unit strokes.
 * Shared by the React mark and the raw SVG so they can never drift apart.
 */
export const MARK_PATHS = ["M9 72 L40 16 L50 31", "M38 55 L47 66 L81 16 L81 76"] as const;

/**
 * The mark as a square SVG. With a `tile` colour it sits on a rounded tile
 * (browser and app icons); with `tile: "transparent"` it fills the square.
 * `color` replaces the gradient with one solid colour.
 */
export function markSvg({
  size = 40,
  tile = brand.navy,
  radius = 28,
  color,
}: {
  size?: number;
  tile?: string;
  /** Corner radius in a 120-unit square. */
  radius?: number;
  color?: string;
} = {}) {
  const onTile = tile !== "transparent";
  const transform = onTile ? "translate(20 25) scale(0.8)" : "translate(6 14.5) scale(1.08)";
  const stroke = color ?? "url(#g)";
  const gradient = color
    ? ""
    : `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${brand.markTop}"/><stop offset="1" stop-color="${brand.markBottom}"/></linearGradient></defs>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 120 120">
  ${gradient}
  ${onTile ? `<rect width="120" height="120" rx="${radius}" fill="${tile}"/>` : ""}
  <g transform="${transform}" fill="none" stroke="${stroke}" stroke-width="14" stroke-linejoin="round">
    ${MARK_PATHS.map((d) => `<path d="${d}"/>`).join("\n    ")}
  </g>
</svg>`;
}

export function markDataUri(options?: Parameters<typeof markSvg>[0]) {
  return `data:image/svg+xml;base64,${Buffer.from(markSvg(options)).toString("base64")}`;
}
