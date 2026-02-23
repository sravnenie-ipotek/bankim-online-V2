import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StorageHelper } from '@/helpers/StorageHelper';
import type { LanguageState } from './interfaces/LanguageState';

const getInitialLanguage = (): string => {
  return StorageHelper.getItem('language') || 'he';
};

const getInitialFont = (language: string): string => {
  if (language === 'he') return 'font-he';
  return 'font-ru';
};

const getInitialDirection = (language: string): 'ltr' | 'rtl' => {
  if (language === 'he') return 'rtl';
  return 'ltr';
};

const initialLanguage = getInitialLanguage();

const initialState: LanguageState = {
  currentFont: getInitialFont(initialLanguage),
  direction: getInitialDirection(initialLanguage),
  language: initialLanguage,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;

      StorageHelper.setItem('language', action.payload);

      if (action.payload === 'ru') {
        state.currentFont = 'font-ru';
        state.direction = 'ltr';
      } else if (action.payload === 'he') {
        state.currentFont = 'font-he';
        state.direction = 'rtl';
      } else if (action.payload === 'en') {
        state.currentFont = 'font-ru'; // Use same font as Russian for English
        state.direction = 'ltr';
      }
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
