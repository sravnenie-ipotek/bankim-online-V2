export interface FormattedInputProps {
  value: number | null
  onChange: (value: number | null) => void
  name?: string
  title?: string
  placeholder?: string
  currencySymbol?: string
  error?: string | boolean
  onBlur?: () => void
  disabled?: boolean
  'data-testid'?: string
}
