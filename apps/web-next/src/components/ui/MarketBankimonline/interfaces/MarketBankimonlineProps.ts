/**
 * Props for MarketBankimonline: title "Bankimonline - שוק למשכנתאות והלוואות" (via getContent).
 */
export interface MarketBankimonlineProps {
  /** Content resolver (e.g. from useContentApi('cooperation')). */
  getContent: (key: string) => string;
  /** Text direction for layout. */
  direction: 'ltr' | 'rtl';
  /** Optional additional class names. */
  className?: string;
}
