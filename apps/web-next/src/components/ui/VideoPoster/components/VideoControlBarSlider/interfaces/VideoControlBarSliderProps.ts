export interface VideoControlBarSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  onCommit?: (value: number) => void;
  'aria-label': string;
  compact?: boolean;
  className?: string;
}
