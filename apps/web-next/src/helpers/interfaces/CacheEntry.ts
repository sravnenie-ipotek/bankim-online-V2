import type { ContentResponse } from '@/interfaces/ContentResponse'

export interface CacheEntry {
  data: ContentResponse | null
  error: string | null
  timestamp: number
  promise: Promise<ContentResponse | null> | null
}
