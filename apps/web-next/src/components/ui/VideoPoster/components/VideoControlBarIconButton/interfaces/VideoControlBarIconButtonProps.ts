import type { ReactNode } from 'react';

export interface VideoControlBarIconButtonProps {
  onClick: () => void;
  'aria-label': string;
  children: ReactNode;
  compact?: boolean;
  className?: string;
}
