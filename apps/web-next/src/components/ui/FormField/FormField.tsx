'use client';

import React from 'react';
import type { FormFieldProps } from './interfaces/FormFieldProps';

/**
 * Wraps a form control with a label. Use with input/select/textarea for accessibility.
 * @param props.id - Id bound to the control via htmlFor; must match the control's id.
 * @param props.label - Accessible label text (visible or sr-only per visibleLabel).
 * @param props.visibleLabel - If true, label is visible; otherwise visually hidden (sr-only). Default false.
 * @param props.children - The form control (input, select, textarea, etc.).
 */
const FormField: React.FC<FormFieldProps> = ({ id, label, visibleLabel = false, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={visibleLabel ? 'text-sm font-medium text-textTheme-primary' : 'sr-only'}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormField;
