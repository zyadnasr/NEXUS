import { telemetryConfig, hasAnyTrackingId } from './config';
import { pushToBridge } from './bridge';
import type { TelemetryEvent, ConsentSettings, PageViewPayload, ITelemetryProvider } from './types';

const DEFAULT_CONSENT: ConsentSettings = {
  analytics_storage: 'pending',
  ad_storage: 'pending',
  ad_user_data: 'pending',
  ad_personalization: 'pending',
  functionality_storage: 'granted',
  personalization_storage: 'pending',
  security_storage: 'granted',
};

const SCRIPT_LOAD_TIMEOUT = 8000;
const injected = new Set<string>();

function injectScript(src: string, id?: string): HTMLScriptElement | null {
  if (id && injected.has(id)) return null;
  try {
    if (typeof document === 'undefined') return null;
    if (id && document.getElementById(id)) return null;

    const script = document.createElement('script');
    script.async = true;
    if (id) { script.id = id; }

    const timer = setTimeout(() => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }, SCRIPT_LOAD_TIMEOUT);

    script.onload = () => { clearTimeout(timer); if (id) injected.add(id); };
    script.onerror = () => { clearTimeout(timer); if (import.meta.env.DEV) { console.warn('[Telemetry] Script failed to load:', src); } };
    script.src = src;
    document.head.appendChild(script);
    return script;
  } catch {
    return null;
  }
}

function loadGTM(containerId: string): void {
  try {
    const dl = window.dataLayer || [];
    dl.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${containerId}`);
  } catch { /* noop */ }
}

function loadGA4(measurementId: string): void {
  try {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`, `gtag-${measurementId}`);
    try {
      window.gtag = function gtag(...args: unknown[]) { pushToBridge(args as unknown as unknown); };
    } catch {
      window.gtag = function gtag() { /* noop */ };
    }
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
  } catch { /* noop */ }
}

function loadMetaPixel(pixelId: string): void {
  try {
    if (window.fbq && typeof window.fbq === 'function') return;
    const fbq = function fbq(...args: unknown[]) {
      const q = (fbq as unknown as { queue: unknown[] }).queue || [];
      q.push(args);
      (fbq as unknown as { queue: unknown[] }).queue = q;
    } as unknown as Window['fbq'];
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    try { window.fbq = fbq; } catch { /* noop */ }
    injectScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  } catch { /* noop */ }
}

function loadClarity(clarityId: string): void {
  try {
    const clarity = function clarity(...args: unknown[]) {
      const q = (clarity as unknown as { q: unknown[] }).q || [];
      q.push(args);
      (clarity as unknown as { q: unknown[] }).q = q;
    } as unknown as Window['clarity'];
    clarity.q = [];
    try { window.clarity = clarity; } catch { /* noop */ }
    injectScript(`https://www.clarity.ms/tag/${clarityId}`);
  } catch { /* noop */ }
}

class TelemetryServiceImpl implements ITelemetryProvider {
  private ready = false;
  private consent: ConsentSettings = { ...DEFAULT_CONSENT };
  private queue: TelemetryEvent[] = [];

  init(): void {
    if (this.ready) return;
    this.ready = true;

    if (!hasAnyTrackingId()) return;

    try {
      const { gtmContainerId, gaMeasurementId, metaPixelId, clarityId } = telemetryConfig;
      if (gtmContainerId) loadGTM(gtmContainerId);
      if (gaMeasurementId) loadGA4(gaMeasurementId);
      if (metaPixelId) loadMetaPixel(metaPixelId);
      if (clarityId) loadClarity(clarityId);
    } catch { /* noop */ }
  }

  track(event: TelemetryEvent): void {
    try {
      if (this.consent.analytics_storage === 'denied') return;
      if (this.consent.analytics_storage !== 'granted') {
        this.queue.push(event);
        return;
      }
      this.dispatch(event);
    } catch { /* noop */ }
  }

  trackPageView(payload: PageViewPayload): void {
    const event: TelemetryEvent = { name: 'page_view', params: { ...payload } };
    try { pushToBridge({ event: 'page_view', ...payload }); } catch { /* noop */ }
    this.track(event);
    try {
      if (telemetryConfig.metaPixelId && window.fbq && typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }
    } catch { /* noop */ }
  }

  updateConsent(settings: Partial<ConsentSettings>): void {
    this.consent = { ...this.consent, ...settings };
    try { pushToBridge({ event: 'consent_update', ...settings }); } catch { /* noop */ }
    if (this.consent.analytics_storage === 'granted') {
      this.flush();
    }
  }

  getConsent(): ConsentSettings {
    return { ...this.consent };
  }

  private dispatch(event: TelemetryEvent): void {
    try { pushToBridge(event); } catch { /* noop */ }
  }

  private flush(): void {
    while (this.queue.length > 0) {
      const ev = this.queue.shift();
      if (ev) this.dispatch(ev);
    }
  }
}

let instance: TelemetryServiceImpl | null = null;

export function getTelemetry(): ITelemetryProvider {
  if (!instance) {
    instance = new TelemetryServiceImpl();
  }
  return instance;
}
