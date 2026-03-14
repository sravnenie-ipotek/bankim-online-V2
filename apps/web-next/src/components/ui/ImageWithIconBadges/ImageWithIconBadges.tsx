'use client';

import React from 'react';
import Image from 'next/image';

import { IconBanner } from '@/components/ui/IconBanner';
import type { ImageWithIconBadgesProps } from './interfaces/ImageWithIconBadgesProps';

const CONTAINER_CLASS =
  'relative w-[clamp(260px,36.806vw,699px)] h-[clamp(283px,40vw,760px)] overflow-hidden rounded-[clamp(8px,0.833vw,12px)]';
const IMAGE_CLASS = 'absolute inset-0 w-full h-full object-contain';
const LAYER_OPTIONAL = 'z-0';
const LAYER_OPTIONAL_POSITIONED = 'z-[10]';
const LAYER_MAIN = 'z-[5]';
const BADGES_Z = 'z-20';

/** Fixed banner height (px). */
const BADGE_HEIGHT = 70;

/** First badge: bottom-left (fixed). */
const FIRST_BADGE_LEFT = '8.5%';
const FIRST_BADGE_TOP = '72%';

/** Second badge: top (fixed). */
const SECOND_BADGE_LEFT = 'clamp(80px, 12.47vw, 237px)';
const SECOND_BADGE_TOP = '8%';

/**
 * Displays a single image with overlaid icon badges. Fully controlled: only the passed image and badges are shown.
 * When the parent passes new imageSrc/badges (e.g. on section change), re-render updates the content in place (no key on this component to avoid React removeChild errors).
 */
const ImageWithIconBadges: React.FC<ImageWithIconBadgesProps> = ({
  imageSrc,
  badges,
  direction = 'ltr',
  className = '',
  optionalImageSrc,
  optionalImagePosition,
  badgeBackgroundClassName,
  badgeTextColorClassName,
  badgeIconFilterClassName,
}) => {
  const optionalImageStyle =
    optionalImagePosition != null
      ? {
          left: optionalImagePosition.left,
          top: optionalImagePosition.top,
          width: optionalImagePosition.width,
          height: optionalImagePosition.height,
          right: undefined as string | undefined,
          bottom: undefined as string | undefined,
        }
      : undefined;

  const getBadgePosition = (index: number): { left: string; top: string } => {
    return index === 0
      ? { left: FIRST_BADGE_LEFT, top: FIRST_BADGE_TOP }
      : { left: SECOND_BADGE_LEFT, top: SECOND_BADGE_TOP };
  };

  return (
    <div className={`${CONTAINER_CLASS} ${className}`.trim()}>
      {optionalImageSrc !== undefined && optionalImageSrc !== '' && (
        <Image
          src={optionalImageSrc}
          alt=""
          width={530}
          height={576}
          className={
            optionalImageStyle != null
              ? `${LAYER_OPTIONAL_POSITIONED} absolute object-contain`
              : `${IMAGE_CLASS} ${LAYER_OPTIONAL}`
          }
          style={optionalImageStyle}
          aria-hidden
        />
      )}
      {imageSrc !== '' && (
        <Image
          src={imageSrc}
          alt=""
          width={530}
          height={576}
          className={`${IMAGE_CLASS} ${LAYER_MAIN}`}
          aria-hidden
        />
      )}
      {badges.map((badge, index) => {
        const position = getBadgePosition(index);
        return (
          <div
            key={`badge-${index}`}
            className={`absolute ${BADGES_Z}`}
            style={{ left: position.left, top: position.top }}
          >
            <IconBanner
              iconSrc={badge.iconSrc}
              text={badge.text}
              direction={direction}
              height={BADGE_HEIGHT}
              backgroundClass={badgeBackgroundClassName}
              textColorClass={badgeTextColorClassName}
              iconFilterClassName={badgeIconFilterClassName}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageWithIconBadges;
