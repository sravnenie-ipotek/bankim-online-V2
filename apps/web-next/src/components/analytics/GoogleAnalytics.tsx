'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { StorageHelper } from '@/helpers/StorageHelper';
import PageViewTracker from './PageViewTracker';

const COOKIE_CONSENT_KEY = 'cookie';
const COOKIE_CONSENT_ACCEPTED_EVENT = 'cookie_consent_accepted';

function readConsent(): boolean {
  return StorageHelper.getItem(COOKIE_CONSENT_KEY) === '1';
}

const GoogleAnalytics: React.FC = () => {
  const [hasConsent, setHasConsent] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined;

  useEffect(() => {
    queueMicrotask(() => {
      setHasConsent(readConsent());
    });

    const handleConsentUpdate = (): void => {
      setHasConsent(readConsent());
    };

    window.addEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, handleConsentUpdate);
    window.addEventListener('storage', handleConsentUpdate);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, handleConsentUpdate);
      window.removeEventListener('storage', handleConsentUpdate);
    };
  }, []);

  if (!measurementId || !hasConsent) return null;

  const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

  return (
    <>
      <Script src={gtagSrc} strategy="afterInteractive" />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
      <PageViewTracker />
    </>
  );
};

export default GoogleAnalytics;

export { COOKIE_CONSENT_ACCEPTED_EVENT };
