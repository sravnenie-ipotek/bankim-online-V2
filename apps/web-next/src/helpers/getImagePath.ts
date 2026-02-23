/**
 * Resolves image src from content API. Use with getContent from useContentApi('global_components').
 * Returns getContent(key) or defaultPath when provided (for fallback until DB is seeded).
 * Treats "[Missing: key]" placeholders as missing so defaultPath is used.
 */
export class ImagePathHelper {
  private static readonly MISSING_PREFIX = '[Missing:';
  /** useContentApi returns this while loading; not a valid image URL */
  private static readonly LOADING_PLACEHOLDER = '\u00A0';

  /**
   * @param getContent - Content getter (e.g. from useContentApi).
   * @param key - Content key for the image path.
   * @param defaultPath - Fallback when key is missing or loading placeholder.
   * @returns Resolved path or defaultPath.
   */
  static resolve(getContent: (key: string) => string, key: string, defaultPath?: string): string {
    const path = getContent(key);
    const isMissing =
      !path ||
      path === ImagePathHelper.LOADING_PLACEHOLDER ||
      path.startsWith(ImagePathHelper.MISSING_PREFIX);
    if (!isMissing) return path;
    return defaultPath ?? '';
  }
}

/**
 * Resolves image src from content API; uses defaultPath when key is missing or loading.
 * @param getContent - Content getter (e.g. from useContentApi('global_components')).
 * @param key - Content key for the image path.
 * @param defaultPath - Optional fallback URL when key is missing or placeholder.
 * @returns Resolved path or defaultPath.
 */
export function getImagePath(
  getContent: (key: string) => string,
  key: string,
  defaultPath?: string
): string {
  return ImagePathHelper.resolve(getContent, key, defaultPath);
}
