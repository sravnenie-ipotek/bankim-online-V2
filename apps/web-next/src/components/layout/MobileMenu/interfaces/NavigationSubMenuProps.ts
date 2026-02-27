import type { MenuItem } from '../../Sidebar/types';

export interface NavigationSubMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onCloseMenu?: () => void;
}
