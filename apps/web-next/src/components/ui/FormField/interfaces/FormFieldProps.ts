import type { ReactNode } from 'react';

/**
 * Props for FormField: label + form control with optional visible label.
 */
export interface FormFieldProps {
  id: string;
  label: string;
  /** If true, label is visible; otherwise sr-only (visually hidden). Default false. */
  visibleLabel?: boolean;
  children: ReactNode;
}
