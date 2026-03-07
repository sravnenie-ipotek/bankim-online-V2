'use client';

import React from 'react';
import Image from 'next/image';

import type { BulletItemProps } from './interfaces/BulletItemProps';

const BULLET_IMAGE_SRC = '/static/partnerships/yellow-dot.svg';

/** Bullet icon: 20×20 at 1440px (1.389vw), scales 16px–24px across resolutions. */
const BULLET_SIZE_CLASS = 'w-[clamp(16px,1.389vw,24px)] h-[clamp(16px,1.389vw,24px)] shrink-0';

/** Bullet description text: 16px at 1440 (1.111vw), responsive. */
const DESCRIPTION_CLASS = 'text-[clamp(13px,1.111vw,20px)] text-white leading-relaxed min-w-0';

const BulletItem: React.FC<BulletItemProps> = ({
  description,
  direction = 'ltr',
  className = '',
}) => {
  return (
    <div
      dir={direction}
      className={`flex flex-row items-start gap-[clamp(8px,1.111vw,21px)] w-full ${className}`.trim()}
    >
      <Image
        src={BULLET_IMAGE_SRC}
        alt=""
        width={20}
        height={20}
        className={BULLET_SIZE_CLASS}
        aria-hidden
      />
      <p className={DESCRIPTION_CLASS}>{description}</p>
    </div>
  );
};

export default BulletItem;
