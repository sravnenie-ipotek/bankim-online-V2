'use client'

import React from 'react'
import Image from 'next/image'
import type { StepCardProps } from './interfaces/StepCardProps'

/**
 * Breakpoint-based: xs 375 | sm 768 | md 1024 | lg 1440 (364×222) | xl 1920 (485×296).
 * When fillWidth, parent (HowItWorks) sets width; card uses 100% + min-height per breakpoint.
 */
const StepCard: React.FC<StepCardProps> = ({
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
  const rootClassName = fillWidth
    ? 'relative overflow-hidden w-full h-full min-h-[180px] sm:min-h-[190px] md:min-h-[158px] lg:min-h-[222px] lg:h-[222px] xl:min-h-[296px] xl:h-[296px] xs:w-full'
    : 'relative overflow-hidden w-full xs:w-full sm:w-[247px] md:w-[333px] lg:w-[364px] lg:min-h-[222px] lg:h-[222px] xl:w-[485px] xl:min-h-[296px] xl:h-[296px] min-h-[180px] sm:min-h-[190px] md:min-h-[158px]'

  return (
    <div className={rootClassName}>
      <div className="relative box-border h-full py-[10%] px-[6%] xs:w-full xs:px-4 md:px-[6%] lg:px-0 lg:py-0">
        <div className="w-full h-full lg:w-[364px] lg:min-w-[364px] lg:h-[222px] xl:w-[485px] xl:min-w-[485px] xl:h-[296px] lg:relative lg:flex lg:items-center lg:justify-center">
          {/* Inner content box 316×150: text area full 316px width; vertical padding 10px only at lg. */}
          <div className="w-full h-full lg:w-[316px] lg:h-[150px] lg:py-[10px] lg:px-0 lg:box-border lg:relative lg:overflow-visible">
            <span
              aria-hidden
              className="absolute z-0 pointer-events-none select-none top-auto bottom-0 left-0 right-auto rtl:left-auto rtl:right-0 md:left-auto md:right-0 md:rtl:left-0 md:rtl:right-auto flex items-end justify-center font-inter leading-[0.7] font-medium text-[rgba(51,53,53,0.55)] lg:left-[246px] lg:right-auto rtl:lg:right-[246px] rtl:lg:left-auto lg:top-auto lg:bottom-0 lg:w-[70px] lg:h-[130px] lg:leading-[0.75] xl:h-[130px] text-[clamp(5rem,3.9rem+4.69vw,8.125rem)]"
            >
              {stepNumber}
            </span>
            <div className="relative z-10 w-full max-w-full h-full min-w-0 font-he text-left text-white rtl:text-right flex flex-col items-start rtl:items-end">
              <Image
                className="block w-12 h-12 shrink-0 ml-0 mr-auto rtl:ml-auto rtl:mr-0"
                alt={iconAlt}
                src={iconSrc}
                width={48}
                height={48}
              />
              <div className="relative mt-5 w-full min-w-0 max-w-full font-semibold text-left whitespace-pre-line leading-normal rtl:text-right break-words text-[clamp(1rem,calc(1.25rem+(100vw-90rem)*0.0146),1.6875rem)]">
                {title}
              </div>
              <span
                className="flex items-start mt-2 leading-normal text-left whitespace-normal break-words w-full max-w-full min-w-0 rtl:items-end rtl:text-right min-[815px]:hidden min-[1242px]:flex text-[clamp(0.875rem,0.85rem+0.25vw,1rem)] font-medium text-[#D0D0D0]"
              >
                {description}
              </span>
              {descriptionTablet && (
                <span
                  className="hidden min-[815px]:flex min-[1242px]:hidden items-start mt-2 leading-normal text-left whitespace-normal break-words w-full max-w-full min-w-0 rtl:items-end rtl:text-right text-[clamp(0.875rem,0.85rem+0.25vw,1rem)] font-medium text-[#D0D0D0]"
                >
                  {descriptionTablet}
                </span>
              )}
              {imageSrc && (
                <span className="block mt-2">
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
  )
}

export default StepCard
