'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IconBanner } from '@/components/ui/IconBanner';
import type { IconBannerProps } from '@/components/ui/IconBanner';
import { TextWithHighlight } from '@/components/ui/TextWithHighlight';
import type { TextWithBigPictureProps } from './interfaces/TextWithBigPictureProps';

/** Highlight (text) block: mobile = relative, stacked below picture; sm+ = absolute overlay with insets (top 252px, left/right 155px, width 555 at 1440). */
const HIGHLIGHT_TOP_SM_CLASS = 'sm:top-[clamp(60px,17.5vw,252px)]';
const HIGHLIGHT_LEFT_LTR_SM_CLASS = 'sm:left-[clamp(24px,10.76vw,155px)]';
const HIGHLIGHT_RIGHT_RTL_SM_CLASS = 'sm:right-[clamp(24px,10.76vw,155px)]';
const HIGHLIGHT_WIDTH_RESPONSIVE_CLASS = 'w-full sm:w-[clamp(280px,38.54vw,555px)]';
const HIGHLIGHT_MIN_HEIGHT_CLASS = 'min-h-[clamp(120px,15.28vw,220px)]';
/** Text size: 39px at 1440 (xl), clamp. Used as default when fontSizeClassName not passed from outside. */
const DEFAULT_FONT_SIZE_CLASS = 'text-[clamp(18px,2.71vw,39px)]';
const BADGES_GAP_CLASS = 'gap-[clamp(8px,0.69vw,12px)]';
/** First badge mobile size: max 172px wide, clamp till md */
const FIRST_BADGE_SIZE_CLASS = 'max-md:max-w-[clamp(140px,49.14vw,172px)] max-md:min-h-[clamp(38px,13.71vw,48px)] max-md:h-auto';
/** First badge: top-left on mobile; md+ top-right. */
const FIRST_BADGE_INSET_LTR_CLASS = `absolute top-[clamp(8px,2vw,16px)] left-[clamp(4px,1vw,8px)] md:top-[clamp(40px,12.92vw,186px)] md:left-auto md:right-0 ${FIRST_BADGE_SIZE_CLASS}`;
const FIRST_BADGE_INSET_RTL_CLASS = `absolute top-[clamp(8px,2vw,16px)] right-[clamp(4px,1vw,8px)] md:top-[clamp(40px,12.92vw,186px)] md:right-auto md:left-0 ${FIRST_BADGE_SIZE_CLASS}`;
/** Second badge: middle-right on mobile; md+ top-left. */
const SECOND_BADGE_INSET_LTR_CLASS = 'absolute top-[38%] right-[clamp(4px,1vw,8px)] md:top-[clamp(24px,4.86vw,70px)] md:right-auto md:left-0';
const SECOND_BADGE_INSET_RTL_CLASS = 'absolute top-[38%] left-[clamp(4px,1vw,8px)] md:top-[clamp(24px,4.86vw,70px)] md:left-auto md:right-0';
/** Third badge: pinned to bottom on mobile, pushed toward inline-end; md+ absolute top offset. */
const THIRD_BADGE_INSET_LTR_CLASS = 'absolute bottom-0 left-0 md:bottom-auto md:top-[clamp(58px,29.03vw,418px)] md:left-0';
const THIRD_BADGE_INSET_RTL_CLASS = 'absolute bottom-0 left-[clamp(4px,1vw,8px)] right-auto md:bottom-auto md:left-auto md:top-[clamp(58px,29.03vw,418px)] md:right-0';
/** Picture: 555×504 at 1440 → width ~38.54vw, height ~35vw */
const IMAGE_SIZE_CLASS = 'w-[clamp(280px,38.54vw,555px)] h-[clamp(252px,35vw,504px)] object-cover rounded-[clamp(6px,0.56vw,8px)]';
/** At 1440: 92px from viewport end (LTR = right, RTL = left). Responsive clamp. */
const COMPONENT_END_INSET_CLASS = 'me-[clamp(24px,6.39vw,92px)]';
/** Badge label text color (used only in this component). */
const BADGE_LABEL_TEXT_CLASS = 'text-[#2E2E2E]';
/** Badge background – #f5f5f5. Passed to IconBanner via backgroundClass. */
const BADGE_BACKGROUND_CLASS = 'bg-[#f5f5f5]';
/** Button size: 182×43px at 1440, clamp. */
const BUTTON_WIDTH_CLASS = 'w-[clamp(120px,12.64vw,182px)]';
const BUTTON_HEIGHT_CLASS = 'h-[clamp(38px,2.986vw,43px)]';
/** Default button styles when not overridden by props. */
const DEFAULT_BUTTON_BG_CLASS = 'bg-accent-cooperationHighlight hover:bg-[#f5df3a]';
const DEFAULT_BUTTON_TEXT_CLASS = 'text-black';

