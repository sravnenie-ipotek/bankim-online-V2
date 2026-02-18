import * as Yup from 'yup'

export const step1ValidationSchema = Yup.object().shape({
  priceOfEstate: Yup.number()
    .max(10000000, 'Maximum property value is 10,000,000')
    .required('Property value is required'),
  cityWhereYouBuy: Yup.string().required('City is required'),
  whenDoYouNeedMoney: Yup.string().required('Please select when you need the mortgage'),
  initialFee: Yup.number()
    .test(
      'initial-payment-percentage',
      'Initial payment must be at least 25% of property value',
      function (value) {
        const priceOfEstate: number = this.parent.priceOfEstate || 0
        if (!value || !priceOfEstate) return false
        const minPayment = priceOfEstate * 0.25
        return value >= minPayment
      },
    )
    .required('Initial payment is required'),
  typeSelect: Yup.string().required('Mortgage type is required'),
  willBeYourFirst: Yup.string().required('Please indicate if this is your first home'),
  propertyOwnership: Yup.string().required('Property ownership status is required'),
  period: Yup.number()
    .min(4, 'Minimum period is 4 years')
    .max(30, 'Maximum period is 30 years')
    .required('Mortgage period is required'),
  monthlyPayment: Yup.number()
    .min(2654, 'Minimum monthly payment is 2,654')
    .required('Monthly payment is required'),
})

export const step2ValidationSchema = Yup.object().shape({
  nameSurname: Yup.string().required('Name is required'),
  birthday: Yup.string().required('Birthday is required'),
  education: Yup.string().required('Education is required'),
  additionalCitizenships: Yup.string().required('Please indicate additional citizenships'),
  citizenshipsDropdown: Yup.array().when('additionalCitizenships', {
    is: 'yes',
    then: (schema) => schema.min(1, 'Please select at least one citizenship'),
    otherwise: (schema) => schema,
  }),
  taxes: Yup.string().required('Please indicate tax obligations'),
  countriesPayTaxes: Yup.array().when('taxes', {
    is: 'yes',
    then: (schema) => schema.min(1, 'Please select at least one country'),
    otherwise: (schema) => schema,
  }),
  childrens: Yup.string().required('Please indicate if you have children'),
  howMuchChildrens: Yup.number().required('Number of children is required'),
  medicalInsurance: Yup.string().required('Medical insurance status is required'),
  isForeigner: Yup.string().required('Foreign resident status is required'),
  publicPerson: Yup.string().required('Public person status is required'),
  borrowers: Yup.number().min(1, 'At least 1 borrower is required').required('Number of borrowers is required'),
  familyStatus: Yup.string().required('Family status is required'),
  partnerPayMortgage: Yup.string().when('familyStatus', {
    is: 'married',
    then: (schema) => schema.required('Please indicate partner payment'),
    otherwise: (schema) => schema,
  }),
})

export const step3ValidationSchema = Yup.object().shape({
  mainSourceOfIncome: Yup.string().required('Source of income is required'),
  monthlyIncome: Yup.number().when('mainSourceOfIncome', {
    is: (val: string) => val && val !== 'unemployed' && val !== 'no_income',
    then: (schema) => schema.required('Monthly income is required'),
    otherwise: (schema) => schema,
  }),
  startDate: Yup.string().when('mainSourceOfIncome', {
    is: (val: string) => val && val !== 'unemployed' && val !== 'no_income',
    then: (schema) => schema.required('Start date is required'),
    otherwise: (schema) => schema,
  }),
  fieldOfActivity: Yup.string().when('mainSourceOfIncome', {
    is: (val: string) => val && val !== 'unemployed' && val !== 'no_income',
    then: (schema) => schema.required('Field of activity is required'),
    otherwise: (schema) => schema,
  }),
  profession: Yup.string().when('mainSourceOfIncome', {
    is: (val: string) => val && val !== 'unemployed' && val !== 'no_income',
    then: (schema) => schema.required('Profession is required'),
    otherwise: (schema) => schema,
  }),
  companyName: Yup.string().when('mainSourceOfIncome', {
    is: (val: string) => val && val !== 'unemployed' && val !== 'no_income',
    then: (schema) => schema.required('Company name is required'),
    otherwise: (schema) => schema,
  }),
  additionalIncome: Yup.string().required('Please indicate additional income'),
  obligation: Yup.string().required('Please indicate obligations'),
  bank: Yup.string().when('obligation', {
    is: (val: string) => val && val !== 'option_1',
    then: (schema) => schema.required('Bank is required'),
    otherwise: (schema) => schema,
  }),
  monthlyPaymentForAnotherBank: Yup.number().when('obligation', {
    is: (val: string) => val && val !== 'option_1',
    then: (schema) => schema.required('Monthly payment is required'),
    otherwise: (schema) => schema,
  }),
  endDate: Yup.string().when('obligation', {
    is: (val: string) => val && val !== 'option_1',
    then: (schema) => schema.required('End date is required'),
    otherwise: (schema) => schema,
  }),
})

export const step4ValidationSchema = Yup.object().shape({
  selectedBank: Yup.string(),
  selectedOffer: Yup.string().nullable(),
})
