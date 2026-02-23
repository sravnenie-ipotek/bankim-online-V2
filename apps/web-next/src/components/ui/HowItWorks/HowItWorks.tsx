'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import StepCard from '@/components/ui/StepCard/StepCard';
import type { StepConfig } from './interfaces/StepConfig';

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
];

/**
 * Breakpoint-based layout. Exact math per Tailwind screen.
 * lg 1440: row 1130, card 364, gap 12.6 → 364×3 + 12.6×2 = 1117.2 ≤ 1130
 * xl 1920: scale 1920/1440 → row 1507, card 485, gap 16.8 → 485×3 + 16.8×2 = 1488.6 ≤ 1507
 */

const HowItWorks: React.FC = () => {
  const { getContent } = useContentApi('home_page');

  const resolveContent = (
    step: StepConfig,
    field: 'title' | 'description' | 'descriptionTablet'
  ): string => {
    if (field === 'title') {
      return getContent(step.titleKey);
    }
    if (field === 'description') {
      return getContent(step.descriptionKey);
    }
    if (step.descriptionTabletKey && step.descriptionTabletFallback) {
      return getContent(step.descriptionTabletKey);
    }
    return '';
  };

  return (
    <div className="relative flex flex-col flex-nowrap justify-start items-start rtl:items-end w-full h-full mb-[54px] text-left whitespace-nowrap text-[#e7e9ea] xs:items-stretch xs:ps-5 md:items-start md:ps-0 xl:ps-0 xl:pe-0">
      <div
        className="flex items-center w-full font-normal text-[clamp(1.9375rem,calc(1.9375rem+(100vw-23.4375rem)*0.0075),2.4375rem)] h-[26px] justify-start rtl:justify-end rtl:flex-row-reverse text-left md:px-5 rtl:font-medium rtl:text-right xs:font-medium xs:rtl:font-semibold"
        style={{ height: 26 }}
      >
        {getContent('how_it_works')}
      </div>
      {/* Row: same positioning as TopServices — flex, justify-between, same max-widths and gap. */}
      <div className="w-full flex flex-col md:flex-row flex-wrap justify-between rtl:justify-end gap-2 sm:gap-[10px] md:gap-[12.6px] xl:gap-[16.8px] pe-0 ps-0 xs:pe-[50px] md:pe-0 xl:ps-0 xl:pe-0 max-w-full md:max-w-[1024px] lg:max-w-[1130px] xl:max-w-[1507px] rtl:ms-auto">
        {STEPS.map((step, index) => (
          <div
            key={step.titleKey}
            className="min-w-0 w-full md:w-[333px] lg:w-[364px] lg:h-[222px] xl:w-[485px] xl:h-[296px] shrink-0 md:flex-none"
          >
            <StepCard
              iconSrc={step.iconSrc}
              iconAlt={resolveContent(step, 'title')}
              stepNumber={index + 1}
              title={resolveContent(step, 'title')}
              description={resolveContent(step, 'description')}
              descriptionTablet={resolveContent(step, 'descriptionTablet')}
              fillWidth
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
