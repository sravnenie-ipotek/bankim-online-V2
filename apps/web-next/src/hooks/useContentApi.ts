'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ContentMapHelper } from '@/helpers/ContentMapHelper';
import { useAppSelector } from '@/hooks/store';
import {
  selectContentEntry,
  selectContentLoading,
} from '@/store/slices/contentSlice';
import { useContentLoadingContext } from '@/providers/ContentLoadingContext';

/**
 * Hook for reading content from the Redux cache. Does not fetch; use useContentFetch in layout/page to load content.
 * @param screenLocation - API screen location (e.g. 'common', 'vacancies').
 * @returns Object with content (map), loading, error, and getContent(key) function.
 */
export const useContentApi = (screenLocation: string) => {
  const { i18n } = useTranslation();
  const contentLoadingContext = useContentLoadingContext();
  const language = i18n.language || 'en';
  const entry = useAppSelector(selectContentEntry(screenLocation, language));
  const loading = useAppSelector(selectContentLoading(screenLocation, language));

  const content = useMemo(
    () =>
      entry?.data?.content
        ? ContentMapHelper.transformContentToMap(entry.data.content)
        : {},
    [entry]
  );
  const error = entry?.error ?? null;

  useEffect(() => {
    const register = contentLoadingContext?.registerLoading;
    if (register) register(screenLocation, loading);
    return () => {
      if (register) register(screenLocation, false);
    };
  }, [screenLocation, loading, contentLoadingContext]);

  /** Resolves content from API/DB only. No fallback. Missing keys return [Missing: key]. */
  const getContent = useCallback(
    (key: string): string => {
      const value = content[key];
      if (value !== undefined && value !== '') return value;
      return `[Missing: ${key}]`;
    },
    [content]
  );

  return {
    content,
    loading,
    error,
    getContent,
  };
};

export default useContentApi;
