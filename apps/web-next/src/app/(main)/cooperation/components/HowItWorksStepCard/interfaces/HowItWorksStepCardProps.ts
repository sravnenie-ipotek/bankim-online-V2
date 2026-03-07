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
  /** Optional extra class on the outer wrapper (e.g. grid col-span) */
  className?: string;
}