const TextWithBigPicture: React.FC<TextWithBigPictureProps> = ({
  text,
  highlightPart,
  pictureSrc,
  pictureAlt = '',
  iconBadgeItems,
  direction = 'ltr',
  className = '',
  buttonLabel,
  buttonHref,
  buttonBackgroundClassName,
  buttonTextClassName,
  buttonClassName,
  fontSizeClassName,
  textColorClassName,
  highlightColorClassName,
  highlightFontSizeClassName,
}) => {
  const insetClass = COMPONENT_END_INSET_CLASS;
  const firstBadgeClass = direction === 'rtl' ? FIRST_BADGE_INSET_RTL_CLASS : FIRST_BADGE_INSET_LTR_CLASS;
  const secondBadgeClass = direction === 'rtl' ? SECOND_BADGE_INSET_RTL_CLASS : SECOND_BADGE_INSET_LTR_CLASS;
  const thirdBadgeClass = direction === 'rtl' ? THIRD_BADGE_INSET_RTL_CLASS : THIRD_BADGE_INSET_LTR_CLASS;
  /** Highlight opposite to picture on sm+: LTR → left of image, RTL → right of image. */
  const highlightInsetSmClass = direction === 'rtl' ? HIGHLIGHT_RIGHT_RTL_SM_CLASS : HIGHLIGHT_LEFT_LTR_SM_CLASS;
  /** Mobile: column-reverse so text first, then picture. sm+: row-reverse (picture right, text left in LTR). */
  const flexRowClass = 'flex-col-reverse sm:flex-row-reverse';

  const highlightBlock = (
    <div
      className={`relative w-full min-w-0 max-sm:top-auto max-sm:left-auto max-sm:right-auto sm:absolute ${HIGHLIGHT_TOP_SM_CLASS} ${highlightInsetSmClass} ${HIGHLIGHT_WIDTH_RESPONSIVE_CLASS} ${HIGHLIGHT_MIN_HEIGHT_CLASS} flex flex-col justify-center gap-[clamp(8px,0.69vw,12px)] z-10 bg-white/90 max-sm:bg-transparent`}
    >
      <TextWithHighlight
        text={text}
        highlightPart={highlightPart}
        fontSizeClassName={fontSizeClassName ?? DEFAULT_FONT_SIZE_CLASS}
        highlightColorClassName={highlightColorClassName}
        highlightFontSizeClassName={highlightFontSizeClassName}
        className={`${textColorClassName ?? 'text-textTheme-primary'} leading-relaxed`}
      />
      {buttonLabel != null && buttonLabel !== '' && buttonHref != null && buttonHref !== '' && (
        <Link
          href={buttonHref}
          className={`mt-[clamp(4px,0.56vw,8px)] ${BUTTON_WIDTH_CLASS} ${BUTTON_HEIGHT_CLASS} inline-flex items-center justify-center rounded-[clamp(4px,0.556vw,8px)] text-[clamp(13px,0.9vw,16px)] font-semibold transition-colors ${buttonBackgroundClassName ?? DEFAULT_BUTTON_BG_CLASS} ${buttonTextClassName ?? DEFAULT_BUTTON_TEXT_CLASS} ${buttonClassName ?? ''}`.trim()}
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  );

  const pictureBlock = (
    <div className={`shrink-0 flex flex-col min-w-0 w-full max-w-full sm:max-w-[clamp(280px,38.54vw,555px)] ${BADGES_GAP_CLASS}`}>
      <div className="relative overflow-hidden rounded-[clamp(6px,0.56vw,8px)] w-full">
        <Image
          src={pictureSrc}
          alt={pictureAlt}
          width={555}
          height={504}
          className={`${IMAGE_SIZE_CLASS} max-w-full w-full object-cover object-center`}
        />
        {iconBadgeItems.map((item, index) => (
          <IconBanner
            key={index}
            icon={item.icon as IconBannerProps['icon']}
            iconSrc={item.iconSrc}
            text={item.text}
            direction={direction}
            iconColor="#000000"
            backgroundClass={BADGE_BACKGROUND_CLASS}
            textColorClass={BADGE_LABEL_TEXT_CLASS}
            className={index === 0 ? firstBadgeClass : index === 1 ? secondBadgeClass : index === 2 ? thirdBadgeClass : ''}
          />
        ))}
      </div>
    </div>
  );

  /** Mobile (column layout): use section gap between stacked blocks. sm+: row layout with smaller gap. */
  const gapClass = 'max-sm:gap-techrealt-section-gap sm:gap-[clamp(16px,2.78vw,40px)]';
  return (
    <div
      dir={direction}
      className={`flex ${flexRowClass} items-stretch ${gapClass} w-full min-w-0 max-w-full overflow-x-hidden ${insetClass} ${className}`.trim()}
    >
      {pictureBlock}
      {highlightBlock}
    </div>
  );
};

export default TextWithBigPicture;
