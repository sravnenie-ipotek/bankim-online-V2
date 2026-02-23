'use client';

import React from 'react';
import type { DateInputProps } from './interfaces/DateInputProps';

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  name,
  title,
  error,
  onBlur,
  disabled = false,
  max,
  min,
  ...rest
}) => {
  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : null;

  return (
    <div className="flex flex-col gap-1 w-full">
      {title ? (
        <label className="text-[0.875rem] not-italic font-normal leading-[140%] text-textTheme-secondary">
          {title}
        </label>
      ) : null}
      <input
        type="date"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        max={max}
        min={min}
        className={`h-14 rounded border bg-base-inputs px-4 text-white text-[1.125rem] font-normal outline-none transition-colors ${
          hasError
            ? 'border-red-500'
            : 'border-base-secondaryDefaultButton focus:border-accent-primary'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} [color-scheme:dark]`}
        data-testid={rest['data-testid']}
      />
      {errorMessage ? <span className="text-red-500 text-xs mt-0.5">{errorMessage}</span> : null}
    </div>
  );
};

export default DateInput;
