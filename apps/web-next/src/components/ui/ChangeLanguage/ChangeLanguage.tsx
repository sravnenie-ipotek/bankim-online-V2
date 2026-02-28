'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useOutsideClick from '@/hooks/useOutsideClick';
import { LanguageHelper } from '@/helpers/languageHelper';
import { useContentApi } from '@hooks/useContentApi';
import { LanguageFlagHelper } from '@/helpers/LanguageFlagHelper';
import CaretDownIcon from '@/components/icons/CaretDownIcon';
import CaretUpIcon from '@/components/icons/CaretUpIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import { useAppDispatch } from '@/hooks/store';
import { changeLanguage } from '@/store/slices/languageSlice';

interface LanguageOption {
  value: string;
  countryKey: string;
  languageKey: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'en', countryKey: 'country_us', languageKey: 'language_english' },
  { value: 'he', countryKey: 'country_israel', languageKey: 'language_hebrew' },
  { value: 'ru', countryKey: 'country_russia', languageKey: 'language_russian' },
];

const ChangeLanguage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { getContent } = useContentApi('global_components');

  const wrapperRef = useOutsideClick(() => setIsOpen(false));

  const currentLang = i18n.language || 'he';
  const selectedOption =
    LANGUAGE_OPTIONS.find((opt) => opt.value === currentLang) || LANGUAGE_OPTIONS[1];

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await i18n.changeLanguage(newLanguage);
      dispatch(changeLanguage(newLanguage));
      LanguageHelper.applyLanguageDirection(newLanguage);
      LanguageHelper.persistLanguage(newLanguage);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <div ref={wrapperRef} className="shrink-0 relative w-[230px] h-[54px]">
      {/* Trigger button */}
      <div
        className="rounded-md flex items-center justify-between px-4 border border-base-secondaryDefaultButton bg-base-primary cursor-pointer w-full h-full box-border text-left rtl:text-right"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="bg-transparent flex gap-2 items-center justify-start rtl:justify-end flex-1 min-w-0 rtl:flex-initial rtl:min-w-0 rtl:flex-row-reverse">
          <div>{LanguageFlagHelper.getFlag(selectedOption.value)}</div>
          <div className="flex flex-col items-start rtl:items-end justify-center gap-0.5 flex-1 min-w-0 rtl:flex-initial">
            <span className="text-3xs not-italic font-semibold leading-normal text-[#d0d0d0] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {getContent('country')}
            </span>
            <span className="text-white text-[clamp(1rem,0.95rem+0.3vw,1.125rem)] not-italic font-normal leading-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
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
        <div className="absolute mt-2.5 z-dropdown rounded-md py-2 w-[520px] h-[540px] border border-base-secondaryDefaultButton bg-base-secondary shadow-[0px_8px_32px_0px_rgba(0,0,0,0.16)] overflow-auto text-left rtl:text-right">
          <div className="text-3xs not-italic font-semibold leading-normal text-white py-2 px-4">
            <span>{getContent('sel_cntr')}</span>
          </div>
          <div className="w-full border-t border-base-stroke" />
          {LANGUAGE_OPTIONS.map((item) => (
            <div
              key={item.value}
              tabIndex={0}
              className="flex items-center cursor-pointer justify-between py-2 px-4 hover:bg-base-secondaryHoveredButton transition-colors rtl:flex-row-reverse"
              onClick={() => handleLanguageChange(item.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleLanguageChange(item.value);
                }
              }}
              role="option"
              aria-selected={currentLang === item.value}
            >
              <div className="flex items-center gap-2 cursor-pointer rtl:flex-row-reverse">
                <div>{LanguageFlagHelper.getFlag(item.value)}</div>
                <div className="flex flex-col items-start rtl:items-end">
                  <span className="text-[clamp(0.75rem,0.85rem+0.15vw,0.875rem)] not-italic font-normal leading-[140%] text-white">
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
  );
};

export default ChangeLanguage;
