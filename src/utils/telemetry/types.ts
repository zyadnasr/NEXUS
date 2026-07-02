export type ConsentState = 'granted' | 'denied' | 'pending';

export interface ConsentSettings {
  analytics_storage: ConsentState;
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  functionality_storage: ConsentState;
  personalization_storage: ConsentState;
  security_storage: ConsentState;
}

export interface PageViewPayload {
  page_path: string;
  page_title: string;
  page_location: string;
}

export interface TelemetryEvent {
  name: string;
  params?: Record<string, unknown>;
}

export interface ITelemetryProvider {
  init: () => void;
  track: (event: TelemetryEvent) => void;
  trackPageView: (payload: PageViewPayload) => void;
  updateConsent: (settings: Partial<ConsentSettings>) => void;
  getConsent: () => ConsentSettings;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: { (...args: unknown[]): void; callMethod?: (...args: unknown[]) => void; queue: unknown[]; push: unknown; loaded: boolean; version: string };
    clarity: { (...args: unknown[]): void; q: unknown[] };
  }
}
