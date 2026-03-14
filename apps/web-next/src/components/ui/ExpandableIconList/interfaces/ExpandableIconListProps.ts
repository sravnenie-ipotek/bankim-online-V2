import type { ExpandableIconListItem } from './ExpandableIconListItem';

export interface ExpandableIconListProps {
  title: string;
  items: ExpandableIconListItem[];
  direction?: 'ltr' | 'rtl';
  defaultExpanded?: boolean;
  className?: string;
  /** Optional Tailwind class for section background (e.g. bg-techrealt-containers). When set, overrides default bg-base-sidebarBg. */
  backgroundClassName?: string;
  /** Optional Tailwind class for the title (e.g. text-[clamp(14px,1.05vw,20px)]). */
  titleClassName?: string;
  /** Optional Tailwind class for each item translation text (e.g. text-[14px]). */
  itemTextClassName?: string;
  /** Optional Tailwind class for item icon/badge circle background (e.g. bg-techrealt-containers for #f5f5f5). Default bg-white/10. */
  badgeBackgroundClassName?: string;
  /** Optional Tailwind class for item icon wrapper size (e.g. w-[clamp(24px,2.5vw,36px)] h-[clamp(24px,2.5vw,36px)] for 36×36 at 1440). */
  iconWrapperSizeClassName?: string;
  /** Optional Tailwind class for item icon filter (e.g. brightness-0 for dark icon on yellow background). */
  iconFilterClassName?: string;
  /** Called when header is pressed (click or keyboard toggle). */
  onHeaderPress?: () => void;
  /** Called when the section body (expanded content) is pressed. Use to sync selection (e.g. picture) without toggling. */
  onBodyPress?: () => void;
  /** When false, section is always expanded and not collapsible (no chevron, no toggle). Default true. */
  expandable?: boolean;
  /** When true, section has no border. Default false. */
  hideBorder?: boolean;
}
