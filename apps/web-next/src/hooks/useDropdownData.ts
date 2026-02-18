'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { DropdownOption } from './interfaces/DropdownOption'

interface DropdownData {
  options: DropdownOption[]
  placeholder?: string
  label?: string
  loading: boolean
  error: Error | null
}

interface StructuredDropdownResponse {
  status: string
  screen_location: string
  language_code: string
  dropdowns: Array<{ key: string; label: string }>
  options: Record<string, DropdownOption[]>
  placeholders: Record<string, string>
  labels: Record<string, string>
}

const dropdownCache = new Map<string, { data: StructuredDropdownResponse; expires: number }>()
const CACHE_TTL = 5 * 60 * 1000

export const useDropdownData = (
  screenLocation: string,
  fieldName: string,
  returnStructure: 'options' | 'full' = 'options'
): DropdownData | DropdownOption[] => {
  const { i18n } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [dropdownData, setDropdownData] = useState<DropdownData>({
    options: [],
    placeholder: undefined,
    label: undefined,
    loading: true,
    error: null,
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const language = i18n.language || 'en'

  const fetchDropdownData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (abortControllerRef.current) abortControllerRef.current.abort()
      abortControllerRef.current = new AbortController()

      const cacheKey = `dropdown_${screenLocation}_${language}`
      const cached = dropdownCache.get(cacheKey)
      let apiData: StructuredDropdownResponse

      if (cached && Date.now() < cached.expires) {
        apiData = cached.data
      } else {
        const response = await fetch(`/api/dropdowns/${screenLocation}/${language}`, {
          signal: abortControllerRef.current.signal,
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        apiData = await response.json()
        if (apiData.status !== 'success') throw new Error(`API Error: ${apiData.status}`)
        dropdownCache.set(cacheKey, { data: apiData, expires: Date.now() + CACHE_TTL })
      }

      const dropdownKey = `${screenLocation}_${fieldName}`
      const options = apiData.options?.[dropdownKey] || []
      const placeholder = apiData.placeholders?.[`${dropdownKey}_ph`] || apiData.placeholders?.[dropdownKey]
      const label = apiData.labels?.[`${dropdownKey}_label`] || apiData.labels?.[dropdownKey]

      setDropdownData({ options, placeholder, label, loading: false, error: null })
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') return
      const errorObj = err instanceof Error ? err : new Error('Unknown error')
      setError(errorObj)
      setDropdownData({ options: [], placeholder: undefined, label: undefined, loading: false, error: errorObj })
    } finally {
      setLoading(false)
      abortControllerRef.current = null
    }
  }, [screenLocation, fieldName, language])

  useEffect(() => {
    fetchDropdownData()
    return () => { abortControllerRef.current?.abort() }
  }, [fetchDropdownData])

  const finalData = { ...dropdownData, loading, error }
  if (returnStructure === 'options' && !loading && !error) return finalData.options
  return finalData
}

export default useDropdownData
