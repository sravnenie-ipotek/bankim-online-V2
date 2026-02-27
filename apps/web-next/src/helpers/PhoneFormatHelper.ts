/**
 * Formats phone number digits with dashes: first group (city/area), then next group, then rest.
 * Pattern: XXX-XXX-XXXX (e.g. 935-234-3344).
 */
export class PhoneFormatHelper {
  private static readonly CITY_LEN = 3;
  private static readonly EXCHANGE_LEN = 3;

  static digitsOnly(raw: string): string {
    return raw.replace(/\D/g, '');
  }

  static formatWithDashes(digits: string): string {
    const d = this.digitsOnly(digits);
    if (d.length <= this.CITY_LEN) return d;
    const city = d.slice(0, this.CITY_LEN);
    if (d.length <= this.CITY_LEN + this.EXCHANGE_LEN) return `${city}-${d.slice(this.CITY_LEN)}`;
    const exchange = d.slice(this.CITY_LEN, this.CITY_LEN + this.EXCHANGE_LEN);
    const rest = d.slice(this.CITY_LEN + this.EXCHANGE_LEN);
    return `${city}-${exchange}-${rest}`;
  }
}
