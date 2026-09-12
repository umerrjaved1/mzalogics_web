type ClassValue = string | false | null | undefined;

const BP = "(sm:|md:|lg:|xl:|2xl:)?";
const PAD = new RegExp(`^${BP}(p|px|py|pt|pb|pl|pr)-`);

const drops: Record<string, string[]> = {
  p: ["p", "px", "py", "pt", "pb", "pl", "pr"],
  px: ["p", "px", "pl", "pr"],
  py: ["p", "py", "pt", "pb"],
  pt: ["p", "py", "pt"],
  pb: ["p", "py", "pb"],
  pl: ["p", "px", "pl"],
  pr: ["p", "px", "pr"],
};

function padAxis(token: string) {
  const match = token.match(PAD);
  if (!match) return null;
  return { bp: match[1] ?? "", axis: match[2] };
}

/** Joins classes and lets later padding utilities override earlier ones (py vs pt/pb). */
export function cn(...classes: ClassValue[]) {
  const tokens = classes.filter(Boolean).join(" ").split(/\s+/).filter(Boolean);
  const kept: string[] = [];

  for (const token of tokens) {
    const next = padAxis(token);
    if (!next) {
      kept.push(token);
      continue;
    }
    const remove = new Set(drops[next.axis] ?? [next.axis]);
    for (let i = kept.length - 1; i >= 0; i--) {
      const prev = padAxis(kept[i]);
      if (prev && prev.bp === next.bp && remove.has(prev.axis)) {
        kept.splice(i, 1);
      }
    }
    kept.push(token);
  }

  return kept.join(" ");
}
