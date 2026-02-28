'use client';

import React from 'react';
import SocialItem from './SocialItem';
import { useSocialLink } from '@/hooks/useSocialLink';
import type { SidebarSocialLinkItemProps } from './interfaces/SidebarSocialLinkItemProps';

const SidebarSocialLinkItem: React.FC<SidebarSocialLinkItemProps> = ({ config, getContent, variant }) => {
  const { href, onClick } = useSocialLink(config.platform);
  return (
    <SocialItem
      href={href}
      icon={config.icon}
      label={getContent(`social_${config.platform}`)}
      onClick={onClick}
      variant={variant}
    />
  );
};

export default SidebarSocialLinkItem;
