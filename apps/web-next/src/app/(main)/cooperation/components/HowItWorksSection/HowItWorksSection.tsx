'use client';

import React from 'react';

import { HowItWorksStepCard } from '../HowItWorksStepCard';
import type { HowItWorksSectionProps } from './interfaces/HowItWorksSectionProps';

const DEFAULT_TITLE_KEY = 'cooperation_how_it_works_title';

const COOPERATION_STEP_KEYS = [
  { titleKey: 'cooperation_step1_title', descKey: 'cooperation_step1_desc' },
  { titleKey: 'cooperation_step2_title', descKey: 'cooperation_step2_desc' },
  { titleKey: 'cooperation_step3_title', descKey: 'cooperation_step3_desc' },
  { titleKey: 'cooperation_step4_title', descKey: 'cooperation_step4_desc' },
  { titleKey: 'cooperation_step5_title', descKey: 'cooperation_step5_desc' },
];

/** Steps 4-5 card size: 556x340 at 1440px, clamp to 1900px; full width below lg */
const STEP_CARD_LARGE_WIDTH_CLASS = 'lg:w-[clamp(556px,38.611vw,734px)]';
const STEP_CARD_LARGE_HEIGHT_CLASS = 'h-[clamp(200px,23.611vw,450px)] lg:h-[clamp(240px,23.611vw,449px)]';

/**
 * "How it works" section: dark background spans full viewport,
 * inner content matches LayoutShell width constraints.
 */
const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  getContent,
  direction,
  titleKey = DEFAULT_TITLE_KEY,
  titleClassName,
  stepTitleClassName,
  stepDescriptionClassName,
  stepsConfig = COOPERATION_STEP_KEYS,
  stepTextContainerWidthClassName,
  stepCardWidthClassName,
  stepCardHeightClassName,
  buttonLabel,
  onButtonClick,
  sectionBackgroundClassName,
  sectionTitleColorClassName,
  stepCardBackgroundClassName,
  stepNumberClassName,
  buttonClassName,
  buttonWrapperClassName,
  buttonSizeClassName,
  containedBackground = false,
  sectionPaddingClassName,
  titleMarginBottomClassName,
  buttonMarginTopClassName,
}) => {
  const stepCount = stepsConfig.length;
  const useLargeCards = stepCount >= 5;
  const sectionBgClass = sectionBackgroundClassName ?? 'bg-[#161616]';
  const sectionTitleColorClass = sectionTitleColorClassName ?? 'text-white';

  return (
    <section
      className={`relative w-full ${sectionPaddingClassName ?? 'py-[clamp(48px,6.667vw,96px)]'}`}
      role="region"
      aria-labelledby="how-it-works-heading"
    >
      {/* Section background — spans full viewport or stays within layout */}
      <div
        className={`absolute inset-y-0 ${sectionBgClass} ${containedBackground ? 'inset-x-0 rounded-[clamp(8px,0.833vw,12px)]' : ''}`}
        style={containedBackground ? undefined : {
          left: 'calc(-50vw + 50%)',
          right: 'calc(-50vw + 50%)',
        }}
        aria-hidden
      />

      {/* Content — stays in normal flow, inherits parent width & position */}
      <div dir={direction} className="relative z-10 w-full">
        <h2
          id="how-it-works-heading"
          className={`text-start font-medium ${sectionTitleColorClass} ${titleMarginBottomClassName ?? 'mb-[clamp(32px,4.444vw,64px)]'} ${titleClassName ?? 'text-[clamp(24px,2.778vw,40px)]'}`.trim()}
        >
          {getContent(titleKey)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[clamp(16px,2.222vw,32px)] max-w-full">
          {stepsConfig.map(({ titleKey: stepTitleKey, descKey }, index) => {
            const stepNum = index + 1;
            const isLarge = useLargeCards && stepNum >= 4;
            const isLast = useLargeCards && stepNum === 5;

            const cardWidthClass =
              stepCardWidthClassName
                ? isLarge
                  ? `${stepCardWidthClassName.replace(/\blg:\S+/g, '').trim()} lg:w-full`
                  : stepCardWidthClassName
                : isLarge
                  ? STEP_CARD_LARGE_WIDTH_CLASS
                  : undefined;
            const cardHeightClass =
              stepCardHeightClassName ?? (isLarge ? STEP_CARD_LARGE_HEIGHT_CLASS : undefined);

            return (
              <HowItWorksStepCard
                key={stepTitleKey}
                step={stepNum}
                title={getContent(stepTitleKey)}
                description={getContent(descKey)}
                direction={direction}
                widthClassName={cardWidthClass}
                heightClassName={cardHeightClass}
                textContainerWidthClassName={stepTextContainerWidthClassName}
                stepTitleClassName={stepTitleClassName}
                stepDescriptionClassName={stepDescriptionClassName}
                cardBackgroundClassName={stepCardBackgroundClassName}
                stepNumberClassName={stepNumberClassName}
                className={`${isLarge ? 'lg:col-span-3' : 'lg:col-span-2'}${isLast ? ' sm:col-span-2 lg:col-span-3' : ''}`}
              />
            );
          })}
        </div>
        {buttonLabel != null && buttonLabel !== '' && onButtonClick != null && (
          <div
            className={
              buttonWrapperClassName != null && buttonWrapperClassName !== ''
                ? `${buttonMarginTopClassName ?? 'mt-[clamp(32px,4.444vw,64px)]'} ${buttonWrapperClassName}`.trim()
                : `${buttonMarginTopClassName ?? 'mt-[clamp(32px,4.444vw,64px)]'} flex justify-start`
            }
          >
            <button
              type="button"
              onClick={onButtonClick}
              className={[buttonClassName ?? 'btn-primary-lg w-fit', buttonSizeClassName]
                .filter(Boolean)
                .join(' ')}
            >
              {buttonLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HowItWorksSection;
