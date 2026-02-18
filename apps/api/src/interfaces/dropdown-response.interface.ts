export interface DropdownResponse {
  status: string;
  screen_location: string;
  language_code: string;
  dropdowns: { key: string; label: string }[];
  options: Record<string, { value: string; label: string }[]>;
  placeholders: Record<string, string>;
  labels: Record<string, string>;
  cached: boolean;
  performance?: {
    total_items: number;
    dropdowns_found: number;
    query_time: string;
  };
}
