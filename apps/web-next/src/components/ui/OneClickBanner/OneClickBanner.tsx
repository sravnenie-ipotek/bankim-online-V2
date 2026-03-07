'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { OneClickBannerProps } from './interfaces/OneClickBannerProps';

const HAND_POINTER_ICON_SRC = '/static/hand-pointer-icon.svg';

/** Clamps tuned for 1440px (target) and 1900px (max). Banner: 264×70 at 1440. */
const BANNER_SIZE_CLASS = 'w-[clamp(185px,18.333vw,348px)] h-[clamp(49px,4.861vw,92px)]';
const BANNER_GAP_CLASS = 'gap-[clamp(8px,1.111vw,21px)]';
const BANNER_PX_CLASS = 'px-[clamp(12px,1.667vw,32px)]';

/** Text container: 241×19 at 1440 → 318×25 at 1900 (16.736vw × 1.319vw). */
const TEXT_CONTAINER_CLASS = 'w-[clamp(169px,16.736vw,318px)] h-[clamp(13px,1.319vw,25px)]';

const OneClickBanner: React.FC<OneClickBannerProps> = ({
  href,
  label,
  direction,
  className = '',
  style,
}) => {
  const isRtl = direction === 'rtl';

  return (
    <Link
      href={href}
      dir={direction}
      aria-label={label}
      style={style}
      className={`flex flex-row items-center ${BANNER_GAP_CLASS} rounded-[8px] ${BANNER_SIZE_CLASS} max-md:w-[clamp(268px,68.72vw,348px)] max-md:h-[clamp(70px,17.95vw,92px)] bg-base-bannerBg ${BANNER_PX_CLASS} transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`.trim()}
    >
      <span className={`${TEXT_CONTAINER_CLASS} flex items-center text-white font-bold max-md:text-[16px] md:text-[clamp(16px,1.111vw,21px)] leading-tight truncate min-w-0 overflow-hidden`}>
        {label}
      </span>
      <span className={`shrink-0 w-6 h-6 text-white ${isRtl ? 'scale-x-[-1]' : ''}`}>
        <Image
          src={HAND_POINTER_ICON_SRC}
          width={24}
          height={24}
          alt=""
          className="w-full h-full"
          aria-hidden
        />
      </span>
    </Link>
  );
};

export default OneClickBanner;
