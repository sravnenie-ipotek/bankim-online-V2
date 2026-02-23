'use client';

import React from 'react';
import ServiceStepPage from '@/components/ui/ServiceStepPage/ServiceStepPage';

const config = {
  basePath: '/services/other-borrowers',
  totalSteps: 2,
  titleContentKey: 'other_borrowers_title',
  progressStepKeys: ['personal_data_borrowers_title', 'borrowers_income'],
  getStepTitleContentKey: (step: number) =>
    step === 1 ? 'personal_data_borrowers_title' : 'borrowers_income',
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

/** Step-based other borrowers flow; delegates to ServiceStepPage. */
const OtherBorrowers: React.FC = () => <ServiceStepPage config={config} />;

export default OtherBorrowers;
