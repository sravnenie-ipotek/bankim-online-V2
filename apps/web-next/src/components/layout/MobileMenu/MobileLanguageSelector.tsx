'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageHelper } from '@/helpers/languageHelper';
import { useContentApi } from '@hooks/useContentApi';
import { LanguageFlagHelper } from '@/helpers/LanguageFlagHelper';
import CheckIcon from '@/components/icons/CheckIcon';
import { useAppDispatch } from '@/hooks/store';
import { changeLanguage } from '@/store/slices/languageSlice';
import type { LanguageItem } from './interfaces/LanguageItem';

const LANGUAGE_ITEMS: LanguageItem[] = [
  { value: 'en', countryKey: 'country_us', languageKey: 'language_english' },
  { value: 'he', countryKey: 'country_israel', languageKey: 'language_hebrew' },
  { value: 'ru', countryKey: 'country_russia', languageKey: 'language_russian' },
];

const MobileLanguageSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { getContent } = useContentApi('global_components');
  const currentLang = i18n.language || 'he';

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await i18n.changeLanguage(newLanguage);
      dispatch(changeLanguage(newLanguage));
      LanguageHelper.applyLanguageDirection(newLanguage);
      LanguageHelper.persistLanguage(newLanguage);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <div className="mb-4 text-left rtl:flex-row-reverse">
      <div className="pb-2 text-[14px] font-semibold text-textTheme-secondary text-left rtl:text-right">
        {getContent('sel_cntr')}
      </div>
      <div className="flex flex-col gap-1">
        {LANGUAGE_ITEMS.map((item) => (
          <div
            key={item.value}
            className="flex items-center justify-between py-2 px-2 rounded-md cursor-pointer hover:bg-base-secondaryHoveredButton transition-colors "
            onClick={() => handleLanguageChange(item.value)}
            role="option"
            aria-selected={currentLang === item.value}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLanguageChange(item.value);
              }
            }}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="shrink-0">{LanguageFlagHelper.getFlag(item.value)}</div>
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="text-[0.875rem] font-normal leading-[140%] text-white">
                  {getContent(item.countryKey)}
                </span>
                <span className="text-3xs font-normal leading-[140%] text-textTheme-secondary">
                  {getContent(item.languageKey)}
                </span>
              </div>
            </div>
            {currentLang === item.value && (
              <CheckIcon size={16} aria-hidden className="shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileLanguageSelector;
