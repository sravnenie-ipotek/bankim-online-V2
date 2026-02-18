'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getCachedContent } from '../helpers/contentApiCache'
import type { ContentItem } from '../interfaces/ContentItem'

function getShortKey(key: string): string {
  return key.split('.').pop() || key
}

function transformContentToMap(
  apiContent: Record<string, ContentItem>,
): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, item] of Object.entries(apiContent)) {
    const short = getShortKey(key)
    out[short] = item.value
    out[key] = item.value
  }
  return out
}

/**
 * Custom hook for fetching content from the content management API
 * with in-memory caching, request deduplication, and fallback to i18next translations.
 */
export const useContentApi = (screenLocation: string) => {
  const { i18n, t } = useTranslation()
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const language = i18n.language || 'en'

    const onSettled = (): void => {
      if (!cancelled) setLoading(false)
    }
    const onFulfilled = (
      result: Awaited<ReturnType<typeof getCachedContent>>,
    ): void => {
      if (cancelled) return
      if (result.data?.content) {
        setContent(transformContentToMap(result.data.content))
        setError(null)
      } else {
        setContent({})
        setError(result.error)
      }
    }

    const promise = getCachedContent(screenLocation, language)
    queueMicrotask(() => {
      if (!cancelled) {
        setLoading(true)
        setError(null)
      }
    })
    promise.then(onFulfilled).finally(onSettled)

    return () => {
      cancelled = true
    }
  }, [screenLocation, i18n.language])

  const getContent = useCallback(
    (key: string, fallbackKey?: string): string => {
      if (content[key]) return content[key]
      const shortKey = getShortKey(key)
      if (content[shortKey]) return content[shortKey]
      return t(fallbackKey ?? key)
    },
    [content, t],
  )

  return {
    content,
    loading,
    error,
    getContent,
  }
}

export default useContentApi
