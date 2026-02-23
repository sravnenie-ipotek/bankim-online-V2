'use client';

import React from 'react';
import TextPage from '@/components/ui/TextPage/TextPage';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';

const Cookie: React.FC = () => {
  useContentFetch('legal');
  const { getContent } = useContentApi('legal');

  return <TextPage title={getContent('cookie_title')} text={getContent('cookie_text')} />;
};

export default Cookie;
