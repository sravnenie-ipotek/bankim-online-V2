import type { ExpandableIconListItem } from '@/components/ui/ExpandableIconList';
import type { ExpandableIconListSideContent } from './ExpandableIconListSideContent';

export interface ExpandableIconListGroupSection {
  title: string;
  items: ExpandableIconListItem[];
  defaultExpanded?: boolean;
  className?: string;
  /** Optional Tailwind class for the section title. */
  titleClassName?: string;
  /** Optional Tailwind class for each item translation text. */
  itemTextClassName?: string;
  /** Optional side content payload associated with this section. */
  sideContent?: ExpandableIconListSideContent;
}
