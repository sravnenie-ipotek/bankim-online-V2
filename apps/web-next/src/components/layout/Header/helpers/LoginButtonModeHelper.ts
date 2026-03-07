import type { LoginButtonMode } from '../interfaces/LoginButtonMode';

const BLACK_MODE_PATH_SEGMENTS = ['vacancies', 'contacts', 'cooperation'];

/**
 * Resolves header login button visual mode from the current path.
 * Vacancies and contacts pages use black mode; all other pages use normal (accent) mode.
 */
export class LoginButtonModeHelper {
  static getMode(pathname: string): LoginButtonMode {
    const segments = pathname.split('/');
    return BLACK_MODE_PATH_SEGMENTS.some((seg) => segments.includes(seg)) ? 'black' : 'normal';
  }
}
