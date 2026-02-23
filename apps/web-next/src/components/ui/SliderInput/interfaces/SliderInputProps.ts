export interface SliderInputProps {
  value: number;
  min: number;
  max: number;
  name: string;
  title: string;
  onChange: (value: number) => void;
  error?: string | boolean;
  currencySymbol?: string;
  disableRangeValues?: boolean;
  unitsMin?: string;
  unitsMax?: string;
  tooltip?: string;
  disabled?: boolean;
  'data-testid'?: string;
}
