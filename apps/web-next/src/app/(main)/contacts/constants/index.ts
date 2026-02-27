import type { ContactSection } from '../interfaces/ContactSection';
import type { SocialPlatformKey } from '@/helpers/SocialDeepLinkHelper';

export const CONTACT_SECTIONS: ContactSection[] = [
  {
    id: 'general',
    labelKey: 'contacts_general_questions',
    items: [
      { labelKey: 'contacts_phone_label', valueKey: 'contacts_general_phone', type: 'phone' },
      { labelKey: 'contacts_email_label', valueKey: 'contacts_general_email', type: 'email' },
    ],
  },
  {
    id: 'service',
    labelKey: 'contacts_service_questions',
    items: [
      { labelKey: 'contacts_phone_label', valueKey: 'contacts_service_phone', type: 'phone' },
      { labelKey: 'contacts_email_label', valueKey: 'contacts_service_email', type: 'email' },
    ],
  },
  {
    id: 'real_estate',
    labelKey: 'contacts_real_estate_questions',
    items: [
      { labelKey: 'contacts_phone_label', valueKey: 'contacts_real_estate_phone', type: 'phone' },
      { labelKey: 'contacts_email_label', valueKey: 'contacts_real_estate_email', type: 'email' },
    ],
  },
  {
    id: 'cooperation',
    labelKey: 'contacts_cooperation',
    items: [
      { labelKey: 'contacts_phone_label', valueKey: 'contacts_cooperation_phone', type: 'phone' },
      { labelKey: 'contacts_email_label', valueKey: 'contacts_cooperation_email', type: 'email' },
    ],
  },
];

export interface ContactSocialLink {
  name: string;
  platform: SocialPlatformKey;
  icon: string;
}

export const SOCIAL_LINKS: ContactSocialLink[] = [
  { name: 'Facebook', platform: 'facebook', icon: '/static/facebook.svg' },
  { name: 'Instagram', platform: 'instagram', icon: '/static/instagram.svg' },
  { name: 'X', platform: 'twitter', icon: '/static/x.svg' },
  { name: 'WhatsApp', platform: 'whatsapp', icon: '/static/whatsapp.svg' },
];
