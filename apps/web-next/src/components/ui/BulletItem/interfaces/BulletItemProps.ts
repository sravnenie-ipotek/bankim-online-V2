/**
 * Props for BulletItem: one row with bullet icon and description text.
 */
export interface BulletItemProps {
  /** Description text shown next to the bullet. */
  description: string;
  /** Optional text direction for RTL/LTR. */
  direction?: 'ltr' | 'rtl';
  /** Optional additional class names. */
  className?: string;
  /** Optional bullet icon src (e.g. dark-dot.svg for #161616). Defaults to yellow-dot.svg. */
  iconSrc?: string;
  /** Optional class for the description paragraph (e.g. text size). When set, overrides default description style. */
  descriptionClassName?: string;
}
