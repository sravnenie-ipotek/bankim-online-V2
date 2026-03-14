export interface FranchiseCostBlockProps {
  /** Content getter for translation keys */
  getContent: (key: string) => string;
  /** Text direction for RTL/LTR */
  direction: 'ltr' | 'rtl';
  /** Click handler for the CTA button */
  onButtonClick?: () => void;
  /** Optional class for the root container */
  className?: string;
}
