'use client';

import React from 'react';
import Image from 'next/image';

import type { BrandRightsCardProps } from './interfaces/BrandRightsCardProps';

const ICON_SIZE_CLASS = 'w-[clamp(26px,2.222vw,40px)] h-[clamp(26px,2.222vw,40px)]';
const TITLE_CLASS = 'text-white font-medium leading-[1.15] text-[clamp(20px,2.153vw,41px)]';

const BrandRightsCard: React.FC<BrandRightsCardProps> = ({
  title,
  iconSrc,
  iconAlt = '',
  direction = 'ltr',
  className = '',
}) => {
  return (
    <section
      dir={direction}
      aria-label={title}
      className={`w-full rounded-[clamp(14px,1.111vw,20px)] bg-[#1F212A] px-[clamp(18px,1.944vw,37px)] py-[clamp(18px,1.944vw,37px)] flex items-center gap-[clamp(14px,1.389vw,26px)] shadow-[0_4px_12px_rgba(0,0,0,0.18)] ${className}`.trim()}
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={40}
        height={40}
        className={`${ICON_SIZE_CLASS} shrink-0 object-contain`}
      />
      <h3 className={`${TITLE_CLASS} text-start`}>{title}</h3>
    </section>
  );
};

export default BrandRightsCard;
