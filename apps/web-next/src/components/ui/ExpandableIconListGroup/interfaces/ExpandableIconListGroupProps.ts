import type { ExpandableIconListGroupSection } from './ExpandableIconListGroupSection';

export interface ExpandableIconListGroupProps {
  sections: ExpandableIconListGroupSection[];
  direction?: 'ltr' | 'rtl';
  className?: string;
  onSectionPress?: (section: ExpandableIconListGroupSection, index: number) => void;
  /** When false, sections are always expanded and not collapsible. Default true. */
  expandable?: boolean;
  /** Optional Tailwind class for list item/section background (e.g. bg-techrealt-containers for #f5f5f5). */
  listBackgroundClassName?: string;
  /** Optional Tailwind class for list section title font color (e.g. text-techrealt-titleText). */
  listTitleColorClassName?: string;
  /** Optional Tailwind class for list item text font color (e.g. text-techrealt-descriptionText). */
  listItemTextColorClassName?: string;
  /** Optional Tailwind class for list item icon/badge circle background (e.g. bg-techrealt-containers for #f5f5f5). */
  listBadgeBackgroundClassName?: string;
  /** When true, list sections (dialog/cards) have no border. Default false. */
  listHideBorder?: boolean;
  /** Optional Tailwind class for list item icon wrapper size (e.g. 36×36 at 1440 clamp). */
  listItemIconWrapperSizeClassName?: string;
  /** Optional Tailwind class for list item icon filter (e.g. brightness-0 for dark icon on yellow). */
  listItemIconFilterClassName?: string;
}
