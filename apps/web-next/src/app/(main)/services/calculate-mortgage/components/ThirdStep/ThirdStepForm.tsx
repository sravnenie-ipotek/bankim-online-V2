'use client';

import React from 'react';
import { useFormikContext } from 'formik';
import { useContentApi } from '@hooks/useContentApi';
import FormContainer from '@/components/ui/FormContainer/FormContainer';
import FormCaption from '@/components/ui/FormCaption/FormCaption';
import FormRow from '@/components/ui/FormRow/FormRow';
import FormColumn from '@/components/ui/FormColumn/FormColumn';
import DropdownSelect from '@/components/ui/DropdownSelect/DropdownSelect';
import FormattedInput from '@/components/ui/FormattedInput/FormattedInput';
import DateInput from '@/components/ui/DateInput/DateInput';
import FormError from '@/components/ui/FormError/FormError';
import { IncomeTypes } from '@/interfaces/FormTypes';

const ThirdStepForm: React.FC = () => {
  const { getContent } = useContentApi('mortgage_step3');
  const { setFieldValue, values, errors, touched, setFieldTouched } =
    useFormikContext<IncomeTypes>();

  const incomeSourceOptions = [
    { value: 'option_1', label: getContent('calculate_mortgage_main_source_option_1') },
    { value: 'option_2', label: getContent('calculate_mortgage_main_source_option_2') },
    { value: 'option_3', label: getContent('calculate_mortgage_main_source_option_3') },
    { value: 'option_4', label: getContent('calculate_mortgage_main_source_option_4') },
    { value: 'option_5', label: getContent('calculate_mortgage_main_source_option_5') },
    { value: 'option_6', label: getContent('calculate_mortgage_main_source_option_6') },
    { value: 'option_7', label: getContent('calculate_mortgage_main_source_option_7') },
  ];

  const additionalIncomeOptions = [
    { value: 'option_1', label: getContent('calculate_mortgage_has_additional_option_1') },
    { value: 'option_2', label: getContent('calculate_mortgage_has_additional_option_2') },
    { value: 'option_3', label: getContent('calculate_mortgage_has_additional_option_3') },
    { value: 'option_4', label: getContent('calculate_mortgage_has_additional_option_4') },
    { value: 'option_5', label: getContent('calculate_mortgage_has_additional_option_5') },
    { value: 'option_6', label: getContent('calculate_mortgage_has_additional_option_6') },
    { value: 'option_7', label: getContent('calculate_mortgage_has_additional_option_7') },
  ];

  const obligationOptions = [
    { value: 'option_1', label: getContent('calculate_mortgage_debt_types_option_1') },
    { value: 'option_2', label: getContent('calculate_mortgage_debt_types_option_2') },
    { value: 'option_3', label: getContent('calculate_mortgage_debt_types_option_3') },
    { value: 'option_4', label: getContent('calculate_mortgage_debt_types_option_4') },
    { value: 'option_5', label: getContent('calculate_mortgage_debt_types_option_5') },
  ];

  const isEmployed = values.mainSourceOfIncome && values.mainSourceOfIncome !== 'option_7';
  const hasObligation = values.obligation && values.obligation !== 'option_1';

  return (
    <FormContainer>
      <FormCaption title={getContent('calculate_mortgage_step3_title')} />

      {/* Row 1: Main source, Monthly income, Start date */}
      <FormRow>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_main_source')}
            data={incomeSourceOptions}
            placeholder={getContent('calculate_mortgage_main_source_ph')}
            value={values.mainSourceOfIncome}
            onChange={(val) => setFieldValue('mainSourceOfIncome', val)}
            onBlur={() => setFieldTouched('mainSourceOfIncome', true)}
            error={touched.mainSourceOfIncome ? errors.mainSourceOfIncome : undefined}
          />
        </FormColumn>
        <FormColumn>
          {isEmployed && (
            <>
              <FormattedInput
                name="monthlyIncome"
                title={getContent('calculate_mortgage_monthly_income')}
                value={values.monthlyIncome}
                onChange={(val) => setFieldValue('monthlyIncome', val || 0)}
                placeholder={getContent('calculate_mortgage_monthly_income_ph')}
                error={touched.monthlyIncome ? errors.monthlyIncome : undefined}
              />
              {touched.monthlyIncome && errors.monthlyIncome && (
                <FormError error={errors.monthlyIncome} />
              )}
            </>
          )}
        </FormColumn>
        <FormColumn>
          {isEmployed && (
            <DateInput
              name="startDate"
              title={getContent('calculate_mortgage_start_date')}
              value={values.startDate}
              onChange={(val) => setFieldValue('startDate', val)}
              onBlur={() => setFieldTouched('startDate', true)}
              error={touched.startDate ? errors.startDate : undefined}
            />
          )}
        </FormColumn>
      </FormRow>

      {/* Row 2: Field of Activity, Profession, Company */}
      {isEmployed && (
        <FormRow>
          <FormColumn>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[0.875rem] font-normal leading-[140%] text-textTheme-secondary">
                {getContent('calculate_mortgage_sfere')}
              </label>
              <input
                type="text"
                name="fieldOfActivity"
                value={values.fieldOfActivity}
                onChange={(e) => setFieldValue('fieldOfActivity', e.target.value)}
                onBlur={() => setFieldTouched('fieldOfActivity', true)}
                className={`h-14 rounded border bg-base-inputs px-4 text-white text-[1.125rem] font-normal outline-none transition-colors placeholder:text-[#848484] ${
                  touched.fieldOfActivity && errors.fieldOfActivity
                    ? 'border-red-500'
                    : 'border-base-secondaryDefaultButton focus:border-accent-primary'
                }`}
              />
              {touched.fieldOfActivity && errors.fieldOfActivity && (
                <FormError error={errors.fieldOfActivity} />
              )}
            </div>
          </FormColumn>
          <FormColumn>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[0.875rem] font-normal leading-[140%] text-textTheme-secondary">
                {getContent('calculate_mortgage_profession')}
              </label>
              <input
                type="text"
                name="profession"
                value={values.profession}
                onChange={(e) => setFieldValue('profession', e.target.value)}
                onBlur={() => setFieldTouched('profession', true)}
                placeholder={getContent('calculate_mortgage_profession_ph')}
                className={`h-14 rounded border bg-base-inputs px-4 text-white text-[1.125rem] font-normal outline-none transition-colors placeholder:text-[#848484] ${
                  touched.profession && errors.profession
                    ? 'border-red-500'
                    : 'border-base-secondaryDefaultButton focus:border-accent-primary'
                }`}
              />
              {touched.profession && errors.profession && <FormError error={errors.profession} />}
            </div>
          </FormColumn>
          <FormColumn>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[0.875rem] font-normal leading-[140%] text-textTheme-secondary">
                {getContent('calculate_mortgage_company')}
              </label>
              <input
                type="text"
                name="companyName"
                value={values.companyName}
                onChange={(e) => setFieldValue('companyName', e.target.value)}
                onBlur={() => setFieldTouched('companyName', true)}
                className={`h-14 rounded border bg-base-inputs px-4 text-white text-[1.125rem] font-normal outline-none transition-colors placeholder:text-[#848484] ${
                  touched.companyName && errors.companyName
                    ? 'border-red-500'
                    : 'border-base-secondaryDefaultButton focus:border-accent-primary'
                }`}
              />
              {touched.companyName && errors.companyName && (
                <FormError error={errors.companyName} />
              )}
            </div>
          </FormColumn>
        </FormRow>
      )}

      {/* Divider */}
      <div className="w-full border-t border-[#333535]" />

      {/* Row 3: Additional income */}
      <FormRow>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_has_additional')}
            data={additionalIncomeOptions}
            placeholder={getContent('calculate_mortgage_has_additional_ph')}
            value={values.additionalIncome}
            onChange={(val) => setFieldValue('additionalIncome', val)}
            onBlur={() => setFieldTouched('additionalIncome', true)}
            error={touched.additionalIncome ? errors.additionalIncome : undefined}
          />
        </FormColumn>
        <FormColumn>
          {values.additionalIncome && values.additionalIncome !== 'option_1' && (
            <>
              <FormattedInput
                name="additionalIncomeAmount"
                title={getContent('additional_source_of_income')}
                value={values.additionalIncomeAmount}
                onChange={(val) => setFieldValue('additionalIncomeAmount', val || 0)}
              />
            </>
          )}
        </FormColumn>
        <FormColumn />
      </FormRow>

      {/* Divider */}
      <div className="w-full border-t border-[#333535]" />

      {/* Row 4: Obligations */}
      <FormRow>
        <FormColumn>
          <DropdownSelect
            title={getContent('calculate_mortgage_debt_types')}
            data={obligationOptions}
            placeholder={getContent('calculate_mortgage_debt_types_ph')}
            value={values.obligation}
            onChange={(val) => setFieldValue('obligation', val)}
            onBlur={() => setFieldTouched('obligation', true)}
            error={touched.obligation ? errors.obligation : undefined}
          />
        </FormColumn>
        <FormColumn>
          {hasObligation && (
            <>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-[0.875rem] font-normal leading-[140%] text-textTheme-secondary">
                  {getContent('bank')}
                </label>
                <input
                  type="text"
                  name="bank"
                  value={values.bank}
                  onChange={(e) => setFieldValue('bank', e.target.value)}
                  onBlur={() => setFieldTouched('bank', true)}
                  className={`h-14 rounded border bg-base-inputs px-4 text-white text-[1.125rem] font-normal outline-none transition-colors placeholder:text-[#848484] ${
                    touched.bank && errors.bank
                      ? 'border-red-500'
                      : 'border-base-secondaryDefaultButton focus:border-accent-primary'
                  }`}
                />
                {touched.bank && errors.bank && <FormError error={errors.bank} />}
              </div>
            </>
          )}
        </FormColumn>
        <FormColumn>
          {hasObligation && (
            <>
              <FormattedInput
                name="monthlyPaymentForAnotherBank"
                title={getContent('calculate_mortgage_monthly_income')}
                value={values.monthlyPaymentForAnotherBank}
                onChange={(val) => setFieldValue('monthlyPaymentForAnotherBank', val || 0)}
                error={
                  touched.monthlyPaymentForAnotherBank
                    ? errors.monthlyPaymentForAnotherBank
                    : undefined
                }
              />
              {touched.monthlyPaymentForAnotherBank && errors.monthlyPaymentForAnotherBank && (
                <FormError error={errors.monthlyPaymentForAnotherBank} />
              )}
            </>
          )}
        </FormColumn>
      </FormRow>

      {hasObligation && (
        <FormRow>
          <FormColumn>
            <DateInput
              name="endDate"
              title={getContent('end_date')}
              value={values.endDate}
              onChange={(val) => setFieldValue('endDate', val)}
              onBlur={() => setFieldTouched('endDate', true)}
              error={touched.endDate ? errors.endDate : undefined}
            />
          </FormColumn>
          <FormColumn />
          <FormColumn />
        </FormRow>
      )}
    </FormContainer>
  );
};

export default ThirdStepForm;
