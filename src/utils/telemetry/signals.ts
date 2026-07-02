import { getTelemetry } from './core';
import { pushToBridge } from './bridge';
import type { TelemetryEvent } from './types';

const svc = () => getTelemetry();

function track(event: TelemetryEvent): void {
  try { svc().track(event); } catch { /* noop */ }
}

export function trackCTA(label: string): void {
  track({ name: 'cta_click', params: { label } });
}

export function trackFormSubmit(formName: string): void {
  track({ name: 'form_submit', params: { form_name: formName } });
  try { pushToBridge({ event: 'form_submit', form_name: formName }); } catch { /* noop */ }
}

export function trackFormSuccess(formName: string): void {
  track({ name: 'form_success', params: { form_name: formName } });
  try { pushToBridge({ event: 'form_success', form_name: formName }); } catch { /* noop */ }
}

export function trackPhoneCall(number: string): void {
  track({ name: 'phone_click', params: { phone_number: number } });
}

export function trackEmail(email: string): void {
  track({ name: 'email_click', params: { email } });
}

export function trackExternalLink(url: string): void {
  track({ name: 'external_link_click', params: { url } });
}

export function trackPortfolioView(projectId: string, projectTitle: string): void {
  track({ name: 'portfolio_view', params: { project_id: projectId, project_title: projectTitle } });
}

export function trackServiceView(serviceName: string): void {
  track({ name: 'service_view', params: { service_name: serviceName } });
}

export function trackScrollDepth(depth: number): void {
  track({ name: 'scroll_depth', params: { depth } });
}

export function trackFileDownload(fileName: string, fileType: string): void {
  track({ name: 'file_download', params: { file_name: fileName, file_type: fileType } });
}

export function trackVideoPlay(videoTitle: string): void {
  track({ name: 'video_play', params: { video_title: videoTitle } });
}

export function trackConversion(label: string, value?: number): void {
  track({ name: 'conversion', params: { label, value } });
  try { pushToBridge({ event: 'conversion', conversion_label: label, conversion_value: value }); } catch { /* noop */ }
}
