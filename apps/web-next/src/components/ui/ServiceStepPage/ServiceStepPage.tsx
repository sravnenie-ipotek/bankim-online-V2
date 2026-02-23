'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '@/components/ui/Container/Container';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import { useContentApi } from '@hooks/useContentApi';
import type { ServiceStepPageProps } from './interfaces/ServiceStepPageProps';

const ServiceStepPage: React.FC<ServiceStepPageProps> = ({ config }) => {
  const { getContent } = useContentApi('common');
  const params = useParams();
  const router = useRouter();
  const step = parseInt(params.stepNumber as string, 10);

  const {
    basePath,
    totalSteps,
    titleContentKey,
    progressStepKeys,
    getStepTitleContentKey,
    lastStepNextUrl,
    firstStepBackUrl,
    nextButtonContentKey = 'next',
    submitButtonContentKey = 'submit',
    backButtonContentKey = 'back',
    renderStepContent,
  } = config;

  if (isNaN(step) || step < 1 || step > totalSteps) {
    router.replace(`${basePath}/1`);
    return null;
  }

  const handleNext = () => {
    if (step < totalSteps) {
      router.push(`${basePath}/${step + 1}`);
    } else {
      router.push(lastStepNextUrl);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      router.push(`${basePath}/${step - 1}`);
    } else if (firstStepBackUrl !== null) {
      router.push(firstStepBackUrl);
    } else {
      router.back();
    }
  };

  const progressLabels = progressStepKeys.map((key) => getContent(key));
  const stepTitle = getContent(getStepTitleContentKey(step));
  const isLastStep = step === totalSteps;
  const nextLabel = isLastStep
    ? getContent(submitButtonContentKey)
    : getContent(nextButtonContentKey);

  return (
    <Container>
      <div className="page-stack max-w-formLg mx-auto">
        <h1 className="text-3xl font-medium text-textTheme-primary">
          {getContent(titleContentKey)}
        </h1>

        <ProgressBar progress={String(step)} data={progressLabels} />

        <div className="surface-card-p8">
          <h2 className="text-xl font-semibold text-textTheme-primary mb-6">{stepTitle}</h2>
          <div className="flex flex-col gap-4 mb-8">{renderStepContent(step, getContent)}</div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 bg-base-secondary text-textTheme-primary rounded-lg font-medium hover:bg-base-base800 transition-colors"
          >
            {getContent(backButtonContentKey)}
          </button>
          <button type="button" onClick={handleNext} className="btn-primary-md">
            {nextLabel}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ServiceStepPage;
