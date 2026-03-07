/**
 * Props for PartnershipProgramHero: hero section with two illustrations and program title/subtitle.
 */
export interface PartnershipProgramHeroProps {
  /** Content getter for cooperation title and subtitle keys. */
  getContent: (key: string) => string;
  /** Text direction. SVGs rotate 180° for LTR (en/ru). */
  direction: 'ltr' | 'rtl';
}
