'use client';

import React from 'react';
import { VacancyApplicationSuccessCard } from '@/components/ui/VacancyApplicationSuccessCard';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

/**
 * Dedicated page shown after a vacancy application is submitted successfully.
 * No header or sidebar (standalone layout). Card centered on viewport, 601×302 at 1440.
 */
const VacancyApplicationSuccessPage: React.FC = () => {
  useContentFetch('vacancies');
  const { getContent } = useContentApi('vacancies');

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12">
      <VacancyApplicationSuccessCard
          title={getContent('vacancyDetail.applicationForm.success')}
          message={getContent('vacancyDetail.applicationForm.successMessage')}
          homeButtonLabel={getContent('navigation.home')}
      />
    </div>
  );
};

export default VacancyApplicationSuccessPage;
