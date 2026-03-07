/**
 * Props for AboutBox: reusable banner with decorative shapes and optional CTA button.
 * Supports default (colored) and black-and-white variants; shape fill is parameterized.
 */
export interface AboutBoxProps {
  /** Optional description text. When omitted or empty, the description block is not shown. */
  description?: string;
  /** Optional title above the description. */
  title?: string;
  /** Optional button label (e.g. "Register"). When set, a CTA button is shown. */
  buttonLabel?: string;
  /** Optional href for the button. When set, the button is rendered as a link. */
  buttonHref?: string;
  /** Visual variant: default (colored shapes) or black-and-white (dark bg). */
  variant: 'default' | 'blackAndWhite';
  /** Text direction for layout and shape placement. */
  direction: 'ltr' | 'rtl';
  /** Optional fill color for the decorative shapes. If not set, derived from variant. */
  shapeFillColor?: string;
  /** Optional additional class name for the root element. */
  className?: string;
}
