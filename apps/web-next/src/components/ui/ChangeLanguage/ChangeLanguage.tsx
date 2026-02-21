'use client'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useContentApi } from '@hooks/useContentApi'
import IsraelFlagIcon from '@/components/icons/IsraelFlagIcon'
import RussiaFlagIcon from '@/components/icons/RussiaFlagIcon'
import USFlagIcon from '@/components/icons/USFlagIcon'
import CaretDownIcon from '@/components/icons/CaretDownIcon'
import CaretUpIcon from '@/components/icons/CaretUpIcon'
import CheckIcon from '@/components/icons/CheckIcon'

interface LanguageOption {
  value: string
  countryKey: string
  languageKey: string
  icon: React.ReactNode
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
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

const ChangeLanguage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { i18n } = useTranslation()
  const { getContent } = useContentApi('global_components')

  const wrapperRef = useOutsideClick(() => setIsOpen(false))

  const currentLang = i18n.language || 'he'
  const selectedOption = LANGUAGE_OPTIONS.find((opt) => opt.value === currentLang) || LANGUAGE_OPTIONS[1]

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await i18n.changeLanguage(newLanguage)
      applyLanguageDirection(newLanguage)
      persistLanguage(newLanguage)
      setIsOpen(false)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  return (
    <div ref={wrapperRef} className="shrink-0 relative" style={{ width: 230, height: 54 }}>
      {/* Trigger button */}
      <div
        className="rounded-md flex items-center justify-between px-4 border border-base-secondaryDefaultButton bg-base-primary cursor-pointer w-full h-full box-border text-left rtl:text-right"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen)
          }
        }}
      >
        <div className="bg-transparent flex gap-2 items-center justify-start rtl:justify-end flex-1 min-w-0 rtl:flex-initial rtl:min-w-0 rtl:flex-row-reverse">
          <div>{selectedOption.icon}</div>
          <div className="flex flex-col items-start rtl:items-end justify-center gap-0.5 flex-1 min-w-0 rtl:flex-initial">
            <span className="text-3xs not-italic font-semibold leading-normal text-[#d0d0d0] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {getContent('country')}
            </span>
            <span className="text-white text-[18px] not-italic font-normal leading-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {getContent(selectedOption.countryKey)}
            </span>
          </div>
        </div>
        {isOpen ? (
          <CaretUpIcon className="cursor-pointer shrink-0" />
        ) : (
          <CaretDownIcon className="cursor-pointer shrink-0" />
        )}
      </div>

      {/* Dropdown: same RTL layout as mobile — flag at flex-end, then text, then checkmark on end */}
      {isOpen && (
        <div
          className="absolute mt-2.5 z-[9999] rounded-md py-2 border border-base-secondaryDefaultButton bg-base-secondary shadow-[0px_8px_32px_0px_rgba(0,0,0,0.16)] overflow-auto text-left rtl:text-right"
          style={{ width: 520, height: 540 }}
        >
          <div className="text-3xs not-italic font-semibold leading-normal text-white py-2 px-4">
            <span>{getContent('sel_cntr')}</span>
          </div>
          <div className="w-full border-t border-[#333535]" />
          {LANGUAGE_OPTIONS.map((item) => (
            <div
              key={item.value}
              tabIndex={0}
              className="flex items-center cursor-pointer justify-between py-2 px-4 hover:bg-base-secondaryHoveredButton transition-colors rtl:flex-row-reverse"
              onClick={() => handleLanguageChange(item.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleLanguageChange(item.value)
                }
              }}
              role="option"
              aria-selected={currentLang === item.value}
            >
              <div className="flex items-center gap-2 cursor-pointer rtl:flex-row-reverse">
                <div>{item.icon}</div>
                <div className="flex flex-col items-start rtl:items-end">
                  <span className="text-[0.875rem] not-italic font-normal leading-[140%] text-white">
                    {getContent(item.countryKey)}
                  </span>
                  <span className="text-3xs not-italic font-normal leading-[140%] text-white">
                    {getContent(item.languageKey)}
                  </span>
                </div>
              </div>
              {currentLang === item.value && <CheckIcon />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChangeLanguage
