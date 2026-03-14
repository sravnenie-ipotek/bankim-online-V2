import type { ImageWithIconBadgeBadgeItem } from './ImageWithIconBadgeBadgeItem';

export interface ImageWithIconBadgesProps {
  /** Single image source to display (replaced when props change). */
  imageSrc: string;
  /** List of icon badges to overlay on the image (icon + text only; positions are fixed: first badge bottom-left, second badge top). */
  badges: ImageWithIconBadgeBadgeItem[];
  /** Text direction for badge content. */
  direction?: 'ltr' | 'rtl';
  /** Optional class name for the root container. */
  className?: string;
  /** Optional second picture source, rendered as an additional layer. */
  optionalImageSrc?: string;
  /** When set, optional image is positioned/sized with these CSS values (e.g. clamp for 1900). */
  optionalImagePosition?: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
  /** Optional Tailwind class for badge background (e.g. bg-techrealt-containers for #f5f5f5). */
  badgeBackgroundClassName?: string;
  /** Optional Tailwind class for badge text color (e.g. text-techrealt-titleText). */
  badgeTextColorClassName?: string;
  /** Optional Tailwind class for badge icon filter (e.g. filter-techrealt-red-icon from theme). */
  badgeIconFilterClassName?: string;
}
