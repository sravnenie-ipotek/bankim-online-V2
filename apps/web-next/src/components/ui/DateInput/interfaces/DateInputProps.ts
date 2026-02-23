export interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  title?: string;
  error?: string | boolean;
  onBlur?: () => void;
  disabled?: boolean;
  max?: string;
  min?: string;
  'data-testid'?: string;
}
