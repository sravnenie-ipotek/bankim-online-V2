import type { BankSlide } from './BankSlide';

export interface PartnerSlideProps {
  partner: BankSlide;
  isFailed: boolean;
  onImageError: () => void;
  boxClassName: string;
  iconClassName: string;
  innerRef?: React.RefObject<HTMLAnchorElement | null>;
}
