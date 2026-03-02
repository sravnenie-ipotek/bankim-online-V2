'use client';

import React from 'react';
import type { FormErrorProps } from './interfaces/FormErrorProps';

const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;

  const message = typeof error === 'string' ? error : 'An error occurred';

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded bg-error-validation border border-error-validation mt-1">
      <img
        src="/static/error-icon.svg"
        alt=""
        width={16}
        height={16}
        className="shrink-0"
        aria-hidden
      />
      <span className="text-xs text-white font-normal leading-[140%]">{message}</span>
    </div>
  );
};

export default FormError;
