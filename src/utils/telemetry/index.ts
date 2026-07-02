export { TelemetryProvider, useTelemetry } from './Provider';
export { getTelemetry } from './core';
export { pushToBridge, resetBridge } from './bridge';
export { telemetryConfig, hasAnyTrackingId } from './config';
export {
  trackCTA,
  trackFormSubmit,
  trackFormSuccess,
  trackPhoneCall,
  trackEmail,
  trackExternalLink,
  trackPortfolioView,
  trackServiceView,
  trackScrollDepth,
  trackFileDownload,
  trackVideoPlay,
  trackConversion,
} from './signals';
export type {
  ConsentSettings,
  ConsentState,
  PageViewPayload,
  TelemetryEvent,
  ITelemetryProvider,
} from './types';
