let ensured = false;

function ensureDataLayer(): unknown[] | null {
  if (ensured) return window.dataLayer ?? null;
  try {
    if (typeof window === 'undefined') return null;
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    ensured = true;
    return window.dataLayer;
  } catch {
    return null;
  }
}

export function pushToBridge(...args: unknown[]): void {
  try {
    const dl = ensureDataLayer();
    if (!dl) return;
    dl.push(...args);
  } catch {
    if (import.meta.env.DEV) {
      console.warn('[Telemetry] Bridge push failed');
    }
  }
}

export function resetBridge(): void {
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = [];
    }
  } catch {
    /* noop */
  }
}
