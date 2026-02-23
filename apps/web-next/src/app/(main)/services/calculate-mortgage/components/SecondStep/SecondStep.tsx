'use client';

import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useContentApi } from '@hooks/useContentApi';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { updateMortgageData } from '@/store/slices/calculateMortgageSlice';
import { step2ValidationSchema } from '../../helpers/validationSchemas';
import Container from '@/components/ui/Container/Container';
import VideoPoster from '@/components/ui/VideoPoster/VideoPoster';
import SecondStepForm from './SecondStepForm';
import DoubleButtons from '@/components/ui/DoubleButtons/DoubleButtons';

const SecondStep: React.FC = () => {
  const { getContent } = useContentApi('mortgage_step2');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const savedValue = useAppSelector((state) => state.mortgage) || {};

  const initialValues = {
    nameSurname: savedValue.nameSurname || '',
    birthday: savedValue.birthday || '',
    education: savedValue.education || '',
    additionalCitizenships: savedValue.additionalCitizenships || '',
    citizenshipsDropdown: savedValue.citizenshipsDropdown || [],
    taxes: savedValue.taxes || '',
    countriesPayTaxes: savedValue.countriesPayTaxes || [],
    childrens: savedValue.childrens || '',
    howMuchChildrens: savedValue.howMuchChildrens || 1,
    medicalInsurance: savedValue.medicalInsurance || '',
    isForeigner: savedValue.isForeigner || '',
    publicPerson: savedValue.publicPerson || '',
    borrowers: savedValue.borrowers || 1,
    familyStatus: savedValue.familyStatus || '',
    partnerPayMortgage: savedValue.partnerPayMortgage || '',
    addPartner: savedValue.addPartner || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={step2ValidationSchema}
      validateOnMount
      onSubmit={(values) => {
        dispatch(updateMortgageData(values));
        router.push('/services/calculate-mortgage/3');
      }}
    >
      <Form>
        <Container>
          <VideoPoster
            title={getContent('video_calculate_mortgage_title')}
            text={getContent('show_offers')}
            size="small"
          />
          <SecondStepForm />
        </Container>
        <DoubleButtons />
      </Form>
    </Formik>
  );
};

export default SecondStep;
