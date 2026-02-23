'use client';

import React from 'react';
import ServiceStepPage from '@/components/ui/ServiceStepPage/ServiceStepPage';

const config = {
  basePath: '/services/calculate-credit',
  totalSteps: 4,
  titleContentKey: 'calculate_credit',
  progressStepKeys: [
    'calculate_credit_progress_step_1',
    'calculate_credit_progress_step_2',
    'calculate_credit_progress_step_3',
    'calculate_credit_progress_step_4',
  ],
  getStepTitleContentKey: (step: number) => `calculate_credit_progress_step_${step}`,
  lastStepNextUrl: '/services/application-submitted',
  firstStepBackUrl: '/services',
  nextButtonContentKey: 'button_next',
  submitButtonContentKey: 'common_button_submit',
  renderStepContent: (step: number, getContent: (key: string) => string) => {
    if (step === 1) {
      return (
        <>
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_credit_amount')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_credit_target')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_credit_prolong')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_mortgage_name_surname')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_mortgage_birth_date')}
          </label>
          <div className="h-12 bg-base-inputs rounded-lg" />
          <label className="text-sm text-textTheme-secondary">
            {getContent('calculate_mortgage_family_status')}
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
        <p className="text-textTheme-secondary">{getContent('calculate_credit_warning')}</p>
        <div className="h-12 bg-base-inputs rounded-lg" />
        <div className="h-12 bg-base-inputs rounded-lg" />
      </>
    );
  },
};

const CalculateCredit: React.FC = () => <ServiceStepPage config={config} />;

export default CalculateCredit;
