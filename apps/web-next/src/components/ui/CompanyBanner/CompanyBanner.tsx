'use client';

import React from 'react';

import { BulletsSection } from '@/components/ui/BulletsSection';
import { LogoWithCircleImage } from '@/components/ui/LogoWithCircleImage';
import type { CompanyBannerProps } from './interfaces/CompanyBannerProps';

const CompanyBanner: React.FC<CompanyBannerProps> = ({
  direction,
  backgroundClassName,
  title,
  titleClassName = '',
  description,
  descriptionClassName = '',
  bullets,
  bulletIconSrc,
  bulletsClassName = '',
  bulletDescriptionClassName = '',
  logoSrc,
  imageSrc,
  imageAlt,
  logoSizeVariant = 'default',
  className = '',
}) => {
  const hasBullets = bullets != null && bullets.length > 0;

  const leftContent = (
    <div className="flex flex-col items-start justify-center gap-[clamp(8px,1.111vw,16px)] min-w-0 w-full">
      {title !== '' && (
        <h2 className={`font-medium leading-tight ${titleClassName}`.trim()}>{title}</h2>
      )}
      {description != null && description !== '' && (
        <p className={`leading-relaxed ${descriptionClassName}`.trim()}>{description}</p>
      )}
      {hasBullets && (
        <BulletsSection
          title=""
          description=""
          bulletsText={bullets}
          bulletsClassName={bulletsClassName}
          bulletDescriptionClassName={bulletDescriptionClassName}
          bulletIconSrc={bulletIconSrc}
          direction={direction}
          layout="horizontal"
          containerClassName="!mt-0 !gap-[clamp(12px,1.667vw,28px)] w-full min-w-0"
          showButton={false}
        />
      )}
    </div>
  );

  const rightContent = (
    <LogoWithCircleImage
      logoSrc={logoSrc}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      direction={direction}
      showBanner={false}
      sizeVariant={logoSizeVariant}
    />
  );

  return (
    <div
      className={`relative w-full py-[clamp(24px,3.333vw,48px)] ${className}`.trim()}
      role="region"
      aria-label="Company highlight"
    >
      <div
        className={`absolute inset-y-0 ${backgroundClassName}`}
        style={{
          left: 'calc(-50vw + 50%)',
          right: 'calc(-50vw + 50%)',
        }}
        aria-hidden
      />
      <div
        dir={direction}
        className="relative z-10 w-full flex flex-col gap-[clamp(16px,2.222vw,32px)]"
      >
        <div className="flex flex-col md:flex-row items-start gap-[clamp(16px,4.167vw,60px)] w-full">
          <div className="flex flex-col items-start justify-center gap-[clamp(8px,1.111vw,16px)] min-w-0 w-full md:w-[clamp(280px,49.306vw,710px)] md:h-[clamp(245px,24.306vw,350px)]">
            {leftContent}
          </div>
          <div className="relative shrink-0 md:ms-auto w-full max-w-[clamp(280px,27.639vw,398px)] md:h-[clamp(245px,24.306vw,350px)] max-md:mx-auto overflow-visible flex flex-col">
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyBanner;
