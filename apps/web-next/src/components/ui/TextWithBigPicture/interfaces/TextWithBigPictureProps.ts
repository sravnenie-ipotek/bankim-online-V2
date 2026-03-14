import type { TextWithBigPictureBadgeItem } from './TextWithBigPictureBadgeItem';

export interface TextWithBigPictureProps {
  /** Main text displayed in the right container. */
  text: string;
  /** Optional substring of `text` to render with the color from highlightColorClassName (e.g. red or yellow). Pass color from program. */
  highlightPart?: string;
  /** Color class for the highlighted substring. Must be sent from program (e.g. text-black, text-[#FBE54D]). */
  highlightColorClassName?: string;
  /** Image source for the left picture. */
  pictureSrc: string;
  /** Alt text for the picture. */
  pictureAlt?: string;
  /** Array of icon badge items (icon/iconSrc + text) rendered via IconBanner. */
  iconBadgeItems: TextWithBigPictureBadgeItem[];
  /** Text direction for layout and badges. */
  direction?: 'ltr' | 'rtl';
  /** Optional class name for the root element. */
  className?: string;
  /** Optional button label (text). When set with buttonHref, a button is shown below the text. */
  buttonLabel?: string;
  /** Optional button link (href). When set with buttonLabel, a button is shown below the text. */
  buttonHref?: string;
  /** Optional Tailwind class for button background (e.g. bg-accent-cooperationHighlight). */
  buttonBackgroundClassName?: string;
  /** Optional Tailwind class for button text color (e.g. text-black). */
  buttonTextClassName?: string;
  /** Optional Tailwind class for the button (e.g. max-xs:w-full for full width on mobile XS). */
  buttonClassName?: string;
  /** Optional font size class for the text block (e.g. text-[clamp(18px,2.71vw,39px)]). Passed to TextWithHighlight. */
  fontSizeClassName?: string;
  /** Optional color class for the base text (first part). Sent from program. */
  textColorClassName?: string;
  /** Optional font size class for the highlighted part. Passed to TextWithHighlight. */
  highlightFontSizeClassName?: string;
}
