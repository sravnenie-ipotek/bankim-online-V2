import type { ContactSection } from '../interfaces/ContactSection';

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

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com/bankimonline', icon: '/static/facebook.svg' },
  { name: 'Instagram', href: 'https://instagram.com/bankimonline', icon: '/static/instagram.svg' },
  { name: 'Twitter', href: 'https://twitter.com/bankimonline', icon: '/static/twitter.svg' },
  { name: 'WhatsApp', href: 'https://wa.me/972537162235', icon: '/static/whatsapp.svg' },
];
