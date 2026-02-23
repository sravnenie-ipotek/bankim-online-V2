'use client';

import React from 'react';
import ServiceStepPage from '@/components/ui/ServiceStepPage/ServiceStepPage';

const config = {
  basePath: '/services/borrowers-personal-data',
  totalSteps: 2,
  titleContentKey: 'borrowers_personal_data_title',
  progressStepKeys: ['personal_data', 'income_data'],
  getStepTitleContentKey: (step: number) => (step === 1 ? 'personal_data' : 'income_data'),
  lastStepNextUrl: '/personal-cabinet',
  firstStepBackUrl: null as string | null,
  renderStepContent: () => (
    <>
      <div className="h-12 bg-base-inputs rounded-lg animate-pulse" />
      <div className="h-12 bg-base-inputs rounded-lg animate-pulse" />
      <div className="h-12 bg-base-inputs rounded-lg animate-pulse" />
    </>
  ),
};

const BorrowersPersonalData: React.FC = () => <ServiceStepPage config={config} />;

export default BorrowersPersonalData;
