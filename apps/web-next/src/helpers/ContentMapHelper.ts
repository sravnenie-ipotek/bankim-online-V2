import type { ContentItem } from '@/interfaces/ContentItem';

/**
 * Helpers for content key resolution and API content shape transformation.
 */
export class ContentMapHelper {
  /**
   * @param key - Full key (e.g. 'screen.key').
   * @returns The part after the last dot or key as-is.
   */
  static getShortKey(key: string): string {
    return key.split('.').pop() || key;
  }

  /**
   * @param apiContent - Map from API; each value has .value.
   * @returns Flat key -> string map (full and short keys).
   */
  static transformContentToMap(
    apiContent: Record<string, ContentItem>
  ): Record<string, string> {
    const out: Record<string, string> = {};
    for (const [key, item] of Object.entries(apiContent)) {
      const short = ContentMapHelper.getShortKey(key);
      out[short] = item.value;
      out[key] = item.value;
    }
    return out;
  }
}
