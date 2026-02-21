'use client'

import React from 'react'
import { useFormikContext } from 'formik'
import { useContentApi } from '@hooks/useContentApi'
import FormContainer from '@/components/ui/FormContainer/FormContainer'
import FormCaption from '@/components/ui/FormCaption/FormCaption'
import FormRow from '@/components/ui/FormRow/FormRow'
import FormColumn from '@/components/ui/FormColumn/FormColumn'
import DropdownSelect from '@/components/ui/DropdownSelect/DropdownSelect'
import DateInput from '@/components/ui/DateInput/DateInput'
import FormError from '@/components/ui/FormError/FormError'
import FormattedInput from '@/components/ui/FormattedInput/FormattedInput'
import { PersonalInfoTypes } from '@/interfaces/FormTypes'

const SecondStepForm: React.FC = () => {
  const { getContent } = useContentApi('mortgage_step2')
  const { setFieldValue, values, errors, touched, setFieldTouched } =
    useFormikContext<PersonalInfoTypes>()

  const yesNoOptions = [
    { value: 'yes', label: getContent('yes') },
    { value: 'no', label: getContent('no') },
  ]

  const educationOptions = [
    { value: 'option_1', label: getContent('calculate_mortgage_education_option_1') },
    { value: 'option_2', label: getContent('calculate_mortgage_education_option_2') },
    { value: 'option_3', label: getContent('calculate_mortgage_education_option_3') },
    { value: 'option_4', label: getContent('calculate_mortgage_education_option_4') },
    { value: 'option_5', label: getContent('calculate_mortgage_education_option_5') },
    { value: 'option_6', label: getContent('calculate_mortgage_education_option_6') },
    { value: 'option_7', label: getContent('calculate_mortgage_education_option_7') },
  ]

  const familyStatusOptions = [
    { value: 'single', label: getContent('calculate_mortgage_family_status_option_1') },
    { value: 'married', label: getContent('calculate_mortgage_family_status_option_2') },
    { value: 'divorced', label: getContent('calculate_mortgage_family_status_option_3') },
    { value: 'widowed', label: getContent('calculate_mortgage_family_status_option_4') },
    { value: 'separated', label: getContent('calculate_mortgage_family_status_option_5') },
    { value: 'common_law', label: getContent('calculate_mortgage_family_status_option_6') },
  ]

  // Date 18 years ago for max birthday
  const today = new Date()
  const maxBirthday = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0]

  return (
    <FormContainer>
      <FormCaption
        title={getContent('calculate_mortgage_step2_title')}
        subtitle={getContent('third_persons')}
      />

      {/* Row 1: Name, Birthday, Education */}
      <FormRow>
        <FormColumn>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[0.875rem] font-normal leading-[140%] text-textTheme-secondary">
              {getContent('calculate_mortgage_name_surname')}
            </label>
            <input
              type="text"
              name="nameSurname"
              value={values.nameSurname}
              onChange={(e) => setFieldValue('nameSurname', e.target.value)}
              onBlur={() => setFieldTouched('nameSurname', true)}
              placeholder={getContent('calculate_mortgage_name_surname_ph')}
              className={`h-14 rounded border bg-base-inputs px-4 text-white text-[1.125rem] font-normal outline-none transition-colors placeholder:text-[#848484] ${
                touched.nameSurname && errors.nameSurname
                  ? 'border-red-500'
                  : 'border-base-secondaryDefaultButton focus:border-accent-primary'
              }`}
            />
          </div>
          {touched.nameSurname && errors.nameSurname && <FormError error={errors.nameSurname} />}
        </FormColumn>
        <FormColumn>
          <DateInput
            name="birthday"
            title={getContent('calculate_mortgage_birth_date')}
            value={values.birthday}
            onChange={(val) => setFieldValue('birthday', val)}
            onBlur={() => setFieldTouched('birthday', true)}
            max={maxBirthday}
            error={touched.birthday ? errors.birthday : undefined}
          />
          {touched.birthday && errors.birthday && <FormError error={errors.birthday} />}
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_education')}
            data={educationOptions}
            placeholder={getContent('calculate_mortgage_education_ph')}
            value={values.education}
            onChange={(val) => setFieldValue('education', val)}
            onBlur={() => setFieldTouched('education', true)}
            error={touched.education ? errors.education : undefined}
          />
        </FormColumn>
      </FormRow>

      {/* Row 2: Citizenships, Taxes, Children */}
      <FormRow>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_citizenship')}
            data={yesNoOptions}
            placeholder={getContent('calculate_mortgage_citizenship_ph')}
            value={values.additionalCitizenships}
            onChange={(val) => setFieldValue('additionalCitizenships', val)}
            onBlur={() => setFieldTouched('additionalCitizenships', true)}
            error={touched.additionalCitizenships ? errors.additionalCitizenships : undefined}
          />
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_tax')}
            data={yesNoOptions}
            placeholder={getContent('Select...')}
            value={values.taxes}
            onChange={(val) => setFieldValue('taxes', val)}
            onBlur={() => setFieldTouched('taxes', true)}
            error={touched.taxes ? errors.taxes : undefined}
          />
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_children18')}
            data={yesNoOptions}
            placeholder={getContent('Select...')}
            value={values.childrens}
            onChange={(val) => setFieldValue('childrens', val)}
            onBlur={() => setFieldTouched('childrens', true)}
            error={touched.childrens ? errors.childrens : undefined}
          />
          {values.childrens === 'yes' && (
            <div className="mt-2">
              <FormattedInput
                name="howMuchChildrens"
                title={getContent('calculate_mortgage_how_much_childrens')}
                value={values.howMuchChildrens}
                onChange={(val) => setFieldValue('howMuchChildrens', val || 1)}
                currencySymbol=""
              />
            </div>
          )}
        </FormColumn>
      </FormRow>

      {/* Row 3: Medical Insurance, Foreigner, Public Person */}
      <FormRow>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_is_medinsurance')}
            data={yesNoOptions}
            placeholder={getContent('Select...')}
            value={values.medicalInsurance}
            onChange={(val) => setFieldValue('medicalInsurance', val)}
            onBlur={() => setFieldTouched('medicalInsurance', true)}
            error={touched.medicalInsurance ? errors.medicalInsurance : undefined}
          />
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_is_foreigner')}
            data={yesNoOptions}
            placeholder={getContent('Select...')}
            value={values.isForeigner}
            onChange={(val) => setFieldValue('isForeigner', val)}
            onBlur={() => setFieldTouched('isForeigner', true)}
            error={touched.isForeigner ? errors.isForeigner : undefined}
          />
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_is_public')}
            data={yesNoOptions}
            placeholder={getContent('Select...')}
            value={values.publicPerson}
            onChange={(val) => setFieldValue('publicPerson', val)}
            onBlur={() => setFieldTouched('publicPerson', true)}
            error={touched.publicPerson ? errors.publicPerson : undefined}
          />
        </FormColumn>
      </FormRow>

      {/* Row 4: Borrowers, Family Status, Partner */}
      <FormRow>
        <FormColumn>
          <FormattedInput
            name="borrowers"
            title={getContent('calculate_mortgage_borrowers')}
            value={values.borrowers}
            onChange={(val) => setFieldValue('borrowers', val || 1)}
            currencySymbol=""
            placeholder={getContent('place_borrowers')}
          />
          {touched.borrowers && errors.borrowers && <FormError error={errors.borrowers} />}
        </FormColumn>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_family_status')}
            data={familyStatusOptions}
            placeholder={getContent('calculate_mortgage_family_status_ph')}
            value={values.familyStatus}
            onChange={(val) => setFieldValue('familyStatus', val)}
            onBlur={() => setFieldTouched('familyStatus', true)}
            error={touched.familyStatus ? errors.familyStatus : undefined}
          />
        </FormColumn>
        <FormColumn>
          {values.familyStatus === 'married' && (
            <DropdownSelect
              title={getContent('calculate_mortgage_partner_pay_mortgage')}
              data={yesNoOptions}
              placeholder={getContent('Select...')}
              value={values.partnerPayMortgage}
              onChange={(val) => setFieldValue('partnerPayMortgage', val)}
              onBlur={() => setFieldTouched('partnerPayMortgage', true)}
              error={touched.partnerPayMortgage ? errors.partnerPayMortgage : undefined}
            />
          )}
        </FormColumn>
      </FormRow>
    </FormContainer>
  )
}

export default SecondStepForm
