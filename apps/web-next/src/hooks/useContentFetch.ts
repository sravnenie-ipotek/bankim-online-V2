'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { fetchContent } from '@/store/slices/contentSlice';
import type { RootState } from '@/store';

const INITIAL_RETRY_MS = 2000;
const MAX_RETRY_DELAY_MS = 30000;
const MAX_RETRIES = 8;

/**
 * Fetches content for the given screen locations into Redux.
 * Call only in layouts and pages.
 * Retries with exponential backoff (2 s → 4 s → 8 s → … → 30 s cap, up to 8 attempts)
 * until every requested location has data. Stops immediately once all locations are loaded.
 *
 * @param screenLocations - One or more API screen locations (e.g. 'global_components', 'home_page').
 */
export const useContentFetch = (...screenLocations: string[]): void => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = i18n.language || 'en';
  const locationKey = screenLocations.join(',');

  const allLoaded = useAppSelector((state: RootState) =>
    screenLocations.every((loc) => {
      const key = `${loc}:${language}`;
      return !!state.content.byKey[key]?.data?.content;
    })
  );

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setRetryCount(0);
  }, [language, locationKey]);

  useEffect(() => {
    for (const screenLocation of screenLocations) {
      dispatch(fetchContent({ screenLocation, language }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, dispatch, locationKey, retryCount]);

  useEffect(() => {
    if (allLoaded || retryCount >= MAX_RETRIES) return;
    const delay = Math.min(
      INITIAL_RETRY_MS * Math.pow(2, retryCount),
      MAX_RETRY_DELAY_MS
    );
    const timer = setTimeout(() => {
      setRetryCount((prev) => prev + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [allLoaded, retryCount]);
};

export default useContentFetch;
