'use client';

import React from 'react';
import type { VideoControlBarIconButtonProps } from './interfaces/VideoControlBarIconButtonProps';

const VideoControlBarIconButton: React.FC<VideoControlBarIconButtonProps> = ({
  onClick,
  'aria-label': ariaLabel,
  children,
  compact = false,
  className = '',
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={`inline-flex items-center justify-center text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded transition-colors [&_svg]:text-white ${compact ? 'p-0.5' : 'p-1'} ${className}`}
  >
    {children}
  </button>
);

export default VideoControlBarIconButton;
