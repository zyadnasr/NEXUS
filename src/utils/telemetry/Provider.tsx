import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getTelemetry } from './core';
import type { ITelemetryProvider, ConsentSettings } from './types';

const noopProvider: ITelemetryProvider = {
  init: () => { /* noop */ },
  track: () => { /* noop */ },
  trackPageView: () => { /* noop */ },
  updateConsent: () => { /* noop */ },
  getConsent: () => ({
    analytics_storage: 'denied' as const,
    ad_storage: 'denied' as const,
    ad_user_data: 'denied' as const,
    ad_personalization: 'denied' as const,
    functionality_storage: 'denied' as const,
    personalization_storage: 'denied' as const,
    security_storage: 'denied' as const,
  }),
};

const TelemetryCtx = createContext<ITelemetryProvider>(noopProvider);

export function useTelemetry(): ITelemetryProvider {
  return useContext(TelemetryCtx);
}

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const lastPath = useRef<string>('');

  useEffect(() => {
    getTelemetry().init();
  }, []);

  useEffect(() => {
    const current = location.pathname + location.search;
    if (lastPath.current === current) return;
    lastPath.current = current;

    const id = setTimeout(() => {
      getTelemetry().trackPageView({
        page_path: current,
        page_title: document.title,
        page_location: window.location.href,
      });
    }, 100);

    return () => clearTimeout(id);
  }, [location]);

  return (
    <TelemetryCtx.Provider value={getTelemetry()}>
      {children}
    </TelemetryCtx.Provider>
  );
}
