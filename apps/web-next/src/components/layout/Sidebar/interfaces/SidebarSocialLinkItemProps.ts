import type { SocialPlatformConfig } from '@/helpers/SocialDeepLinkHelper';

export interface SidebarSocialLinkItemProps {
  config: SocialPlatformConfig;
  getContent: (key: string) => string;
  variant?: 'vertical' | 'horizontal';
}
