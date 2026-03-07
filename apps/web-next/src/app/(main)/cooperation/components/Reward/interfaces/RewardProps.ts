export interface RewardProps {
  /** Optional additional class names */
  className?: string;
  /** Content getter for cooperation screen */
  getContent: (key: string) => string;
  /** Text direction for RTL/LTR */
  direction: 'ltr' | 'rtl';
}
