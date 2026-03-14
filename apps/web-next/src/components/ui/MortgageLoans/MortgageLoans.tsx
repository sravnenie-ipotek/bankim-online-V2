'use client';

import React from 'react';

import { LogoWithCircleImage } from '@/components/ui/LogoWithCircleImage';
import { OneClickBanner } from '@/components/ui/OneClickBanner';
import type { MortgageLoansProps } from './interfaces/MortgageLoansProps';

const DEFAULT_BANNER_HREF = '/services/refinance-mortgage/1';

const BANKIMONLINE_MORTGAGE_LOGO = '/static/partnerships/bankimonline-mortgage-logo.svg';
const MORTGAGE_LOANS_IMAGE_SRC = '/static/mortgage-loans.jpg';

/** Banner top and edge offset for positioning inside LogoWithCircleImage. */
const BANNER_TOP_CLASS = 'top-[clamp(196px,19.444vw,369px)] max-md:top-[clamp(230px,67.179vw,280px)]';
const BANNER_OFFSET = 'clamp(50px, 10.556vw, 200px)';

const MortgageLoans: React.FC<MortgageLoansProps> = ({
  direction,
  getContent,
  alt,
  className = '',
  bannerHref = DEFAULT_BANNER_HREF,
  bannerIconSrc,
}) => {
  const isRtl = direction === 'rtl';
  const bannerLabel = getContent('cooperation_mortgage_loans_banner');
  const imageAlt = alt ?? getContent('cooperation_mortgage_loans_banner');
  const edge = isRtl ? 'left' : 'right';

  return (
    <LogoWithCircleImage
      logoSrc={BANKIMONLINE_MORTGAGE_LOGO}
      imageSrc={MORTGAGE_LOANS_IMAGE_SRC}
      imageAlt={imageAlt}
      direction={direction}
      className={className}
    >
      <OneClickBanner
        href={bannerHref}
        label={bannerLabel}
        direction={direction}
        iconSrc={bannerIconSrc}
        className={`absolute ${BANNER_TOP_CLASS} z-0 ${isRtl ? 'max-md:!left-0 md:!left-4' : 'max-md:!right-0'}`}
        style={{ [edge]: BANNER_OFFSET }}
      />
    </LogoWithCircleImage>
  );
};

export default MortgageLoans;
