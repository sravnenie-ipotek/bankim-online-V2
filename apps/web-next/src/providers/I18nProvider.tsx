'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import type { I18nProviderWrapperProps } from '@/interfaces/I18nProviderWrapperProps';
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';

/** Max time (ms) to wait for i18n before rendering with fallback keys. */
const I18N_TIMEOUT_MS = 3000;

const I18nProviderWrapper: React.FC<I18nProviderWrapperProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(i18n.isInitialized);

  useEffect(() => {
    if (isReady) return;

    const handleInitialized = () => setIsReady(true);
    i18n.on('initialized', handleInitialized);

    // Safety timeout: render with fallback keys rather than staying blank forever
    const timeoutId = setTimeout(() => setIsReady(true), I18N_TIMEOUT_MS);

    return () => {
      i18n.off('initialized', handleInitialized);
      clearTimeout(timeoutId);
    };
  }, [isReady]);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProviderWrapper;
