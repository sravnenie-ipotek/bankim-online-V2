import type { ReactNode } from 'react';

/**
 * Props for LogoWithCircleImage: one component holding the logo and the circular picture.
 * Reused from cooperation (MortgageLoans); import once and use on cooperation + tenders.
 */
export interface LogoWithCircleImageProps {
  /** Logo image source (e.g. Bankimonline mortgage logo) */
  logoSrc: string;
  /** Picture inside the circle (e.g. mortgage photo) */
  imageSrc: string;
  /** Accessible alt for the circle image */
  imageAlt: string;
  /** Direction for RTL/LTR positioning */
  direction: 'ltr' | 'rtl';
  /** Optional additional class names for the root container */
  className?: string;
  /** Optional children (e.g. OneClickBanner) rendered inside the container */
  children?: ReactNode;
  /** When false, children (banner) are not rendered. Default true. */
  showBanner?: boolean;
  /** Optional size variant. Use "tenders" for fixed 398x350 desktop target. */
  sizeVariant?: 'default' | 'tenders';
}
