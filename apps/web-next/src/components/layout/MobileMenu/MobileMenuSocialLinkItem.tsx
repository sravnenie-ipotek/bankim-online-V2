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
      className="w-10 h-10 flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity"
    >
      <Image
        alt={config.label}
        src={config.icon}
        width={24}
        height={24}
        className="object-contain w-6 h-6"
        style={{ width: '24px', height: 'auto' }}
      />
    </a>
  );
};

export default MobileMenuSocialLinkItem;
