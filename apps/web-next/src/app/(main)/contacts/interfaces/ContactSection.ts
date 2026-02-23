export type TabId = 'general' | 'service' | 'real_estate' | 'cooperation';

export interface ContactSection {
  id: TabId;
  labelKey: string;
  items: Array<{ labelKey: string; valueKey: string; type: 'phone' | 'email' | 'text' }>;
}
