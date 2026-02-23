'use client';

import React from 'react';
import type { BurgerMenuProps } from './interfaces/BurgerMenuProps';

/**
 * Tailwind-only burger menu button.
 * Use in Header: LTR = left, RTL = right (place as first flex child; under lg only).
 */
const BurgerMenu: React.FC<BurgerMenuProps> = ({
  onClick,
  isOpen = false,
  ariaLabel = 'Open menu',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      className="flex flex-col justify-center gap-1.5 w-10 h-10 shrink-0 items-center p-2 border-0 bg-transparent cursor-pointer text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded"
    >
      <span
        className={`block w-6 h-0.5 bg-current rounded-full transition-transform duration-200 ease-out ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-current rounded-full transition-opacity duration-200 ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-current rounded-full transition-transform duration-200 ease-out ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </button>
  );
};

export default BurgerMenu;
