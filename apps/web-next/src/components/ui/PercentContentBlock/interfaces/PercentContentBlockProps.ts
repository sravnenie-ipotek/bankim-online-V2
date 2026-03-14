export interface PercentContentBlockProps {
  title: string;
  description: string;
  showButton?: boolean;
  buttonLabel?: string;
  /** When true, title and description use white text (e.g. on dark background). */
  textWhite?: boolean;
  /** Background class passed from parent (e.g. bg-base-sidebarBg). */
  backgroundClassName?: string;
  /** Optional source file for one shared percent icon asset. */
  iconSrc?: string;
  /** When true, reduces the gap between title and description (e.g. in yellow tender). */
  compactTitleDescription?: boolean;
  /** Optional class to control spacing between title and description. */
  titleToDescriptionGapClassName?: string;
  /** Optional class to control spacing between icon and title/description block. */
  iconToContentGapClassName?: string;
  /** When true, places the button at the bottom of the block container. */
  stickButtonToBottom?: boolean;
  /** Optional class for the title (e.g. text size). */
  titleClassName?: string;
  /** Optional class for the description (e.g. text size). */
  descriptionClassName?: string;
  /** Optional class for the icon wrapper (e.g. filter for color tint). */
  iconWrapperClassName?: string;
  className?: string;
}
