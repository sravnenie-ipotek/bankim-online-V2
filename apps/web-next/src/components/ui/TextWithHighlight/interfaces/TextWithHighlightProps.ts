export interface TextWithHighlightProps {
  /** Full text; optional substring is highlighted via highlightPart. */
  text: string;
  /** Optional substring of text to render with highlight styling. */
  highlightPart?: string;
  /** Class name applied to the highlighted span (combined with highlightColorClassName / highlightFontSizeClassName if provided). */
  highlightClassName?: string;
  /** Optional class name for the root paragraph. */
  className?: string;
  /** Font size class for the root paragraph (e.g. text-2xl, text-[39px]). Passed from parent. */
  fontSizeClassName?: string;
  /** Color class for the highlighted part (e.g. text-[#E76143]). Passed from parent. */
  highlightColorClassName?: string;
  /** Font size class for the highlighted part, if it should differ from the root. Passed from parent. */
  highlightFontSizeClassName?: string;
}
