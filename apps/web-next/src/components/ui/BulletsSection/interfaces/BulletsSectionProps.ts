/**
 * Layout mode for the bullets list: horizontal = 2 columns, vertical = single column.
 */
export type BulletsSectionLayout = 'horizontal' | 'vertical';

export interface BulletsSectionProps {
  /** Text direction for RTL/LTR. */
  direction: 'ltr' | 'rtl';
  /** Layout: horizontal = bullets in 2 columns, vertical = bullets in 1 column. */
  layout: BulletsSectionLayout;
  /** Full class name for the container (e.g. width/size). Merged with layout classes. */
  containerClassName?: string;
  /** Optional title rendered above description. */
  title?: string;
  /** Class name for the title element. */
  titleClassName?: string;
  /** Optional word to highlight in the title (e.g. brand name). */
  titleHighlightWord?: string;
  /** Tailwind class for highlight color (e.g. text-accent-cooperationHighlight). Prefer over titleHighlightColor. */
  titleHighlightClassName?: string;
  /** Inline color for titleHighlightWord when titleHighlightClassName is not set (e.g. #FBE54D). */
  titleHighlightColor?: string;
  /** Optional description rendered below title. */
  description?: string;
  /** Class name for the description element. */
  descriptionClassName?: string;
  /** Bullet items as text array. */
  bulletsText: string[];
  /** Class name for the bullets wrapper (e.g. text-base-border for #161616). */
  bulletsClassName?: string;
  /** Optional class for each bullet description paragraph (e.g. text-[clamp(16px,4.1vw,20px)] for mobile). */
  bulletDescriptionClassName?: string;
  /** Optional bullet icon src (e.g. dark-dot.svg for #161616). When set, overrides default yellow dot. */
  bulletIconSrc?: string;
  /** Optional button label. When set and showButton is not false, a button is rendered; use onButtonClick for the event. */
  buttonLabel?: string;
  /** When false, the button is not rendered. When true or undefined, button is shown if buttonLabel is set. */
  showButton?: boolean;
  /** Button click handler. Use with buttonLabel. */
  onButtonClick?: () => void;
}
