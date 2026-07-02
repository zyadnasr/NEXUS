export interface TelemetryConfig {
  gaMeasurementId: string | undefined;
  gtmContainerId: string | undefined;
  metaPixelId: string | undefined;
  clarityId: string | undefined;
}

function readEnv(key: string): string | undefined {
  try {
    return (import.meta.env as Record<string, string | undefined>)?.[key];
  } catch {
    return undefined;
  }
}

export const telemetryConfig: TelemetryConfig = {
  gaMeasurementId: readEnv('VITE_GA_MEASUREMENT_ID'),
  gtmContainerId: readEnv('VITE_GTM_CONTAINER_ID'),
  metaPixelId: readEnv('VITE_META_PIXEL_ID'),
  clarityId: readEnv('VITE_CLARITY_ID'),
};

export function hasAnyTrackingId(): boolean {
  return !!(telemetryConfig.gaMeasurementId || telemetryConfig.gtmContainerId || telemetryConfig.metaPixelId || telemetryConfig.clarityId);
}
