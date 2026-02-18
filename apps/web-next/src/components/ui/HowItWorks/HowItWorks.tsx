'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useContentApi } from '@hooks/useContentApi'
import StepCard from '@/components/ui/StepCard/StepCard'
import type { StepConfig } from './interfaces/StepConfig'

const STEPS: StepConfig[] = [
  {
    iconSrc: '/static/frame-14100932552.svg',
    titleKey: 'mortgage_calculator',
    titleFallback: 'mortgage_calculator',
    descriptionKey: 'calculator_description',
    descriptionFallback: 'mortgage_calculator_text',
    descriptionTabletKey: 'calculator_description',
    descriptionTabletFallback: 'mortgage_calculator_text',
  },
  {
    iconSrc: '/static/frame-14100932551.svg',
    titleKey: 'fill_form',
    titleFallback: 'fill_form',
    descriptionKey: 'fill_form_description',
    descriptionFallback: 'fill_form_text',
    descriptionTabletKey: 'fill_form_description',
    descriptionTabletFallback: 'fill_form_text_tablet',
  },
  {
    iconSrc: '/static/frame-1410093255.svg',
    titleKey: 'get_program',
    titleFallback: 'get_program',
    descriptionKey: 'get_program_text',
    descriptionFallback: 'get_program_text',
    descriptionTabletKey: 'get_program_text_tablet',
    descriptionTabletFallback: 'get_program_text_tablet',
  },
]

const HowItWorks: React.FC = () => {
  const { t } = useTranslation()
  const { getContent } = useContentApi('home_page')

  const resolveContent = (step: StepConfig, field: 'title' | 'description' | 'descriptionTablet'): string => {
    if (field === 'title') {
      return getContent(step.titleKey, step.titleFallback) || t(step.titleFallback)
    }
    if (field === 'description') {
      return getContent(step.descriptionKey, step.descriptionFallback) || t(step.descriptionFallback)
    }
    if (step.descriptionTabletKey && step.descriptionTabletFallback) {
      return getContent(step.descriptionTabletKey, step.descriptionTabletFallback) || t(step.descriptionTabletFallback)
    }
    return ''
  }

  return (
    <div className="relative flex flex-col gap-8 items-center w-full h-full mb-[54px] mt-1.5 text-left whitespace-nowrap text-[#e7e9ea] max-[815px]:items-stretch max-[815px]:ps-5">
      <div
        className="flex items-center w-full font-normal text-[2.4375rem] h-[26px] justify-start text-left max-[1200px]:px-5 rtl:font-medium rtl:text-right max-[815px]:font-medium max-[815px]:text-[1.9375rem] max-[815px]:rtl:font-semibold"
        style={{ height: 26 }}
      >
        {t('how_it_works')}
      </div>
      <div className="flex flex-row gap-[1.35rem] justify-between flex-wrap max-[815px]:flex-col max-[815px]:pe-[50px]">
        {STEPS.map((step, index) => (
          <StepCard
            key={step.titleKey}
            iconSrc={step.iconSrc}
            iconAlt={resolveContent(step, 'title')}
            stepNumber={index + 1}
            title={resolveContent(step, 'title')}
            description={resolveContent(step, 'description')}
            descriptionTablet={resolveContent(step, 'descriptionTablet')}
          />
        ))}
      </div>
    </div>
  )
}

export default HowItWorks
