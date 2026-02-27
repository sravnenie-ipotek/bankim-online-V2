import type { SocialPlatformKey } from './SocialPlatformKey';

export interface SocialPlatformConfig {
  platform: SocialPlatformKey;
  webUrl: string;
  appScheme: string | null;
  storeUrlIos: string;
  storeUrlAndroid: string;
  label: string;
  icon: string;
  tooltipKey: string;
}
