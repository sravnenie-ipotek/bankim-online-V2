export interface PersonalInfoTypes {
  nameSurname: string;
  birthday: string;
  education: string;
  additionalCitizenships: string;
  citizenshipsDropdown: string[];
  taxes: string;
  countriesPayTaxes: string[];
  childrens: string;
  howMuchChildrens: number;
  medicalInsurance: string;
  isForeigner: string;
  publicPerson: string;
  borrowers: number;
  familyStatus: string;
  partnerPayMortgage: string;
  addPartner: string;
}

export interface IncomeTypes {
  mainSourceOfIncome: string;
  monthlyIncome: number;
  startDate: string;
  fieldOfActivity: string;
  profession: string;
  companyName: string;
  additionalIncome: string;
  additionalIncomeAmount: number;
  obligation: string;
  bank: string;
  monthlyPaymentForAnotherBank: number;
  endDate: string;
}

export interface BankSelectionTypes {
  selectedBank: string;
  selectedOffer: string | null;
}
