import type { HowItWorksStepConfig } from './HowItWorksStepConfig';

export interface HowItWorksSectionProps {
  /** Content getter for cooperation screen */
  getContent: (key: string) => string;
  /** Text direction for RTL/LTR */
  direction: 'ltr' | 'rtl';
  /** Optional title content key (default: cooperation_how_it_works_title) */
  titleKey?: string;
  /** Optional class for the section title (e.g. text-tenders-brokers-title) */
  titleClassName?: string;
  /** Optional class for each step card title (e.g. text-tenders-brokers-title). */
  stepTitleClassName?: string;
  /** Optional class for each step card description (e.g. text-tenders-brokers-description). */
  stepDescriptionClassName?: string;
  /** Optional steps config; when omitted, cooperation 5-step default is used */
  stepsConfig?: HowItWorksStepConfig[];
  /** Optional width class for the inner container that holds only the text (title + description) in each step card; the step number is not inside this container. */
  stepTextContainerWidthClassName?: string;
  /** Optional width class for step cards (e.g. "w-full" or "max-w-[400px]"). When set, applied to all steps instead of default/large logic. */
  stepCardWidthClassName?: string;
  /** Optional height class for step cards. When set, applied to all steps instead of default/large logic. */
  stepCardHeightClassName?: string;
  /** Optional button label; when set with onButtonClick, a CTA button is shown below the steps. */
  buttonLabel?: string;
  /** Optional click handler for the section button (e.g. redirect); use with buttonLabel. */
  onButtonClick?: () => void;
  /** Optional class for the section background (default: dark #161616). E.g. bg-white for light theme. */
  sectionBackgroundClassName?: string;
  /** Optional class for the section title color (default: text-white). E.g. text-techrealt-titleText. */
  sectionTitleColorClassName?: string;
  /** Optional class for each step card background (default: dark). E.g. bg-techrealt-containers. */
  stepCardBackgroundClassName?: string;
  /** Optional class for the step number color (default: accent). E.g. text-techrealt-red. */
  stepNumberClassName?: string;
  /** Optional class for the CTA button (default: btn-primary-lg). E.g. techrealt red bg + white text. */
  buttonClassName?: string;
  /** Optional class for the button wrapper (e.g. flex justify-center to center the button). */
  buttonWrapperClassName?: string;
  /** Optional class for the button size (e.g. w-[clamp(200px,12.97vw,249px)] h-[clamp(44px,2.92vw,56px)]). */
  buttonSizeClassName?: string;
  /** Optional section vertical padding class (default: py-[clamp(48px,6.667vw,96px)]). */
  sectionPaddingClassName?: string;
  /** Optional class for the title bottom margin (default: mb-[clamp(32px,4.444vw,64px)]). */
  titleMarginBottomClassName?: string;
  /** Optional class for the button wrapper top margin (default: mt-[clamp(32px,4.444vw,64px)]). */
  buttonMarginTopClassName?: string;
  /** When true, background stays within the layout container instead of spanning full viewport width. Default: false. */
  containedBackground?: boolean;
}
