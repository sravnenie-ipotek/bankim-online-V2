import type React from 'react';

export interface SocialItemProps {
  href: string;
  icon: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: 'vertical' | 'horizontal';
}
