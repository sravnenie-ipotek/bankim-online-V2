'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/hooks/store'

/**
 * Syncs Redux language state to i18next so the UI language stays in sync.
 */
export function useLanguageSync(): void {
  const { i18n } = useTranslation()
  const language = useAppSelector((state) => state.language?.language ?? i18n.language)

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, i18n])
}
