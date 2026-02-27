'use client';

import React from 'react';
import { SocialDeepLinkHelper } from '@/helpers/SocialDeepLinkHelper';
import { useSocialLink } from '@/hooks/useSocialLink';
import type { SocialPlatformConfig } from '@/helpers/SocialDeepLinkHelper';

const LowerBarSocialLinkItem: React.FC<{ config: SocialPlatformConfig }> = ({ config }) => {
  const { href, onClick } = useSocialLink(config.platform);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className="opacity-50 hover:opacity-100 transition-opacity w-[32px] h-[32px] flex items-center justify-center shrink-0"
    >
      <img alt={config.label} src={config.icon} width={32} height={32} className="w-8 h-8" />
    </a>
  );
};

interface LowerBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const LowerBar: React.FC<LowerBarProps> = ({ isOpen, onToggle }) => {
  const socialPlatforms = SocialDeepLinkHelper.getPlatforms();

  return (
    <div className="w-full max-w-[1240px] h-[81px] bg-[#242529] flex flex-row items-center justify-between px-6 shrink-0 xl:w-sidebar-fluid">
      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          onClick={onToggle}
          className="w-[32px] h-[32px] flex items-center justify-center text-white shrink-0"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`relative inline-block w-6 h-6 text-white
              before:content-[''] before:absolute before:left-0 before:top-0 before:w-0.5 before:h-full before:bg-white
              after:content-[''] after:absolute after:right-0 after:top-0 after:w-0.5 after:h-full after:bg-white
              ${isOpen ? '[&>span]:rotate-45 before:invisible before:opacity-0 before:rotate-45 after:-rotate-45 after:right-1.5' : ''}`}
          >
            <span className="absolute left-1/2 top-0 w-0.5 h-full bg-white -translate-x-1/2 transition-transform duration-300" />
          </span>
        </button>
        <div className="flex flex-row items-center gap-4">
          {socialPlatforms.map((config) => (
            <LowerBarSocialLinkItem key={config.platform} config={config} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LowerBar;
