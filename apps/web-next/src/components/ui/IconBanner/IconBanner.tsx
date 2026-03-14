'use client';

import React from 'react';
import Image from 'next/image';

import type { IconBannerProps } from './interfaces/IconBannerProps';

const BANNER_BG_CLASS = 'bg-base-sidebarBg';
const BANNER_ROUNDED_CLASS = 'rounded-[clamp(6px,0.556vw,8px)]';
const BANNER_PADDING_CLASS = 'px-[clamp(8px,0.694vw,12px)] py-[clamp(6px,0.556vw,10px)]';
const BANNER_GAP_CLASS = 'gap-[clamp(8px,0.694vw,12px)]';
const ICON_SIZE_CLASS = 'w-[clamp(18px,1.26vw,24px)] h-[clamp(18px,1.26vw,24px)] shrink-0';
const TEXT_SIZE_LEADING_CLASS = 'text-techrealt-mobile-font md:text-[clamp(11px,0.84vw,16px)] leading-[1.4]';
const DEFAULT_TEXT_COLOR_CLASS = 'text-white';

/** CSS filter: white (#FFF) → theme yellow (#FBE54D). Used for <img> fallback only. */
const ICON_YELLOW_FILTER =
  'brightness(0) saturate(100%) invert(85%) sepia(50%) saturate(800%) hue-rotate(358deg) brightness(104%) contrast(97%)';

const OPTIONAL_IMAGE_SIZE_CLASS = 'w-[clamp(24px,1.68vw,32px)] h-[clamp(24px,1.68vw,32px)] shrink-0';

/** CSS filter for white icon when using iconSrc. */
const ICON_WHITE_FILTER = 'brightness(0) invert(1)';
/** CSS filter for black icon when using iconSrc. */
const ICON_BLACK_FILTER = 'brightness(0)';

/** Same as tenders-for-brokers badge height: 70px at 1900, responsive. */
const DEFAULT_SIZE_CLASS = 'w-auto h-auto min-h-[clamp(36px,9vw,50px)] md:min-h-0 md:h-[clamp(50px,3.68vw,70px)]';

const IconBanner: React.FC<IconBannerProps> = ({
  icon,
  iconSrc,
  text,
  iconAlt = '',
  direction = 'ltr',
  className = '',
  optionalImageSrc,
  optionalImageAlt = '',
  width,
  height,
  iconColor,
  backgroundClass,
  textColorClass,
  iconFilterClassName,
}) => {
  const sizeClass = width != null || height != null ? '' : DEFAULT_SIZE_CLASS;
  const sizeStyle =
    width != null || height != null
      ? {
          width: width != null ? (typeof width === 'number' ? `${width}px` : width) : undefined,
          height: height != null ? (typeof height === 'number' ? `${height}px` : height) : undefined,
        }
      : undefined;

  const normalizedIconColor = iconColor?.toLowerCase().trim();
  const isBlack =
    normalizedIconColor === 'black' || normalizedIconColor === '#000' || normalizedIconColor === '#000000';
  const isWhite =
    normalizedIconColor === 'white' || normalizedIconColor === '#fff' || normalizedIconColor === '#ffffff';
  const useThemeFilter = iconFilterClassName != null && iconFilterClassName.trim() !== '';
  const defaultIconFilter =
    isBlack ? ICON_BLACK_FILTER : isWhite ? ICON_WHITE_FILTER : ICON_YELLOW_FILTER;
  const iconImageStyle = useThemeFilter ? undefined : { filter: defaultIconFilter };
  const iconImageClass: string = useThemeFilter && iconFilterClassName ? iconFilterClassName.trim() : '';
  const iconSpanStyle = iconColor != null && iconColor !== '' ? { color: iconColor } : undefined;
  const iconSpanClass =
    iconColor == null || iconColor === ''
      ? 'text-accent-cooperationHighlight'
      : undefined;

  const effectiveBgClass = backgroundClass != null && backgroundClass !== '' ? backgroundClass : BANNER_BG_CLASS;
  const effectiveTextColorClass =
    textColorClass != null && textColorClass !== '' ? textColorClass : DEFAULT_TEXT_COLOR_CLASS;

  return (
    <section
      dir={direction}
      aria-label={text}
      className={`flex md:inline-flex flex-row items-center ${sizeClass} ${BANNER_GAP_CLASS} ${BANNER_PADDING_CLASS} ${BANNER_ROUNDED_CLASS} ${effectiveBgClass} ${className}`.trim()}
      style={sizeStyle}
    >
      <span
        className={`${ICON_SIZE_CLASS} ${iconSpanClass ?? ''}`.trim()}
        style={iconSpanStyle}
      >
        {icon != null ? (
          icon
        ) : iconSrc != null ? (
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={24}
            height={24}
            className={`w-full h-full object-contain ${iconImageClass}`.trim()}
            style={iconImageStyle}
            aria-hidden={!iconAlt}
          />
        ) : null}
      </span>
      {optionalImageSrc != null && optionalImageSrc !== '' && (
        <Image
          src={optionalImageSrc}
          alt={optionalImageAlt}
          width={32}
          height={32}
          className={`${OPTIONAL_IMAGE_SIZE_CLASS} object-contain`}
          aria-hidden={optionalImageAlt === ''}
        />
      )}
      <p className={`min-w-0 text-start whitespace-normal md:whitespace-pre-line break-words ${effectiveTextColorClass} ${TEXT_SIZE_LEADING_CLASS}`}>
        {text}
      </p>
    </section>
  );
};

export default IconBanner;
