export interface ToggleReturn {
  isOn: boolean;
  isOff: boolean;
  toggle: () => void;
  on: () => void;
  off: () => void;
  set: (value: boolean) => void;
}
