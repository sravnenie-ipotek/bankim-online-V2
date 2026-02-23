import type { EAuthSteps } from '@/types/enums/authSteps.enum';
import type { ERestorePasswordSteps } from '@/types/enums/restorePasswordSteps.enum';
import type { ESignUpSteps } from '@/types/enums/signUpSteps.enum';
import type { IAuthUser } from './IAuthUser';

export type Tab = 'phone' | 'email';
export type LoginStep = 'form' | 'sms-verify';

export interface IAuthState {
  authStep: EAuthSteps;
  restorePasswordStep: ERestorePasswordSteps;
  signUpStep: ESignUpSteps;
  activeTab: Tab;

  /** Login dialog */
  isLoginDialogOpen: boolean;
  loginStep: LoginStep;
  pendingPhone: string | null;

  /** Authenticated user */
  user: IAuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
