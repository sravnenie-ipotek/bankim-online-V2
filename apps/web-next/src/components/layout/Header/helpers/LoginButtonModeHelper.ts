import type { LoginButtonMode } from '../interfaces/LoginButtonMode';

/**
 * Resolves header login button visual mode from the current path.
 * Vacancies section uses black mode; all other pages use normal (accent) mode.
 */
export class LoginButtonModeHelper {
  static getMode(pathname: string): LoginButtonMode {
    return pathname.split('/').includes('vacancies') ? 'black' : 'normal';
  }
}
