'use client';

import React from 'react';
import Image from 'next/image';

import { CircleImage } from '@/components/ui/CircleImage';
import type { LogoWithCircleImageProps } from './interfaces/LogoWithCircleImageProps';

interface LogoWithCircleImageSizeConfig {
  containerWidthClass: string;
  containerHeightClass: string;
  logoSizeClass: string;
  logoOffset: string;
  logoTop: string;
}

const DEFAULT_SIZE_CONFIG: LogoWithCircleImageSizeConfig = {
  // Container scales up on wide screens (cooperation default behavior).
  containerWidthClass: 'w-[clamp(280px,27.639vw,525px)]',
  containerHeightClass: 'h-[clamp(245px,24.306vw,462px)]',
  logoSizeClass:
    'w-[clamp(189px,18.681vw,355px)] h-[clamp(189px,18.681vw,355px)] max-md:w-[clamp(230px,60vw,269px)] max-md:h-[clamp(230px,60vw,269px)]',
  logoOffset: 'clamp(58px, 5.764vw, 110px)',
  logoTop: 'clamp(29px, 2.847vw, 54px)',
};

const TENDERS_SIZE_CONFIG: LogoWithCircleImageSizeConfig = {
  // Tenders target: 398x350 max size, including 1900px screens.
  containerWidthClass: 'w-[clamp(280px,27.639vw,398px)]',
  containerHeightClass: 'h-[clamp(245px,24.306vw,350px)]',
  logoSizeClass:
    'w-[clamp(189px,18.681vw,269px)] h-[clamp(189px,18.681vw,269px)] max-md:w-[clamp(230px,60vw,269px)] max-md:h-[clamp(230px,60vw,269px)]',
  logoOffset: 'clamp(58px, 5.764vw, 83px)',
  logoTop: 'clamp(29px, 2.847vw, 41px)',
};

/**
 * One component holding the logo and the circular picture.
 * Use on cooperation and tenders; children can be e.g. OneClickBanner.
 */
const LogoWithCircleImage: React.FC<LogoWithCircleImageProps> = ({
  logoSrc,
  imageSrc,
  imageAlt,
  direction,
  className = '',
  children,
  showBanner = true,
  sizeVariant = 'default',
}) => {
  const isRtl = direction === 'rtl';
  const edge = isRtl ? 'left' : 'right';
  const sizeConfig = sizeVariant === 'tenders' ? TENDERS_SIZE_CONFIG : DEFAULT_SIZE_CONFIG;

  return (
    <div
      className={`relative ${sizeConfig.containerWidthClass} ${sizeConfig.containerHeightClass} ${className}`.trim()}
    >
      <div
        className={`absolute z-0 overflow-hidden rounded-lg ${sizeConfig.logoSizeClass}`}
        style={{ [edge]: sizeConfig.logoOffset, top: sizeConfig.logoTop }}
      >
        <Image
          src={logoSrc}
          alt=""
          width={269}
          height={269}
          className="h-full w-full object-contain"
          aria-hidden
        />
      </div>
      <CircleImage
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        direction={direction}
      />
      {showBanner ? children : null}
    </div>
  );
};

export default LogoWithCircleImage;
