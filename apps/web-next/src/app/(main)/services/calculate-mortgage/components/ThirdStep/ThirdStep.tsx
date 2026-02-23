'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { IncomeTypes } from '@/interfaces/FormTypes';
import { updateMortgageData } from '@/store/slices/calculateMortgageSlice';
import { step3ValidationSchema } from '../../helpers/validationSchemas';
import Container from '@/components/ui/Container/Container';
import VideoPoster from '@/components/ui/VideoPoster/VideoPoster';
import ThirdStepForm from './ThirdStepForm';
import DoubleButtons from '@/components/ui/DoubleButtons/DoubleButtons';

const ThirdStep: React.FC = () => {
  const { getContent } = useContentApi('mortgage_step3');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const savedValue = (useAppSelector((state) => state.mortgage) || {}) as Partial<IncomeTypes>;

  const today = new Date().toISOString().split('T')[0];

  const initialValues = {
    mainSourceOfIncome: savedValue.mainSourceOfIncome || '',
    monthlyIncome: savedValue.monthlyIncome || 0,
    startDate: savedValue.startDate || today,
    fieldOfActivity: savedValue.fieldOfActivity || '',
    profession: savedValue.profession || '',
    companyName: savedValue.companyName || '',
    additionalIncome: savedValue.additionalIncome || '',
    additionalIncomeAmount: savedValue.additionalIncomeAmount || 0,
    obligation: savedValue.obligation || 'option_1',
    bank: savedValue.bank || '',
    monthlyPaymentForAnotherBank: savedValue.monthlyPaymentForAnotherBank || 0,
    endDate: savedValue.endDate || today,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={step3ValidationSchema}
      validateOnMount
      onSubmit={(values) => {
        dispatch(updateMortgageData(values));
        router.push('/services/calculate-mortgage/4');
      }}
    >
      <Form>
        <Container>
          <VideoPoster
            title={getContent('video_calculate_mortgage_title')}
            text={getContent('show_offers')}
            size="small"
          />
          <ThirdStepForm />
        </Container>
        <DoubleButtons />
      </Form>
    </Formik>
  );
};

export default ThirdStep;
