'use client'

import React from 'react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/hooks/store'
import type { CalculateMortgageTypes } from '@/interfaces/CalculateMortgageTypes'
import { updateMortgageData } from '@/store/slices/calculateMortgageSlice'
import Container from '@/components/ui/Container/Container'
import VideoPoster from '@/components/ui/VideoPoster/VideoPoster'
import SingleButton from '@/components/ui/SingleButton/SingleButton'
import { useContentApi } from '@hooks/useContentApi'
import { step1ValidationSchema } from '../../helpers/validationSchemas'
import FirstStepForm from './FirstStepForm'

const DEFAULT_VALUES: CalculateMortgageTypes = {
  priceOfEstate: 1000000,
  cityWhereYouBuy: '',
  whenDoYouNeedMoney: '',
  initialFee: 500000,
  typeSelect: '',
  willBeYourFirst: '',
  propertyOwnership: '',
  period: 4,
  monthlyPayment: 11514,
}

const FirstStep: React.FC = () => {
  const { getContent } = useContentApi('mortgage_step1')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const savedValue = (useAppSelector((state) => state.mortgage) ?? {}) as Partial<CalculateMortgageTypes>
  const isLogin = useAppSelector((state) => state.login?.isLogin)

  const initialValues: CalculateMortgageTypes = {
    priceOfEstate: savedValue.priceOfEstate ?? DEFAULT_VALUES.priceOfEstate,
    cityWhereYouBuy: savedValue.cityWhereYouBuy ?? DEFAULT_VALUES.cityWhereYouBuy,
    whenDoYouNeedMoney: savedValue.whenDoYouNeedMoney ?? DEFAULT_VALUES.whenDoYouNeedMoney,
    initialFee: savedValue.initialFee ?? DEFAULT_VALUES.initialFee,
    typeSelect: savedValue.typeSelect ?? DEFAULT_VALUES.typeSelect,
    willBeYourFirst: savedValue.willBeYourFirst ?? DEFAULT_VALUES.willBeYourFirst,
    propertyOwnership: savedValue.propertyOwnership ?? DEFAULT_VALUES.propertyOwnership,
    period: savedValue.period ?? DEFAULT_VALUES.period,
    monthlyPayment: savedValue.monthlyPayment ?? DEFAULT_VALUES.monthlyPayment,
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={step1ValidationSchema}
      validateOnMount
      onSubmit={(values) => {
        dispatch(updateMortgageData(values as unknown as Record<string, unknown>))
        if (isLogin) {
          router.push('/services/calculate-mortgage/2')
        } else {
          // For now, proceed to step 2 anyway (login modal integration later)
          router.push('/services/calculate-mortgage/2')
        }
      }}
    >
      <Form>
        <Container>
          <VideoPoster
            title={getContent('video_calculate_mortgage_title')}
            text={getContent('show_offers')}
            size="small"
          />
          <FirstStepForm />
        </Container>
        <SingleButton />
      </Form>
    </Formik>
  )
}

export default FirstStep
