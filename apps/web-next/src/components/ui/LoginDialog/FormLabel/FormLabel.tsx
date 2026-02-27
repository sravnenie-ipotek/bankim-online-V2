'use client';

import React from 'react';
import type { FormLabelProps } from './interfaces/FormLabelProps';

const iconWrapperClassName =
  'shrink-0 [&>svg]:w-[clamp(18px,1.5vw,24px)] [&>svg]:h-[clamp(18px,1.5vw,24px)] text-textTheme-primary';

const FormLabel: React.FC<FormLabelProps> = ({ children, htmlFor, icon }) => {
  const baseClassName = 'form-label';
  const withIconClassName = `${baseClassName} inline-flex items-center gap-2 rtl:flex-row-reverse w-fit`;

  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={icon ? withIconClassName : baseClassName}>
        {icon && <span className={iconWrapperClassName}>{icon}</span>}
        {children}
      </label>
    );
  }

  return (
    <span className={icon ? withIconClassName : baseClassName}>
      {icon && <span className={iconWrapperClassName}>{icon}</span>}
      {children}
    </span>
  );
};

export default FormLabel;
