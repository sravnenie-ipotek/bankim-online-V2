'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import TextPage from '@/components/ui/TextPage/TextPage';

const PrivacyPolicy: React.FC = () => {
  useContentFetch('legal');
  const { getContent } = useContentApi('legal');

  return (
    <TextPage
      title={getContent('privacy_policy_title')}
      text={getContent('privacy_policy_full_text')}
      htmlContent
    />
  );
};

export default PrivacyPolicy;
