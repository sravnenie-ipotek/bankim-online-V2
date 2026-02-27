'use client';

import React from 'react';
import LogoBox from '@/components/ui/LogoBox/LogoBox';
import MobileMenuCloseButton from './MobileMenuCloseButton';

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
    <div className="flex justify-between items-center min-h-[3.25rem] p-4 px-5 min-[768px]:ps-[35px] min-[768px]:pe-6 md:ps-[46px] md:pe-6">
      <div
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => handleKeyDown(e, onClose)}
        aria-label="Close menu and go to home"
        className="flex items-center"
      >
        <LogoBox src="/static/primary-logo05-1.svg" alt="BankIM" href="/" loading="eager" />
      </div>
      <div className="flex items-center shrink-0">
        <MobileMenuCloseButton onClose={onClose} ariaLabel="Close menu and go to home" />
      </div>
    </div>
  );
};

export default MobileMenuHeader;
