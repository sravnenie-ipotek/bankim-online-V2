'use client';

import React from 'react';
import Image from 'next/image';
import { SocialItemProps } from './interfaces/SocialItemProps';

/**
 * Single social network item.
 * Vertical (default): 270×30px rotated 90°, 30px wide × 270px tall on desktop.
 * Horizontal: fluid clamp container for tablet burger menu, icon + label in a row.
 */
const SocialItem: React.FC<SocialItemProps> = ({ href, icon, label, onClick, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
      <div className="w-[clamp(160px,22vw,285px)] h-[clamp(40px,5.27vw,54px)] flex items-center justify-center shrink-0">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          dir="ltr"
          onClick={onClick}
          className="flex flex-row items-center justify-center gap-2 w-full h-full group"
        >
          <Image
            src={icon}
            alt=""
            width={24}
            height={24}
            className="shrink-0 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
            style={{ width: 'clamp(16px, 2.34vw, 24px)', height: 'auto' }}
          />
          <span className="text-[clamp(13px,1.56vw,20px)] font-normal leading-none tracking-normal uppercase text-white whitespace-nowrap">
            {label}
          </span>
        </a>
      </div>
    );
  }

  return (
    <div className="w-[30px] flex-1 max-h-[270px] flex items-center justify-center overflow-visible">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        dir="ltr"
        onClick={onClick}
        className="flex flex-row items-center gap-2 w-[calc((100vh-47.1px)/4)] max-w-[270px] h-[30px] shrink-0 opacity-70 hover:opacity-100 transition-opacity rotate-90 origin-center"
      >
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          className="shrink-0 object-contain"
          style={{ width: 'clamp(20px, 2.22vw, 24px)', height: 'auto' }}
        />
        <span className="text-[calc(20px*(100vw/1440))] xl:text-[20px] font-normal leading-none tracking-normal capitalize text-white whitespace-nowrap">
          {label}
        </span>
      </a>
    </div>
  );
};

export default SocialItem;
