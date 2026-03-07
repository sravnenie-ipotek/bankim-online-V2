/**
 * Props for BannerShapeDecoration: decorative SVG shapes with parameterized fill.
 */
export interface BannerShapeDecorationProps {
  /** Fill color for the shape paths. */
  fill: string;
  /** Direction: LTR places shapes on the right, RTL on the left. */
  direction: 'ltr' | 'rtl';
}
