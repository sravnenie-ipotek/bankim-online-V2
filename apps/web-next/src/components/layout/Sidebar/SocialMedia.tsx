'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { SocialDeepLinkHelper } from '@/helpers/SocialDeepLinkHelper';
import SidebarSocialLinkItem from './SidebarSocialLinkItem';

/**
 * Social bar: 23px visual width (each 113×23 item rotated 90°).
 * Stacked vertically. LTR = left of menu, RTL = right of menu (parent controls).
 */
const SocialMedia: React.FC = () => {
  const { getContent } = useContentApi('global_components');
  const socialPlatforms = SocialDeepLinkHelper.getPlatforms();

  return (
    <nav
      aria-label={getContent('footer_social_follow')}
      className="flex flex-col items-center w-[30px] h-full pt-[calc(47.1px*(100vw/1440))] xl:pt-[47.1px]"
    >
      {socialPlatforms.map((config) => (
        <SidebarSocialLinkItem key={config.platform} config={config} getContent={getContent} />
      ))}
    </nav>
  );
};

export default SocialMedia;
