'use client';

import React from 'react';
import ServiceStepPage from '@/components/ui/ServiceStepPage/ServiceStepPage';

const config = {
  basePath: '/services/refinance-mortgage',
  totalSteps: 4,
  titleContentKey: 'refinance_mortgage',
  progressStepKeys: [
    'mortgage_refinance_step_1',
    'mortgage_refinance_step_2',
    'mortgage_refinance_step_3',
    'mortgage_refinance_step_4',
  ],
  getStepTitleContentKey: (step: number) => `mortgage_refinance_step_${step}`,
  lastStepNextUrl: '/services/application-submitted',
  firstStepBackUrl: '/services',
  nextButtonContentKey: 'button_next',
  submitButtonContentKey: 'common_button_submit',
  renderStepContent: (step: number, getContent: (key: string) => string) => {
    if (step === 1) {
      return (
        <>
          <label className="text-sm text-textTheme-secondary">
            {getContent('mortgage_refinance_price')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('mortgage_refinance_bank')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('mortgage_refinance_type')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('mortgage_refinance_registered')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('mortgage_refinance_why')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <label className="text-sm text-textTheme-secondary">
            {getContent('refinance_step2_name_surname')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_mortgage_birth_date')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('refinance_step2_education')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
        </>
      );
    }
    if (step === 3) {
      return (
        <>
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_mortgage_main_source')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_mortgage_monthly_income')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
        </>
      );
    }
    return (
      <>
        <p className="text-textTheme-secondary">{getContent('refinance_mortgage_warning')}</p>
        <div className="h-12 bg-base-inputs rounded-lg" />
        <div className="h-12 bg-base-inputs rounded-lg" />
      </>
    );
  },
};

/** Step-based refinance mortgage flow; delegates to ServiceStepPage. */
const RefinanceMortgage: React.FC = () => <ServiceStepPage config={config} />;

export default RefinanceMortgage;
