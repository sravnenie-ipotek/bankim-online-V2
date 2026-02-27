'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageHelper } from '@/helpers/languageHelper';
import { useContentApi } from '@hooks/useContentApi';
import { LanguageFlagHelper } from '@/helpers/LanguageFlagHelper';
import CheckIcon from '@/components/icons/CheckIcon';
import { useAppDispatch } from '@/hooks/store';
import { changeLanguage } from '@/store/slices/languageSlice';
import MobileMenuCloseButton from './MobileMenuCloseButton';
import { LANGUAGE_ITEMS } from './constants/languageItems';
import type { LanguageSubMenuProps } from './interfaces/LanguageSubMenuProps';
import type { LanguageItem } from './interfaces/LanguageItem';

const LanguageSubMenu: React.FC<LanguageSubMenuProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { getContent } = useContentApi('global_components');
  const currentLang = i18n.language || 'he';

  const handleLanguageChange = async (item: LanguageItem) => {
    try {
      await i18n.changeLanguage(item.value);
      dispatch(changeLanguage(item.value));
      LanguageHelper.applyLanguageDirection(item.value);
      LanguageHelper.persistLanguage(item.value);
      onClose();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: LanguageItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLanguageChange(item);
    }
  };

  return (
    <div
      className={`fixed top-0 h-full w-full bg-base-primary z-[10003] transition-all duration-300 ease-in-out
        ${isOpen ? 'ltr:left-0 rtl:right-0' : 'ltr:-left-full rtl:-right-full rtl:left-auto'}
      `}
    >
      <div className="flex justify-end items-center p-4 px-5 min-[768px]:ps-[35px] min-[768px]:pe-6 md:ps-[46px] md:pe-6">
        <MobileMenuCloseButton onClose={onClose} ariaLabel="Close language selector" />
      </div>
      <div className="p-6 pt-4 px-5 min-[768px]:ps-[35px] min-[768px]:pe-6 md:ps-[46px] md:pe-6 text-left rtl:text-right">
        <div className="flex flex-col gap-1" role="listbox" aria-label={getContent('sel_cntr')}>
          {LANGUAGE_ITEMS.map((item) => (
            <div
              key={item.value}
              role="option"
              aria-selected={currentLang === item.value}
              tabIndex={0}
              onClick={() => handleLanguageChange(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              className="flex items-center justify-between py-3 px-2 rounded-md cursor-pointer hover:bg-base-secondaryHoveredButton transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="shrink-0">{LanguageFlagHelper.getFlag(item.value)}</div>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <span className="text-[1rem] font-normal leading-[140%] text-white">
                    {getContent(item.countryKey)}
                  </span>
                  <span className="text-[0.75rem] font-normal leading-[140%] text-textTheme-secondary">
                    {getContent(item.languageKey)}
                  </span>
                </div>
              </div>
              {currentLang === item.value && (
                <CheckIcon size={16} aria-hidden className="shrink-0 text-accent-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSubMenu;
