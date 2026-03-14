import type { ReactNode } from 'react';

export interface ImageWithIconBadgeBadgeItem {
  /** Inline SVG icon node (e.g. theme-colored outline icon). */
  icon?: ReactNode;
  /** Icon image source when `icon` is not provided. */
  iconSrc?: string;
  /** Banner text; can be multi-line. */
  text: string;
}
