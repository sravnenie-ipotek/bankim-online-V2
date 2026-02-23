import type React from 'react';

export interface LanguageItem {
  value: string;
  countryKey: string;
  languageKey: string;
  icon: React.ReactNode;
}
