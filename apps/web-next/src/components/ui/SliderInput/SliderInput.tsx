'use client';

import React, { useState, useCallback, useEffect } from 'react';
import FormattedInput from '@/components/ui/FormattedInput/FormattedInput';
import type { SliderInputProps } from './interfaces/SliderInputProps';

function formatLabel(num: number, units?: string): string {
  const formatted = num.toLocaleString('en-US');
  return units ? `${formatted} ${units}` : formatted;
}

const SliderInput: React.FC<SliderInputProps> = ({
  value,
  min,
  max,
  name,
  title,
  onChange,
  error,
  currencySymbol = '₪',
  disableRangeValues = false,
  unitsMin,
  unitsMax,
  tooltip: _tooltip,
  disabled = false,
  ...rest
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = useCallback(
    (val: number | null) => {
      if (val === null) return;
      const clamped = Math.max(min, Math.min(max, val));
      setLocalValue(clamped);
      onChange(clamped);
    },
    [min, max, onChange]
  );

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      setLocalValue(val);
      onChange(val);
    },
    [onChange]
  );

  // Calculate percentage for slider track fill
  const safeMax = max > min ? max : min + 1;
  const percentage = ((localValue - min) / (safeMax - min)) * 100;

  return (
    <div className="flex flex-col gap-1 w-full">
      <FormattedInput
        value={localValue}
        onChange={handleInputChange}
        name={name}
        title={title}
        currencySymbol={currencySymbol}
        error={error}
        disabled={disabled}
        data-testid={rest['data-testid']}
      />
      <div className="w-full px-1 mt-1">
        <input
          type="range"
          min={min}
          max={safeMax}
          value={localValue}
          onChange={handleSliderChange}
          disabled={disabled}
          className="w-full h-1 appearance-none rounded-full cursor-pointer disabled:cursor-not-allowed accent-[rgba(251,229,77,1)]"
          style={{
            background: `linear-gradient(to right, rgba(251,229,77,1) 0%, rgba(251,229,77,1) ${percentage}%, #333535 ${percentage}%, #333535 100%)`,
          }}
          dir="ltr"
        />
        {!disableRangeValues && (
          <div className="flex justify-between mt-1">
            <span className="text-3xs text-[#848484]">{formatLabel(min, unitsMin)}</span>
            <span className="text-3xs text-[#848484]">{formatLabel(safeMax, unitsMax)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderInput;
