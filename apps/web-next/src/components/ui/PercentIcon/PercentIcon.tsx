'use client';

import React from 'react';
import Image from 'next/image';

import type { PercentIconProps } from './interfaces/PercentIconProps';

const DEFAULT_SIZE_CLASS = 'w-[clamp(40px,4.722vw,68px)] h-[clamp(40px,4.722vw,68px)] self-start';
const DEFAULT_ICON_SRC = '/static/partnerships/percent-icon.svg';

const PercentIcon: React.FC<PercentIconProps> = ({
  className = '',
  iconSrc = DEFAULT_ICON_SRC,
}) => {
  const sizeClass = className.trim() || DEFAULT_SIZE_CLASS;

  return (
    <Image
      src={iconSrc}
      alt=""
      width={68}
      height={68}
      className={`object-contain ${sizeClass}`.trim()}
      aria-hidden
    />
  );
};

export default PercentIcon;
