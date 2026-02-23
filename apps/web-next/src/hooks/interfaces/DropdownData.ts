import type { DropdownOption } from '@/components/ui/DropdownSelect/interfaces/DropdownOption';

export interface DropdownData {
  options: DropdownOption[];
  placeholder?: string;
  label?: string;
  loading: boolean;
  error: Error | null;
}
