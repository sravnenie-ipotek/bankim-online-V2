'use client'

import React from 'react'
import Image from 'next/image'
import type { StepCardProps } from './interfaces/StepCardProps'

const StepCard: React.FC<StepCardProps> = ({
  iconSrc,
  iconAlt,
  stepNumber,
  title,
  description,
  descriptionTablet,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div
      className="relative before:content-[attr(data-number)] before:absolute before:top-[52px] before:left-0 before:z-[1] before:w-[5.625rem] before:h-full before:leading-[0.7] rtl:before:left-auto rtl:before:right-0 max-[815px]:w-full text-[10rem] text-center text-[#333535]"
      data-number={String(stepNumber)}
    >
      <div className="relative py-6 pr-6 pb-12 pl-[6.5rem] rtl:pl-6 rtl:pr-[6.5rem] max-[815px]:w-full">
        <div className="relative z-[2] w-full text-left whitespace-nowrap text-white rtl:text-right">
          <div className="flex flex-col gap-[0.62rem] items-start w-full rtl:items-end">
            <Image
              className="block w-12 h-12 ml-0 mr-auto rtl:ml-auto rtl:mr-0"
              alt={iconAlt}
              src={iconSrc}
              width={48}
              height={48}
            />
            <div className="relative w-full font-semibold text-xl text-left whitespace-pre-line leading-normal rtl:text-right">
              {title}
            </div>
            <span className="flex items-start text-base leading-normal text-left whitespace-normal w-[19.6rem] text-[#d0d0d0] rtl:items-end rtl:text-right min-[815px]:hidden min-[1242px]:flex">
              {description}
            </span>
            {descriptionTablet && (
              <span className="hidden min-[815px]:flex min-[1242px]:hidden items-start text-base leading-normal text-left whitespace-normal w-[19.6rem] text-[#d0d0d0] rtl:items-end rtl:text-right">
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
  )
}

export default StepCard
