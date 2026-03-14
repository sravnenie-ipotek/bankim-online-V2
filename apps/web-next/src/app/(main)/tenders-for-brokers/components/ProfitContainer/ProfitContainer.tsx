'use client';

import React from 'react';

import { TextWithIcon } from '@/components/ui/TextWithIcon';
import type { ProfitContainerProps } from './interfaces/ProfitContainerProps';

const DEFAULT_LABEL_CLASS = 'text-tenders-brokers-title font-semibold text-white text-left rtl:text-right';
const DEFAULT_BLOCK_BG_CLASS = 'bg-base-sidebarBg rounded-[clamp(8px,1.111vw,16px)] px-[clamp(16px,2.083vw,30px)] py-[clamp(14px,1.667vw,24px)] h-full';

const ProfitContainer: React.FC<ProfitContainerProps> = ({
  direction,
  label,
  title,
  description,
  showButton = false,
  buttonLabel = '',
  iconSrc,
  blockBackgroundClassName,
  labelClassName,
  titleClassName,
  descriptionClassName,
  iconClassName,
  iconWrapperClassName,
  className = '',
}) => {
  return (
    <div
      dir={direction}
      className={`w-full min-w-0 ${className}`.trim()}
    >
      <div className="flex flex-col md:flex-row items-start md:items-stretch gap-[clamp(16px,4.167vw,60px)] md:gap-0 w-full">
        <div className="flex flex-col items-start justify-center min-w-0 w-full order-1 md:w-[clamp(220px,34.159vw,386px)] md:h-[286px] md:px-[clamp(16px,2.083vw,30px)]">
          <h3 className={labelClassName ?? DEFAULT_LABEL_CLASS}>{label}</h3>
        </div>
        <div className="flex flex-col items-start justify-center min-w-0 w-full md:flex-1 md:h-[286px] order-2">
          <TextWithIcon
            title={title}
            description={description}
            iconSrc={iconSrc}
            showButton={showButton}
            buttonLabel={buttonLabel}
            textWhite
            compactTitleDescription
            titleToDescriptionGapClassName="gap-2"
            titleClassName={titleClassName}
            descriptionClassName={descriptionClassName}
            iconClassName={iconClassName}
            iconWrapperClassName={iconWrapperClassName}
            className="h-full"
            backgroundClassName={blockBackgroundClassName ?? DEFAULT_BLOCK_BG_CLASS}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfitContainer;
