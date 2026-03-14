/**
 * Props for CompanyBanner: full-width banner with configurable background, left content (title, description, optional bullets) and right logo/picture.
 * Used on tenders-for-brokers (with bullets) and tenders-for-lawyers (title + description only).
 */
export interface CompanyBannerProps {
  /** Text direction for RTL/LTR */
  direction: 'ltr' | 'rtl';
  /** Background color class (e.g. bg-accent-cooperationHighlight) */
  backgroundClassName: string;
  /** Banner title */
  title: string;
  /** Optional class name for the title */
  titleClassName?: string;
  /** Optional description below title */
  description?: string;
  /** Optional class name for the description */
  descriptionClassName?: string;
  /** Optional bullets array; when provided, rendered below description (e.g. tenders-for-brokers only) */
  bullets?: string[];
  /** Optional bullet icon src when bullets are used */
  bulletIconSrc?: string;
  /** Optional class name for bullets wrapper when bullets are used */
  bulletsClassName?: string;
  /** Optional class name for each bullet description when bullets are used */
  bulletDescriptionClassName?: string;
  /** Logo image source for the right block */
  logoSrc: string;
  /** Circle/picture image source for the right block */
  imageSrc: string;
  /** Alt text for the circle image */
  imageAlt: string;
  /** Optional size variant for the logo/circle block (e.g. "tenders" for fixed 398x350) */
  logoSizeVariant?: 'default' | 'tenders';
  /** Optional additional class names for the root container */
  className?: string;
}
