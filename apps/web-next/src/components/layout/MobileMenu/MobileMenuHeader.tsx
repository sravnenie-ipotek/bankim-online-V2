'use client';

import React from 'react';
import LogoBox from '@/components/ui/LogoBox/LogoBox';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

const handleKeyDown = (e: React.KeyboardEvent, onClose: () => void) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClose();
  }
};

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex justify-between items-center p-4 px-5 min-[768px]:ps-[35px] min-[768px]:pe-6 md:ps-[46px] md:pe-6">
      <div
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => handleKeyDown(e, onClose)}
        aria-label="Close menu and go to home"
      >
        <LogoBox src="/static/primary-logo05-1.svg" alt="BankIM" href="/" />
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer text-white"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default MobileMenuHeader;
