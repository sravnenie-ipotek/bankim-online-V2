'use client';

import React, { useCallback } from 'react';
import type { VideoControlBarSliderProps } from './interfaces/VideoControlBarSliderProps';

const VideoControlBarSlider: React.FC<VideoControlBarSliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 0.01,
  onChange,
  onCommit,
  'aria-label': ariaLabel,
  compact = false,
  className = '',
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLInputElement>) => {
      const target = e.currentTarget;
      onChange(Number(target.value));
      onCommit?.(Number(target.value));
    },
    [onChange, onCommit]
  );

  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      onPointerUp={onCommit ? handlePointerUp : undefined}
      aria-label={ariaLabel}
      className={`video-control-range w-full ${compact ? 'video-control-range--compact' : ''} ${className}`.trim()}
      style={{
        background: `linear-gradient(to right, #fff 0%, #fff ${percent}%, rgba(255,255,255,0.5) ${percent}%, rgba(255,255,255,0.5) 100%)`,
      }}
    />
  );
};

export default VideoControlBarSlider;
