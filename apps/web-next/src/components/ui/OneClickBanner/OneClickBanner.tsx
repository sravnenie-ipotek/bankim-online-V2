'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { OneClickBannerProps } from './interfaces/OneClickBannerProps';

const DEFAULT_ICON_SRC = '/static/hand-pointer-icon.svg';

/** Banner: width exactly content (characters + icon + gap + padding); min-height for tap target. */
const BANNER_SIZE_CLASS = 'w-fit min-w-0 min-h-[clamp(56px,5.417vw,104px)]';
const BANNER_GAP_CLASS = 'gap-[clamp(8px,1.111vw,21px)]';
const BANNER_PX_CLASS = 'px-[clamp(12px,1.667vw,32px)]';

/** Icon: 24×24 at 1440, clamp for 1900 and rest. */
const ICON_SIZE_CLASS = 'w-[clamp(18px,1.667vw,32px)] h-[clamp(18px,1.667vw,32px)]';

const OneClickBanner: React.FC<OneClickBannerProps> = ({
  href,
  label,
  direction,
  iconSrc,
  className = '',
  labelClassName = '',
  iconWrapperClassName = '',
  style,
}) => {
  const isRtl = direction === 'rtl';
  const icon = iconSrc ?? DEFAULT_ICON_SRC;

  return (
    <Link
      href={href}
      dir={direction}
      aria-label={label}
      style={style}
      className={`flex flex-row items-center ${BANNER_GAP_CLASS} rounded-[8px] ${BANNER_SIZE_CLASS} bg-base-bannerBg ${BANNER_PX_CLASS} transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`.trim()}
    >
      <span className={`min-w-0 shrink-0 text-start text-white font-medium text-[clamp(13px,1.111vw,21px)] leading-snug whitespace-nowrap ${labelClassName}`.trim()}>
        {label}
      </span>
      <span className={`shrink-0 ${ICON_SIZE_CLASS} text-white ${isRtl ? 'scale-x-[-1]' : ''} ${iconWrapperClassName}`.trim()}>
        <Image
          src={icon}
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
