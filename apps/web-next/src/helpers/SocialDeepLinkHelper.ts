/**
 * Config and logic for social links: open in app on mobile, fallback to store (or web).
 */

import type { SocialPlatformConfig } from './interfaces/SocialPlatformConfig';
import type { SocialPlatformKey } from './interfaces/SocialPlatformKey';

export type { SocialPlatformConfig } from './interfaces/SocialPlatformConfig';
export type { SocialPlatformKey } from './interfaces/SocialPlatformKey';

export class SocialDeepLinkHelper {
  private static readonly FALLBACK_TIMEOUT_MS = 2000;

  private static readonly CONFIG: Record<
    SocialPlatformKey,
    Omit<SocialPlatformConfig, 'platform'>
  > = {
    instagram: {
      webUrl: 'https://www.instagram.com/bankimonline',
      appScheme: 'instagram://user?username=bankimonline',
      storeUrlIos: 'https://apps.apple.com/app/instagram/id389801252',
      storeUrlAndroid: 'https://play.google.com/store/apps/details?id=com.instagram.android',
      label: 'Instagram',
      icon: '/static/instagram.svg',
      tooltipKey: 'footer_social_tooltip_instagram',
    },
    youtube: {
      webUrl: 'https://www.youtube.com/@bankimonline',
      appScheme: 'vnd.youtube://www.youtube.com/@bankimonline',
      storeUrlIos: 'https://apps.apple.com/app/youtube/id544007664',
      storeUrlAndroid: 'https://play.google.com/store/apps/details?id=com.google.android.youtube',
      label: 'YouTube',
      icon: '/static/youtube.svg',
      tooltipKey: 'footer_social_tooltip_youtube',
    },
    facebook: {
      webUrl: 'https://www.facebook.com/bankimonline',
      appScheme: 'fb://profile/bankimonline',
      storeUrlIos: 'https://apps.apple.com/app/facebook/id284882215',
      storeUrlAndroid: 'https://play.google.com/store/apps/details?id=com.facebook.katana',
      label: 'Facebook',
      icon: '/static/facebook.svg',
      tooltipKey: 'footer_social_tooltip_facebook',
    },
    telegram: {
      webUrl: 'https://t.me/bankimonline',
      appScheme: 'tg://resolve?domain=bankimonline',
      storeUrlIos: 'https://apps.apple.com/app/telegram-messenger/id686449807',
      storeUrlAndroid: 'https://play.google.com/store/apps/details?id=org.telegram.messenger',
      label: 'Telegram',
      icon: '/static/telegram.svg',
      tooltipKey: 'footer_social_tooltip_telegram',
    },
    twitter: {
      webUrl: 'https://twitter.com/bankimonline',
      appScheme: 'twitter://user?screen_name=bankimonline',
      storeUrlIos: 'https://apps.apple.com/app/twitter/id333903271',
      storeUrlAndroid: 'https://play.google.com/store/apps/details?id=com.twitter.android',
      label: 'X (Twitter)',
      icon: '/static/x.svg',
      tooltipKey: 'footer_social_tooltip_twitter',
    },
    whatsapp: {
      webUrl: 'https://wa.me/972537162235',
      appScheme: 'whatsapp://send?phone=972537162235',
      storeUrlIos: 'https://apps.apple.com/app/whatsapp-messenger/id310633997',
      storeUrlAndroid: 'https://play.google.com/store/apps/details?id=com.whatsapp',
      label: 'WhatsApp',
      icon: '/static/iconwhatsapp.svg',
      tooltipKey: 'footer_social_tooltip_whatsapp',
    },
  };

  static readonly SOCIAL_PLATFORMS: SocialPlatformKey[] = [
    'instagram',
    'youtube',
    'facebook',
    'telegram',
    'twitter',
    'whatsapp',
  ];

  private static readonly SIDEBAR_PLATFORMS: SocialPlatformKey[] = [
    'instagram',
    'youtube',
    'facebook',
    'twitter',
  ];

  private static isIos(): boolean {
    if (typeof navigator === 'undefined') return false;
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent))
    );
  }

  private static isAndroid(): boolean {
    if (typeof navigator === 'undefined') return false;
    return /Android/.test(navigator.userAgent);
  }

  static getPlatformConfig(platform: string): SocialPlatformConfig | null {
    const key = platform as SocialPlatformKey;
    if (!SocialDeepLinkHelper.CONFIG[key]) return null;
    const config = SocialDeepLinkHelper.CONFIG[key];
    return { ...config, platform: key };
  }

  static getWebUrl(platform: string): string {
    const config = this.getPlatformConfig(platform);
    return config?.webUrl ?? '#';
  }

  static getAppScheme(platform: string): string | null {
    const config = this.getPlatformConfig(platform);
    return config?.appScheme ?? null;
  }

  static getStoreUrl(platform: string): string {
    const config = this.getPlatformConfig(platform);
    if (!config) return '#';
    if (SocialDeepLinkHelper.isIos()) return config.storeUrlIos;
    if (SocialDeepLinkHelper.isAndroid()) return config.storeUrlAndroid;
    return config.webUrl;
  }

  static getPlatforms(): SocialPlatformConfig[] {
    return SocialDeepLinkHelper.SOCIAL_PLATFORMS.map((key) =>
      this.getPlatformConfig(key)!
    );
  }

  static getSidebarPlatforms(): SocialPlatformConfig[] {
    return SocialDeepLinkHelper.SIDEBAR_PLATFORMS.map((key) =>
      this.getPlatformConfig(key)!
    );
  }

  /**
   * Try app scheme first; after timeout redirect to store if page still visible (app did not open).
   * Call only on mobile from click handler.
   */
  static handleMobileClick(platform: string): void {
    if (typeof window === 'undefined') return;
    const config = this.getPlatformConfig(platform);
    if (!config) {
      window.open(this.getWebUrl(platform), '_blank');
      return;
    }
    const appScheme = config.appScheme ?? config.webUrl;
    const isCustomScheme =
      appScheme.startsWith('instagram:') ||
      appScheme.startsWith('fb:') ||
      appScheme.startsWith('tg:') ||
      appScheme.startsWith('twitter:') ||
      appScheme.startsWith('whatsapp:') ||
      appScheme.startsWith('vnd.youtube:');
    window.location.href = appScheme;
    if (isCustomScheme) {
      const fallbackUrl = this.getStoreUrl(platform);
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = fallbackUrl;
        }
      }, SocialDeepLinkHelper.FALLBACK_TIMEOUT_MS);
    }
  }
}
