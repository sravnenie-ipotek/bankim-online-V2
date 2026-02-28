'use client';

import React, { useState, useCallback, useEffect } from 'react';
import type { FormattedInputProps } from './interfaces/FormattedInputProps';

function formatNumberWithCommas(num: number | null): string {
  if (num === null || num === undefined) return '';
  return num.toLocaleString('en-US');
}

function parseFormattedNumber(str: string): number | null {
  const cleaned = str.replace(/,/g, '').replace(/[^\d.-]/g, '');
  if (cleaned === '' || cleaned === '-') return null;
  const parsed = Number(cleaned);
  return isNaN(parsed) ? null : parsed;
}

const FormattedInput: React.FC<FormattedInputProps> = ({
  value,
  onChange,
  name,
  title,
  placeholder,
  currencySymbol = '₪',
  error,
  onBlur,
  disabled = false,
  ...rest
}) => {
  const [displayValue, setDisplayValue] = useState<string>(formatNumberWithCommas(value));

  useEffect(() => {
    setDisplayValue(formatNumberWithCommas(value));
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // Allow only digits, commas, dots
      const sanitized = raw.replace(/[^\d,.-]/g, '');
      setDisplayValue(sanitized);
      const parsed = parseFormattedNumber(sanitized);
      onChange(parsed);
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    // Re-format on blur
    setDisplayValue(formatNumberWithCommas(value));
    onBlur?.();
  }, [value, onBlur]);

  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : null;

  return (
    <div className="flex flex-col gap-1 w-full">
      {title ? (
        <label className="text-[clamp(0.75rem,0.85rem+0.15vw,0.875rem)] not-italic font-normal leading-[140%] text-textTheme-secondary">
          {title}
        </label>
      ) : null}
      <div
        className={`flex items-center h-14 rounded border bg-base-inputs px-4 transition-colors ${
          hasError
            ? 'border-red-500'
            : 'border-base-secondaryDefaultButton focus-within:border-accent-primary'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="text-textTheme-secondary text-[clamp(0.875rem,0.9rem+0.2vw,1rem)] mr-2 shrink-0">{currencySymbol}</span>
        <input
          type="text"
          inputMode="numeric"
          name={name}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-white text-[clamp(0.9375rem,0.95rem+0.3vw,1.125rem)] font-normal placeholder:text-[#848484]"
          data-testid={rest['data-testid']}
        />
      </div>
      {errorMessage ? <span className="text-red-500 text-xs mt-0.5">{errorMessage}</span> : null}
    </div>
  );
};

export default FormattedInput;
