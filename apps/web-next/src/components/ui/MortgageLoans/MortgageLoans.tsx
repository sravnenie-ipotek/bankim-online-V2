'use client';

import React from 'react';
import Image from 'next/image';

import { OneClickBanner } from '@/components/ui/OneClickBanner';
import type { MortgageLoansProps } from './interfaces/MortgageLoansProps';

const DEFAULT_BANNER_HREF = '/services/refinance-mortgage/1';

const BANKIMONLINE_MORTGAGE_LOGO = '/static/partnerships/bankimonline-mortgage-logo.svg';
const MORTGAGE_LOANS_IMAGE_SRC = '/static/mortgage-loans.jpg';

/**
 * All left/right positioning uses physical CSS inline styles to bypass the
 * tailwindcss-rtl plugin (`[dir=rtl] .left-*` selectors on ancestor elements).
 * Left/right placement within the page is handled by the parent flex container.
 */

/** Container: 350×350 at 390px mobile, 398×350 at 1440 → 525×462 at 1900. */
const CONTAINER_WIDTH_CLASS = 'w-[clamp(279px,27.639vw,525px)] max-md:w-[clamp(320px,89.744vw,398px)]';
const CONTAINER_HEIGHT_CLASS = 'h-[clamp(245px,24.306vw,462px)] max-md:h-[clamp(320px,89.744vw,398px)]';

/** Bankimonline logo: 269×269 at 1440 → 355×355 at 1900 (18.681vw); scales on mobile. */
const BANKIM_SIZE_CLASS = 'w-[clamp(189px,18.681vw,355px)] h-[clamp(189px,18.681vw,355px)] max-md:w-[clamp(230px,60vw,269px)] max-md:h-[clamp(230px,60vw,269px)]';

/** Banner top: 280px at 1440 → 369px at 1900 (19.444vw); repositioned on mobile. */
const BANNER_TOP_CLASS = 'top-[clamp(196px,19.444vw,369px)] max-md:top-[clamp(230px,67.179vw,280px)]';

/**
 * Physical offsets — applied via inline styles as `left` (RTL) or `right` (LTR)
 * so the images always hug the inner edge that faces the page centre.
 */
const BANKIM_OFFSET = 'clamp(58px, 5.764vw, 110px)';
const BANKIM_TOP = 'clamp(29px, 2.847vw, 54px)';
const BANNER_OFFSET = 'clamp(50px, 10.556vw, 200px)';

const MortgageLoans: React.FC<MortgageLoansProps> = ({
  direction,
  getContent,
  alt,
  className = '',
  bannerHref = DEFAULT_BANNER_HREF,
}) => {
  const isRtl = direction === 'rtl';
  const bannerLabel = getContent('cooperation_mortgage_loans_banner');
  const imageAlt = alt ?? getContent('cooperation_mortgage_loans_banner');

  /**
   * RTL (Hebrew): container sits on the left of the flex row → images from the left edge.
   * LTR (Russian/English): container sits on the right of the flex row → images from the right edge.
   */
  const edge = isRtl ? 'left' : 'right';

  return (
    <div className={`relative ${CONTAINER_WIDTH_CLASS} ${CONTAINER_HEIGHT_CLASS} ${className}`.trim()}>
      {/* Bankimonline logo */}
      <div
        className={`absolute z-0 overflow-hidden rounded-lg ${BANKIM_SIZE_CLASS}`}
        style={{ [edge]: BANKIM_OFFSET, top: BANKIM_TOP }}
      >
        <Image
          src={BANKIMONLINE_MORTGAGE_LOGO}
          alt=""
          width={269}
          height={269}
          className="h-full w-full object-contain"
          aria-hidden
        />
      </div>
      {/* Mortgage picture — all layout via inline styles to avoid any CSS overrides */}
      <div
        className="z-10 overflow-hidden rounded-full"
        style={{
          position: 'absolute',
          top: 0,
          right: isRtl ? 'auto' : '0px',
          left: isRtl ? '0px' : 'auto',
          width: 'clamp(85px, 8.403vw, 160px)',
          height: 'clamp(85px, 8.403vw, 160px)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.12)',
        }}
      >
        <Image
          src={MORTGAGE_LOANS_IMAGE_SRC}
          alt={imageAlt}
          width={121}
          height={121}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Banner — aligned to circle on mobile (edge: 0); offset on md+ */}
      <OneClickBanner
        href={bannerHref}
        label={bannerLabel}
        direction={direction}
        className={`absolute ${BANNER_TOP_CLASS} z-0 ${isRtl ? 'max-md:!left-0 md:!left-4' : 'max-md:!right-0'}`}
        style={{ [edge]: BANNER_OFFSET }}
      />
    </div>
  );
};

export default MortgageLoans;
