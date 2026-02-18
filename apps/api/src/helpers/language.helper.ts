const VALID_LANGUAGES = ['en', 'he', 'ru'] as const;
export type SupportedLanguage = (typeof VALID_LANGUAGES)[number];

export function resolveLanguage(lang: string): SupportedLanguage {
  return VALID_LANGUAGES.includes(lang as SupportedLanguage)
    ? (lang as SupportedLanguage)
    : 'en';
}

export function languageColumn(
  prefix: string,
  lang: SupportedLanguage,
): string {
  return `${prefix}_${lang}`;
}
