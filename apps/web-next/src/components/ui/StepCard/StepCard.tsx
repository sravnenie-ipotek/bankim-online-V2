'use client';

import React from 'react';
import Image from 'next/image';
import type { StepCardProps } from './interfaces/StepCardProps';

/**
 * Breakpoint-based: xs 375 | sm 768 | md 1024 | lg 1440 (364×222) | xl 1920 (485×296).
 * When fillWidth, parent (HowItWorks) sets width; card uses 100% + min-height per breakpoint.
 */
const StepCard: React.FC<StepCardProps> = React.memo(
  ({
    iconSrc,
    iconAlt,
    stepNumber,
    title,
    description,
    descriptionTablet,
    imageSrc,
    imageAlt,
    fillWidth = false,
  }) => {
    const rootMinHeight = 'min-h-[clamp(158px,18vh,296px)]';
    const rootClassName = fillWidth
      ? `relative overflow-hidden w-full h-full ${rootMinHeight} lg:h-[clamp(222px,15.4vw,296px)] xs:w-full`
      : `relative overflow-hidden w-full xs:w-full sm:w-[clamp(247px,32vw,333px)] md:w-[333px] lg:w-[clamp(364px,25.3vw,485px)] lg:min-h-[222px] lg:h-[clamp(222px,15.4vw,296px)] xl:w-[485px] xl:h-[296px] ${rootMinHeight}`;

    return (
      <div className={rootClassName}>
        <div className="relative box-border h-full py-[clamp(12px,10%,24px)] px-[clamp(12px,6%,24px)] xs:w-full sm:px-0 lg:py-0 lg:px-0">
              <div className="w-full h-full max-w-full lg:w-[clamp(316px,25.3vw,485px)] lg:min-w-0 lg:max-w-full lg:h-[clamp(222px,15.4vw,296px)] xl:h-[296px] lg:relative lg:flex lg:items-center lg:justify-center">
            {/* Inner content box: 316×135 mobile; 316×150 at lg (1100×531); clamp at lg+. */}
            <div className="w-[316px] max-w-full min-w-0 h-[135px] min-h-[135px] sm:h-[150px] sm:min-h-0 lg:w-[clamp(260px,28.7vw,316px)] lg:h-[clamp(120px,28.25vh,150px)] lg:min-h-0 lg:py-[clamp(6px,0.69vh,10px)] lg:px-0 lg:box-border lg:relative lg:overflow-visible">
              {/* Step number: mobile 90×135; desktop 90×203 */}
              <span
                aria-hidden
                className="absolute z-0 pointer-events-none select-none flex items-center justify-end rtl:justify-start top-1/2 -translate-y-1/2 right-0 left-auto rtl:right-auto rtl:left-0 w-[90px] h-[135px] sm:h-[150px] lg:w-[90px] lg:h-[203px] lg:right-0 lg:left-auto rtl:lg:left-0 rtl:lg:right-auto [container-type:size]"
              >
                <span className="font-inter font-medium text-[rgba(51,53,53,0.55)] leading-[0.7] text-[100cqh]">
                  {stepNumber}
                </span>
              </span>
              <div className="relative z-10 w-full max-w-full h-full min-w-0 font-he text-left text-white rtl:text-right flex flex-col justify-end items-start rtl:items-end">
                <Image
                  className="block shrink-0 ml-0 mr-auto rtl:ml-auto rtl:mr-0"
                  style={{ width: 'clamp(2rem, 2rem + 0.5vw, 3rem)', height: 'clamp(2rem, 2rem + 0.5vw, 3rem)' }}
                  alt={iconAlt}
                  src={iconSrc}
                  width={48}
                  height={48}
                />
                <div className="relative w-full min-w-0 max-w-full font-semibold text-left whitespace-pre-line rtl:text-right break-words text-[clamp(1rem,calc(1.25rem+(100vw-90rem)*0.0146),1.6875rem)] leading-[clamp(1.25,1.2+0.15vw,1.5)] mt-[clamp(12px,1.39vw,20px)]">
                  {title}
                </div>
                <span className="flex items-start text-left whitespace-normal break-words w-full max-w-full min-w-0 rtl:items-end rtl:text-right min-[815px]:hidden min-[1242px]:flex text-[clamp(0.875rem,0.85rem+0.25vw,1rem)] leading-[clamp(1.25,1.2+0.12vw,1.5)] font-medium text-[#D0D0D0] mt-[clamp(4px,0.56vw,8px)]">
                  {description}
                </span>
                {descriptionTablet && (
                  <span className="hidden min-[815px]:flex min-[1242px]:hidden items-start text-left whitespace-normal break-words w-full max-w-full min-w-0 rtl:items-end rtl:text-right text-[clamp(0.875rem,0.85rem+0.25vw,1rem)] leading-[clamp(1.25,1.2+0.12vw,1.5)] font-medium text-[#D0D0D0] mt-[clamp(4px,0.56vw,8px)]">
                    {descriptionTablet}
                  </span>
                )}
                {imageSrc && (
                  <span className="block mt-[clamp(4px,0.56vw,8px)]">
                    <Image
                      src={imageSrc}
                      alt={imageAlt ?? ''}
                      width={120}
                      height={80}
                      className="object-contain max-w-full"
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StepCard.displayName = 'StepCard';

export default StepCard;
