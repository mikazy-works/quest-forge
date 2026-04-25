type Entry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

const globalStore = globalThis as typeof globalThis & {
  __diagnosisRateLimitStore?: Map<string, Entry>;
};

function getStore() {
  if (!globalStore.__diagnosisRateLimitStore) {
    globalStore.__diagnosisRateLimitStore = new Map<string, Entry>();
  }

  return globalStore.__diagnosisRateLimitStore;
}

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

export function checkDiagnosisRateLimit(request: Request) {
  const store = getStore();
  const key = getClientKey(request);
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS
    });

    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1
    };
  }

  if (existing.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: existing.resetAt - now
    };
  }

  existing.count += 1;
  store.set(key, existing);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.count
  };
}
