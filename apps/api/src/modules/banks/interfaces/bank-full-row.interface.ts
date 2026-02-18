import type { BankListRow } from './bank-list-row.interface.js';

export interface BankFullRow extends BankListRow {
  url: string | null;
  tender: number;
  priority: number;
  is_active: boolean;
}
