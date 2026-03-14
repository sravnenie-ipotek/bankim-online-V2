import type { ExpandableIconListGroupSection } from '@/components/ui/ExpandableIconListGroup';
import type { ExpandableIconListSideContent } from '@/components/ui/ExpandableIconListGroup';
import type { ImageWithIconBadgesProps } from '@/components/ui/ImageWithIconBadges';

export interface ExpandableListWithImageBlockProps {
  /** Block title above the list */
  title: string;
  /** Optional base class for the title (h2); when provided, no default is applied (fully from outside). */
  titleBaseClassName?: string;
  /** Optional class for the title (h2), appended after base */
  titleClassName?: string;
  /** Sections for the expandable list (each may have sideContent for the image) */
  sections: ExpandableIconListGroupSection[];
  /** Text direction */
  direction: 'ltr' | 'rtl';
  /** Optional callback when a section is pressed (e.g. to sync selection) */
  onSectionPress?: (section: ExpandableIconListGroupSection, index: number) => void;
  /** Optional CTA button label */
  buttonLabel?: string;
  /** Optional CTA button click handler */
  onButtonClick?: () => void;
  /** Optional class for the CTA button */
  buttonClassName?: string;
  /** Optional class for the button wrapper (e.g. mt-auto flex justify-center w-full for bottom-center). */
  buttonWrapperClassName?: string;
  /** When true, the button is not rendered inside the block; the parent should render it outside (e.g. at bottom of wrapper). */
  renderButtonOutside?: boolean;
  /** Optional class for the outer wrapper (flex container) */
  wrapperClassName?: string;
  /** When true, wrapper has transparent background. Default false. */
  transparentBackground?: boolean;
  /** Optional class for the left column (title + list + button) */
  leftColumnClassName?: string;
  /** Optional class for the list container (ExpandableIconListGroup wrapper). E.g. w-[clamp(...,571px)] min-h-[clamp(...,282px)] for 571×282 at 1440. */
  listContainerClassName?: string;
  /** Optional Tailwind class for list item background (e.g. bg-techrealt-containers for #f5f5f5). */
  listBackgroundClassName?: string;
  /** Optional Tailwind class for list section title font color (e.g. text-techrealt-titleText). */
  listTitleColorClassName?: string;
  /** Optional Tailwind class for list item text font color (e.g. text-techrealt-descriptionText). */
  listItemTextColorClassName?: string;
  /** Optional Tailwind class for list item icon/badge circle background (e.g. bg-techrealt-containers for #f5f5f5). */
  listBadgeBackgroundClassName?: string;
  /** Optional Tailwind class for picture overlay badges background (e.g. bg-techrealt-containers for #f5f5f5). */
  imageBadgeBackgroundClassName?: string;
  /** Optional Tailwind class for picture overlay badges text color (e.g. text-techrealt-titleText). */
  imageBadgeTextColorClassName?: string;
  /** Optional Tailwind class for picture overlay badge icons (e.g. filter-techrealt-red-icon from theme). */
  imageBadgeIconFilterClassName?: string;
  /** Optional class for the right column (image) */
  rightColumnClassName?: string;
  /** When false, list sections are always expanded and not collapsible. Default true. */
  expandable?: boolean;
  /** When true, list sections (dialog/cards) have no border. Default false. */
  listHideBorder?: boolean;
  /** Optional Tailwind class for list item icon wrapper size (e.g. 36×36 at 1440 clamp). */
  listItemIconWrapperSizeClassName?: string;
  /** Optional Tailwind class for list item icon filter (e.g. brightness-0 for dark icon on yellow circle). */
  listItemIconFilterClassName?: string;
  /**
   * Optional: supply props for ImageWithIconBadges per selection.
   * When not provided, props are derived from sections[selectedIndex].sideContent.
   */
  getImageWithBadgesProps?: (
    selectedIndex: number,
    sideContent: ExpandableIconListSideContent | undefined
  ) => ImageWithIconBadgesProps;
}
