'use client';

import type React from 'react';
import { SocialDeepLinkHelper } from '@/helpers/SocialDeepLinkHelper';
import { useWindowResize } from '@/hooks/useWindowResize';
import type { UseSocialLinkResult } from './interfaces/UseSocialLinkResult';

export type { UseSocialLinkResult } from './interfaces/UseSocialLinkResult';

/**
 * Returns href and optional onClick for a social platform link.
 * On desktop: href is web URL, no onClick.
 * On mobile: href is web URL (fallback if JS fails), onClick tries app then store.
 */
export function useSocialLink(platform: string): UseSocialLinkResult {
  const { isMobile } = useWindowResize();
  const href = SocialDeepLinkHelper.getWebUrl(platform);
  if (!isMobile) {
    return { href };
  }
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    SocialDeepLinkHelper.handleMobileClick(platform);
  };
  return { href, onClick };
}
