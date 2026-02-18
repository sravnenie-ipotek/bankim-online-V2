export interface DropdownEntry {
  key: string;
  label: string | null;
  options: { value: string; label: string }[];
  placeholder: string | null;
}
