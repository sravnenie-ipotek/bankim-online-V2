export interface HowItWorksSectionProps {
  /** Content getter for cooperation screen */
  getContent: (key: string) => string;
  /** Text direction for RTL/LTR */
  direction: 'ltr' | 'rtl';
}
