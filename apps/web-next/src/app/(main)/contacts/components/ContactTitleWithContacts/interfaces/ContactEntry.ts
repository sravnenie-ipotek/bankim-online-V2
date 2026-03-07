import type { ContactCard } from './ContactCard';

/**
 * One contact entry for ContactTitleWithContacts: tab label, optional icon, and contact channels.
 * When `cards` is provided, the section renders multiple ContactCard panels side by side.
 * Otherwise `phone`, `email`, and `whatsapp` are used to render a single card.
 */
export interface ContactEntry {
  id: string;
  /** Tab button label (e.g. resolved from getContent). */
  label: string;
  /** Optional icon URL for the tab. */
  icon?: string;
  /** Address for the active contact panel. */
  address: string;
  /** Phone number for the details panel (single-card mode). */
  phone: string;
  /** Email for the details panel (single-card mode). */
  email: string;
  /** WhatsApp text for the details panel (single-card mode). Omit or set to undefined to hide the WhatsApp row. */
  whatsapp?: string;
  /** When set, renders multiple contact cards instead of the single phone/email/whatsapp. */
  cards?: ContactCard[];
}
