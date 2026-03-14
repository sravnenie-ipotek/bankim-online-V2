'use client';

import React from 'react';
import Image from 'next/image';

import type { TextWithIconProps } from './interfaces/TextWithIconProps';

const DEFAULT_ICON_SIZE_CLASS = 'w-[clamp(40px,4.722vw,68px)] h-[clamp(40px,4.722vw,68px)] self-start';
const DEFAULT_TITLE_CLASS = 'text-[clamp(24px,2.708vw,51px)]';
const DEFAULT_DESC_CLASS = 'text-[clamp(14px,1.319vw,25px)]';

const TextWithIcon: React.FC<TextWithIconProps> = ({
  title,
  description,
  iconSrc,
  backgroundClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  iconClassName = '',
  iconWrapperClassName = '',
  showButton = false,
  buttonLabel = '',
  textWhite = false,
  compactTitleDescription = false,
  titleToDescriptionGapClassName = '',
  iconToContentGapClassName = '',
  stickButtonToBottom = false,
  className = '',
}) => {
  const titleMinHeightClass = compactTitleDescription ? 'min-h-0' : 'min-h-[clamp(48px,6.389vw,121px)]';
  const titleSizeClass = titleClassName.trim() || DEFAULT_TITLE_CLASS;
  const descSizeClass = descriptionClassName.trim() || DEFAULT_DESC_CLASS;
  const titleHasColor = titleSizeClass.includes('text-');
  const descHasColor = descSizeClass.includes('text-');
  const defaultTitleColor = !titleHasColor ? (textWhite ? 'text-white' : 'text-black') : '';
  const defaultDescColor = !descHasColor ? (textWhite ? 'text-[#D0D0D0]' : 'text-black/80') : '';
  const titleClass = `w-full ${titleMinHeightClass} font-bold ${titleSizeClass} leading-tight whitespace-pre-line text-start ${defaultTitleColor}`.trim();
  const descClass = `w-full ${descSizeClass} leading-relaxed whitespace-pre-line text-start ${defaultDescColor}`.trim();
  const titleDescGap = titleToDescriptionGapClassName.trim()
    || (compactTitleDescription ? 'gap-0.5' : 'gap-[clamp(8px,1.111vw,16px)]');
  const iconToContentGap = iconToContentGapClassName.trim() || 'gap-[clamp(8px,1.111vw,16px)]';
  const iconSizeClass = iconClassName.trim() || DEFAULT_ICON_SIZE_CLASS;

  const titleAndDescription = (
    <div className={`flex flex-col items-start ${titleDescGap}`}>
      <h2 className={titleClass}>{title}</h2>
      <p className={descClass}>{description}</p>
    </div>
  );

  const rootHeightClass = stickButtonToBottom ? 'h-full' : '';
  const buttonPositionClass = stickButtonToBottom ? 'mt-auto' : '';

  return (
    <div
      className={`flex flex-col items-start justify-start gap-[clamp(8px,1.111vw,16px)] min-w-0 w-full ${rootHeightClass} ${backgroundClassName} ${className}`.trim()}
    >
      <div className={`flex flex-col items-start ${iconToContentGap}`}>
        {iconSrc != null && iconSrc !== '' && (
          <div className={iconWrapperClassName.trim() || undefined}>
            <Image
              src={iconSrc}
              alt=""
              width={68}
              height={68}
              className={`object-contain ${iconSizeClass}`.trim()}
              aria-hidden
            />
          </div>
        )}
        {titleAndDescription}
      </div>
      {showButton && buttonLabel != null && buttonLabel !== '' && (
        <button
          type="button"
          className={`bg-base-primary hover:opacity-90 text-white font-semibold rounded-[clamp(4px,0.556vw,10px)] px-[clamp(20px,2.778vw,40px)] py-[clamp(10px,1.111vw,16px)] text-[clamp(14px,1.111vw,16px)] transition-opacity whitespace-nowrap self-start ${buttonPositionClass}`.trim()}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default TextWithIcon;
