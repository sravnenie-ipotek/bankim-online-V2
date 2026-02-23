'use client';

import React from 'react';
import { SocialItemProps } from './interfaces/SocialItemProps';

/**
 * Single social network item: 270×30px rotated 90°.
 * After rotation the visual footprint is 30px wide × 270px tall.
 * Outer div is the bounding box; inner <a> is rotated.
 * Fluid: scales proportionally below 1440px, capped at 270px on xl+.
 * Icon: 24×24px. Label: 20px normal uppercase white.
 */
const SocialItem: React.FC<SocialItemProps> = ({ href, icon, label }) => {
  return (
    <div className="w-[30px] flex-1 max-h-[270px] flex items-center justify-center overflow-visible">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        dir="ltr"
        className="flex flex-row items-center gap-2 w-[calc((100vh-47.1px)/4)] max-w-[270px] h-[30px] shrink-0 opacity-70 hover:opacity-100 transition-opacity rotate-90 origin-center"
      >
        <img
          src={icon}
          alt=""
          width={24}
          height={24}
          className="w-[calc(24px*(100vw/1440))] h-[calc(24px*(100vw/1440))] xl:w-6 xl:h-6 shrink-0"
        />
        <span className="text-[calc(20px*(100vw/1440))] xl:text-[20px] font-normal leading-none tracking-normal capitalize text-white whitespace-nowrap">
          {label}
        </span>
      </a>
    </div>
  );
};

export default SocialItem;
