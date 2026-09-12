type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function allowRequest(key: string, limit = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true as const, remaining: limit - 1 };
  }
  if (existing.count >= limit) {
    return { ok: false as const, remaining: 0 };
  }
  existing.count += 1;
  return { ok: true as const, remaining: limit - existing.count };
}

export function resetRateLimit() {
  buckets.clear();
}
