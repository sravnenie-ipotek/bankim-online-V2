import type { ReactNode } from 'react';

export type VacancyTagIconType = 'tag' | 'location' | 'nis';

export interface VacancyTagProps {
  children: ReactNode;
  className?: string;
  /** tag (default), location (map pin), nis (₪). */
  iconType?: VacancyTagIconType;
  /** Icon path from content/DB; same for all languages. When set and valid, overrides default for iconType. */
  iconSrc?: string;
  /** When false, render without pill background (icon + text only). Default true. */
  showBackground?: boolean;
}
