export type Currency = 'ILS' | 'USD' | 'EUR'

export interface CurrencyOption {
  value: Currency
  translationKey: string
  symbol: string
}
