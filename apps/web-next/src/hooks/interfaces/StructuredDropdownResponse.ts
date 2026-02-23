import type { DropdownOption } from '@/components/ui/DropdownSelect/interfaces/DropdownOption';

export interface StructuredDropdownResponse {
  status: string;
  screen_location: string;
  language_code: string;
  dropdowns: Array<{ key: string; label: string }>;
  options: Record<string, DropdownOption[]>;
  placeholders: Record<string, string>;
  labels: Record<string, string>;
}
