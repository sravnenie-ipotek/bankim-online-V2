'use client';

import React from 'react';
import Image from 'next/image';

import type { CircleImageProps } from './interfaces/CircleImageProps';

const DEFAULT_SIZE_CLASS = 'w-[clamp(85px,8.403vw,160px)] h-[clamp(85px,8.403vw,160px)]';
const DEFAULT_SHADOW = '0px 8px 16px rgba(0, 0, 0, 0.12)';

/**
 * Picture inside a circle; reusable from cooperation (MortgageLoans) and tenders.
 * Positioned at top-start (RTL: left, LTR: right) by default; parent should be relative.
 */
const CircleImage: React.FC<CircleImageProps> = ({
  imageSrc,
  imageAlt,
  direction,
  className = '',
  borderColor,
  sizeClassName = DEFAULT_SIZE_CLASS,
}) => {
  const isRtl = direction === 'rtl';
  const edge = isRtl ? 'left' : 'right';

  return (
    <div
      className={`z-10 overflow-hidden rounded-full ${sizeClassName} ${className}`.trim()}
      style={{
        position: 'absolute',
        top: 0,
        [edge]: 0,
        boxShadow: DEFAULT_SHADOW,
        ...(borderColor ? { border: `3px solid ${borderColor}` } : {}),
      }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={121}
        height={121}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default CircleImage;
