import type { ContentResponse } from '../interfaces/ContentResponse'

/**
 * Fetches content from the server. No browser cache; every call hits the API.
 * Caching can be added later via Redux if needed.
 */
export async function getContentFromServer(
  screenLocation: string,
  language: string,
): Promise<{ data: ContentResponse | null; error: string | null }> {
  const apiUrl = `/api/content/screen/${screenLocation}/${language}`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ContentResponse = await response.json()

    if (data.status === 'success' && data.content) {
      return { data, error: null }
    }

    throw new Error('Invalid API response format')
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error'
    return { data: null, error: errorMsg }
  }
}

/** No-op: no browser cache. If caching is added later (e.g. Redux), implement here. */
export function clearContentCache(): void {
  // No client cache to clear
}
