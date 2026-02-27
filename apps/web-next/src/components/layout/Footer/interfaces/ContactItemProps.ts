import type React from 'react';

export interface ContactItemProps {
  icon: string;
  href: string;
  label: string;
  forceLtr?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
