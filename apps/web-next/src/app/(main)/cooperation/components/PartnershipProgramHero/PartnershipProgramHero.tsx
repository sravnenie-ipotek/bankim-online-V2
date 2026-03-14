'use client';

import React from 'react';
import Image from 'next/image';

import { TextWithHighlight } from '@/components/ui/TextWithHighlight';
import type { PartnershipProgramHeroProps } from './interfaces/PartnershipProgramHeroProps';

/** Clamps tuned for 1440px (target) and 1920px (max); 1900px scales correctly within caps. */

const PartnershipProgramHero: React.FC<PartnershipProgramHeroProps> = ({
  getContent,
  direction,
  highlightPart,
  highlightColorClassName,
}) => {
  const subtitle = getContent('cooperation_subtitle');

  return (
  <div
    dir={direction}
    className={`w-full h-[clamp(240px,26.736vw,513px)] flex items-end justify-between mt-[clamp(40px,4.444vw,84px)] ${direction === 'ltr' ? 'flex-row-reverse' : 'flex-row'}`}
  >

      {/* Left SVG — hidden on mobile; no negative margin so width matches mortgage row */}
      <div className="hidden md:flex shrink-0 self-end">
        <Image
          src="/static/partnerships/partnership-net2.svg"
          alt=""
          width={329}
          height={348}
          className="w-[clamp(130px,20.486vw,393px)] h-auto object-contain"
          aria-hidden
        />
      </div>

      {/* Center: title 585x112 at 1440px, clamp to 1900px */}
      <div className="self-center flex flex-col items-center justify-center gap-[clamp(4px,1.11vw,16px)] min-w-0 shrink grow w-full md:w-[clamp(280px,36.458vw,700px)] min-h-[clamp(40px,4.583vw,88px)]">
        <h1 className="w-full max-w-[clamp(320px,40.625vw,772px)] text-[clamp(20px,3.333vw,63px)] font-medium text-white leading-tight text-center flex items-center justify-center">
          {getContent('cooperation_title')}
        </h1>
        <TextWithHighlight
          text={subtitle}
          highlightPart={highlightPart}
          highlightColorClassName={highlightColorClassName}
          fontSizeClassName="text-[clamp(14px,1.111vw,20px)]"
          className="text-white/80 leading-relaxed text-center w-full min-h-[clamp(36px,4.583vw,88px)] whitespace-pre-line break-words"
        />
        <button
          type="button"
          className="mt-[clamp(4px,0.833vw,16px)] bg-accent-cooperationHighlight hover:bg-[#f5df3a] text-black font-semibold rounded-[clamp(4px,0.556vw,10px)] px-[clamp(20px,4.444vw,85px)] py-[clamp(8px,1.111vw,21px)] text-[clamp(13px,1.111vw,21px)] transition-colors whitespace-nowrap"
        >
          {getContent('cooperation_register')}
        </button>
      </div>

      {/* Right SVG — hidden on mobile; no negative margin so width matches mortgage row */}
      <div className="hidden md:flex shrink-0 self-start pt-[37px]">
        <Image
          src="/static/partnerships/partnership-net.svg"
          alt=""
          width={295}
          height={383}
          className="w-[clamp(130px,20.486vw,393px)] h-auto object-contain"
          aria-hidden
        />
      </div>

  </div>
  );
};

export default PartnershipProgramHero;
