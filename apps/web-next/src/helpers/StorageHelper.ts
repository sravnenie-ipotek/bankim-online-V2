/**
 * Safe localStorage wrapper. Use instead of direct localStorage to avoid
 * throwing in Safari private browsing, full storage, or restricted WebViews.
 */
export class StorageHelper {
  /** @param key - Storage key. @returns Stored value or null if missing/error. */
  static getItem(key: string): string | null {
    try {
      if (typeof window === 'undefined') return null;
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  /** @param key - Storage key. @param value - String to store. Silently no-ops on error. */
  static setItem(key: string, value: string): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, value);
    } catch {
      // Ignore (e.g. private browsing, quota exceeded)
    }
  }

  /** @param key - Storage key to remove. Silently no-ops on error. */
  static removeItem(key: string): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  }
}
