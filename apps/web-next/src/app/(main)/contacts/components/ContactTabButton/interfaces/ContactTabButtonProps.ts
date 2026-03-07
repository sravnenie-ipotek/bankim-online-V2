/**
 * Props for ContactTabButton: icon (optional), text label, direction, and active state.
 */
export interface ContactTabButtonProps {
  /** Optional icon URL (e.g. for General questions). */
  icon?: string;
  /** Button label text. */
  text: string;
  /** Content direction: 'ltr' or 'rtl'. */
  direction: 'ltr' | 'rtl';
  /** Whether this tab is active. */
  isActive: boolean;
  /** Click handler. */
  onClick: () => void;
}
