'use client';

import React, { useRef, useState } from 'react';
import { useContentApi } from '@hooks/useContentApi';
import type { BankSlide } from './interfaces/BankSlide';
import type { PartnersSwiperProps } from './interfaces/PartnersSwiperProps';
import PartnerSlide from './PartnerSlide';

const BANK_SLIDES: BankSlide[] = [
  { name: 'Bank Leumi', link: '/banks/leumi', logo: '/static/bankleumilogo-1.svg' },
  { name: 'Discount Bank', link: '/banks/discount', logo: '/static/discountbank.svg' },
  { name: 'Bank Beinleumi', link: '/banks/beinleumi', logo: '/static/bank-igud-logo.svg' },
  { name: 'Bank of Jerusalem', link: '/banks/jerusalem', logo: '/static/mobile/banki184-jers.svg' },
  { name: 'Bank Hapoalim', link: '/banks/apoalim', logo: '/static/bankhapoalim.svg' },
  {
    name: 'Mercantile Discount',
    link: '/banks/mercantile-discount',
    logo: '/static/bank-of-israel-symbol.svg',
  },
];

/** Breakpoint-based: xs 375 | sm 768 | md 1024 | lg 1440 | xl 1920. Frame lg: 1128×145, xl: 1504×200. Box lg: 198×100, xl: 264×133. Icon lg: 150×42, xl: 200×56. Arrow lg: 32px, xl: 43px. */
const GAP_PX = 16;
const BOX_WIDTH_LG = 198;

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 24L12 16L20 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 8L20 16L12 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DEFAULT_BOX_CLASS = 'w-[140px] h-[80px] sm:w-[160px] sm:h-[90px] md:w-[180px] md:h-[95px] lg:w-[198px] lg:h-[100px] xl:w-[264px] xl:h-[133px]';
const DEFAULT_ICON_CLASS = 'w-[100px] h-[30px] sm:w-[120px] sm:h-[36px] md:w-[140px] md:h-[40px] lg:w-[150px] lg:h-[42px] xl:w-[200px] xl:h-[56px]';

const DEFAULT_TITLE_KEY = 'banks_partners';

const PartnersSwiper: React.FC<PartnersSwiperProps> = ({
  getContent: getContentProp,
  titleKey,
  titleClassName,
  width,
  height,
  backgroundColor,
  className = '',
  boxClassName,
  iconClassName,
}) => {
  const { getContent: internalGetContent } = useContentApi('home_page');
  const getContent = getContentProp ?? internalGetContent;
  const resolvedTitleKey = titleKey ?? DEFAULT_TITLE_KEY;
  const title = getContent(resolvedTitleKey);

  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLAnchorElement>(null);
  const boxClass = boxClassName ?? DEFAULT_BOX_CLASS;
  const iconClass = iconClassName ?? DEFAULT_ICON_CLASS;
  const titleClass = titleClassName ?? '';

  const handleImageError = (name: string) => {
    setFailedImages((prev) => new Set(prev).add(name));
  };

  const getScrollStep = (): number => {
    if (firstCardRef.current) {
      const width = firstCardRef.current.offsetWidth;
      return width + GAP_PX;
    }
    return BOX_WIDTH_LG + GAP_PX;
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    const isRtl = document.documentElement.dir === 'rtl';
    const step = getScrollStep();
    scrollRef.current.scrollBy({ left: isRtl ? step : -step, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!scrollRef.current) return;
    const isRtl = document.documentElement.dir === 'rtl';
    const step = getScrollStep();
    scrollRef.current.scrollBy({ left: isRtl ? -step : step, behavior: 'smooth' });
  };

  const wrapperStyle: React.CSSProperties = {};
  if (width !== undefined) wrapperStyle.width = width;
  if (height !== undefined) wrapperStyle.height = height;
  if (backgroundColor !== undefined) wrapperStyle.backgroundColor = backgroundColor;

  return (
    <div
      className={`relative flex flex-col gap-8 w-full text-[#e7e9ea] overflow-hidden px-0 text-[clamp(0.9rem,0.85rem+0.4vw,1.13rem)] ${className}`.trim()}
      style={Object.keys(wrapperStyle).length > 0 ? wrapperStyle : undefined}
    >
      <div className={`flex items-center w-full justify-start text-left rtl:text-right font-medium text-[#e7e9ea] ${titleClass}`.trim()}>
        <span>{title}</span>
      </div>

      <div className="relative w-full max-w-full mx-auto flex items-center justify-center gap-2 h-[100px] sm:h-[120px] md:h-[133px] lg:h-[145px] xl:h-[200px] w-full lg:max-w-[1128px] xl:max-w-[1504px]">
        <button
          type="button"
          onClick={scrollPrev}
          className="shrink-0 flex items-center justify-center rounded-full border border-[#333535] bg-base-secondary text-white hover:bg-base-base800 transition-colors rtl:rotate-180 w-8 h-8 lg:w-8 lg:h-8 xl:w-[43px] xl:h-[43px]"
          aria-label={getContent('back')}
        >
          <ChevronLeftIcon />
        </button>
        <div className="relative min-w-0 flex-1 flex items-center justify-center h-[100px] sm:h-[120px] md:h-[133px] lg:h-[145px] xl:h-[200px]">
          <div
            ref={scrollRef}
            className="flex justify-start items-center overflow-x-auto overflow-y-hidden scrollbar-hide w-full h-full scroll-smooth gap-4"
          >
            {BANK_SLIDES.map((slide, index) => (
              <PartnerSlide
                key={slide.name}
                partner={slide}
                isFailed={failedImages.has(slide.name)}
                onImageError={() => handleImageError(slide.name)}
                boxClassName={boxClass}
                iconClassName={iconClass}
                innerRef={index === 0 ? firstCardRef : undefined}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollNext}
          className="shrink-0 flex items-center justify-center rounded-full border border-[#333535] bg-base-secondary text-white hover:bg-base-base800 transition-colors rtl:rotate-180 w-8 h-8 lg:w-8 lg:h-8 xl:w-[43px] xl:h-[43px]"
          aria-label={getContent('button_next')}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default PartnersSwiper;
