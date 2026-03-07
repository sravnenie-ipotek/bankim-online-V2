import type React from 'react';

export interface PartnersSwiperProps {
  /** Content getter (e.g. from useContentApi). When provided with titleKey, title is getContent(titleKey). */
  getContent?: (key: string) => string;
  /** Content key for the section title (e.g. "cooperation_partners_title"). When provided with getContent, title is getContent(titleKey). */
  titleKey?: string;
  /** Optional class name for the title (e.g. font size). */
  titleClassName?: string;
  /** Optional container width (e.g. "100%", "clamp(320px, 90vw, 1200px)"). */
  width?: React.CSSProperties['width'];
  /** Optional container height. */
  height?: React.CSSProperties['height'];
  /** Optional background color for the section (e.g. "#161616" to match steps section). */
  backgroundColor?: React.CSSProperties['backgroundColor'];
  /** Optional class name for the root wrapper (e.g. padding when using custom background). */
  className?: string;
  /** Optional class name for each partner slide box (card dimensions). When not set, default sizes are used. */
  boxClassName?: string;
  /** Optional class name for each partner logo/icon. When not set, default icon sizes are used. */
  iconClassName?: string;
}
