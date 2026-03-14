export interface HowItWorksStepCardProps {
  /** Step number (1–5) */
  step: number;
  /** Card title */
  title: string;
  /** Card description text */
  description: string;
  /** Text direction for RTL/LTR */
  direction: 'ltr' | 'rtl';
  /** Optional width class (e.g. for steps 4–5: 556×340 clamp 1900). When not set, default card width is used. */
  widthClassName?: string;
  /** Optional height class (e.g. for steps 4–5: 556×340 clamp 1900). When not set, default card height is used. */
  heightClassName?: string;
  /** Optional width class for the inner container that holds only the title and description (not the step number). */
  textContainerWidthClassName?: string;
  /** Optional class for the step card title (e.g. text-tenders-brokers-title). */
  stepTitleClassName?: string;
  /** Optional class for the step card description (e.g. text-tenders-brokers-description). */
  stepDescriptionClassName?: string;
  /** Optional class for the step card background (default: dark #2A2B31). E.g. bg-techrealt-containers. */
  cardBackgroundClassName?: string;
  /** Optional class for the step number color (default: accent). E.g. text-techrealt-red. */
  stepNumberClassName?: string;
  /** Optional extra class on the outer wrapper (e.g. grid col-span) */
  className?: string;
}
