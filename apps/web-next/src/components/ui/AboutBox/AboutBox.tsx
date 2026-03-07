'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { BannerShapeDecoration } from './components/BannerShapeDecoration';
import type { AboutBoxProps } from './interfaces/AboutBoxProps';

const DEFAULT_SHAPE_FILL = '#FBE54D';
const BLACK_WHITE_SHAPE_FILL = '#2d2d2d';

const AboutBox: React.FC<AboutBoxProps> = ({
  description,
  title,
  buttonLabel,
  buttonHref,
  variant,
  direction,
  shapeFillColor,
  className = '',
}) => {
  const isBlackAndWhite = variant === 'blackAndWhite';
  const fill = shapeFillColor ?? (isBlackAndWhite ? BLACK_WHITE_SHAPE_FILL : DEFAULT_SHAPE_FILL);

  const bgClass = isBlackAndWhite ? 'bg-[#0a0a0a]' : 'bg-base-sidebarBg';
  const textClass = isBlackAndWhite ? 'text-[#e5e5e5]' : 'text-white';
  const buttonClass = isBlackAndWhite
    ? 'bg-[#f5f5f5] text-[#1a1a1a] border border-[#333] hover:bg-[#ebebeb]'
    : 'bg-white/10 text-white border border-white/30 hover:bg-white/20';

  const showButton = buttonLabel !== undefined && buttonLabel !== '';
  const useLink = showButton && buttonHref !== undefined && buttonHref !== '';

  const buttonContent = (
    <>
      {buttonLabel}
      <Image
        src="/static/arrow_triangle.png"
        alt=""
        width={20}
        height={20}
        className={`shrink-0 w-5 h-5 object-contain ms-auto ${direction === 'rtl' ? 'rotate-180' : ''}`}
        aria-hidden
      />
    </>
  );

  const buttonWrapperClass = `inline-flex items-center justify-center gap-[clamp(6px,0.8vw,12px)] rounded-[clamp(4px,0.4vw,8px)] px-[clamp(16px,2.2vw,24px)] py-[clamp(8px,1.1vw,14px)] text-[clamp(14px,1.1vw,16px)] font-semibold transition-colors w-fit mt-auto ${buttonClass}`.trim();

  const wrapperClass = `overflow-hidden ${bgClass} flex items-center justify-start py-[clamp(1rem,3vw,1.5rem)] min-h-[clamp(80px,9vw,130px)] relative rounded-[4px] w-full ps-[clamp(1rem,2vw,2rem)] pe-[10%] max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:p-[2.4375rem] max-sm:gap-[1.3125rem] max-sm:rounded-lg ${className}`.trim();

  return (
    <div className={wrapperClass} dir={direction}>
      <BannerShapeDecoration fill={fill} direction={direction} />
      <div className="relative z-10 flex flex-1 min-h-0 self-stretch items-center gap-[clamp(12px,1.5vw,24px)] w-full max-sm:flex-col">
        <div className="flex flex-1 min-h-0 flex-col gap-[clamp(8px,1.11vw,16px)] max-w-[48rem] w-full pt-0 max-sm:items-center max-sm:text-center">
          {title !== undefined && title !== '' && (
            <h2 className={`text-[clamp(1rem,1.8vw,1.5rem)] font-semibold leading-tight text-start w-full ${textClass}`}>
              {title}
            </h2>
          )}
          {description !== undefined && description !== '' && (
            <p
              className={`text-[clamp(14px,2.19vw,25px)] not-italic font-normal leading-[140%] max-sm:font-inter max-sm:text-xs max-sm:leading-normal ${textClass}`}
              dir={direction}
            >
              {description}
            </p>
          )}
          {showButton &&
            (useLink ? (
              <Link href={buttonHref} className={buttonWrapperClass}>
                {buttonContent}
              </Link>
            ) : (
              <span className={buttonWrapperClass}>{buttonContent}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AboutBox;
