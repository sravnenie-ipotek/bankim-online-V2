'use client';

import React from 'react';

import type { HowItWorksStepCardProps } from './interfaces/HowItWorksStepCardProps';

/**
 * Single step card for "How it works" section.
 * Dark card with title, description, and large yellow step number in bottom-right.
 */
const DEFAULT_WIDTH_CLASS = 'lg:w-[clamp(260px,25.278vw,480px)]';
const DEFAULT_HEIGHT_CLASS = 'h-[clamp(200px,23.611vw,450px)]';

const HowItWorksStepCard: React.FC<HowItWorksStepCardProps> = ({
  step,
  title,
  description,
  direction,
  widthClassName,
  heightClassName,
  textContainerWidthClassName,
  stepTitleClassName,
  stepDescriptionClassName,
  cardBackgroundClassName = '',
  stepNumberClassName = '',
  className = '',
}) => {
  const cardWidthClass = widthClassName ?? DEFAULT_WIDTH_CLASS;
  const cardHeightClass = heightClassName ?? DEFAULT_HEIGHT_CLASS;
  const cardBgClass = cardBackgroundClassName || 'bg-[#2A2B31]';
  const textWrapperClass = `flex-1 flex flex-col min-w-0${textContainerWidthClassName ? ` ${textContainerWidthClassName}` : ''}`;
  const titleClass = stepTitleClassName ?? 'text-[clamp(16px,1.667vw,24px)]';
  const descriptionClass = stepDescriptionClassName ?? 'text-[clamp(14px,1.111vw,16px)]';
  const titleHasColor = titleClass.includes('text-');
  const descHasColor = descriptionClass.includes('text-');
  const titleColorClass = titleHasColor ? '' : 'text-white';
  const descColorClass = descHasColor ? '' : 'text-white/85';
  const stepNumberColorClass = stepNumberClassName || 'text-accent-cooperationHighlight';

  return (
    <div
      dir={direction}
      className={`relative w-full ${cardWidthClass} ${cardHeightClass} rounded-[clamp(8px,0.833vw,12px)] ${cardBgClass} p-[clamp(16px,2.222vw,32px)] flex flex-col ${className}`.trim()}
      role="article"
      aria-label={`Step ${step}: ${title}`}
    >
      <div className={textWrapperClass}>
        <h3 className={`${titleClass} font-medium ${titleColorClass} leading-tight mb-[clamp(8px,0.833vw,12px)]`.trim()}>
          {title}
        </h3>
        <p className={`${descriptionClass} ${descColorClass} leading-relaxed flex-1 whitespace-pre-line`.trim()}>
          {description}
        </p>
      </div>
      <span
        className={`absolute bottom-[clamp(16px,2.222vw,32px)] [dir=rtl]:left-[clamp(16px,2.222vw,32px)] [dir=ltr]:right-[clamp(16px,2.222vw,32px)] text-[clamp(20px,2.153vw,41px)] font-bold ${stepNumberColorClass} leading-none`}
        aria-hidden
      >
        {step}
      </span>
    </div>
  );
};

export default HowItWorksStepCard;
