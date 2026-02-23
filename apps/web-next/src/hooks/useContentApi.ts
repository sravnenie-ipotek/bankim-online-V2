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

  const getContent = useCallback(
    (key: string): string => {
      if (content[key]) return content[key];
      const shortKey = ContentMapHelper.getShortKey(key);
      const value = content[shortKey];
      if (value !== undefined && value !== '') return value;
      if (loading && Object.keys(content).length === 0) {
        return '\u00A0';
      }
      if (!loading && Object.keys(content).length > 0) {
        if (typeof console !== 'undefined' && console.error) {
          console.error(
            `[useContentApi] Content key not found in API/DB: "${key}". Add it to content (SQL/i18n) or fix the key.`
          );
        }
        return `[Missing: ${key}]`;
      }
      return value ?? '';
    },
    [content, loading]
  );

  return {
    content,
    loading,
    error,
    getContent,
  };
};

export default useContentApi;
