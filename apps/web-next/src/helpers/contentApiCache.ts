import type { ContentResponse } from '../interfaces/ContentResponse';

type ContentCacheEntry = { data: ContentResponse | null; error: string | null };

interface TimedCacheEntry {
  entry: ContentCacheEntry;
  cachedAt: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000;

const contentCache = new Map<string, TimedCacheEntry>();
const inFlight = new Map<string, Promise<ContentCacheEntry>>();

function cacheKey(screenLocation: string, language: string): string {
  return `${screenLocation}:${language}`;
}

function isExpired(timedEntry: TimedCacheEntry): boolean {
  return Date.now() - timedEntry.cachedAt > CACHE_TTL_MS;
}

/**
 * Single-attempt fetch from the API. Fails fast on error — no retries.
 * @param screenLocation - API screen location (e.g. 'common', 'vacancies').
 * @param language - Language code for the request.
 * @returns { data: ContentResponse | null, error: string | null }.
 */
export async function getContentFromServer(
  screenLocation: string,
  language: string
): Promise<ContentCacheEntry> {
  const apiUrl = `/api/content/screen/${screenLocation}/${language}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return { data: null, error: `HTTP error! status: ${response.status}` };
    }

    const data: ContentResponse = await response.json();

    if (data.status === 'success' && data.content) {
      return { data, error: null };
    }

    return { data: null, error: 'Invalid API response format' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { data: null, error: message };
  }
}

/**
 * Returns the cached content for (screenLocation, language), or null if not cached / expired.
 * @param screenLocation - API screen location (e.g. 'common', 'vacancies').
 * @param language - Language code.
 * @returns Cached entry or null.
 */
export function getCached(
  screenLocation: string,
  language: string
): ContentCacheEntry | null {
  const key = cacheKey(screenLocation, language);
  const timed = contentCache.get(key);
  if (!timed || isExpired(timed)) {
    if (timed) contentCache.delete(key);
    return null;
  }
  return timed.entry;
}

/**
 * Returns true if the cached entry for (screenLocation, language) exists and has not expired.
 */
export function isCacheValid(
  screenLocation: string,
  language: string
): boolean {
  const key = cacheKey(screenLocation, language);
  const timed = contentCache.get(key);
  return !!timed && !isExpired(timed);
}

/**
 * Returns content for (screenLocation, language): from cache, from in-flight request, or by fetching.
 * Deduplicates concurrent requests for the same key. Only caches successful results.
 * Errors are NOT cached so the next call retries automatically.
 * Cached entries expire after 5 minutes.
 * @param screenLocation - API screen location.
 * @param language - Language code.
 * @returns Promise of { data, error }.
 */
export async function getContentCached(
  screenLocation: string,
  language: string
): Promise<ContentCacheEntry> {
  const key = cacheKey(screenLocation, language);
  const timed = contentCache.get(key);
  if (timed && !isExpired(timed)) {
    return timed.entry;
  }
  if (timed) contentCache.delete(key);

  const existing = inFlight.get(key);
  if (existing !== undefined) {
    return existing;
  }
  const promise = getContentFromServer(screenLocation, language)
    .then((result) => {
      if (result.data) {
        contentCache.set(key, { entry: result, cachedAt: Date.now() });
      }
      return result;
    })
    .catch((): ContentCacheEntry => ({ data: null, error: 'Unexpected fetch error' }))
    .finally(() => {
      inFlight.delete(key);
    });
  inFlight.set(key, promise);
  return promise;
}

/**
 * Removes the cached entry for (screenLocation, language). Does not cancel in-flight requests.
 * @param screenLocation - API screen location.
 * @param language - Language code.
 */
export function clearCacheKey(screenLocation: string, language: string): void {
  const key = cacheKey(screenLocation, language);
  contentCache.delete(key);
}

/** Clears the in-memory content cache. In-flight requests are not cancelled. */
export function clearContentCache(): void {
  contentCache.clear();
}
