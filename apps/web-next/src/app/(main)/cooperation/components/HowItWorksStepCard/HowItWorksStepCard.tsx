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
  className = '',
}) => {
  const cardWidthClass = widthClassName ?? DEFAULT_WIDTH_CLASS;
  const cardHeightClass = heightClassName ?? DEFAULT_HEIGHT_CLASS;

  return (
    <div
      dir={direction}
      className={`relative w-full ${cardWidthClass} ${cardHeightClass} rounded-[clamp(8px,0.833vw,12px)] bg-[#2A2B31] p-[clamp(16px,2.222vw,32px)] flex flex-col ${className}`.trim()}
      role="article"
      aria-label={`Step ${step}: ${title}`}
    >
      <h3 className="text-[clamp(16px,1.667vw,24px)] font-medium text-white leading-tight mb-[clamp(8px,0.833vw,12px)]">
        {title}
      </h3>
      <p className="text-[clamp(14px,1.111vw,16px)] text-white/85 leading-relaxed flex-1 whitespace-pre-line">
        {description}
      </p>
      <span
        className="absolute bottom-[clamp(16px,2.222vw,32px)] [dir=rtl]:left-[clamp(16px,2.222vw,32px)] [dir=ltr]:right-[clamp(16px,2.222vw,32px)] text-[clamp(20px,2.153vw,41px)] font-bold text-accent-cooperationHighlight leading-none"
        aria-hidden
      >
        {step}
      </span>
    </div>
  );
};

export default HowItWorksStepCard;
