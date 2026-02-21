/**
 * Resolves image src from content API. Use with getContent from useContentApi('global_components').
 * Returns getContent(key) or defaultPath when provided (for fallback until DB is seeded).
 * Treats "[Missing: key]" placeholders as missing so defaultPath is used.
 */
export class ImagePathHelper {
  private static readonly MISSING_PREFIX = '[Missing:'

  static resolve(
    getContent: (key: string) => string,
    key: string,
    defaultPath?: string,
  ): string {
    const path = getContent(key)
    if (path && !path.startsWith(ImagePathHelper.MISSING_PREFIX)) return path
    return defaultPath ?? ''
  }
}

export function getImagePath(
  getContent: (key: string) => string,
  key: string,
  defaultPath?: string,
): string {
  return ImagePathHelper.resolve(getContent, key, defaultPath)
}
