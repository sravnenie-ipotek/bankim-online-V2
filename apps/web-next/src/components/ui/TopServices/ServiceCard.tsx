'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { trackClick } from '@/helpers/analytics';
import type { ServiceCardProps } from './interfaces/ServiceCardProps';
import ArrowIcon from './components/ArrowIcon';

/** Card: full width × 100px on mobile (max-lg); 265×265 at lg (1440px), 338×338 at xl (1920px). */

const ServiceCard: React.FC<ServiceCardProps> = ({ title, to, icon }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] ?? 'en';
  const isHebrew = lang === 'he';

  const handleClick = (): void => {
    trackClick('service_card', to);
  };

  const arrowPositionClasses = isHebrew ? 'max-lg:order-3 max-lg:ml-auto' : 'max-lg:order-0';

  return (
    <Link
      href={to}
      onClick={handleClick}
      className="flex flex-col items-center bg-base-secondary p-6 transition-all duration-100 ease-in-out hover:bg-base-base800 shrink-0
        max-lg:w-full max-lg:h-[100px] max-lg:flex-row max-lg:justify-start max-lg:items-center max-lg:gap-4 max-lg:p-4
        w-[265px] h-[265px] xl:w-[338px] xl:h-[338px] rounded-[7px] xl:rounded-[9px] cursor-default hover:cursor-pointer"
    >
      <span className="text-[clamp(1rem,0.95rem+0.95vw,1.75rem)] not-italic font-semibold leading-normal text-textTheme-primary text-center shrink-0 max-lg:order-2 max-lg:text-left max-lg:rtl:text-right max-lg:font-semibold max-lg:min-w-0 max-lg:flex-1 max-lg:shrink max-lg:whitespace-normal max-lg:break-words">
        {title}
      </span>
      <span className="rtl:-scale-x-100 flex items-center justify-center mt-auto max-lg:mt-0 max-lg:order-1 max-lg:shrink-0 max-lg:w-16 max-lg:h-16 w-[140px] h-[140px] xl:w-[178px] xl:h-[178px] [&>img]:object-contain [&>img]:w-full [&>img]:h-full">
        {icon}
      </span>
      <span
        className={`hidden max-lg:flex max-lg:shrink-0 max-lg:items-center max-lg:justify-center max-lg:w-8 max-lg:h-8 text-textTheme-primary ${arrowPositionClasses} ${isHebrew ? '[&>svg]:-scale-x-100' : ''}`}
      >
        <ArrowIcon />
      </span>
    </Link>
  );
};

export default ServiceCard;
