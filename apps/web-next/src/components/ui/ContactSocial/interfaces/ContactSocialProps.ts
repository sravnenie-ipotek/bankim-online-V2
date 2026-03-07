/**
 * Props for ContactSocial: location, phone, and email rows with icons.
 * All displayed text is resolved via getContent using the given content keys.
 */
export interface ContactSocialProps {
  /** Content API resolver (used when content keys are provided). */
  getContent?: (key: string) => string;
  /** Optional content key for the address text (location row). */
  addressKey?: string;
  /** Optional content key for the phone number (phone row). */
  phoneKey?: string;
  /** Optional content key for the email address (email row). */
  emailKey?: string;
  /** Optional direct values (use these for generated cards). */
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  /** Layout direction: column (default) or row (horizontal). */
  direction?: 'column' | 'row';
  /** Visual style variant. */
  variant?: 'default' | 'card';
}
