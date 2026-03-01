'use client';

import React from 'react';
import type { FeatureCardProps } from './interfaces/FeatureCardProps';
import { sizeMap } from './constants/sizeMap';

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  text,
  size = 'default',
  variant = 'default',
}) => {
  const isDark = variant === 'dark';
  const cardBg = isDark ? 'bg-transparent' : 'bg-base-secondary';
  const iconBg = isDark ? 'bg-base-base800' : 'bg-base-base800';
  const titleClass = isDark
    ? 'text-[clamp(1rem,1.1rem+0.3vw,1.25rem)] not-italic font-semibold leading-normal text-white text-center lg:text-start'
    : 'text-[clamp(1rem,1.1rem+0.3vw,1.25rem)] not-italic font-semibold leading-normal text-textTheme-primary text-center lg:text-start';
  const textClass = isDark
    ? 'text-xs not-italic font-normal leading-normal text-white/90 text-center lg:text-start'
    : 'text-xs not-italic font-normal leading-normal text-textTheme-secondary text-center lg:text-start';

  return (
    <div
      className={`flex flex-col h-full p-[2.4375rem] items-center gap-[1.3125rem] rounded-lg ${cardBg} ${sizeMap[size] || ''}`}
    >
      {icon != null && (
        <div
          className={`${iconBg} rounded-full w-[4.25rem] h-[4.25rem] flex justify-center items-center`}
        >
          {icon}
        </div>
      )}
      <div className={titleClass}>{title}</div>
      <div className={textClass}>{text}</div>
    </div>
  );
};

export default FeatureCard;
