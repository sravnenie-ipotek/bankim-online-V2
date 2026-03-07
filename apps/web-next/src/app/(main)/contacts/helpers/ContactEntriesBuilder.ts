import type { ContactSection } from '../interfaces/ContactSection';
import type { SectionConfig } from '../interfaces/SectionConfig';
import type { ContactEntry } from '../components/ContactTitleWithContacts/interfaces/ContactEntry';
import { ContactCardBuilder } from './ContactCardBuilder';

/**
 * Per-section build config. Each entry maps to a section in CONTACT_SECTIONS by position.
 * - cardKeys: build cards via ContactCardBuilder.fromKey (ignores section items).
 * - undefined: build a single card from the section's own phone/email items.
 */
const SECTION_CONFIGS: SectionConfig[] = [
  { cardKeys: ['general.support', 'customersupport', 'customersupport'] },
  { cardKeys: ['service.mashkanta', 'service.lown'] },
  { cardKeys: ['realestate', 'service.realestate.rental'] },
  { cardKeys: ['cooperation.cooperationmanagement', 'cooperation.management', 'cooperation.accounting', 'cooperation.faxnumber'] },
];

/**
 * Builds the ContactEntry array for the contacts page from CONTACT_SECTIONS config.
 * Each section is built using buildSection with its corresponding SectionConfig.
 */
export class ContactEntriesBuilder {
  static build(
    sections: ContactSection[],
    getContent: (key: string) => string
  ): ContactEntry[] {
    const address = getContent('contacts_address');
    return sections.map((section, index) =>
      ContactEntriesBuilder.buildSection(
        section,
        address,
        getContent,
        SECTION_CONFIGS[index] ?? {}
      )
    );
  }

  private static buildSection(
    section: ContactSection,
    address: string,
    getContent: (key: string) => string,
    config: SectionConfig
  ): ContactEntry {
    if (config.cardKeys != null && config.cardKeys.length > 0) {
      return {
        id: section.id,
        label: getContent(section.labelKey),
        icon: section.icon,
        address,
        phone: '',
        email: '',
        cards: config.cardKeys.map((key) => ContactCardBuilder.fromKey(key, getContent)),
      };
    }

    const phoneItem = section.items.find((i) => i.type === 'phone');
    const emailItem = section.items.find((i) => i.type === 'email');
    const phone = phoneItem != null ? getContent(phoneItem.valueKey) : '';
    const email = emailItem != null ? getContent(emailItem.valueKey) : '';
    return {
      id: section.id,
      label: getContent(section.labelKey),
      icon: section.icon,
      address,
      phone,
      email,
    };
  }
}
