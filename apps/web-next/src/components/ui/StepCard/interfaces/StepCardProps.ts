export interface StepCardProps {
  iconSrc: string;
  iconAlt: string;
  stepNumber: number;
  title: string;
  description: string;
  descriptionTablet?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** When true, card fills container (e.g. inside 1130px host with gap). */
  fillWidth?: boolean;
}
