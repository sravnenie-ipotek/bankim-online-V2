import type { ReactNode } from 'react';

export interface IconBannerProps {
  /** Inline SVG icon node (preferred – supports currentColor). */
  icon?: ReactNode;
  /** Icon image source fallback when `icon` is not provided. */
  iconSrc?: string;
  /** Banner text; can be multi-line. */
  text: string;
  /** Optional alt for the icon image fallback. */
  iconAlt?: string;
  /** Text direction for RTL/LTR layouts. */
  direction?: 'ltr' | 'rtl';
  /** Optional class name for the root element. */
  className?: string;
  /** Optional additional image source (e.g. second icon or illustration). */
  optionalImageSrc?: string;
  /** Optional alt for the additional image. */
  optionalImageAlt?: string;
  /** Optional width from outside (e.g. "269px" or 269). When set, overrides default width. */
  width?: string | number;
  /** Optional height from outside (e.g. "70px" or 70). When set, overrides default height. */
  height?: string | number;
  /** Exact icon color (e.g. '#000000', 'black'). Used for SVG currentColor and for img filter when black/white. */
  iconColor?: string;
  /** Background: Tailwind class (e.g. 'bg-[#f5f5f5]', 'bg-base-tendersOfficesBanner'). When set, overrides default banner background. */
  backgroundClass?: string;
  /** Text color: Tailwind class (e.g. 'text-black', 'text-[#2E2E2E]'). When set, overrides default banner text color (white). */
  textColorClass?: string;
  /** Icon filter: Tailwind class (e.g. 'filter-techrealt-red-icon'). When set, applied to icon image for theme tint. */
  iconFilterClassName?: string;
}