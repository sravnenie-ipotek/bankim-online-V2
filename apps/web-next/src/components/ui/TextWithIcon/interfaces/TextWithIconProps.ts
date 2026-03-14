/**
 * Props for TextWithIcon: block with optional icon, title, description, and optional button.
 * Reusable on brokers (profit), lawyers, cooperation (reward). All styling passed from parent.
 */
export interface TextWithIconProps {
  title: string;
  description: string;
  /** Optional icon image source */
  iconSrc?: string;
  /** Background class for the block (e.g. bg-base-sidebarBg rounded padding) */
  backgroundClassName?: string;
  /** Optional class for the title (e.g. font, size, color) */
  titleClassName?: string;
  /** Optional class for the description */
  descriptionClassName?: string;
  /** Optional class for the icon wrapper (e.g. size, or filter for color tint) */
  iconClassName?: string;
  /** Optional class for the icon wrapper div (e.g. filter-techrealt-red-icon for red tint) */
  iconWrapperClassName?: string;
  showButton?: boolean;
  buttonLabel?: string;
  /** When true, title and description use white text */
  textWhite?: boolean;
  /** When true, reduces gap between title and description */
  compactTitleDescription?: boolean;
  titleToDescriptionGapClassName?: string;
  iconToContentGapClassName?: string;
  stickButtonToBottom?: boolean;
  className?: string;
}
