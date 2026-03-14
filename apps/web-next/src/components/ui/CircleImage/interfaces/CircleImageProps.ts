/**
 * Props for CircleImage: circular image with optional border (e.g. teal).
 * Reused from cooperation MortgageLoans "picture + circle" layout.
 */
export interface CircleImageProps {
  /** Image source URL */
  imageSrc: string;
  /** Accessible alt text for the image */
  imageAlt: string;
  /** Direction for positioning: RTL = circle on left edge, LTR = on right edge */
  direction: 'ltr' | 'rtl';
  /** Optional additional class names for the circle wrapper */
  className?: string;
  /** Optional border color (e.g. teal) — applied as ring or border */
  borderColor?: string;
  /** Optional width/height override; default uses clamp(85px, 8.403vw, 160px) */
  sizeClassName?: string;
}
