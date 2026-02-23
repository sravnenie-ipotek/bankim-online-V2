import { getImagePath } from '../getImagePath';

describe('getImagePath', () => {
  const getContent = (key: string) => {
    const map: Record<string, string> = {
      hero_image: '/img/hero.png',
      logo: '/img/logo.svg',
      missing: '[Missing: missing]',
      loading: '\u00A0',
    };
    return map[key] ?? '';
  };

  it('returns content path when key exists and is not missing', () => {
    expect(getImagePath(getContent, 'hero_image')).toBe('/img/hero.png');
    expect(getImagePath(getContent, 'logo')).toBe('/img/logo.svg');
  });

  it('returns defaultPath when content is missing placeholder', () => {
    expect(getImagePath(getContent, 'missing', '/fallback.png')).toBe('/fallback.png');
  });

  it('returns defaultPath when content is loading placeholder', () => {
    expect(getImagePath(getContent, 'loading', '/fallback.png')).toBe('/fallback.png');
  });

  it('returns empty string when missing and no defaultPath', () => {
    expect(getImagePath(getContent, 'missing')).toBe('');
  });

  it('returns defaultPath when key returns empty string', () => {
    expect(getImagePath(getContent, 'unknown', '/default.png')).toBe('/default.png');
  });
});
