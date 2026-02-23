'use client';

import React from 'react';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import TextPage from '@/components/ui/TextPage/TextPage';

const PrivacyPolicy: React.FC = () => {
  useContentFetch('privacy_policy');
  const { getContent } = useContentApi('privacy_policy');

  return (
    <TextPage
      title={getContent('app.privacy_policy.title')}
      text={getContent('app.privacy_policy.full_content')}
      htmlContent
    />
  );
};

export default PrivacyPolicy;
