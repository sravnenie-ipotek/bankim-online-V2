/**
 * Props for FormCtaBanner: full-width banner with optional background image,
 * title (supports multi-line via \n), and CTA button with optional mobile label.
 */

export interface FormCtaBannerProps {
  /** Main title; use \n for multiple lines (rendered with whitespace-pre-line). */
  title: string;
  /** Button label (desktop). */
  buttonLabel: string;
  /** Optional button label for mobile viewport. */
  buttonLabelMobile?: string;
  /** Button link href. */
  buttonHref: string;
  /** Text direction for layout and RTL. */
  direction: 'ltr' | 'rtl';
  /** Optional callback when the CTA button is clicked (e.g. for analytics). */
  onButtonClick?: () => void;
  /** Optional class for the title (e.g. text-tenders-brokers-title). */
  titleClassName?: string;
  /** Optional class for the root container (e.g. override max-md size: max-md:!max-w-[...] max-md:!min-h-[...]). */
  className?: string;
  /** Optional class for the inner content div (e.g. override max-md gap and min-h). */
  innerContentClassName?: string;
  /** When true, show background image; when false, use solid background (e.g. bg-techrealt-containers). Default true. */
  showBackgroundImage?: boolean;
  /** Optional custom background image src (LTR). When not provided and showBackgroundImage true, use default. */
  backgroundImageSrc?: string;
  /** Optional custom background image src (RTL). When not provided and showBackgroundImage true, use default. */
  backgroundImageSrcRtl?: string;
  /** Optional class for container background when showBackgroundImage is false. Default: bg-techrealt-containers. */
  backgroundClassName?: string;
  /** Optional class for the CTA button (e.g. override default bg-techrealt-containers). */
  buttonClassName?: string;
  /** Optional class for the CTA button border (e.g. border border-techrealt-buttonBorder). */
  buttonBorderClassName?: string;
  /** When true, banner uses full width of parent and no extra margin/padding so it aligns with page layout. */
  alignToLayout?: boolean;
  /** Optional input placeholder; when set, an input is rendered between title and button. */
  inputPlaceholder?: string;
  /** Optional input name (e.g. for form submit). */
  inputName?: string;
  /** Optional select options { value, label }; when set, a select is rendered between title and button. */
  selectOptions?: { value: string; label: string }[];
  /** Optional select placeholder (first option label). */
  selectPlaceholder?: string;
  /** Optional select name (e.g. for form submit). */
  selectName?: string;
  /** Optional class for the inner Container that wraps title, form fields, and button. */
  containerClassName?: string;
}
