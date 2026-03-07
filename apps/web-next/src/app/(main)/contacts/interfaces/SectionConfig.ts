/**
 * Build config for a single contacts section.
 * When `cardKeys` is provided, the section renders cards built via ContactCardBuilder.fromKey.
 * Otherwise the section builds its card from the section's own phone/email items.
 */
export interface SectionConfig {
  /** Optional card key prefixes (e.g. 'support', 'service.mashkanta').
   *  When set, ContactCardBuilder.fromKey is called for each key. */
  cardKeys?: readonly string[];
}
