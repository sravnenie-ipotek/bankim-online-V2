'use client';

import React from 'react';
import type { MobileMenuCloseButtonProps } from './interfaces/MobileMenuCloseButtonProps';

const handleKeyDown = (e: React.KeyboardEvent, onClose: () => void) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClose();
  }
};

const MobileMenuCloseButton: React.FC<MobileMenuCloseButtonProps> = ({
  onClose,
  ariaLabel = 'Close menu',
}) => {
  return (
    <button
      type="button"
      onClick={onClose}
      onKeyDown={(e) => handleKeyDown(e, onClose)}
      aria-label={ariaLabel}
      className="w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer text-white"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};

export default MobileMenuCloseButton;
