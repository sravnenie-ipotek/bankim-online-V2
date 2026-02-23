'use client';

import React from 'react';
import type { HeroTextBlockProps } from './interfaces/HeroTextBlockProps';

const HeroTextBlock: React.FC<HeroTextBlockProps> = ({
  title,
  subtitle,
  text,
  isSmall = false,
}) => {
  const wrapperClassName = isSmall
    ? 'flex flex-col gap-1 items-start h-[11.5rem] justify-center max-[768px]:mt-8 max-[768px]:items-center'
    : 'flex flex-col gap-2 items-start -mt-2 max-[768px]:mt-2 max-[768px]:items-center';

  /* ! ensures hero colors/font win over body and base layer inheritance */
  const titleClassName = isSmall
    ? '!font-he !font-normal leading-normal !text-textTheme-primary w-[37.25rem] max-[768px]:text-center max-[768px]:w-full !text-[clamp(1.75rem,1.5rem+1.2vw,3rem)]'
    : '!font-he !font-normal leading-normal !text-textTheme-primary uppercase max-[768px]:normal-case max-[768px]:text-center !text-[clamp(1.75rem,2rem+1vw,4rem)]';

  const subtitleClassName =
    '!font-normal !text-accent-primary max-[768px]:text-center !text-[clamp(1.25rem,1.2rem+0.5vw,1.9375rem)]';

  const textClassName = isSmall
    ? '!font-normal opacity-90 !text-textTheme-primary whitespace-pre-line max-[768px]:text-center !text-[clamp(0.875rem,0.9rem+0.3vw,1.125rem)]'
    : '!font-normal opacity-90 !text-textTheme-primary whitespace-pre-line max-[768px]:text-center !text-[clamp(0.875rem,0.95rem+0.35vw,1.25rem)]';

  return (
    <div className={`hero-text-block ${wrapperClassName}`}>
      <h2 className={`hero-text-block__title ${titleClassName}`}>{title}</h2>
      <p className={`hero-text-block__subtitle ${subtitleClassName}`}>{subtitle}</p>
      <span className={`hero-text-block__body ${textClassName}`}>{text}</span>
    </div>
  );
};

export default HeroTextBlock;
