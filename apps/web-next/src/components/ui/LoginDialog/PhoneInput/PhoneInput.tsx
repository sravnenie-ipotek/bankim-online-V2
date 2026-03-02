'use client';

import React, { useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { LanguageFlagHelper } from '@/helpers/LanguageFlagHelper';
import { PhoneFormatHelper } from '@/helpers/PhoneFormatHelper';
import CaretDownIcon from '@/components/icons/CaretDownIcon';
import type { PhoneInputProps } from './interfaces/PhoneInputProps';

const COUNTRY_OPTIONS = [
  { code: '1', lang: 'en' },
  { code: '972', lang: 'he' },
  { code: '7', lang: 'ru' },
] as const;

const DEFAULT_COUNTRY_CODE = '972';

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  onBlur,
  placeholder = '+ 935-234-3344',
  id,
  'aria-label': ariaLabel,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useOutsideClick(() => setIsOpen(false));
  const phoneTextClassName = 'text-[clamp(14px,1.11vw,16px)] leading-[16px]';

  const digits = PhoneFormatHelper.digitsOnly(value);
  const formatted = PhoneFormatHelper.formatWithDashes(digits);
  const prefix = `+${countryCode} `;
  const displayValue = `${prefix}${formatted}`;

  const currentOption =
    COUNTRY_OPTIONS.find((o) => o.code === countryCode) ??
    COUNTRY_OPTIONS.find((o) => o.code === DEFAULT_COUNTRY_CODE)!;

  const handleSelect = (code: string): void => {
    onCountryCodeChange(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`flex items-center w-full min-w-0 max-w-full rounded-lg border border-base-secondaryDefaultButton bg-base-inputs focus-within:border-accent-primary rtl:flex-row-reverse ${className?.includes('h-') ? '' : 'h-[clamp(40px,3.33vw,48px)]'} ${className ?? ''}`.trim()}
      style={{ gap: 'clamp(8px, 1.5vw, 12px)' }}
    >
      <div className="relative shrink-0 w-[clamp(56px,4.86vw,92px)] h-full min-h-[clamp(40px,3.33vw,48px)] flex items-center justify-center border-r border-base-secondaryDefaultButton bg-transparent rtl:border-r-0 rtl:border-l rtl:border-base-secondaryDefaultButton overflow-visible z-50">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full h-full flex items-center justify-center rounded-l rtl:rounded-l-none rtl:rounded-r bg-transparent transition-colors rtl:flex-row-reverse overflow-visible"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="Select country code"
        >
          <span className="flex items-center gap-[clamp(4px,0.5vw,8px)] shrink-0 h-full">
            <span className="flex items-center justify-center shrink-0 w-[clamp(14px,1.571vw,30px)] h-[clamp(10px,1.143vw,22px)] overflow-hidden rounded">
              {LanguageFlagHelper.getFlag(currentOption.lang, {
                circle: false,
                transparentBackground: false,
                className: 'shrink-0 block w-full h-full',
              })}
            </span>
            <span className="flex items-center justify-center shrink-0 h-[clamp(10px,1.143vw,22px)]">
              <CaretDownIcon className="w-[clamp(12px,1.67vw,32px)] h-[clamp(12px,1.67vw,32px)] text-textTheme-primary" aria-hidden />
            </span>
          </span>
        </button>
        {isOpen && (
          <ul
            role="listbox"
            className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-1 z-[1400] min-w-[120px] py-1 rounded border border-base-secondaryDefaultButton bg-base-inputs shadow-lg"
          >
            {COUNTRY_OPTIONS.map((opt) => (
              <li key={opt.code} role="option" aria-selected={countryCode === opt.code}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleSelect(opt.code); }}
                  className={`w-full flex items-center gap-2 text-left rtl:text-right text-textTheme-primary hover:bg-base-secondaryHoveredButton transition-colors ${phoneTextClassName}`}
                  style={{ paddingLeft: 'clamp(8px, 2vw, 12px)', paddingRight: 'clamp(8px, 2vw, 12px)', paddingTop: 'clamp(6px, 1.11vw, 8px)', paddingBottom: 'clamp(6px, 1.11vw, 8px)' }}
                >
                  <span className="flex items-center justify-center shrink-0 w-[clamp(14px,1.571vw,30px)] h-[clamp(10px,1.143vw,22px)] overflow-hidden rounded pointer-events-none">
                    {LanguageFlagHelper.getFlag(opt.lang, {
                      circle: false,
                      transparentBackground: false,
                      className: 'shrink-0 block w-full h-full',
                    })}
                  </span>
                  <span className="pointer-events-none">+{opt.code}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={displayValue}
        onChange={(e) => {
          const raw = e.target.value;
          const withoutPrefix = raw.startsWith(prefix)
            ? raw.slice(prefix.length)
            : raw.replace(/^\+\d*\s*/, '');
          const digitsOnly = PhoneFormatHelper.digitsOnly(withoutPrefix);
          onChange(digitsOnly);
        }}
        onKeyDown={(e) => {
          const input = e.currentTarget;
          const selStart = input.selectionStart ?? 0;
          if ((e.key === 'Backspace' || e.key === 'Delete') && selStart <= prefix.length) {
            e.preventDefault();
          }
        }}
        onSelect={(e) => {
          const input = e.currentTarget;
          if ((input.selectionStart ?? 0) < prefix.length) {
            input.setSelectionRange(prefix.length, Math.max(prefix.length, input.selectionEnd ?? prefix.length));
          }
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        dir="ltr"
        aria-label={ariaLabel}
        className={`flex-1 min-w-0 h-full bg-transparent border-0 text-textTheme-secondary placeholder:text-textTheme-secondary outline-none focus:ring-0 ${phoneTextClassName} autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_hsl(219,10%,27%)] autofill:[-webkit-text-fill-color:hsla(0,0%,82%,1)]`}
        style={{ paddingLeft: 'clamp(8px, 2vw, 12px)', paddingRight: 'clamp(8px, 2vw, 12px)' }}
      />
    </div>
  );
};

export default PhoneInput;
