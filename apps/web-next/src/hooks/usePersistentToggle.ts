'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ToggleReturn } from './interfaces/ToggleReturn'

export const usePersistentToggle = (
  key: string,
  defaultValue: boolean
): ToggleReturn => {
  const [isOn, setIsOn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(isOn))
    } catch {
      // Ignore localStorage errors (e.g. incognito mode)
    }
  }, [key, isOn])

  const toggle = useCallback(() => setIsOn((prev) => !prev), [])
  const on = useCallback(() => setIsOn(true), [])
  const off = useCallback(() => setIsOn(false), [])
  const set = useCallback((bool: boolean) => setIsOn(bool), [])

  return { isOn, isOff: !isOn, toggle, on, off, set }
}
