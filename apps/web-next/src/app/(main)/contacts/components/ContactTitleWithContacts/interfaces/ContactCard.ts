/**
 * A single contact card: title label + contact channels.
 * Used when a section renders multiple cards side by side.
 */
export interface ContactCard {
  /** Card heading (e.g. "Support", "General Information"). */
  label: string;
  /** Phone number. */
  phone: string;
  /** Email address. Omit or set to undefined to hide the email row. */
  email?: string;
  /** WhatsApp row display text. Omit or set to undefined to hide the WhatsApp row. */
  whatsapp?: string;
}
