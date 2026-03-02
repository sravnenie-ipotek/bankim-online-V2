export interface PhoneInputProps {
  value: string;
  onChange: (digits: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  id?: string;
  'aria-label'?: string;
  className?: string;
}
