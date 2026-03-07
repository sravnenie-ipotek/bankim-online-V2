'use client';

import React from 'react';
import Image from 'next/image';

import { REWARD_IMG_SRC, PERCENT_ICON_SRC } from '../../constants';

import type { RewardProps } from './interfaces/RewardProps';

/**
 * Reward section: yellow banner, full viewport width.
 * Left: circular image with teal border + ₪ icon. Right: referral title, description, % icon, Register button.
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
        {/* Top row: text block + illustration — stacks on small screens */}
        <div className="flex flex-col md:flex-row items-start gap-[clamp(16px,4.167vw,60px)] w-full">
          <div className="flex flex-col items-start justify-start gap-[clamp(8px,1.111vw,16px)] min-w-0 w-full md:w-[clamp(615px,42.708vw,811px)]">
            <Image
              src={PERCENT_ICON_SRC}
              alt=""
              width={68}
              height={68}
              className="w-[clamp(40px,4.722vw,68px)] h-[clamp(40px,4.722vw,68px)] self-start"
              aria-hidden
            />
            <h2 className="w-full min-h-[clamp(48px,6.389vw,121px)] text-[clamp(24px,2.708vw,51px)] font-bold text-black leading-tight text-start">
              {getContent('cooperation_referral_title')}
            </h2>
            <p className="w-full text-[clamp(14px,1.319vw,25px)] text-black/80 leading-relaxed text-start">
              {getContent('cooperation_referral_description')}
            </p>
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

        {/* Button below the row */}
        <button
          type="button"
          className="bg-base-primary hover:opacity-90 text-white font-semibold rounded-[clamp(4px,0.556vw,10px)] px-[clamp(20px,2.778vw,40px)] py-[clamp(10px,1.111vw,16px)] text-[clamp(14px,1.111vw,16px)] transition-opacity whitespace-nowrap self-start"
        >
          {getContent('cooperation_register')}
        </button>
      </div>
    </div>
  );
};

export default Reward;
