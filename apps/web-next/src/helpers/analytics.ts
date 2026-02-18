const COOKIE_CONSENT_KEY = 'cookie'

function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(COOKIE_CONSENT_KEY) === '1'
}

function getMeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined
}

export type AnalyticsEventParams = Record<string, string | number | boolean>

/**
 * Send a custom event to GA4 when consent is given and gtag is loaded.
 */
export function trackEvent(
  eventName: string,
  params?: AnalyticsEventParams
): void {
  if (!hasConsent()) return
  const measurementId = getMeasurementId()
  if (!measurementId || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

/**
 * Track a click / CTA for GA4. Sends event name "click" with button_name and page.
 */
export function trackClick(
  buttonName: string,
  context?: string
): void {
  const page =
    typeof window !== 'undefined' ? window.location.pathname : ''
  const params: AnalyticsEventParams = {
    button_name: buttonName,
    page,
  }
  if (context) params.context = context
  trackEvent('click', params)
}
