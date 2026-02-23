import type { ContentResponse } from '../interfaces/ContentResponse';

type ContentCacheEntry = { data: ContentResponse | null; error: string | null };

const contentCache = new Map<string, ContentCacheEntry>();
const inFlight = new Map<string, Promise<ContentCacheEntry>>();

function cacheKey(screenLocation: string, language: string): string {
  return `${screenLocation}:${language}`;
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
 * Returns the cached content for (screenLocation, language), or null if not cached.
 * @param screenLocation - API screen location (e.g. 'common', 'vacancies').
 * @param language - Language code.
 * @returns Cached entry or null.
 */
export function getCached(
  screenLocation: string,
  language: string
): ContentCacheEntry | null {
  const key = cacheKey(screenLocation, language);
  return contentCache.get(key) ?? null;
}

/**
 * Returns content for (screenLocation, language): from cache, from in-flight request, or by fetching.
 * Deduplicates concurrent requests for the same key. Only caches successful results.
 * Errors are NOT cached so the next call retries automatically.
 * @param screenLocation - API screen location.
 * @param language - Language code.
 * @returns Promise of { data, error }.
 */
export async function getContentCached(
  screenLocation: string,
  language: string
): Promise<ContentCacheEntry> {
  const key = cacheKey(screenLocation, language);
  const cached = contentCache.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const existing = inFlight.get(key);
  if (existing !== undefined) {
    return existing;
  }
  const promise = getContentFromServer(screenLocation, language)
    .then((result) => {
      if (result.data) {
        contentCache.set(key, result);
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
