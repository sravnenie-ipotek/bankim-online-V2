import { StorageHelper } from './StorageHelper';

const COOKIE_CONSENT_KEY = 'cookie';

export type AnalyticsEventParams = Record<string, string | number | boolean>;

/**
 * Helper for GA4 analytics: consent check, measurement ID, and event tracking.
 */
export class AnalyticsHelper {
  private static get hasConsent(): boolean {
    return StorageHelper.getItem(COOKIE_CONSENT_KEY) === '1';
  }

  private static getMeasurementId(): string | undefined {
    return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined;
  }

  /**
   * Sends a custom event to GA4 when consent is given and gtag is loaded.
   * @param eventName - GA4 event name.
   * @param params - Optional event parameters (string, number, or boolean values).
   */
  static trackEvent(eventName: string, params?: AnalyticsEventParams): void {
    if (!AnalyticsHelper.hasConsent) return;
    const measurementId = AnalyticsHelper.getMeasurementId();
    if (!measurementId || typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', eventName, params);
  }

  /**
   * Tracks a click / CTA for GA4. Sends event name "click" with button_name and page.
   * @param buttonName - Name of the button/CTA for analytics.
   * @param context - Optional context (e.g. entity id) added to event params.
   */
  static trackClick(buttonName: string, context?: string): void {
    const page = typeof window !== 'undefined' ? window.location.pathname : '';
    const params: AnalyticsEventParams = {
      button_name: buttonName,
      page,
    };
    if (context) params.context = context;
    AnalyticsHelper.trackEvent('click', params);
  }
}

export const trackEvent = AnalyticsHelper.trackEvent.bind(AnalyticsHelper);
export const trackClick = AnalyticsHelper.trackClick.bind(AnalyticsHelper);
