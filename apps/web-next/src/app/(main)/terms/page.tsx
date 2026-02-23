'use client';

import React from 'react';
import TextPage from '@/components/ui/TextPage/TextPage';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

/**
 * Terms of service page: static or CMS-driven terms content.
 */
const Terms: React.FC = () => {
  useContentFetch('legal');
  const { getContent } = useContentApi('legal');

  return <TextPage title={getContent('terms_title')} text={getContent('terms_text')} />;
};

export default Terms;
