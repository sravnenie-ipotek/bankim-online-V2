'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import IsraelFlagIcon from '@/components/icons/IsraelFlagIcon'
import RussiaFlagIcon from '@/components/icons/RussiaFlagIcon'
import USFlagIcon from '@/components/icons/USFlagIcon'
import CheckIcon from '@/components/icons/CheckIcon'

interface LanguageItem {
  value: string
  countryKey: string
  languageKey: string
  icon: React.ReactNode
}

const LANGUAGE_ITEMS: LanguageItem[] = [
  { value: 'en', countryKey: 'country_us', languageKey: 'language_english', icon: <USFlagIcon /> },
  { value: 'he', countryKey: 'country_israel', languageKey: 'language_hebrew', icon: <IsraelFlagIcon /> },
  { value: 'ru', countryKey: 'country_russia', languageKey: 'language_russian', icon: <RussiaFlagIcon /> },
]

function applyLanguageDirection(lang: string): void {
  const dir = lang === 'he' ? 'rtl' : 'ltr'
  document.documentElement.dir = dir
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.lang = lang
}

function persistLanguage(lang: string): void {
  localStorage.setItem('language', lang)
  localStorage.setItem('i18nextLng', lang)
}

const MobileLanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language || 'he'

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await i18n.changeLanguage(newLanguage)
      applyLanguageDirection(newLanguage)
      persistLanguage(newLanguage)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  return (
    <div className="mb-4">
      <div className="pb-2 text-[14px] font-semibold text-textTheme-secondary">
        {t('sel_cntr')}
      </div>
      <div className="flex flex-col gap-1">
        {LANGUAGE_ITEMS.map((item) => (
          <div
            key={item.value}
            className="flex items-center justify-between py-2 px-2 rounded-md cursor-pointer hover:bg-base-secondaryHoveredButton transition-colors"
            onClick={() => handleLanguageChange(item.value)}
            role="option"
            aria-selected={currentLang === item.value}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLanguageChange(item.value)
              }
            }}
          >
            <div className="flex items-center gap-2">
              <div>{item.icon}</div>
              <div className="flex flex-col items-start">
                <span className="text-[0.875rem] font-normal leading-[140%] text-white">
                  {t(item.countryKey)}
                </span>
                <span className="text-3xs font-normal leading-[140%] text-textTheme-secondary">
                  {t(item.languageKey)}
                </span>
              </div>
            </div>
            {currentLang === item.value && <CheckIcon size={16} />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileLanguageSelector
