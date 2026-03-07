import type { ContactEntry } from './ContactEntry';

/**
 * Props for ContactTitleWithContacts: container with optional title and generated tabs + content from contact entries.
 * Container size 1130×297 at 1440px, clamped for all resolutions.
 */
export interface ContactTitleWithContactsProps {
  /** Optional section title (e.g. from getContent('contact_people')). */
  title?: string;
  /** Contact entries used by this component for tabs and details panel. */
  contacts: ContactEntry[];
  /** Direction for tab layout: 'ltr' or 'rtl'. */
  direction: 'ltr' | 'rtl';
}
