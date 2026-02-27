'use client';

import React from 'react';
import TextPage from '@/components/ui/TextPage/TextPage';
import { useContentApi } from '@hooks/useContentApi';
import { useContentFetch } from '@/hooks/useContentFetch';
import { MarkdownHelper } from '@/helpers/MarkdownHelper';

const Refund: React.FC = () => {
  useContentFetch('legal');
  const { getContent } = useContentApi('legal');
  const rawText = getContent('refund_text');
  const htmlText = MarkdownHelper.simpleToHtml(rawText);

  return (
    <TextPage
      title={getContent('refund_title')}
      text={htmlText}
      htmlContent
    />
  );
};

export default Refund;
