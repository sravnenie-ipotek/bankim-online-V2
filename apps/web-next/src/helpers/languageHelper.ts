import { StorageHelper } from './StorageHelper';

/**
 * Shared helpers for language/direction and persistence.
 * Used by ChangeLanguage and MobileLanguageSelector.
 */
export class LanguageHelper {
  static applyLanguageDirection(lang: string): void {
    const dir = lang === 'he' ? 'rtl' : 'ltr';
    if (typeof document === 'undefined') return;
    document.documentElement.dir = dir;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.lang = lang;
  }

  static persistLanguage(lang: string): void {
    StorageHelper.setItem('language', lang);
    StorageHelper.setItem('i18nextLng', lang);
  }
}
