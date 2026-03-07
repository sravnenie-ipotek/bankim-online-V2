/**
 * Props for MortgageLoans: circular image with clamp sizing.
 */
export interface MortgageLoansProps {
  /** Text direction: RTL = image 46px from left, LTR = image 46px from right. */
  direction: 'ltr' | 'rtl';
  /** Content resolver (e.g. from useContentApi). Used for banner label, no fallback. */
  getContent: (key: string) => string;
  /** Accessible label for the image. */
  alt?: string;
  /** Optional additional class names. */
  className?: string;
  /** Banner link URL. If set, the banner is clickable. */
  bannerHref?: string;
}
