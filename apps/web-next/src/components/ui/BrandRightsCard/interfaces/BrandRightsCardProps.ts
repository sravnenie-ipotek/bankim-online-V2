export interface BrandRightsCardProps {
  /** Main card title. */
  title: string;
  /** Icon source displayed at the start of the card. */
  iconSrc: string;
  /** Optional decorative alt text for icon. */
  iconAlt?: string;
  /** Text direction support for RTL/LTR layouts. */
  direction?: 'ltr' | 'rtl';
  /** Optional additional class names for outer card wrapper. */
  className?: string;
}
