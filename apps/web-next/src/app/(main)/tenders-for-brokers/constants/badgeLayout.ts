/**
 * Banner (IconBanner) location and size constants used for ImageWithIconBadges on tenders-for-brokers.
 * Shared so the same values are used for badge height, positions, and container dimensions.
 */

/** Banner height in px (used for all section badges). Clamp 1900: 70px. */
export const BADGE_HEIGHT = 70;

/** Second badge horizontal position: clamp(80px, 12.47vw, 237px) for 1900 viewport. */
export const SECOND_BADGE_LEFT = 'clamp(80px, 12.47vw, 237px)';

/** First badge position (bottom-left). */
export const FIRST_BADGE_LEFT = '8.5%';
export const FIRST_BADGE_TOP = '72%';

/** Second badge vertical position (top). */
export const SECOND_BADGE_TOP = '8%';

/** Section 2 first badge position (right side). */
export const SECTION_2_FIRST_BADGE_LEFT = '72%';
export const SECTION_2_FIRST_BADGE_TOP = '22%';

/** ImageWithIconBadges container: same as component CONTAINER_CLASS. */
export const BADGES_CONTAINER_WIDTH = 'clamp(260px,36.806vw,699px)';
export const BADGES_CONTAINER_HEIGHT = 'clamp(283px,40vw,760px)';
