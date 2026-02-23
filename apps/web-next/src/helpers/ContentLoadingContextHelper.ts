'use client';

import React, { useContext } from 'react';
import type { ContentLoadingContextValue } from '@/providers/interfaces/ContentLoadingContextValue';

/**
 * Holds the content loading React context and provides the hook to consume it.
 * Use ContentLoadingContextHelper.getContext() for the Provider; use ContentLoadingContextHelper.useContentLoadingContext() to consume.
 */
export class ContentLoadingContextHelper {
  static readonly context = React.createContext<ContentLoadingContextValue | null>(null);

  static getContext(): React.Context<ContentLoadingContextValue | null> {
    return ContentLoadingContextHelper.context;
  }

  /**
   * Consumes the content loading context. Use to register screen loading state for the global overlay.
   * Call only from function components or other hooks.
   * @returns { registerLoading(key, loading) } or null if outside provider.
   */
  static useContentLoadingContext(): ContentLoadingContextValue | null {
    // Static method used as custom hook when called from components; rule flags class scope.
    // eslint-disable-next-line react-hooks/rules-of-hooks -- Custom hook implemented as static method; call site is always a component/hook.
    return useContext(ContentLoadingContextHelper.getContext());
  }
}

/** Hook for backward compatibility; prefer ContentLoadingContextHelper.useContentLoadingContext(). */
export const useContentLoadingContext =
  ContentLoadingContextHelper.useContentLoadingContext;
