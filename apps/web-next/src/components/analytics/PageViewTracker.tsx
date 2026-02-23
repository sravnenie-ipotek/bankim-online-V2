'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { StorageHelper } from '@/helpers/StorageHelper';

const COOKIE_CONSENT_KEY = 'cookie';

function sendPageView(path: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}

const PageViewTracker: React.FC = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (StorageHelper.getItem(COOKIE_CONSENT_KEY) !== '1') return;
    const prev = prevPathnameRef.current;
    if (prev !== null && prev !== pathname) {
      sendPageView(pathname);
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
};

export default PageViewTracker;
