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

/** Outer section wrapper — full width, stacked column; children at logical start (LTR left, RTL right). */
const SECTION_CLASS =
  'relative flex flex-col w-full mb-[clamp(32px,3.75vw,54px)] text-[#e7e9ea] items-start';

/** Section heading — flush at position 0; LTR left, RTL right (logical start). */
const TITLE_CLASS = [
  'flex items-center w-full',
  'justify-start',
  'text-left rtl:text-right',
  'font-normal rtl:font-medium xs:font-medium xs:rtl:font-semibold',
  'text-[clamp(1.9375rem,calc(1.9375rem+(100vw-23.4375rem)*0.0075),2.4375rem)]',
  'leading-[clamp(1.2,1.15+0.1vw,1.4)]',
  'min-h-[clamp(22px,1.8vh,26px)]',
].join(' ');

/**
 * Cards row — full vw on mobile (translate trick), then flex-row with justify-between.
 * No start/end padding from sm up so cards are flush with the content edge.
 */
const CARDS_ROW_CLASS = [
  'w-full',
  'max-sm:w-screen max-sm:relative max-sm:left-1/2 max-sm:-translate-x-1/2',
  'flex flex-col sm:flex-row sm:flex-wrap',
  'sm:justify-between rtl:sm:justify-between',
  'gap-2 sm:gap-[10px] md:gap-[12.6px] lg:gap-0',
  'xs:pe-[50px] sm:pe-0',
].join(' ');

/** Per-card wrapper — fixed size per breakpoint; xl cards grow to fill remaining space equally. */
const CARD_WRAPPER_CLASS = [
  'min-w-0 shrink-0 w-full max-w-[333px]',
  'sm:w-[333px] sm:flex-none sm:h-[222px]',
  'md:h-[222px]',
  'lg:w-[364px] lg:flex-none lg:h-[222px]',
  'xl:flex-1 xl:w-auto xl:h-[296px]',
].join(' ');

type ContentField = 'title' | 'description' | 'descriptionTablet';

const HowItWorks: React.FC = () => {
  const { getContent } = useContentApi('home_page');

  const resolveContent = (step: StepConfig, field: ContentField): string => {
    if (field === 'title') return getContent(step.titleKey);
    if (field === 'description') return getContent(step.descriptionKey);
    if (step.descriptionTabletKey) return getContent(step.descriptionTabletKey);
    return '';
  };

  return (
    <div className={SECTION_CLASS}>
      <div className={TITLE_CLASS}>{getContent('how_it_works')}</div>

      <div className={CARDS_ROW_CLASS}>
        {STEPS.map((step, index) => (
          <div key={step.titleKey} className={CARD_WRAPPER_CLASS}>
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
