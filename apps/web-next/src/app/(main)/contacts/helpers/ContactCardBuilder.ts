import type { ContactCard } from '../components/ContactTitleWithContacts/interfaces/ContactCard';

/**
 * Builds a ContactCard from a key prefix using standard content key patterns:
 *   contact.{key}.title          → card label
 *   contact.{key}.phone          → phone
 *   contact.{key}.mail           → email
 *   contact.{key}.whatsapp.title → whatsapp display text
 *
 * Example: ContactCardBuilder.fromKey('support', getContent)
 */
/** Card keys that have no WhatsApp row (omit from lookup to avoid short-key fallback). */
const CARD_KEYS_WITHOUT_WHATSAPP = ['service.mashkanta', 'service.lown', 'realestate', 'service.realestate.rental', 'cooperation.cooperationmanagement', 'cooperation.management', 'cooperation.accounting', 'cooperation.faxnumber'];

/** Card keys that show phone only (no email row). */
const CARD_KEYS_WITHOUT_EMAIL: string[] = ['cooperation.faxnumber'];

export class ContactCardBuilder {
  static fromKey(key: string, getContent: (contentKey: string) => string): ContactCard {
    const whatsappKey = `contact.${key}.whatsapp.title`;
    const whatsapp =
      CARD_KEYS_WITHOUT_WHATSAPP.includes(key)
        ? undefined
        : getContent(whatsappKey);
    const emailKey = `contact.${key}.mail`;
    const emailValue =
      CARD_KEYS_WITHOUT_EMAIL.includes(key)
        ? undefined
        : getContent(emailKey);
    return {
      label: getContent(`contact.${key}.title`),
      phone: getContent(`contact.${key}.phone`),
      email:
        emailValue !== undefined &&
        emailValue !== '' &&
        !emailValue.startsWith('[Missing:')
          ? emailValue
          : undefined,
      whatsapp:
        whatsapp !== undefined &&
        whatsapp !== '' &&
        !whatsapp.startsWith('[Missing:')
          ? whatsapp
          : undefined,
    };
  }
}
