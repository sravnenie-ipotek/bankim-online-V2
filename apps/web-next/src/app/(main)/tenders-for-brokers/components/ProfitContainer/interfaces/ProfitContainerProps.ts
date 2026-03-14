export interface ProfitContainerProps {
  /** Text direction for RTL/LTR */
  direction: 'ltr' | 'rtl';
  /** Label for the left column (e.g. getContent('tenders_profit_how_you_earn')) */
  label: string;
  /** Title for the inner text block */
  title: string;
  /** Description for the inner text block */
  description: string;
  showButton?: boolean;
  buttonLabel?: string;
  /** Icon image source for the inner block */
  iconSrc?: string;
  /** Background class for the inner block (TextWithIcon) */
  blockBackgroundClassName?: string;
  /** Class for the left label heading */
  labelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  /** Optional class for the icon size */
  iconClassName?: string;
  /** Optional class for the icon wrapper (e.g. filter for red tint) */
  iconWrapperClassName?: string;
  /** Optional class for the root container */
  className?: string;
}
