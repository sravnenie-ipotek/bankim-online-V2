'use client';

import React from 'react';
import Image from 'next/image';

import { TextWithIcon } from '@/components/ui/TextWithIcon';
import { REWARD_IMG_SRC } from '../../constants';

import type { RewardProps } from './interfaces/RewardProps';

/**
 * Reward section: yellow banner, full viewport width.
 * Left: shared percent + title + description + Register button. Right: illustration.
 */
const Reward: React.FC<RewardProps> = ({
  className,
  getContent,
  direction,
}) => {
  return (
    <div
      className={`relative w-full py-[clamp(24px,3.333vw,48px)] ${className ?? ''}`.trim()}
      role="region"
      aria-label="Reward"
    >
      {/* Yellow background — spans full viewport behind the content */}
      <div
        className="absolute inset-y-0 bg-accent-cooperationHighlight"
        style={{
          left: 'calc(-50vw + 50%)',
          right: 'calc(-50vw + 50%)',
        }}
        aria-hidden
      />

      {/* Content — stays in normal flow, inherits parent width & position */}
      <div
        dir={direction}
        className="relative z-10 w-full flex flex-col gap-[clamp(16px,2.222vw,32px)]"
      >
        {/* Top row: percent + title + description + button (shared) | illustration */}
        <div className="flex flex-col md:flex-row items-start gap-[clamp(16px,4.167vw,60px)] w-full">
          <div className="min-w-0 w-full md:w-[clamp(615px,42.708vw,811px)] md:self-stretch">
            <TextWithIcon
              title={getContent('cooperation_referral_title')}
              description={getContent('cooperation_referral_description')}
              iconSrc="/static/partnerships/percent-icon.svg"
              showButton
              buttonLabel={getContent('cooperation_register')}
              compactTitleDescription
              titleToDescriptionGapClassName="gap-5"
              iconToContentGapClassName="gap-[clamp(16px,1.667vw,24px)]"
              stickButtonToBottom
            />
          </div>

          <div className="relative shrink-0 md:ms-auto w-full max-w-[clamp(200px,23.194vw,441px)] h-auto max-md:mx-auto overflow-hidden">
            <Image
              src={REWARD_IMG_SRC}
              alt=""
              width={334}
              height={264}
              className="w-full h-auto object-contain"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
