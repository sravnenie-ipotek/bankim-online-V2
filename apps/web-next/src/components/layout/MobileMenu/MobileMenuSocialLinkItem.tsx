'use client';

import React from 'react';
import Image from 'next/image';
import { useSocialLink } from '@/hooks/useSocialLink';
import type { MobileMenuSocialLinkItemProps } from './interfaces/MobileMenuSocialLinkItemProps';

const MobileMenuSocialLinkItem: React.FC<MobileMenuSocialLinkItemProps> = ({ config }) => {
  const { href, onClick } = useSocialLink(config.platform);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className="opacity-50 hover:opacity-100 transition-opacity"
    >
      <Image alt={config.label} src={config.icon} width={24} height={24} />
    </a>
  );
};

export default MobileMenuSocialLinkItem;
