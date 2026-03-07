/**
 * Props for SocialTitleLinks: optional title heading and social links row (e.g. "Follow us" on contacts page).
 */
export interface SocialTitleLinksProps {
  /** Heading text above the social links (e.g. "Follow us"). Omit or set showTitle false to hide. */
  title?: string;
  /** Resolver for tooltip labels per platform (e.g. getContent('footer_social_tooltip_instagram')). */
  getContent: (key: string) => string;
  /** Whether to show the title. Default true. Set false for footer (icons only). */
  showTitle?: boolean;
  /** Optional class name for the root container. */
  className?: string;
  /** Icon width in px at 1400px viewport; scales to 1900px. Default 32. */
  iconWidth?: number;
  /** Icon height in px at 1400px viewport; scales to 1900px. Default 32. */
  iconHeight?: number;
}
