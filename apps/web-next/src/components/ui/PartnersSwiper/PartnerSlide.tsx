'use client';

import React from 'react';
import Link from 'next/link';
import type { PartnerSlideProps } from './interfaces/PartnerSlideProps';

const PartnerSlide: React.FC<PartnerSlideProps> = ({
  partner,
  isFailed,
  onImageError,
  boxClassName,
  iconClassName,
  innerRef,
}) => {
  return (
    <Link
      ref={innerRef ?? undefined}
      href={partner.link}
      className={`flex-shrink-0 grayscale transition-all duration-200 hover:grayscale-0 flex items-center justify-center ${boxClassName}`}
    >
      {isFailed ? (
        <div
          className={`flex items-center justify-center text-sm text-textTheme-secondary bg-base-secondary rounded ${iconClassName}`}
        >
          {partner.name}
        </div>
      ) : (
        <span className={`flex items-center justify-center shrink-0 ${iconClassName}`}>
          <img
            src={partner.logo}
            alt={partner.name}
            className="object-contain w-full h-full"
            style={{ width: '100%', height: '100%' }}
            onError={onImageError}
          />
        </span>
      )}
    </Link>
  );
};

export default PartnerSlide;
