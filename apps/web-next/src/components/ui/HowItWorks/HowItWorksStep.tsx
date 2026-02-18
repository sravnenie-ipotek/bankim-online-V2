'use client'

import React from 'react'
import Image from 'next/image'
import type { HowItWorksStepProps } from './interfaces/HowItWorksStepProps'

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  iconSrc,
  iconAlt,
  title,
  description,
  descriptionTablet,
}) => {
  return (
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
        </div>
      </div>
    </div>
  )
}

export default HowItWorksStep
