'use client';

import React from 'react';
import { IconBanner } from '@/components/ui/IconBanner';
import type { TendersHeroMapProps } from './interfaces/TendersHeroMapProps';

const MAP_SRC: Record<'ltr' | 'rtl', string> = {
  ltr: '/static/tenders/map-bg.svg',
  rtl: '/static/tenders/map-he-bg.svg',
};

const OFFICES_ICON_SRC = '/static/tenders/office.svg';
const BANNER_POSITION_CLASS = 'absolute bottom-[clamp(16px,1.111vw,21px)] end-[clamp(289px,20.069vw,385px)] z-10';

const TendersHeroMap: React.FC<TendersHeroMapProps> = ({
  direction,
  className = '',
  officesBannerText,
}) => {
  return (
    <div
      className={`relative w-full aspect-[1130/468] min-h-[clamp(200px,27.778vw,528px)] max-h-[clamp(400px,43.33vw,824px)] rounded-lg overflow-hidden ${className}`}
      dir={direction}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${MAP_SRC[direction]})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
      {officesBannerText != null && officesBannerText !== '' && (
        <div className={BANNER_POSITION_CLASS}>
          <IconBanner
            iconSrc={OFFICES_ICON_SRC}
            text={officesBannerText}
            direction={direction}
            iconColor="#ffffff"
            iconAlt=""
            backgroundClass="bg-base-tendersOfficesBanner"
          />
        </div>
      )}
    </div>
  );
};

export default TendersHeroMap;
