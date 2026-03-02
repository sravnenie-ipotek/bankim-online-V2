import type { VacancyListRow } from './VacancyListRow.js';

export interface VacancyDetailRow extends VacancyListRow {
  responsibilities: string | null;
  nice_to_have: string | null;
  created_at: Date | null;
}
