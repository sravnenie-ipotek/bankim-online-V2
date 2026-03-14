'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { SocialDeepLinkHelper } from '@/helpers/SocialDeepLinkHelper';
import SidebarSocialLinkItem from './SidebarSocialLinkItem';

interface SocialMediaProps {
  variant?: 'vertical' | 'horizontal';
}

/**
 * Social bar.
 * Vertical (default): stacked vertically on desktop sidebar.
 * Horizontal: row of 285×54px containers for sm/md tablet bar.
 */
const SocialMedia: React.FC<SocialMediaProps> = ({ variant = 'vertical' }) => {
  const { getContent } = useContentApi('global_components');
  const socialPlatforms = SocialDeepLinkHelper.getSidebarPlatforms();

  if (variant === 'horizontal') {
    return (
      <nav
        aria-label={getContent('footer_social_follow')}
        className="flex flex-row items-center justify-center gap-0 flex-wrap w-full"
      >
        {socialPlatforms.map((config) => (
          <SidebarSocialLinkItem
            key={config.platform}
            config={config}
            getContent={getContent}
            variant="horizontal"
          />
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label={getContent('footer_social_follow')}
      className="flex flex-col items-center w-[30px] h-full pt-[clamp(33px,3.271vw,62px)]"
    >
      {socialPlatforms.map((config) => (
        <SidebarSocialLinkItem key={config.platform} config={config} getContent={getContent} />
      ))}
    </nav>
  );
};

export default SocialMedia;
