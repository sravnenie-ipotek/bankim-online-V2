/**
 * Props for PartnershipProgramHero: hero section with two illustrations and program title/subtitle.
 * Reuses TextWithHighlight; highlight part and color are passed from the program (cooperation page).
 */
export interface PartnershipProgramHeroProps {
  /** Content getter for cooperation title and subtitle keys. */
  getContent: (key: string) => string;
  /** Text direction. SVGs rotate 180° for LTR (en/ru). */
  direction: 'ltr' | 'rtl';
  /** Substring of subtitle to highlight (e.g. '500₪'). Passed from program. */
  highlightPart: string;
  /** Tailwind class for highlight color (e.g. 'text-[#FBE54D]'). Passed from program. */
  highlightColorClassName: string;
}
