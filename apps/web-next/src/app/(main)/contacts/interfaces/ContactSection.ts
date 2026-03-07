export type TabId = 'general' | 'service' | 'real_estate' | 'cooperation';

export interface ContactSection {
  id: TabId;
  labelKey: string;
  /** Optional icon URL for the section tab button (e.g. general questions). */
  icon?: string;
  items: Array<{ labelKey: string; valueKey: string; type: 'phone' | 'email' | 'text' }>;
}
