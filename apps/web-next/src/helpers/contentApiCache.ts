import { ContentResponse } from '../interfaces/ContentResponse'
import type { CacheEntry } from './interfaces/CacheEntry'

const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

const cache = new Map<string, CacheEntry>()

function buildCacheKey(screenLocation: string, language: string): string {
  return `${screenLocation}:${language}`
}

function isExpired(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp > CACHE_TTL_MS
}

async function fetchFromApi(
  screenLocation: string,
  language: string,
): Promise<ContentResponse | null> {
  const apiUrl = `/api/content/screen/${screenLocation}/${language}`
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: ContentResponse = await response.json()

  if (data.status === 'success' && data.content) {
    return data
  }

  throw new Error('Invalid API response format')
}

/**
 * Fetches content with deduplication and caching.
 * Multiple callers requesting the same screen/language will share a single fetch.
 */
export async function getCachedContent(
  screenLocation: string,
  language: string,
): Promise<{ data: ContentResponse | null; error: string | null }> {
  const key = buildCacheKey(screenLocation, language)
  const existing = cache.get(key)

  // Return cached data if still valid
  if (existing && !isExpired(existing) && existing.promise === null) {
    return { data: existing.data, error: existing.error }
  }

  // If a fetch is already in-flight for this key, reuse it
  if (existing?.promise) {
    try {
      const data = await existing.promise
      return { data, error: null }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'
      return { data: null, error: errorMsg }
    }
  }

  // Start a new fetch
  const promise = fetchFromApi(screenLocation, language)

  cache.set(key, {
    data: null,
    error: null,
    timestamp: Date.now(),
    promise,
  })

  try {
    const data = await promise
    cache.set(key, { data, error: null, timestamp: Date.now(), promise: null })
    return { data, error: null }
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error'
    cache.set(key, { data: null, error: errorMsg, timestamp: Date.now(), promise: null })
    return { data: null, error: errorMsg }
  }
}

export function clearContentCache(): void {
  cache.clear()
}
