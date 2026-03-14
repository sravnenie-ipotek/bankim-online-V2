export type TranslationGetter = (key: string) => string;

export interface ValidateBrokerQuestionnaireFormParams {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  desiredRegion: string;
  employmentType: string;
  monthlyIncome: string;
  experience: string;
  hasClientCases: boolean | null;
  hasDebtCases: boolean | null;
  additionalInfo: string;
  agreeTerms: boolean;
  getContent: TranslationGetter;
}
