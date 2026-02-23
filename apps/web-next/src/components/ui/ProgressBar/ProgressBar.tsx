'use client';

import React, { Fragment } from 'react';
import CheckIcon from '@/components/icons/CheckIcon';
import { useWindowResize } from '@/hooks/useWindowResize';
import type { ProgressBarProps } from './interfaces/ProgressBarProps';

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, data }) => {
  const { width } = useWindowResize();
  const currentStep = Number(progress);

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-[#1f2023] py-2.5 flex gap-4 w-full items-center justify-center h-[5.6875rem]">
      <div className="flex items-center justify-between py-5 w-[70.8rem] -ml-[0.1rem] -mt-[0.1rem] max-[1200px]:justify-center max-[1200px]:py-5 max-[1200px]:px-5 max-[768px]:py-[0.6875rem] max-[768px]:px-5 max-[550px]:py-[0.6875rem] max-[550px]:px-5">
        {data.map((item, index) => (
          <Fragment key={index}>
            <div className="flex items-center max-[1200px]:items-start">
              <div className="flex flex-row items-center gap-[0.62rem] max-[1200px]:flex-col max-[1200px]:gap-[0.4rem] max-[768px]:w-20 max-[550px]:w-12">
                <StepCircle stepIndex={index} currentStep={currentStep} />
                <StepLabel
                  label={item}
                  stepIndex={index}
                  currentStep={currentStep}
                  windowWidth={width}
                />
              </div>
            </div>
            {index < data.length - 1 && (
              <StepConnector stepIndex={index} currentStep={currentStep} />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

interface StepCircleProps {
  stepIndex: number;
  currentStep: number;
}

const StepCircle: React.FC<StepCircleProps> = ({ stepIndex, currentStep }) => {
  const stepNumber = stepIndex + 1;
  const isCurrent = currentStep === stepNumber;
  const isCompleted = currentStep > stepNumber;

  const baseClasses =
    'w-8 h-8 rounded-full text-[1.25rem] not-italic font-semibold leading-normal flex items-center justify-center';

  let stateClasses: string;
  if (isCurrent || isCompleted) {
    stateClasses = 'bg-[rgba(251,229,77,1)] text-[#161616]';
  } else {
    stateClasses = 'bg-[rgba(51,53,53,1)] text-[#848484]';
  }

  return (
    <span className={`${baseClasses} ${stateClasses}`}>
      {isCompleted ? <CheckIcon color="#161616" size={20} /> : stepNumber}
    </span>
  );
};

interface StepLabelProps {
  label: string;
  stepIndex: number;
  currentStep: number;
  windowWidth: number;
}

const StepLabel: React.FC<StepLabelProps> = ({ label, stepIndex, currentStep, windowWidth }) => {
  const stepNumber = stepIndex + 1;
  const isCurrent = currentStep === stepNumber;
  const isCompleted = currentStep > stepNumber;

  let textColor: string;
  if (isCurrent) {
    textColor = 'text-white';
  } else if (isCompleted) {
    textColor = 'text-[rgba(251,229,77,1)]';
  } else {
    textColor = 'text-[#848484]';
  }

  // Truncate to first word on smaller screens
  const safeLabel = label || '';
  const displayLabel = windowWidth <= 1200 ? safeLabel.split(' ')[0] : safeLabel;

  return (
    <p
      className={`text-[1.25rem] not-italic font-normal leading-normal max-[768px]:text-xs max-[550px]:text-3xs ${textColor}`}
    >
      {displayLabel}
    </p>
  );
};

interface StepConnectorProps {
  stepIndex: number;
  currentStep: number;
}

const StepConnector: React.FC<StepConnectorProps> = ({ stepIndex, currentStep }) => {
  const isCompleted = currentStep >= stepIndex + 2;

  return (
    <hr
      className={`w-[4.1875rem] h-0.5 border-t-2 max-[1200px]:mt-[14px] max-[768px]:mx-auto max-[768px]:w-12 max-[550px]:mx-auto max-[550px]:w-8 ${
        isCompleted ? 'border-[rgba(251,229,77,1)]' : 'border-[#333535]'
      }`}
    />
  );
};

export default ProgressBar;
