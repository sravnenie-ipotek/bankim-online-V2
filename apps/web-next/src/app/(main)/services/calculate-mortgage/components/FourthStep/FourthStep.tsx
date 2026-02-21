'use client'

import React from 'react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContentApi } from '@hooks/useContentApi'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { updateMortgageData } from '@/store/slices/calculateMortgageSlice'
import { BankSelectionTypes } from '@/interfaces/FormTypes'
import { step4ValidationSchema } from '../../helpers/validationSchemas'
import FormContainer from '@/components/ui/FormContainer/FormContainer'
import FormCaption from '@/components/ui/FormCaption/FormCaption'
import DoubleButtons from '@/components/ui/DoubleButtons/DoubleButtons'
import UserParams from './UserParams'
import BankOffers from './BankOffers'

const FourthStep: React.FC = () => {
  const { getContent } = useContentApi('mortgage_step4')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const savedValue = (useAppSelector((state) => state.mortgage) || {}) as Partial<BankSelectionTypes>

  const initialValues: BankSelectionTypes = {
    selectedBank: savedValue.selectedBank ?? '',
    selectedOffer: savedValue.selectedOffer ?? null,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={step4ValidationSchema}
      validateOnMount
      onSubmit={(values) => {
        dispatch(updateMortgageData(values as unknown as Record<string, unknown>))
        router.push('/services/application-submitted')
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <FormContainer>
            <FormCaption
              title={getContent('calculate_mortgage_final')}
            />

            {/* Warning */}
            <div className="bg-[rgba(251,229,77,0.1)] border border-[rgba(251,229,77,0.3)] rounded-lg p-4">
              <p className="text-[0.875rem] text-[rgba(251,229,77,1)]">
                {getContent('calculate_mortgage_warning')}
              </p>
            </div>

            {/* User mortgage parameters summary */}
            <UserParams />

            {/* Bank offers */}
            <BankOffers
              selectedBank={values.selectedBank}
              onSelect={(bankId) => setFieldValue('selectedBank', bankId)}
            />
          </FormContainer>
          <DoubleButtons />
        </Form>
      )}
    </Formik>
  )
}

export default FourthStep
