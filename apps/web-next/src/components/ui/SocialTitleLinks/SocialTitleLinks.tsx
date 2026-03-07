'use client';

import React from 'react';
import { SocialDeepLinkHelper } from '@/helpers/SocialDeepLinkHelper';
import { useSocialLink } from '@/hooks/useSocialLink';
import type { SocialPlatformConfig } from '@/helpers/SocialDeepLinkHelper';
import type { SocialTitleLinksProps } from './interfaces/SocialTitleLinksProps';

/** Clamp: base at 1440, scale up to 1900. */
const ICON_CLAMP_VIEWPORT_MIN = 1440;
const ICON_CLAMP_VIEWPORT_MAX = 1900;

const SocialLinkItem: React.FC<{
  config: SocialPlatformConfig;
  getContent: (key: string) => string;
  iconWidthPx: number;
  iconHeightPx: number;
}> = ({ config, getContent, iconWidthPx, iconHeightPx }) => {
  const { href, onClick } = useSocialLink(config.platform);
  const vwWidth = (iconWidthPx / ICON_CLAMP_VIEWPORT_MIN) * 100;
  const vwHeight = (iconHeightPx / ICON_CLAMP_VIEWPORT_MIN) * 100;
  const maxWidthPx = (iconWidthPx * ICON_CLAMP_VIEWPORT_MAX) / ICON_CLAMP_VIEWPORT_MIN;
  const maxHeightPx = (iconHeightPx * ICON_CLAMP_VIEWPORT_MAX) / ICON_CLAMP_VIEWPORT_MIN;

  const iconStyle: React.CSSProperties = {
    width: `clamp(${iconWidthPx}px, ${vwWidth}vw, ${maxWidthPx}px)`,
    height: `clamp(${iconHeightPx}px, ${vwHeight}vw, ${maxHeightPx}px)`,
    minWidth: `${iconWidthPx}px`,
    minHeight: `${iconHeightPx}px`,
    flexShrink: 0,
  };

  return (
    <div className="relative group overflow-visible flex items-center shrink-0">
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-xs font-normal whitespace-nowrap rounded bg-[#333535] text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 pointer-events-none z-[10002]"
        role="tooltip"
      >
        {getContent(config.tooltipKey)}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className="opacity-70 hover:opacity-100 transition-opacity inline-flex items-center justify-center shrink-0"
      >
        <img alt={config.label} src={config.icon} style={iconStyle} className="object-contain" />
      </a>
    </div>
  );
};

const SocialTitleLinks: React.FC<SocialTitleLinksProps> = ({
  title = '',
  getContent,
  showTitle = true,
  className = '',
  iconWidth = 32,
  iconHeight = 32,
}) => {
  const socialPlatforms = SocialDeepLinkHelper.getPlatforms();
  const hasTitle = showTitle && Boolean(title);
  const gapClassName = hasTitle ? 'gap-[clamp(12px,1.111vw,16px)]' : 'gap-0';

  return (
    <div
      className={`flex flex-col items-start rtl:items-start ${gapClassName} ${className}`.trim()}
      role="group"
      aria-label={title || 'Social links'}
    >
      {hasTitle ? (
        <span className="text-textTheme-primary font-semibold leading-[140%] text-[clamp(1.9375rem,2.21vw,2.625rem)]">
          {title}
        </span>
      ) : null}
      <div className="flex gap-4 max-[767px]:gap-2 flex-nowrap items-center justify-start rtl:justify-end rtl:flex-row-reverse rtl:w-full max-[767px]:justify-center max-[767px]:rtl:justify-center overflow-visible w-full">
        {socialPlatforms.map((config) => (
          <SocialLinkItem
            key={config.platform}
            config={config}
            getContent={getContent}
            iconWidthPx={iconWidth}
            iconHeightPx={iconHeight}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialTitleLinks;
