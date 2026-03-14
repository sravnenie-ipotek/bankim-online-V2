'use client';

import React from 'react';
import type { WizardFrameProps } from './interfaces/WizardFrameProps';

const WizardFrame: React.FC<WizardFrameProps> = ({
  backLabel,
  submitLabel,
  onBack,
  onSubmit,
  submitDisabled = false,
  direction = 'ltr',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col w-full max-md:w-screen max-md:max-w-none max-md:ml-[calc(50%-50vw)] max-md:mr-[calc(50%-50vw)] max-md:rounded-none max-md:bg-base-sidebarBg max-md:px-4 max-md:pt-4 max-md:pb-4 max-md:box-border ${className}`.trim()}
      dir={direction}
      data-debug-wizard-frame
    >
      <div className="w-full h-px bg-base-stroke shrink-0" aria-hidden="true" />
      <div className={`flex max-md:flex-col-reverse max-md:gap-4 md:flex-row md:gap-4 w-full md:flex-1 max-md:justify-center max-md:pt-4`}>
      <button
        type="button"
        onClick={onBack}
        className="max-md:w-full max-md:h-[clamp(56px,16vw,64px)] md:w-auto md:h-auto px-6 py-3 rounded-lg border border-base-secondaryDefaultButton bg-transparent text-textTheme-primary font-medium hover:bg-base-stroke transition-colors"
        aria-label={backLabel}
      >
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitDisabled}
        className="max-md:w-full max-md:h-[clamp(56px,16vw,64px)] md:w-auto md:h-auto px-6 py-3 rounded-lg bg-base-wizardSubmitButton text-white font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        aria-label={submitLabel}
      >
        {submitLabel}
      </button>
      </div>
    </div>
  );
};

export default WizardFrame;
