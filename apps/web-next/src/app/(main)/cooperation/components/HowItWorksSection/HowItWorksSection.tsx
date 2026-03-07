'use client';

import React from 'react';

import { HowItWorksStepCard } from '../HowItWorksStepCard';
import type { HowItWorksSectionProps } from './interfaces/HowItWorksSectionProps';

const STEP_KEYS = [
  { titleKey: 'cooperation_step1_title', descKey: 'cooperation_step1_desc' },
  { titleKey: 'cooperation_step2_title', descKey: 'cooperation_step2_desc' },
  { titleKey: 'cooperation_step3_title', descKey: 'cooperation_step3_desc' },
  { titleKey: 'cooperation_step4_title', descKey: 'cooperation_step4_desc' },
  { titleKey: 'cooperation_step5_title', descKey: 'cooperation_step5_desc' },
] as const;

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
}) => {
  return (
    <section
      className="relative w-full py-[clamp(48px,6.667vw,96px)]"
      role="region"
      aria-labelledby="how-it-works-heading"
    >
      {/* Dark background — spans full viewport behind the content */}
      <div
        className="absolute inset-y-0 bg-[#161616]"
        style={{
          left: 'calc(-50vw + 50%)',
          right: 'calc(-50vw + 50%)',
        }}
        aria-hidden
      />

      {/* Content — stays in normal flow, inherits parent width & position */}
      <div dir={direction} className="relative z-10 w-full">
        <h2
          id="how-it-works-heading"
          className="text-start text-[clamp(24px,2.778vw,40px)] font-medium text-white mb-[clamp(32px,4.444vw,64px)]"
        >
          {getContent('cooperation_how_it_works_title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[clamp(16px,2.222vw,32px)] max-w-full">
          {STEP_KEYS.map(({ titleKey, descKey }, index) => {
            const stepNum = index + 1;
            const isLarge = stepNum >= 4;
            const isLast = stepNum === 5;

            return (
              <HowItWorksStepCard
                key={titleKey}
                step={stepNum}
                title={getContent(titleKey)}
                description={getContent(descKey)}
                direction={direction}
                widthClassName={isLarge ? STEP_CARD_LARGE_WIDTH_CLASS : undefined}
                heightClassName={isLarge ? STEP_CARD_LARGE_HEIGHT_CLASS : undefined}
                className={`${isLarge ? 'lg:col-span-3' : 'lg:col-span-2'}${isLast ? ' sm:col-span-2 lg:col-span-3' : ''}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
