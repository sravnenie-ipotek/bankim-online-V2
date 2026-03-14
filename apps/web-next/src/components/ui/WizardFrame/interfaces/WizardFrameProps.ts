/**
 * Props for WizardFrame: wizard-style back and submit/next buttons.
 */

export interface WizardFrameProps {
  /** Label for the back button (e.g. "Back" / "Назад" / "חזור"). */
  backLabel: string;
  /** Label for the submit/next button (e.g. "Submit" / "Отправить" / "שלח"). */
  submitLabel: string;
  /** Called when the back button is clicked. */
  onBack: () => void;
  /** Called when the submit/next button is clicked. */
  onSubmit: () => void;
  /** When true, the submit button is disabled. */
  submitDisabled?: boolean;
  /** Text direction for layout. */
  direction?: 'ltr' | 'rtl';
  /** Optional class name for the root container. */
  className?: string;
}
