import type { DropdownOption } from './DropdownOption';

export interface DropdownSelectProps {
  data: DropdownOption[];
  title?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  nothingFoundText?: string;
  error?: boolean | string;
  disabled?: boolean;
  'data-testid'?: string;
}
