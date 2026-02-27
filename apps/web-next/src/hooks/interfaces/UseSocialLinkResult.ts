import type React from 'react';

export interface UseSocialLinkResult {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
