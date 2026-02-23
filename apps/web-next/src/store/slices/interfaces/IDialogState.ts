import type { ReactNode } from 'react';

export interface IDialogState {
  title: string | null;
  onOk: (() => void) | null;
  okTitle: string | null;
  onCancel: (() => void) | null;
  onClose: (() => void) | null;
  cancelTitle: string | null;
  isVisible: boolean;
  isCloseIcon: boolean;
  content: ReactNode | null;
  maxWidth: string | null;
}
