import type { CSSProperties } from 'react';

/**
 * Props for OneClickBanner: clickable banner with label and optional icon from outside.
 * Size 264×70 at 1440px, all dimensions use clamp for responsiveness.
 * Lives in shared ui: @/components/ui/OneClickBanner.
 */
export interface OneClickBannerProps {
  /** Link URL. */
  href: string;
  /** Banner text (e.g. "Choose mortgages in one click"). */
  label: string;
  /** Text direction: RTL = icon on left, LTR = icon on right. */
  direction: 'ltr' | 'rtl';
  /** Optional icon image src. When not set, uses default hand-pointer icon. */
  iconSrc?: string;
  /** Optional additional class names (e.g. for absolute positioning). */
  className?: string;
  /** Optional className override for label text. */
  labelClassName?: string;
  /** Optional className override for icon wrapper span. */
  iconWrapperClassName?: string;
  /** Optional inline styles — use for physical positioning to bypass tailwindcss-rtl. */
  style?: CSSProperties;
}
