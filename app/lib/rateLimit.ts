type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  headers: HeadersInit;
};

declare global {
  var __gssRateLimitStore: Map<string, Bucket> | undefined;
}

const store = globalThis.__gssRateLimitStore ?? new Map<string, Bucket>();
globalThis.__gssRateLimitStore = store;

export function getClientIp(request: Request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const [first] = fwd.split(",");
    return first.trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "unknown";
}

export function enforceRateLimit(
  request: Request,
  { key, limit, windowMs }: RateLimitOptions,
): RateLimitResult {
  const ip = getClientIp(request);
  const now = Date.now();
  const bucketKey = `${key}:${ip}`;
  const existing = store.get(bucketKey);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(bucketKey, { count: 1, resetAt });

    return {
      allowed: true,
      limit,
      remaining: Math.max(limit - 1, 0),
      resetAt,
      headers: {
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(Math.max(limit - 1, 0)),
        "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
      },
    };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;
  const remaining = Math.max(limit - existing.count, 0);

  return {
    allowed,
    limit,
    remaining,
    resetAt: existing.resetAt,
    headers: {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(Math.ceil(existing.resetAt / 1000)),
      ...(allowed ? {} : { "Retry-After": String(Math.ceil((existing.resetAt - now) / 1000)) }),
    },
  };
}
