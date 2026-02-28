export interface DesktopMenuItemProps {
  title: string;
  path?: string;
  onLinkClick: () => void;
  openInNewWindowOnDesktop?: boolean;
}
