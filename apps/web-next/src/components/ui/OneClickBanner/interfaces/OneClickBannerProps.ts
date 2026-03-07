import type { CSSProperties } from 'react';

/**
 * Props for OneClickBanner: clickable banner with label and hand icon.
 * Size 264×70 at 1440px, all dimensions use clamp for responsiveness.
 */
export interface OneClickBannerProps {
  /** Link URL. */
  href: string;
  /** Banner text (e.g. "Choose mortgages in one click"). */
  label: string;
  /** Text direction: RTL = icon on left, LTR = icon on right. */
  direction: 'ltr' | 'rtl';
  /** Optional additional class names (e.g. for absolute positioning). */
  className?: string;
  /** Optional inline styles — use for physical positioning to bypass tailwindcss-rtl. */
  style?: CSSProperties;
}
