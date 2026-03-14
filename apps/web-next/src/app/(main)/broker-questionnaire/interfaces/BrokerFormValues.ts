import type { BaseFormValues } from '@/interfaces/BaseFormValues';

export interface BrokerFormValues extends BaseFormValues {
  desiredRegion: string;
  employmentType: string;
  monthlyIncome: string;
  hasClientCases: boolean | null;
  hasDebtCases: boolean | null;
  agreeTerms: boolean;
}
