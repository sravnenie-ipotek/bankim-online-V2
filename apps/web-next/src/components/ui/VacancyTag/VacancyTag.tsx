'use client';

import React from 'react';
import Image from 'next/image';
import type { VacancyTagProps } from './interfaces/VacancyTagProps';

const TAG_ICON_SRC: Record<NonNullable<VacancyTagProps['iconType']>, string> = {
  tag: '/static/tags/tag-icon.svg',
  location: '/static/tags/location-icon.svg',
  nis: '/static/tags/nis-icon.svg',
};

/**
 * Reusable vacancy tag/badge.
 * Size: clamp for 96×38 at 1400×1469 (min-w 6.86vw→96px, min-h 2.59vh→38px). Radius 20px; padding 9px 16px.
 */
const VacancyTag: React.FC<VacancyTagProps> = ({ children, className = '', iconType = 'tag', iconSrc: iconSrcProp, showBackground = true }) => {
  const fallbackSrc = TAG_ICON_SRC[iconType];
  const iconSrc = iconSrcProp && iconSrcProp.startsWith('/') ? iconSrcProp : fallbackSrc;
  const baseClasses = 'inline-flex items-center justify-center gap-1.5 text-textTheme-secondary text-sm';
  const withBgClasses = 'min-w-[clamp(72px,6.86vw,96px)] min-h-[clamp(32px,2.59vh,38px)] pt-[9px] pr-4 pb-[9px] pl-4 rounded-[20px] bg-base-tagBg box-border';
  const classes = showBackground ? `${baseClasses} ${withBgClasses} ${className}`.trim() : `${baseClasses} ${className}`.trim();
  return (
    <span className={classes}>
      <Image src={iconSrc} alt="" width={24} height={24} className="w-[clamp(16px,1.429vw,24px)] h-[clamp(16px,1.429vw,24px)] shrink-0" aria-hidden />
      {children}
    </span>
  );
};

export default VacancyTag;
