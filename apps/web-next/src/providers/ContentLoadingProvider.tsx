'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ContentLoadingContextHelper } from '@/helpers/ContentLoadingContextHelper';
import ContentLoadingOverlay from './ContentLoadingOverlay';
import type { ContentLoadingProviderProps } from './interfaces/ContentLoadingProviderProps';

/**
 * Provides loading context and a full-screen overlay when any registered key has loading true.
 * @param props.children - App tree that can call useContentLoadingContext and registerLoading.
 */
const ContentLoadingProvider: React.FC<ContentLoadingProviderProps> = ({ children }) => {
  const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set());

  const registerLoading = useCallback((key: string, loading: boolean) => {
    setLoadingKeys((prev) => {
      const next = new Set(prev);
      if (loading) {
        next.add(key);
      } else {
        next.delete(key);
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ registerLoading }), [registerLoading]);

  const Context = ContentLoadingContextHelper.getContext();
  return (
    <Context.Provider value={value}>
      {children}
      <ContentLoadingOverlay loadingKeys={loadingKeys} />
    </Context.Provider>
  );
};

export default ContentLoadingProvider;
