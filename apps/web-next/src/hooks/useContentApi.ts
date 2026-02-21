'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getContentFromServer } from '../helpers/contentApiCache'
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
 * Custom hook for fetching content from the server (content API).
 * No browser cache; each request hits the API. Caching can be added later via Redux.
 * getContent(key) returns API content or [Missing: key]; no fallback. Missing keys are reported via console.error.
 */
export const useContentApi = (screenLocation: string) => {
  const { i18n } = useTranslation()
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
      result: Awaited<ReturnType<typeof getContentFromServer>>,
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

    const promise = getContentFromServer(screenLocation, language)
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
    (key: string): string => {
      if (content[key]) return content[key]
      const shortKey = getShortKey(key)
      const value = content[shortKey]
      if (value !== undefined && value !== '') return value
      // Key not in Redis/DB: report error and return missing placeholder (no fallback)
      if (!loading && Object.keys(content).length > 0) {
        if (typeof console !== 'undefined' && console.error) {
          console.error(`[useContentApi] Content key not found in API/DB: "${key}". Add it to content (SQL/i18n) or fix the key.`)
        }
        return `[Missing: ${key}]`
      }
      return value ?? ''
    },
    [content, loading],
  )

  return {
    content,
    loading,
    error,
    getContent,
  }
}

export default useContentApi
