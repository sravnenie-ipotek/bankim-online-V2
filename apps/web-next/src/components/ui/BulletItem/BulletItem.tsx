'use client';

import React from 'react';
import Image from 'next/image';

import type { BulletItemProps } from './interfaces/BulletItemProps';

const BULLET_IMAGE_SRC = '/static/partnerships/yellow-dot.svg';

/** Bullet icon: 20×20 at 1440px (1.389vw), scales 16px–24px across resolutions. */
const BULLET_SIZE_CLASS = 'w-[clamp(16px,1.389vw,24px)] h-[clamp(16px,1.389vw,24px)] shrink-0';

/** Bullet description text: 14px at 1440, clamp for 1900 etc. Inherits color from parent when bulletsClassName is set. */
const DESCRIPTION_CLASS = 'text-[clamp(12px,0.972vw,18px)] leading-relaxed min-w-0';

const BulletItem: React.FC<BulletItemProps> = ({
  description,
  direction = 'ltr',
  className = '',
  iconSrc,
  descriptionClassName,
}) => {
  const iconSource = iconSrc ?? BULLET_IMAGE_SRC;
  const paragraphClass = descriptionClassName?.trim() ? descriptionClassName.trim() : DESCRIPTION_CLASS;
  return (
    <div
      dir={direction}
      className={`flex flex-row items-start gap-[clamp(8px,1.111vw,21px)] w-full ${className}`.trim()}
    >
      <Image
        src={iconSource}
        alt=""
        width={20}
        height={20}
        className={BULLET_SIZE_CLASS}
        aria-hidden
      />
      <p className={paragraphClass}>{description}</p>
    </div>
  );
};

export default BulletItem;
