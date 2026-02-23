import type { MenuItem } from '../types';

export interface DesktopMenuListProps {
  title: string;
  items: MenuItem[];
  onFirstItemClick: () => void;
  onLinkClick: () => void;
  isExpanded?: boolean;
}
