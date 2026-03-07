import type { ContactEntry } from '../../../interfaces/ContactEntry';

/**
 * Props for ContactsTabs: row of buttons that scroll to sections (no tab active state).
 */
export interface ContactsTabsProps {
  contacts: ContactEntry[];
  direction: 'ltr' | 'rtl';
  onSelect: (id: string) => void;
}
