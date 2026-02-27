'use client';

import React from 'react';
import TextPage from '@/components/ui/TextPage/TextPage';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { MarkdownHelper } from '@/helpers/MarkdownHelper';

/**
 * Terms of service page: static or CMS-driven terms content.
 */
const Terms: React.FC = () => {
  useContentFetch('legal');
  const { getContent } = useContentApi('legal');
  const rawText = getContent('terms_text');
  const htmlText = MarkdownHelper.simpleToHtml(rawText);

  return (
    <TextPage
      title={getContent('terms_title')}
      text={htmlText}
      htmlContent
    />
  );
};

export default Terms;
