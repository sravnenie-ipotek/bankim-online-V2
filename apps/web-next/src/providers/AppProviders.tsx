'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import StoreProvider from './StoreProvider';
import I18nProviderWrapper from './I18nProvider';
import { ContentLoadingProvider } from './ContentLoadingContext';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Composes all client-side providers needed by the application:
 * - Error boundary (catches render crashes)
 * - Redux store + persist gate
 * - i18next translations
 * - Content loading (progress circle until translations received)
 * - Google Analytics (loads only after cookie consent)
 */
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <I18nProviderWrapper>
          <ContentLoadingProvider>
            <GoogleAnalytics />
            {children}
          </ContentLoadingProvider>
        </I18nProviderWrapper>
      </StoreProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
