'use client';

import React from 'react';
import TextPage from '@/components/ui/TextPage/TextPage';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const Refund: React.FC = () => {
  useContentFetch('legal');
  const { getContent } = useContentApi('legal');

  return <TextPage title={getContent('refund_title')} text={getContent('refund_text')} />;
};

export default Refund;
