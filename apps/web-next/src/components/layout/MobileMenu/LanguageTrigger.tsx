'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useContentApi } from '@hooks/useContentApi';
import { LanguageFlagHelper } from '@/helpers/LanguageFlagHelper';
import { LANGUAGE_ITEMS } from './constants/languageItems';
import type { LanguageTriggerProps } from './interfaces/LanguageTriggerProps';

const LanguageTrigger: React.FC<LanguageTriggerProps> = ({ onOpen }) => {
  const { i18n } = useTranslation();
  const { getContent } = useContentApi('global_components');
  const currentLang = i18n.language || 'he';
  const currentItem = LANGUAGE_ITEMS.find((item) => item.value === currentLang) ?? LANGUAGE_ITEMS[1];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-haspopup="listbox"
      aria-label={getContent('sel_cntr')}
      className="flex items-center justify-between py-2 px-2 rounded-md cursor-pointer hover:bg-base-secondaryHoveredButton transition-colors mb-4"
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="shrink-0">{LanguageFlagHelper.getFlag(currentItem.value)}</div>
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-[0.875rem] font-normal leading-[140%] text-white">
            {getContent(currentItem.countryKey)}
          </span>
          <span className="text-3xs font-normal leading-[140%] text-textTheme-secondary">
            {getContent(currentItem.languageKey)}
          </span>
        </div>
      </div>
      <span className="text-white shrink-0 ms-2 text-[1rem]" aria-hidden="true">
        &gt;
      </span>
    </div>
  );
};

export default LanguageTrigger;
