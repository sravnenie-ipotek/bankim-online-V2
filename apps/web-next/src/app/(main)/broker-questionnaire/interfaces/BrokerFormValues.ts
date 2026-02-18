import type { BaseFormValues } from '@/interfaces/BaseFormValues'

export interface BrokerFormValues extends BaseFormValues {
  address: string
  companyName: string
  specialization: string
  agreeTerms: boolean
}
